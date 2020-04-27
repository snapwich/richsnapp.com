<template>
  <PagePreviews :pages="taggedPages()"></PagePreviews>
</template>

<script>

  import PagePreviews from '~/components/PagePreviews';

  export default {
    components: {
      PagePreviews
    },
    data() {
      return {
          pages: require('~/static/api/latest.json')
      }
    },
    methods: {
      taggedPages() {
        let tag = this.$route.params.tag.replace("-", " ");
        if (!tag) {
          return this.pages;
        }
        return this.pages.filter(page => {
          return page.tags.includes(tag);
        });
      }
    }
  };

</script>
