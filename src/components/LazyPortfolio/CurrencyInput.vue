<template>
  <input ref="inputRef" type="text" />
</template>

<script setup>
import { useCurrencyInput } from "vue-currency-input";
import { watch } from "vue";

const props = defineProps({
  modelValue: String,
  options: Object,
});

const model = defineModel();

const emit = defineEmits(["update:modelValue", "change"]);

const { inputRef, setValue, setOptions } = useCurrencyInput(
  props.options,
  true,
);

watch(
  () => props.modelValue,
  (value) => {
    setValue(value);
  },
);
watch(
  () => props.options,
  (newOptions) => {
    setOptions(newOptions);
  },
);
</script>
