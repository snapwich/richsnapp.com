<template lang="md">
  <section class="update">
    <p>
    <b>Update:</b> This tool can now be installed as a Progressive Web App (PWA) on your desktop or mobile device. See
    <a href="/blog/2023/5-28-new-pwa-tools-section">this blog post</a> for more details.
    </p>
  </section>

  [Lazy portfolios](https://www.bogleheads.org/wiki/Lazy_portfolios) are a simple and safe way I've been
  using for some time to successfully invest in the market. The general idea is to allocate your investments into a few
  broad funds (usually [index funds](https://www.bogleheads.org/wiki/Index_fund)) proportionally to your desired risk
  profile and let them sit and grow over time. Once you've purchased your funds at your desired allocations the
  only action required is to occasionally [rebalance](https://www.bogleheads.org/wiki/Rebalancing) them and bring
  them back to your desired allocations as they change over time. These rebalances can happen at set time
  intervals (6 months to a year) or at specific triggers based on some other strategy. If your only criteria is that
  your risk profile adjusts as you get closer to retirement age then you can invest entirely in
  a [target date fund](https://www.bogleheads.org/wiki/Target_date_funds), but if you want more control over
  when/why/how you rebalance then a lazy portfolio might be for you.

  <figure>
    <client-only>
      <LazyPortfolio
        :currencies="currencies"
        :funds="funds"
        :portfolios="portfolios"
        :startingPortfolio="startingPortfolio"
        :urlEncodedValue.sync="encodedStr" />
    </client-only>
  </figure>

  ### How to use

  A rebalancing calculator (such as this one) will help you determine which funds you need to buy and/or sell and in
  what amounts to get your portfolio back to your desired allocation percentages. To use:

  * Select a preset fund allocation strategy under "Lazy Portfolio." If you don't like any of the provided options you can add/remove funds and
    edit target percentages directly in the table to make your own "Custom" investment strategy.
  * Choose your desired currency (or leave in USD).
  * Input the current value of each of your funds (or leave at `0.00` if you're just starting).
  * Input your positive contribution amount (or input a negative amount to withdraw). You can also use the
    "Auto Calculate" button to set the contribution amount for you. It will calculate the minimum contribution
    you'd have to make to get your portfolio perfectly balanced.
  * Use the buy/sell checkbox to indicate if you are willing to sell (if contributing) or buy (if withdrawing) an asset
    in order to better reach your desired allocation. Keep in mind that selling may be a taxable event if your funds
    are not in an account that offers
    [tax-free growth of your investments](https://www.bogleheads.org/wiki/Tax_basics#Tax-advantaged_accounts).
    If your funds are in a taxable account I'd suggest rebalancing through contributions alone whenever possible.
  * The calculator will automatically compute the required buy and/or sell amounts in real-time as you edit any fields.

  #### Using the slider
    The slider below the "Contribution Amount" is useful if you want to see how your allocation percentages adjust in
    real-time at various increments. The entire bar allows you to adjust the contribution in a range of `±10,000`.
    Dragging the slider completely to either end will reset the cursor to the center allowing you to infinitely
    drag to any amount.

  #### Spreadsheets
    If you would like to copy/paste the data into a spreadsheet application, you can click the "view tab-delimited"
    button in the bottom right of the calculator to get the data in a tab-delimited format that can be pasted into other
    applications.

  ### Share or save for later

  <p>
    To come back to this same portfolio at a later time with your data prepopulated (for your next rebalance maybe) or
    to share your portfolio with someone else you can use
    <client-only>
      <a :href="query">this link encoded with your portfolio data</a>.
      <textarea class="form-control link" ref="link" readonly>{{ link }}</textarea>
    </client-only>
  </p>

  ### The why and how

  In the past I've used spreadsheets and then later this calculator: [optimalrebalancing.tk](http://optimalrebalancing.tk/).
  It's a good resource that does most anything you'd need it to do. My goal in making this calculator was for a few
  quality of life improvements for myself, specifically:
   * Easier data input than a text box.
   * A [responsive design](https://en.wikipedia.org/wiki/Responsive_web_design) that works on mobile devices.
   * The ability to buy and sell as part of the same rebalance (for exchanging funds).
   * The ability to auto-calculate your minimum required contribution that would perfectly balance your portfolio.
   * The ability to view your contribution adjustments in real-time (using the slider) to see how much it affects your
     actual allocation percentages. This and the point above can be useful for determining stretch savings goals.
   * The ability to save your results and come back later.
   * Fixing some rounding issues, such as distribution of cents, so that your buy/sell amounts perfectly match your
     desired contribution amount.

  The algorithm for rebalancing is a bit different as well. The auto-rebalance calculation is a constant time formula
  that produces the minimum amounts (allowing both buying _and_ selling) that perfectly balance the portfolio. The results
  of that calculation are then adjusted using a recursive weighted redistribution that considers the applied
  constraints such as maximum sell amount and the "can buy/sell?" checkboxes.

  Similar to the referenced calculator, this page does not send your portfolio data to a backend server. All
  calculations are performed directly on this page in Javascript with thanks to the following free software:

  * [**Vue.js**](https://vuejs.org/) ([MIT](https://github.com/vuejs/vue/blob/dev/LICENSE))
  * [**Lodash**](https://lodash.com/) ([MIT](https://github.com/lodash/lodash/blob/master/LICENSE))
  * [**Currency.js**](https://currency.js.org/) ([MIT](https://github.com/scurker/currency.js/blob/master/license))
  * [**Vue Select**](https://vue-select.org/) ([MIT](https://github.com/sagalbot/vue-select/blob/master/LICENSE.md))
  * [**Vue Currency Input**](https://dm4t2.github.io/vue-currency-input/) ([MIT](https://github.com/dm4t2/vue-currency-input/blob/master/LICENSE))
  * [**Highcharts**](https://www.highcharts.com/) ([Attribution-NonCommercial CC](https://creativecommons.org/licenses/by-nc/3.0/us/))

  ### The future

  If you have any suggested "lazy portfolio" presets that you think should be added feel free to submit a pull-request.
  If there are any features you think would be useful as part of this calculator feel free to suggest them in the
  comments below. Happy investing!
</template>

<script>
import _ from "lodash";

import currencies from "~/components/investing/currencies.json";
import funds from "@/components/investing/funds.json";
import portfolios from "~/components/investing/lazyPortfolios.json";
import { image } from "~/utils/meta";

export default {
  tags: ["tools", "investing"],
  components: {
    LazyPortfolio: async () =>
      process.browser &&
      import("../../../../components/investing/LazyPortfolio")
  },
  data({ $route }) {
    return {
      encodedStr: $route.query.p,
      currencies,
      funds,
      portfolios,
      startingPortfolio: "Rick Ferri Lazy 40/40/20"
    };
  },
  computed: {
    link() {
      return typeof location === "undefined"
        ? ""
        : [location.protocol, "//", location.host, location.pathname].join("") +
            this.query;
    },
    query() {
      return `?p=${this.encodedStr}`;
    }
  },
  watch: {
    link() {
      this.resize();
    }
  },
  methods: {
    resize() {
      let ta = this.$refs.link;
      if (ta) {
        this.$nextTick(() => {
          ta.style.height = "";
          ta.style.height = ta.scrollHeight + "px";
        });
      }
    }
  },
  mounted() {
    this.$nextTick(this.resize);
    if (typeof addEventListener !== "undefined") {
      addEventListener(
        "resize",
        _.debounce(() => {
          this.resize();
        }, 100)
      );
    }
  },
  head: {
    meta: image(
      process.env.baseUrl + "/tools/lazy-portfolio/icons/portfolio-96.png"
    )
  }
};
</script>

<style scoped>
.link {
  margin: 20px 0;
  overflow: hidden;
  background-color: #fff;
}
.update {
  font-style: italic;
  font-family: Georgia, serif;
  margin-bottom: 2em;
  p {
    margin-bottom: 5px;
  }
}
</style>
