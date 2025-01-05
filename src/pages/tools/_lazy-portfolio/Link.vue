<template>
  <div class="links">
    <a class="share-link" :href="query"
      >share / bookmark link to current portfolio</a
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "components/LazyPortfolio/lazyPortfolioState";

export default defineComponent({
  computed: {
    link() {
      return typeof location === "undefined"
        ? ""
        : [location.protocol, "//", location.host, location.pathname].join("") +
            this.query;
    },
    query() {
      return `?p=${store.urlEncodedValue}`;
    },
  },
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
