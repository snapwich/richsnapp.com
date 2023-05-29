<template>
  <div>
    <client-only>
      <lazy-portfolio
        :currencies="currencies"
        :funds="funds"
        :portfolios="portfolios"
        :startingPortfolio="startingPortfolio"
        :urlEncodedValue.sync="encodedStr"
      />
      <div class="links">
        <a class="share-link" :href="shareLink"
          >share / bookmark link to current portfolio</a
        >
      </div>
    </client-only>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from "vue";

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

    let encodedStr = ref(storage.get<string>("encodedStr"));
    watch(encodedStr, val => {
      storage.set("encodedStr", val);
    });

    let shareLink = computed(() => {
      if (global.location) {
        let url = new URL(global.location.href);
        url.searchParams.set("p", encodedStr.value || "");
        return url.toString();
      }
      return "";
    });

    if (global.location) {
      let url = new URL(global.location.href);
      let p = url.searchParams.get("p");
      if (p) {
        encodedStr.value = p;
      }
    }

    return {
      currencies,
      funds,
      portfolios,
      encodedStr,
      shareLink,
      startingPortfolio: "Rick Ferri Lazy 40/40/20"
    };
  }
});
</script>

<style>
.links {
  display: flex;
  justify-content: right;
}
.share-link {
  text-align: center;
  text-decoration: none;
  color: inherit;
  border-bottom: 2px solid #b7dee6;
  box-shadow: inset 0 -3px 0 #b7dee6;
}
</style>
