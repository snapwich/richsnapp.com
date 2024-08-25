import { isPlainObject } from "lodash";

export function useStorage(prefix: string) {
  let storagePrefix = prefix + ":";

  // localStorage and sessionStorage can be disabled by certain privacy restrictions, etc.
  function canUseStorage(storage: Storage) {
    let item = "storageTest";
    try {
      storage.setItem(item, item);
      let getItem = storage.getItem(item);
      storage.removeItem(item);
      return item === getItem;
    } catch (e) {
      console.warn("access to local/session storage denied");
      return false;
    }
  }

  function setItem(storage: Storage, key: string, item: unknown) {
    storage.setItem(storagePrefix + key, JSON.stringify(item));
  }

  function set(key: string, item: unknown, temp: boolean = false) {
    let storage = temp ? global.sessionStorage : global.localStorage;
    if (canUseStorage(storage)) {
      if (
        ["number", "string", "boolean", "null"].includes(typeof item) ||
        Array.isArray(item) ||
        isPlainObject(item) ||
        item === null
      ) {
        setItem(storage, key, item);
      }
    }
  }

  function get<T>(key: string): T | null {
    let item: string | null = null;
    if (canUseStorage(global.sessionStorage)) {
      item = global.sessionStorage.getItem(storagePrefix + key);
    }
    if (!item && canUseStorage(global.localStorage)) {
      item = global.localStorage.getItem(storagePrefix + key);
    }
    if (item) {
      return JSON.parse(item) as T;
    }
    return null;
  }

  return {
    get,
    set
  };
}
