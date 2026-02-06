import { useEffect } from "react";

const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const readPersistedProps = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    return safeParse<T>(window.localStorage.getItem(key), fallback);
  } catch {
    return fallback;
  }
};

export const usePersistedProps = <T>(key: string, props: T) => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(props));
    } catch {
      // Ignore storage failures (private mode, quota, etc.)
    }
  }, [key, props]);
};
