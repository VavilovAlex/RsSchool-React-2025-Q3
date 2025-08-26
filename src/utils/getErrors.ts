import type { ZodSafeParseResult } from "zod";

export type Errors = Record<string, string | undefined>;

export default function getErrors(result: ZodSafeParseResult<unknown>): Errors {
  const errors: Errors = {};

  if (result.success) return errors;

  for (const issue of result.error.issues) {
    const key = issue.path[0] as string;
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
