import { z, type ZodSafeParseResult } from "zod";
import getPasswordStrength from "@/utils/getPasswordStrength.ts";

export const formDataSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .regex(/^[A-Z].*/, "Name must start with a capital letter"),
    age: z.coerce.number().positive("Age must be a positive number"),
    email: z.email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .refine((p) => {
        const { score, maxScore } = getPasswordStrength(p);
        return score >= maxScore;
      }, "Password is not strong enough"),
    repeatPassword: z.string().min(1, "Repeat Password is required"),
    gender: z.string().min(1, "Gender is required"),
    attachment: z.preprocess(
      (v) => {
        if (v instanceof FileList) {
          return v.item(0) ?? new File([""], "", { type: "" });
        }
        return v;
      },
      z
        .instanceof(File)
        .refine((f) => f.size > 0, "Attachment is required")
        .refine(
          (f) => ["image/png", "image/jpeg"].includes(f.type),
          "Attachment must be PNG or JPEG",
        )
        .refine(
          (f) => f.size < 10 * 1024 * 1024,
          "Attachment must be below 10MB",
        ),
    ),
    country: z.string().min(1, "Country is required"),
    terms: z.preprocess(
      (v) => v === "on" || v === "true" || v === "1" || v === true || v === 1,
      z.literal(true, { message: "You must accept the terms" }),
    ),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
  });

export type FormData = z.infer<typeof formDataSchema>;
export type FormDataIn = z.input<typeof formDataSchema>;
export type FormDataOut = z.output<typeof formDataSchema>;

export const readFormData = (
  form: HTMLFormElement,
): ZodSafeParseResult<FormData> => {
  return formDataSchema.safeParse(getFormValues(form));
};

function getFormValues(form: HTMLFormElement) {
  const fd = new FormData(form);
  const input = form.querySelector(
    'input[name="attachment"]',
  ) as HTMLInputElement | null;
  const file = input?.files?.item(0) ?? new File([""], "", { type: "" });
  return {
    name: String(fd.get("name") ?? ""),
    age: fd.get("age") as unknown as string,
    email: String(fd.get("email") ?? ""),
    password: String(fd.get("password") ?? ""),
    repeatPassword: String(fd.get("repeatPassword") ?? ""),
    gender: String(fd.get("gender") ?? ""),
    attachment: file,
    country: String(fd.get("country") ?? ""),
    terms: fd.get("terms"),
  };
}
