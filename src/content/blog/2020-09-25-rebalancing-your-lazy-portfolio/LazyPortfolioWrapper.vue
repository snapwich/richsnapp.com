<template>
  <LazyPortfolio
    :currencies="currencies"
    :funds="funds"
    :portfolios="portfolios"
    starting-portfolio="Rick Ferri Lazy 40/40/20"
  ></LazyPortfolio>
</template>

<script setup>
import LazyPortfolio from "components/LazyPortfolio/LazyPortfolio.vue";
import currencies from "components/LazyPortfolio/currencies.json";
import funds from "components/LazyPortfolio/funds.json";
import portfolios from "components/LazyPortfolio/lazyPortfolios.json";
</script>
