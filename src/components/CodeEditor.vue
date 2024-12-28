<template>
  <codemirror
    v-bind="$attrs"
    :extensions="extensions"
    v-model="code"
  ></codemirror>
</template>

<style lang="less">
.code-editor {
  font-size: 16px;
  line-height: normal;
  .CodeMirror {
    height: auto;
  }
  .CodeMirror-scroll {
    min-height: 400px;
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";

// import "codemirror/lib/codemirror.css";
// import "codemirror/mode/javascript/javascript.js";
// import "codemirror/addon/selection/active-line.js";

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const extensions = [javascript()];
    return {
      extensions,
    };
  },
  props: ["code"],
});
</script>
