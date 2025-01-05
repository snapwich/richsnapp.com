import { isPlainObject } from "lodash-es";

export function useStorage(prefix: string) {
  const storagePrefix = prefix + ":";

  // Check if the code is running in the browser environment
  const isBrowser = typeof window !== "undefined";

  // localStorage and sessionStorage can be disabled by certain privacy restrictions, etc.
  function canUseStorage(storage: Storage | undefined) {
    if (!isBrowser || !storage) {
      return false;
    }
    const item = "storageTest";
    try {
      storage.setItem(item, item);
      const getItem = storage.getItem(item);
      storage.removeItem(item);
      return item === getItem;
    } catch (e) {
      console.warn("access to local/session storage denied", e);
      return false;
    }
  }

  function setItem(storage: Storage | undefined, key: string, item: unknown) {
    if (!isBrowser || !storage) {
      return;
    }
    storage.setItem(storagePrefix + key, JSON.stringify(item));
  }

  function set(key: string, item: unknown, temp: boolean = false) {
    const storage = isBrowser
      ? temp
        ? window.sessionStorage
        : window.localStorage
      : undefined;
    if (canUseStorage(storage)) {
      if (
        ["number", "string", "boolean"].includes(typeof item) ||
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
    if (canUseStorage(isBrowser ? window.sessionStorage : undefined)) {
      item = isBrowser
        ? window.sessionStorage.getItem(storagePrefix + key)
        : null;
    }
    if (!item && canUseStorage(isBrowser ? window.localStorage : undefined)) {
      item = isBrowser
        ? window.localStorage.getItem(storagePrefix + key)
        : null;
    }
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch (error) {
        console.error(`Error parsing JSON for key ${key}`, error);
        return null;
      }
    }
    return null;
  }

  return {
    get,
    set,
  };
}
