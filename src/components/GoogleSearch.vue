
<template>
  <div class="google-search">
    <button @click="search(text)">
      <i class="fa fa-search"></i>
    </button>
    <input ref="input"
           title="Site Search"
           v-on:keyup.13="search(text)"
           v-model="text" />
  </div>
</template>

<script>
  export default {
    props: [
      'site'
    ],
    data() {
      return {
        text: ''
      }
    },
    methods: {
      search(str) {
        if (str) {
          window.open([
            'https://www.google.com/search?q=',
            this.site ? 'site:' + this.site + '+' : '',
            encodeURIComponent(str)
          ].join(''));
        } else {
          this.$refs.input.focus();
        }
      }
    }
  }
</script>
