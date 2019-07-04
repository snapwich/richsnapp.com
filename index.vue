<template>
  <PagePreviews :pages="pages"></PagePreviews>
</template>

<script>

  import Tags from '~/components/Tags';
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
          pages: require('~/static/api/blog-latest.json')
      }
    },
  };

</script>
