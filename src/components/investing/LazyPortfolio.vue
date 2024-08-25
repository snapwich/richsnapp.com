<template>
  <div>
    <header class="container-fluid">
      <template v-if="portfolios.length">
        <div class="row">
          <div class="col col-md-6">
            <h3>Lazy Portfolio</h3>
            <select class="form-control" v-model="presetPortfolio" size="10">
              <option value="custom">Custom</option>
              <optgroup v-for="group in portfolios" :label="group.text">
                <option
                  v-for="portfolio in group.values"
                  :value="portfolio.value"
                >
                  {{ portfolio.text }}
                </option>
              </optgroup>
            </select>
          </div>
          <div class="col col-md-6" v-if="hasData(assets)">
            <h3>
              Target Allocation<span v-if="totalFinalPercentages > 0">
                vs. Final</span
              >
            </h3>
            <chart class="chart" :options="allocationChart"></chart>
          </div>
        </div>
      </template>
      <div class="row">
        <div class="col col-sm-12">
          <h3>Contribution Amount</h3>
          <div class="row">
            <div class="col-sm-7">
              <div class="input-group">
                <currency-input
                  class="form-control contributionAmount"
                  v-model="contributionAmount"
                  :currency="currency.code"
                />
                <span class="input-group-btn">
                  <button
                    class="btn btn-primary btn"
                    type="button"
                    @click="autoCalculate"
                  >
                    Auto Calculate
                  </button>
                </span>
              </div>
              <input
                type="range"
                class="form-control-range slider"
                :min="-contributionSliderMax"
                :max="contributionSliderMax"
                step="10"
                v-model="contributionSlider"
                @mouseup="resetContributionSliderIfMax"
                @touchend="resetContributionSliderIfMax"
              />
            </div>
            <div class="col-sm-5 currency">
              <v-select
                class="currency-input"
                v-model="currency"
                :options="formattedCurrencies"
                :clearable="false"
              ></v-select>
            </div>
          </div>
        </div>
      </div>
    </header>
    <table class="table table-sm table-striped">
      <thead>
        <tr>
          <th class="name">Asset</th>
          <th class="targetPercentage">Target%</th>
          <th class="currentValue">Current Value</th>
          <th class="currentPercentage">Current%</th>
          <th class="buySellAmount">
            {{ contributionAmount >= 0 ? "Buy/Sell?" : "Sell/Buy?" }}
            <input
              type="checkbox"
              title="Allow assets to be sold?"
              v-model="canBuySellAll"
            />
          </th>
          <th class="finalValue">Final Value</th>
          <th class="finalPercentage">Final%</th>
        </tr>
      </thead>
      <tbody name="assets" is="transition-group">
        <tr v-for="(asset, i) in assets" :key="i" class="asset">
          <td class="name">
            <v-select
              class="name-input"
              v-model="asset.name"
              :options="filteredFunds"
              @option:created="addFund"
              :taggable="true"
              :pushTags="true"
              :clearable="false"
            >
              <template v-slot:list-header>
                <li class="list-header">
                  <button
                    class="btn btn-sm btn-default"
                    type="button"
                    @click="removeAsset(asset)"
                  >
                    <i class="fa fa-trash-o" /> Remove Asset
                  </button>
                </li>
              </template>
            </v-select>
          </td>
          <td class="targetPercentage">
            <select class="form-control input-sm" v-model="asset.target">
              <option v-for="n in 100" :value="n">{{ n }}%</option>
            </select>
          </td>
          <td class="currentValue">
            <currency-input
              class="form-control input-sm"
              v-model="asset.value"
              :currency="currency.code"
            />
          </td>
          <td class="currentPercentage">
            {{ currentPercentages[i].toFixed(1) }}%
          </td>
          <td class="buySellAmount" :class="coloredNumberClasses(buySell[i])">
            {{ format(buySell[i]) }}
            <input
              type="checkbox"
              title="Allow this asset to be sold?"
              v-model="asset.canBuySell"
            />
          </td>
          <td class="finalValue">
            {{ format(finalValues[i]) }}
          </td>
          <td class="finalPercentage">{{ finalPercentages[i].toFixed(1) }}%</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="name">Totals</td>
          <td class="targetPercentage">{{ totalTargetPercentages }}%</td>
          <td class="currentValue">{{ format(totalValue) }}</td>
          <td class="currentPercentage">
            {{ totalCurrentPercentages.value.toFixed(1) }}%
          </td>
          <td class="buySellAmount" :class="coloredNumberClasses(totalBuySell)">
            {{ format(totalBuySell) }}
          </td>
          <td class="finalValue">{{ format(totalFinalValues) }}</td>
          <td class="finalPercentage">
            {{ totalFinalPercentages.value.toFixed(1) }}%
          </td>
        </tr>
      </tfoot>
    </table>
    <footer>
      <button class="btn btn-primary add" @click="addAsset" type="button">
        Add Asset
      </button>
      <button class="btn expand-csv" @click="showCsv = !showCsv">
        <i :class="['fa fa-angle-down', { expanded: showCsv }]"></i> view
        tab-delimited
      </button>
      <textarea class="form-control csv" v-if="showCsv" readonly>{{
        tabDelimited
      }}</textarea>
    </footer>
  </div>
</template>

<script lang="js">
import _ from "lodash";
import VSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import currency from "currency.js";
import { CurrencyInput } from 'vue-currency-input'
import { Chart } from "highcharts-vue";
import { atob, btoa } from "isomorphic-base64";

import { breakpoints } from "assets/screenSizes";

const ENCODE_COLUMNS = ['name', 'target', 'value', 'canBuySell'];

export default {
  components: {
    VSelect,
    CurrencyInput,
    Chart
  },
  props: {
    funds: {
      type: Array,
      default() {
        return [];
      }
    },
    portfolios: {
      type: Array,
      default() {
        return []
      }
    },
    startingPortfolio: {
      type: String,
      default() {
        return "custom"
      }
    },
    urlEncodedValue: {
      type: String
    },
    currencies: {
      type: Object,
      required: true
    }
  },
  data({ currencies, urlEncodedValue }) {
    let presetPortfolio;
    if (urlEncodedValue) {
      presetPortfolio = "custom";
    } else {
      presetPortfolio = this.startingPortfolio;
      if (this.portfolios.length ) {
        this.portfolios.forEach(group => {
          (group.values || []).forEach(portfolio => {
            if (portfolio.text === this.startingPortfolio) {
              presetPortfolio = portfolio.value;
            }
          });
        })
      }
    }

    return {
      breakpoints,
      currency: {code: "USD", label: `(USD) ${currencies.USD}`},
      assets: [],
      myFunds: _.clone(this.funds),
      presetPortfolio,
      contributionSliderMax: 10000,
      contributionInput: 0,
      contributionSliderInput: 0,
      showCsv: false,
      dollars: {
        precision: 0
      },
      cents: {
        precision: 2
      }
    }
  },
  computed: {
    urlEncoded: {
      get() {
        return btoa(JSON.stringify([this.currency.code, this.contributionAmount, this.assets.map(asset =>
          Object.values(_.pick(asset, ENCODE_COLUMNS))
        )]));
      },
      set(str) {
        if (str && str !== this.urlEncoded) {
          let [currencyCode, contributionAmount, assets] = JSON.parse(atob(str));
          this.currency = {code: currencyCode, label: `(${currencyCode}) ${this.currencies[currencyCode]}`};
          this.contributionAmount = contributionAmount;
          this.assets = assets.map((asset) => _.zipObject(ENCODE_COLUMNS, asset));
        }
      }
    },
    tabDelimited: {
      get() {
        return [
          ["ASSET NAME", "TARGET", "VALUE", "BUY/SELL"].join("\t"),
          ...this.assets.map((asset, i) => {
            return [asset.name || "", asset.target + "%", this.format(asset.value), this.format(this.buySell[i])].join("\t")
          })
        ].join("\n")
      },
      set() {
        // TODO: allow user input
      }
    },
    formattedCurrencies() {
      let items = _.map(this.currencies, (label, code) => {
        return ({
          label: `(${code}) ${label}`,
          code
        });
      });
      return items;
    },
    contributionAmount: {
      get() {
        return this.contributionInput + parseFloat(this.contributionSlider);
      },
      set(value) {
        this.resetContributionSlider(value);
      }
    },
    contributionSlider: {
      get() {
        return this.contributionSliderInput;
      },
      set: _.throttle(function(value) {
        this.contributionSliderInput = value;
      }, 100)
    },
    filteredFunds() {
      return this.myFunds.filter(fund => {
        return !this.assets.some(asset => (asset.name || "").toLowerCase() === fund.toLowerCase())
      });
    },
    allocationChart() {
      return {
        chart: {
          type: "pie",
          height: "50%"
        },
        title: {
          text: undefined
        },
        exporting: {
          enabled: false
        },
        series: [{
          name: "Current%",
          size: "60%",
          dataLabels: {
            enabled: false
          },
          data: this.finalPercentages.map((curr, i) => {
            return {
              name: this.assets[i].name,
              y: this.parseNumber(curr)
            }
          })
        }, {
          name: "Target%",
          size: "100%",
          innerSize: "60%",
          data: this.assets.map(asset => {
            return {
              name: asset.name || "N/A",
              y: asset.target
            }
          })
        }]
      }
    },
    canBuySellAll: {
      get() {
        return this.assets.every(asset => asset.canBuySell);
      },
      set(val) {
        this.assets.forEach(asset => {
          asset.canBuySell = val;
        });
      }
    },
    totalTargetPercentages() {
      return this.assets.reduce((memo, asset) => {
        return memo.add(asset.target);
      }, currency(0))
    },
    totalValue() {
      return this.assets.reduce((memo, asset) =>
        asset.value ? memo.add(asset.value) : memo
      ,currency(0))
    },
    totalValueWithContribution() {
      return this.totalValue.add(this.contributionAmount);
    },
    currentPercentages() {
      return this.assets.map((asset) => {
        return !this.totalValue.value ? 0 :
          (currency(asset.value, {precision: 4}).divide(this.totalValue) * 100)
      });
    },
    totalCurrentPercentages() {
      return this.currentPercentages.reduce((memo, curr) => {
        return memo.add(parseFloat(curr));
      }, currency(0))
    },
    optimalContribution() {
      return currency(Math.max(...this.assets.map((asset) => {
        return asset.target ? currency(asset.value || 0).divide(parseFloat(asset.target) / 100).value : 0;
      }))).subtract(this.totalValue)
    },
    optimalTotals() {
      return this.assets.map((asset) => {
        return this.totalValueWithContribution.multiply((asset.target || 0) / 100)
      })
    },
    buySell() {
      let buySells = this.optimalTotals.map((total, i) => {
        let asset = this.assets[i];
        let buySell = total.subtract(asset.value);
        return {
          canBuySell: asset.canBuySell,
          target: currency(asset.target),
          value: asset.value,
          buySell: maxSellAmount(asset.value, buySell)
        }
      });

      // helper function for a sell, don't allow us to sell more than the value of the asset
      function maxSellAmount(value, buySell) {
        return buySell.add(value).value < 0 ? currency(-value) : buySell
      }

      let needsFixing = (asset) => {
        return !asset.canBuySell && (this.contributionAmount >= 0 ? asset.buySell.value < 0 : asset.buySell.value > 0);
      };

      let canDistribute = (asset) => {
        return (asset.canBuySell || (this.contributionAmount >= 0 ? asset.buySell.value > 0 : asset.buySell.value < 0));
      };

      let todo;
      while((todo = buySells.filter(needsFixing)).length) {
        let targets = buySells.filter(canDistribute);
        todo.forEach((source) => {
          let buySell = source.buySell;
          source.buySell = currency(0);
          if (targets.length) {
            let totalPortions = targets.reduce((total, a) => {
              return total.add(a.target);
            }, currency(0));
            targets.forEach((target) => {
              target.buySell = maxSellAmount(target.value, target.buySell.add(
                buySell.multiply(target.target.value / totalPortions)
              ))
            });
          }
        });
        // if there was nowhere to distribute funds to then we're done
        if (!targets.length) {
          break;
        }
      }

      // distribute extra/missing cents resulting from rounding
      let remainder = currency(this.contributionAmount).subtract(buySells.reduce(
        (memo, asset) => memo.add(asset.buySell),
        currency(0)
      ));
      if (remainder.value !== 0) {
        let targets = buySells.filter(canDistribute);
        remainder.distribute(targets.length).forEach((cents, i) => {
          let target = targets[i];
          target.buySell = maxSellAmount(target.value, target.buySell.add(cents));
        });
      }

      return buySells.map(asset => asset.buySell);
    },
    totalBuySell() {
      return this.buySell.reduce((memo, value) =>
          value ? memo.add(value) : memo
        ,currency(0))
    },
    finalPercentages() {
      return this.finalValues.map((total) => {
        if (this.totalFinalValues.value === 0) {
          return 0;
        }
        return (total.divide(this.totalFinalValues) * 100);
      });
    },
    totalFinalPercentages() {
      return this.finalPercentages.reduce((memo, value) => {
        return memo.add(this.parseNumber(value));
      }, currency(0))
    },
    finalValues() {
      return this.assets.map((asset, i) => {
        return currency(asset.value, {precision: 4}).add(this.buySell[i])
      });
    },
    totalFinalValues() {
      return this.finalValues.reduce((memo, value) =>
          value ? memo.add(value) : memo
        ,currency(0))
    }
  },
  watch: {
    urlEncoded(val) {
      this.$emit('update:urlEncodedValue', val);
    },
    urlEncodedValue: {
      handler(val) {
        this.urlEncoded = val;
      },
      immediate: true
    },
    assets: {
      immediate: true,
      deep: true,
      handler(assets) {
        if (assets.length) {
          if (!this.portfolios.some(group => {
            return group.values.some(portfolio => {
              for (let asset of assets) {
                if (!portfolio.value[asset.name] || portfolio.value[asset.name] !== asset.target) {
                  return false;
                }
              }
              if (this.parseNumber(this.totalTargetPercentages) === 100) {
                this.presetPortfolio = portfolio.value;
                return true;
              }
              return false;
            });
          })) {
            this.presetPortfolio = "custom";
          }
        }
      }
    },
    presetPortfolio: {
      immediate: true,
      handler(preset) {
        if (preset !== "custom") {
          // maintain previous asset values when loading a preset
          let assets = this.assets.reduce((memo, asset) => {
            memo[asset.name] = asset;
            return memo;
          }, {});
          this.assets = Object.keys(preset).map(name => {
            let target = preset[name];
            return {
              name,
              target: target,
              value: _.get(assets, [name, "value"], 0),
              canBuySell: _.get(assets, [name, "canBuySell"], false)
            }
          });
        }
      }
    }
  },
  methods: {
    resetContributionSliderIfMax() {
      if (Math.abs(this.contributionSlider) === Math.abs(this.contributionSliderMax)) {
        this.resetContributionSlider(this.contributionAmount)
      }
    },
    resetContributionSlider(value) {
      this.contributionSlider = 0;
      this.contributionInput = parseFloat(value);
    },
    coloredNumberClasses(number) {
      return {
        positive: number > 0,
        negative: number < 0
      }
    },
    parseNumber(number) {
      let result = parseFloat(number || 0);
      if (Number.isNaN(result)) {
        return 0
      }
      return result;
    },
    addFund(option) {
      if (!this.myFunds.includes(option)) {
        this.myFunds.push(option);
      }
    },
    addAsset() {
      this.assets.push({
        value: 0,
        target: 0,
        canBuySell: false
      })
    },
    removeAsset(item) {
      this.assets.splice(this.assets.indexOf(item), 1);
      document.activeElement.blur(); // prevent next input from taking focus and expanding
    },
    hasData(assets) {
      return assets.some(asset => {
        return asset.target > 0 || parseFloat(asset.current) > 0;
      });
    },
    autoCalculate() {
      this.contributionAmount = this.optimalContribution.value;
    },
    format(value) {
      // is currency.js object?
      if (typeof value === "object" && value.value) {
        value = value.value;
      }
      return Number(value).toLocaleString(undefined, {style: "currency", currency: this.currency.code})
    }
  }
}
</script>

<style lang="less">
@import (reference) "../../assets/variables.less";
.vs__dropdown-menu {
  font-family: @font-family-monospace;
}
</style>
<style lang="less" scoped>
@import (reference) "../../assets/variables.less";

.btn-primary {
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-weight: bold;
  color: @gray;
}

input,
select,
.name-input {
  background-color: lighten(@brand-primary, 12%);
  ::v-deep .vs__dropdown-menu {
    background-color: lighten(@brand-primary, 12%);
  }
}

div.col {
  margin: 10px 0 20px !important;
  h3 {
    border-bottom: 2px solid #ddd;
  }
  @media (max-width: @screen-md-max) {
    &:first-child {
      margin-top: 10px !important;
    }
  }
}

@media (max-width: @screen-xs-max) {
  .slider {
    margin-top: 12px;
  }
}

@media (max-width: @screen-sm-max) {
  .currency {
    margin-top: 15px;
  }
}

table,
.contributionAmount {
  font-family: @font-family-monospace;
}

table {
  margin: 0;
  .name-input {
    min-width: 300px;
  }
  .targetPercentage {
    width: 100px;
  }
  .currentValue {
    width: 150px;
  }
  .currentPercentage,
  .finalPercentage {
    width: 80px;
  }
  .list-header {
    margin: 10px;
    button {
      width: 100%;
    }
  }
  tr {
    border-top: 1px solid #ddd;
    &:last-child {
      border-bottom: 1px solid #ddd;
    }
  }
  td,
  th {
    border-top: 0 !important;
    border-bottom: 0 !important;
    text-align: right;
    vertical-align: middle !important;
    input {
      text-align: right;
    }
    &.name {
      font-weight: bold;
      text-align: center;
    }
    &.buySellAmount {
      font-weight: bold;
    }
    @media (max-width: @screen-md-max) {
      text-align: center;
    }
  }
  tfoot .name {
    font-weight: bold;
  }
  tfoot .buySellAmount {
    padding-right: 30px;
  }
  @media (max-width: @screen-md-max) {
    tr {
      display: flex;
      flex-wrap: wrap;
      .name {
        width: 60%;
      }
      .targetPercentage {
        width: 20%;
      }
      .currentValue {
        width: 20%;
      }
      .currentPercentage,
      .finalPercentage,
      .buySellAmount,
      .finalValue {
        width: 25%;
      }
    }
  }
  @media (max-width: @screen-xs-max) {
    tr {
      .name {
        width: 100%;
      }
      .targetPercentage {
        width: 30%;
      }
      .currentValue {
        width: 40%;
      }
      .currentPercentage {
        width: 30%;
      }
      .finalPercentage,
      .buySellAmount,
      .finalValue {
        width: 33.3333%;
      }
    }
  }
}

footer {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.input-sm {
  font-size: 16px;
}

.add {
  width: 100%;
}

.positive {
  color: green;
}

.negative {
  color: red;
}

.expand-csv {
  margin-top: 6px;
  font-family: @font-family-sans-serif;
  align-self: flex-end;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  &:active {
    box-shadow: none;
  }
  i {
    transition: all 0.5s;
    color: #888;
    margin-right: 5px;
    &.expanded {
      transform: rotate(-180deg);
    }
  }
}

.csv {
  margin-top: 8px;
  min-height: 250px;
  background: #fff;
  tab-size: 70;
  @media (max-width: @screen-md-max) {
    tab-size: 50;
  }
  @media (max-width: @screen-sm-max) {
    tab-size: 25;
  }
}

.assets-enter-active,
.assets-leave-active {
  transition: background-color 2s;
}

.assets-enter,
.assets-leave-to {
  transition: none;
  background-color: darken(@brand-primary, 20%) !important;
}
</style>
