import type { FieldValues, UseFormRegister } from "react-hook-form";
import type { InputHTMLAttributes } from "react";

interface BaseProps<T> extends InputHTMLAttributes<T> {
  label?: string;
  errorText?: string;
}

interface WithRegister<T> extends BaseProps<T> {
  register: UseFormRegister<FieldValues>;
  name: string;
}

interface WithoutRegister<T> extends BaseProps<T> {
  register?: undefined;
  name?: string;
}

export type InputProps<T> = WithRegister<T> | WithoutRegister<T>;
