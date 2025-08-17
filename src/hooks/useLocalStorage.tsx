"use client";

import { useState, useEffect, useCallback } from "react";

type SetValue<T> = (value: T) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);

      if (typeof initialValue === "string") {
        return (item as T) ?? initialValue;
      } else if (item != null) {
        return JSON.parse(item) as T;
      }

      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  const setValue: SetValue<T> = useCallback(
    (value) => {
      try {
        const stringValue =
          typeof value === "string" ? value : JSON.stringify(value);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, stringValue);
        }

        setStoredValue(value);
      } catch (error) {
        console.error(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key],
  );

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const item = window.localStorage.getItem(key);

      if (typeof initialValue === "string") {
        setStoredValue((item as T) ?? initialValue);
      } else if (item != null) {
        setStoredValue(JSON.parse(item) as T);
      } else {
        setStoredValue(initialValue);
      }
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue];
}
