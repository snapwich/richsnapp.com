<template lang="md">
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
  calculations are performed directly on this page in Javascript.

  ### The future

  If you have any suggested "lazy portfolio" presets that you think should be added feel free to submit a pull-request.
  If there are any features you think would be useful as part of this calculator feel free to suggest them in the
  comments below. Happy investing!
</template>

<script>
import LazyPortfolio from "./-LazyPortfolio";
export default {
  tags: ["tools", "investing"],
  components: {
    LazyPortfolio
  },
  data({ $route }) {
    return {
      encodedStr: $route.query.p,
      currencies: {
        USD: "United States dollar",
        EUR: "Euro",
        JPY: "Japanese yen",
        GBP: "Pound sterling",
        AUD: "Australian dollar",
        CAD: "Canadian dollar",
        CHF: "Swiss franc",
        CNY: "Renminbi",
        HKD: "Hong Kong dollar",
        NZD: "New Zealand dollar",
        SEK: "Swedish krona",
        KRW: "South Korean won",
        SGD: "Singapore dollar",
        NOK: "Norwegian krone",
        MXN: "Mexican peso",
        INR: "Indian rupee",
        RUB: "Russian ruble",
        ZAR: "South African rand",
        TRY: "Turkish lira",
        BRL: "Brazilian real",
        TWD: "New Taiwan dollar",
        DKK: "Danish krone",
        PLN: "Polish złoty",
        THB: "Thai baht",
        IDR: "Indonesian rupiah",
        HUF: "Hungarian forint",
        CZK: "Czech koruna",
        ILS: "Israeli new shekel",
        CLP: "Chilean peso",
        PHP: "Philippine peso"
      },
      funds: [
        "Total Stock",
        "Total World Stock",
        "Total Bond",
        "Total International Stock",
        "TIPS",
        "REIT",
        "Short Term Bonds",
        "US Treasury Bonds",
        "Large Blend",
        "Large Value",
        "Small Blend",
        "Small Value",
        "Emerging Markets",
        "International Developed",
        "Inflation-Protected Securities",
        "Europe",
        "Pacific"
      ],
      startingPortfolio: "Rick Ferri Lazy 40/40/20",
      portfolios: [
        {
          text: "Two fund",
          values: [
            {
              text: "Rick Ferri 40/60",
              value: {
                "Total Bond": 40,
                "Total World Stock": 60
              }
            }
          ]
        },
        {
          text: "Three fund",
          values: [
            {
              text: "Rick Ferri Lazy 40/40/20",
              value: {
                "Total Bond": 40,
                "Total Stock": 40,
                "Total International Stock": 20
              }
            }
          ]
        },
        {
          text: "Core four",
          values: [
            {
              text: "Rick Ferri 60/40",
              value: {
                "Total Bond": 40,
                "Total Stock": 30,
                "Total International Stock": 24,
                "REIT": 6
              }
            },
            {
              text: "Rick Ferri 80/20",
              value: {
                "Total Bond": 20,
                "Total Stock": 40,
                "Total International Stock": 32,
                "REIT": 8
              }
            }
          ]
        },
        {
          text: "Others",
          values: [
            {
              text: 'Bill Schultheis "Coffeehouse"',
              value: {
                "Large Blend": 10,
                "Large Value": 10,
                "Small Blend": 10,
                "Small Value": 10,
                "Total International Stock": 10,
                "REIT": 10,
                "Total Bond": 40
              }
            }
          ]
        }
      ]
    };
  },
  computed: {
    link() {
      return typeof location === "undefined" ? "" :
        [location.protocol, '//', location.host, location.pathname].join('') + this.query;
    },
    query() {
      return `?p=${this.encodedStr}`
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
      if(ta) {
        this.$nextTick(() => {
          ta.style.height = "";
          ta.style.height = ta.scrollHeight + 'px';
        });
      }
    }
  },
  mounted() {
    this.$nextTick(this.resize);
    if (typeof addEventListener !== "undefined") {
      addEventListener("resize", _.debounce(() => {
        this.resize();
      }, 100));
    }
  }
};
</script>

<style scoped>
  .link {
    margin: 20px 0;
    overflow: hidden;
    background-color: #fff;
  }
</style>
