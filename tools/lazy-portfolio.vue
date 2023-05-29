<template>
  <client-only>
    <lazy-portfolio
      :currencies="currencies"
      :funds="funds"
      :portfolios="portfolios"
      :startingPortfolio="startingPortfolio"
      :urlEncodedValue.sync="encodedStr"
    />
  </client-only>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import currencies from "~/components/investing/currencies.json";
import funds from "~/components/investing/funds.json";
import portfolios from "~/components/investing/lazyPortfolios.json";
import { useStorage } from "~/utils/storage";

export default defineComponent({
  components: {
    LazyPortfolio: async () =>
      process.browser && import("~/components/investing/LazyPortfolio.vue")
  },
  layout: "tools",
  head: {
    title: "Lazy Portfolio Rebalancer - RichSnapp.com",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Rebalance your portfolio with the click of a button and generate a portfolio based on popular lazy strategies."
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "lazy portfolio, portfolio rebalancer, portfolio rebalance, portfolio rebalancing, portfolio rebalancer tool, portfolio rebalance tool, portfolio rebalancing tool, portfolio rebalancer calculator, portfolio rebalance calculator, portfolio rebalancing calculator, portfolio rebalancer app, portfolio rebalance app, portfolio rebalancing app, portfolio rebalancer software, portfolio rebalance software, portfolio rebalancing software"
      }
    ],
    link: [
      {
        rel: "manifest",
        href: "/tools/lazy-portfolio/manifest.json"
      }
    ]
  },
  setup() {
    let storage = useStorage("lazy-portfolio");

    let encodedStr = computed({
      get() {
        if (global.location) {
          let url = new URL(global.location.href);
          if (url.searchParams.has("p")) {
            return url.searchParams.get("p");
          }
        }
        return storage.get<string>("encodedStr") || "";
      },
      set(val) {
        if (
          global.history &&
          global.location &&
          // don't update the url if it's the default value
          val !==
            "WyJVU0QiLDAsW1siVG90YWwgQm9uZCIsNDAsMCxmYWxzZV0sWyJUb3RhbCBTdG9jayIsNDAsMCxmYWxzZV0sWyJUb3RhbCBJbnRlcm5hdGlvbmFsIFN0b2NrIiwyMCwwLGZhbHNlXV1d"
        ) {
          let url = new URL(global.location.href);
          url.searchParams.set("p", val || "");
          global.history.replaceState(null, "", url);
        }
        storage.set("encodedStr", val);
      }
    });

    return {
      currencies,
      funds,
      portfolios,
      encodedStr,
      startingPortfolio: "Rick Ferri Lazy 40/40/20"
    };
  }
});
</script>
