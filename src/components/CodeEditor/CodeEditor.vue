<template>
  <codemirror
    v-bind="$attrs"
    class="code-editor"
    :extensions="extensions"
    :style="{ height: '100%', flex: 1 }"
    v-model="myCode"
  ></codemirror>
</template>

<style lang="less">
.code-editor {
  font-size: 16px;
  line-height: normal;
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
  emits: ["input"],
  setup(props, { emit }) {
    const extensions = [javascript()];
    let myCode = ref(props.code);
    watch(
      () => props.code as any,
      (newVal) => {
        myCode.value = newVal;
      },
    );

    watch(
      () => myCode.value,
      (newVal) => {
        emit("input", newVal);
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
