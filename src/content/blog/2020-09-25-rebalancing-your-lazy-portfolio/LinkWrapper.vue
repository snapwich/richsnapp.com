<style scoped>
.link-area {
  margin: 20px 0;
  overflow: hidden;
  background-color: #fff;
}
</style>

<template>
  <a :href="query">this link encoded with your portfolio data</a>.
  <textarea class="form-control link-area" ref="link" readonly>{{
    link
  }}</textarea>
</template>

<script>
import { debounce } from "lodash-es";
import { store } from "components/LazyPortfolio/lazyPortfolioState";

export default {
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
  watch: {
    link() {
      this.resize();
    },
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
    },
  },
  mounted() {
    this.$nextTick(this.resize);
    if (typeof addEventListener !== "undefined") {
      addEventListener(
        "resize",
        debounce(() => {
          this.resize();
        }, 100),
      );
    }
  },
};
</script>
