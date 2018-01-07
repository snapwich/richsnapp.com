<template>
  <div>
    <section v-for="page in pages" class="page-preview">
      <header>
        <h2><nuxt-link :to="page.path">{{ page.meta.title || page.displayName }}</nuxt-link></h2>
        <p class="date">{{ niceDate(page.date) }}</p>
      </header>
      <div v-html="page.blurb"></div>
      <footer v-if="page.more">
        <p><nuxt-link :to="page.path">Read more →</nuxt-link></p>
      </footer>
    </section>
  </div>
</template>

<script>

  let moment = require('moment');

  export default {
    fetch({ store }) {
      store.commit('meta', {
        title: 'Home'
      });
    },
    data() {
      return {
        pages: require('~/assets/preval/getBlog.js')
      }
    },
    methods: {
      niceDate(date) {
        return moment(date).format('MMMM Do YYYY');
      }
    }
  }

</script>

<style lang="less" scoped>
  @import "../assets/variables";

  a {
    border-bottom: 0;
  }

  .page-preview {
    &:first-child {
      margin-top: 1em;
    }
    margin-bottom: 3em;

    header {
      h2 {
        margin-bottom: 10px;
      }
    }

    footer {
      p {
        text-align: right;
      }
    }
  }



</style>
