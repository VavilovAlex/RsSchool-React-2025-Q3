import type { Path, UseFormRegister } from "react-hook-form";
import type { InputHTMLAttributes } from "react";
import { type FormDataIn } from "@components/forms/formData.ts";

interface BaseProps<T> extends InputHTMLAttributes<T> {
  label?: string;
  errorText?: string;
}

interface WithRegister<T> extends BaseProps<T> {
  register: UseFormRegister<FormDataIn>;
  name: Path<FormDataIn>;
}

interface WithoutRegister<T> extends BaseProps<T> {
  register?: undefined;
  name?: string;
}

export type InputProps<T> = WithRegister<T> | WithoutRegister<T>;
