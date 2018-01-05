<template>
  <div>
  {{ pages }}
  </div>
</template>

<script>

  export default {
    data() {
      return {
        pages: this.$store.state.blogs
      }
    }
  }

</script>
