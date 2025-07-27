import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should return initial value when localStorage is empty", () => {
    const key = "test-key";
    const initialValue = "initial";

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    const [value] = result.current;

    expect(value).toBe(initialValue);
  });

  it("should return value from localStorage", () => {
    const key = "test-key";
    const initialValue = "initial";
    const localStorageValue = "localStorage value";

    localStorage.setItem(key, localStorageValue);

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    const [value] = result.current;

    expect(value).toBe(localStorageValue);
  });

  it("should store value on set", () => {
    const key = "test-key";
    const newValue = "new value";

    const { result } = renderHook(() => useLocalStorage(key, ""));

    const setValue = result.current[1];

    act(() => {
      setValue(newValue);
    });

    const value = result.current[0];

    expect(value).toBe(newValue);
    expect(localStorage.getItem(key)).toBe(newValue);
  });

  it("should log error when fails to read from localStorage", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const key = "test-key";
    const initialValue = { a: "B" };

    localStorage.setItem(key, "``,.\\``");

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    const [value] = result.current;

    expect(value).toBe(initialValue);
    expect(errorSpy).toHaveBeenCalled();
  });

  it("should log error when fails to store in localStorage", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const key = "test-key";

    const { result } = renderHook(() =>
      useLocalStorage<{ self: object } | null>(key, null),
    );

    const setValue = result.current[1];

    const circular = { self: {} };
    circular.self = circular;

    act(() => {
      setValue(circular);
    });

    expect(errorSpy).toHaveBeenCalled();
  });
});
