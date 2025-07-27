import { useState, useEffect, useCallback } from "react";

type SetValue<T> = (value: T) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      let parsedValue: T | null = null;

      if (typeof initialValue === "string") parsedValue = item as T;
      else if (item != null) parsedValue = JSON.parse(item) as T;

      return parsedValue ?? initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  const setValue: SetValue<T> = useCallback(
    (value) => {
      try {
        let stringValue: string;

        if (typeof value === "string") {
          stringValue = value;
        } else {
          stringValue = JSON.stringify(value);
        }

        window.localStorage.setItem(key, stringValue);
        setStoredValue(value);
      } catch (error) {
        console.error(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key],
  );

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);

      let parsedValue: T | null = null;

      if (typeof initialValue === "string") parsedValue = item as T;
      else if (item != null) parsedValue = JSON.parse(item) as T;

      setStoredValue(parsedValue ?? initialValue);
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue];
}
