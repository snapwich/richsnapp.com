<template>
  <div>
    <Tags :tags="tags" class="tags"></Tags>
    <PagePreviews :pages="pages"></PagePreviews>
  </div>
</template>

<script>
  import Tags from "~/components/Tags";
  import PagePreviews from '~/components/PagePreviews';

  export default {
    title: 'Home',
    description: 'The latest news out of Rich Snapp\'s blog.',
    components: {
      Tags,
      PagePreviews
    },
    data() {
      return {
        tags: require("~/static/api/tags.json"),
        pages: require('~/static/api/latest.json')
      }
    },
  };

</script>

<style lang="less" scoped>
  @import "../assets/variables.less";

  .tags {
    font-family: @font-family-sans-serif;
    font-size: 20px;
    font-weight: 300;
    margin: 0 4em 2em;
    text-align: center;
    @media(max-width: @screen-sm-max) {
      margin-left: 0;
      margin-right: 0;
    }
  }
</style>
