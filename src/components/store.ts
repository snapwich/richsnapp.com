import { reactive } from "vue";

export function createStore<T extends object>(initialState: T) {
  return reactive(initialState);
}
