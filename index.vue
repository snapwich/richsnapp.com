<template>
  <div>
    <article v-for="page in pages" class="page-preview">
      <header>
        <div class="header-info">
          <div class="date">{{ formatDate(page.date) }}</div>
          <!--<div class="tags" v-if="page.tags">-->
            <!--<i class="fa fa-tags"></i>-->
            <!--{{ displayArr(page.tags) }}-->
          <!--</div>-->
        </div>
        <h2><nuxt-link :to="page.path">{{ page.title || page.displayName }}</nuxt-link></h2>
      </header>
      <p v-html="page.blurb"></p>
      <footer v-if="page.more">
        <p><nuxt-link :to="page.path">Read more →</nuxt-link></p>
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
    margin-bottom: 3em;

    header {
      h2 {
        font-size: 30px;
        /*margin-top: 0;*/
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
      justify-content: space-evenly;
      /*margin: -8px 10px 5px;*/
      & > div {
        flex: 0 1 auto;
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
