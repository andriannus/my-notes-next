import Cookies from "js-cookie";
import { useCallback, useRef } from "react";

import { COOKIE_ATTRIBUTES } from "./cookie.constant";
import { CookieHook } from "./cookie.model";

export default function useCookie(): CookieHook {
  const get = useCallback(<T = unknown>(name: string): T | null => {
    const data = Cookies.get(name);
    return data ? JSON.parse(data) : null;
  }, []);

  const set = useCallback((name: string, value: unknown = ""): void => {
    const data = JSON.stringify(value);
    Cookies.set(name, data, COOKIE_ATTRIBUTES);
  }, []);

  const remove = useCallback((name: string): void => {
    Cookies.remove(name);
  }, []);

  const isExist = useCallback((name: string): boolean => {
    return !!Cookies.get(name);
  }, []);

  const { current: cookie } = useRef({
    get,
    set,
    remove,
    isExist,
  });

  return cookie;
}
