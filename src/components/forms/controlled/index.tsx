import Input from "@components/input";
import Select from "@components/select";
import Checkbox from "@components/checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import Button from "@components/button";
import {
  type FormData,
  type FormDataIn,
  type FormDataOut,
  formDataSchema,
} from "@components/forms/formData.ts";
import PasswordStrength from "@components/passwordStrength";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import fileToBase64 from "@/utils/fileToBase64.ts";
import { addSubmission } from "@components/forms/submissionsSlice.ts";
import { useEffect } from "react";

export default function ControlledForm({ onCancel }: { onCancel: () => void }) {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormDataIn, unknown, FormDataOut>({
    resolver: zodResolver(formDataSchema),
    mode: "onChange",
  });

  const countries = useAppSelector((state) => state.countries);
  const dispatch = useAppDispatch();
  const password = watch("password", "");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const base64 = await fileToBase64(data.attachment);
    dispatch(
      addSubmission({
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        repeatPassword: data.repeatPassword,
        gender: data.gender,
        attachment: base64,
        country: data.country,
        terms: true,
      }),
    );
    onCancel();
  };

  useEffect(() => {
    if (password.length === 0) return;
    void trigger("repeatPassword");
  }, [password, trigger]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Input
          label="Name"
          name="name"
          type="text"
          autoComplete="name"
          autoFocus
          register={register}
          errorText={errors.name?.message}
        />

        <Input
          label="Age"
          name="age"
          type="number"
          register={register}
          errorText={errors.age?.message}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          register={register}
          errorText={errors.email?.message}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          register={register}
          errorText={errors.password?.message}
          hideErrorMessage={true}
        >
          <PasswordStrength password={password} />
        </Input>

        <Input
          label="Repeat Password"
          name="repeatPassword"
          type="password"
          autoComplete="new-password"
          register={register}
          errorText={errors.repeatPassword?.message}
        />

        <Select
          label="Gender"
          name="gender"
          register={register}
          errorText={errors.gender?.message}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </Select>

        <Input
          label="Attachment"
          name="attachment"
          type="file"
          accept="image/png,image/jpeg"
          register={register}
          errorText={errors.attachment?.message}
        />

        <Input
          label="Country"
          name="country"
          autoComplete="country"
          list="countries"
          register={register}
          errorText={errors.country?.message}
        />

        <datalist id="countries">
          <option value="">Select country</option>
          {countries.map((country) => (
            <option key={country.label} value={country.label}>
              {country.value}
            </option>
          ))}
        </datalist>

        <div>
          <Checkbox
            label="I agree to the terms and conditions"
            name={"terms"}
            register={register}
            errorText={errors.terms?.message}
          />
        </div>

        <div className={"flex justify-between"}>
          <Button type="submit" disabled={!isValid}>
            Submit
          </Button>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
