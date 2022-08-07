import { useCallback, useRef } from "react";

import { LocalStorageHook } from "./local-storage.model";

export default function useLocalStorage(): LocalStorageHook {
  const get = useCallback(<T = unknown>(key: string): T | null => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }, []);

  const set = useCallback((key: string, value: unknown = ""): void => {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }, []);

  const remove = useCallback((key: string): void => {
    localStorage.removeItem(key);
  }, []);

  const reset = useCallback((): void => {
    localStorage.clear();
  }, []);

  const isExist = useCallback((key: string): boolean => {
    return !!localStorage.getItem(key);
  }, []);

  const { current: ls } = useRef({
    get,
    set,
    remove,
    reset,
    isExist,
  });

  return ls;
}
