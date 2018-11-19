<template>
  <div>
    <article v-for="page in pages" class="page-preview">
      <header>
        <div class="header-info">
          <div class="date">{{ formatDate(page.date) }}</div>
        </div>
        <h2><nuxt-link :to="page.path">{{ page.title || page.displayName }}</nuxt-link></h2>
      </header>
      <p v-html="page.blurb"></p>
      <footer v-if="page.more">
        <div class="tags" v-if="page.tags">
        <i class="fa fa-tags"></i>
        {{ displayArr(page.tags) }}
        </div>
        <p v-if="page.more"><nuxt-link :to="page.path">Read more →</nuxt-link></p>
      </footer>
    </article>
  </div>
</template>

<script>

  import { formatDate } from '~/assets/dateUtils.js'

  export default {
    title: 'Home',
    description: 'The latest news out of Rich Snapp\'s blog.',
    data() {
      return {
          pages: require('~/static/api/blog-latest.json')
      }
    },
    methods: {
      formatDate,
      displayArr(arr) {
        return arr.join(', ');
      }
    }
  };

</script>

<style lang="less" scoped>
  @import "../assets/variables.less";

  a {
    border-bottom: 0;
  }

  .page-preview {
    &:first-child {
      margin-top: 1em;
    }
    margin-bottom: 3.5em;

    header {
      h2 {
        font-size: 40px;
        /*margin-top: 0;*/
      }
    }

    footer {
      display: flex;
      color: @gray-light;
      font-size: .9em;
      font-family: @font-family-sans-serif2;
      font-weight: 300;
      margin-top: -5px;
      p {
        margin-left: auto;
        padding-left: 20px;
        text-align: right;
        text-indent: 0;
        white-space: nowrap;
      }
    }

    .header-info {
      display: flex;
      justify-content: space-evenly;
      font-size: 1.2em;
      & > div {
        flex: 1 1 auto;
      }
      .date {
        /*padding-left: 20px;*/
        white-space: nowrap;
      }
      .tags {
        padding-left: 20px;
        justify-self: right;
      }
    }
  }

</style>
