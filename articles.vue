<template>
  <PagePreviews :pages="pages"></PagePreviews>
</template>

<script>
import PagePreviews from "~/components/PagePreviews";

export default {
  title: "Articles",
  description: "The latest articles out of Rich Snapp's blog.",
  components: {
    PagePreviews
  },
  data() {
    return {
      pages: require("~/static/api/articles-latest.json")
    };
  }
};
</script>
