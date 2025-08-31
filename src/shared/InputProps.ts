import type { InputHTMLAttributes } from "react";

interface BaseProps<T> extends InputHTMLAttributes<T> {
  label?: string;
  errorText?: string;
  hideErrorMessage?: boolean;
}

export type InputProps<T> = BaseProps<T>;
