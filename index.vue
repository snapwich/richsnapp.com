<template>
  <div>
    <section v-for="page in pages" class="page-preview">
      <header>
        <h2><nuxt-link :to="page.path">{{ page.title || page.displayName }}</nuxt-link></h2>
        <div class="header-info">
          <p class="date">{{ niceDate(page.date) }}</p>
          <p class="tags" v-if="page.tags">
            <i class="fa fa-tags"></i>
            {{ displayArr(page.tags) }}
          </p>
        </div>
      </header>
      <p v-html="page.blurb"></p>
      <footer v-if="page.more">
        <p><nuxt-link :to="page.path">Read more →</nuxt-link></p>
      </footer>
    </section>
  </div>
</template>

<script>

  let moment = require('moment');

  module.exports = {
    title: 'Home',
    description: 'The latest news out of Rich Snapp\'s blog.',
    data() {
      return {
          pages: require('~/static/api/blog-latest.json')
      }
    },
    methods: {
      niceDate(date) {
        return moment(date).format('MMMM Do YYYY');
      },
      displayArr(arr) {
        return arr.join(', ');
      }
    }
  };

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
        font-size: 30px;
      }
    }

    footer {
      p {
        text-align: right;
        text-indent: 0;
      }
    }

    .header-info {
      display: flex;
      justify-content: space-around;
      margin: 0 10px;
      p.date {
        white-space: nowrap;
        padding-left: 30px;
      }
      p.tags {
        padding-left: 20px;
        justify-self: right;
      }
    }
  }

</style>
