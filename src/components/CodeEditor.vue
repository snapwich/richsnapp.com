<template>
  <codemirror
    v-bind="$attrs"
    class="code-editor"
    :extensions="extensions"
    v-model="myCode"
  ></codemirror>
</template>

<style lang="less">
.code-editor {
  font-size: 16px;
  line-height: normal;
  .cm-content,
  .cm-gutters {
    min-height: 400px !important;
  }
}
</style>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export default defineComponent({
  components: {
    Codemirror,
  },
  setup(props) {
    const extensions = [javascript()];
    let myCode = ref(props.code);
    watch(
      () => props.code as any,
      (newVal) => {
        myCode.value = newVal;
      },
    );
    return {
      myCode,
      extensions,
    };
  },
  props: ["code"],
});
</script>
