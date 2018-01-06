<template>
  <div>
  {{ pages }}
  </div>
</template>

<script>

  export default {
    data() {
      return {
        pages: require('./getPages.js')
      }
    }
  }

</script>
