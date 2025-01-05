import { watch } from "vue";
import { createStore } from "../store";
import { useStorage } from "utils/storage.ts";

let storage = useStorage("lazy-portfolio");

export const store = createStore({
  urlEncodedValue: storage.get<string>("encodedStr") || null,
});

watch(
  () => store.urlEncodedValue,
  (value) => {
    storage.set("encodedStr", value);
  },
);
