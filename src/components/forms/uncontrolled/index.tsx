import { type FormEvent, useRef, useState } from "react";
import Input from "@components/input";
import Select from "@components/select";
import Checkbox from "@components/checkbox";
import { useAppSelector } from "@/hooks/redux.ts";
import Button from "@components/button";
import { readFormData } from "@components/forms/formData.ts";
import getErrors, { type Errors } from "@/utils/getErrors.ts";

export default function UncontrolledForm({
  onCancel,
}: {
  onCancel: () => void;
}) {
  const countries = useAppSelector((state) => state.countries);
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const parsed = readFormData(form);

    if (!parsed.success) {
      setErrors(getErrors(parsed));
      return;
    }
    setErrors({});
    form.reset();
  }

  function errorFor(name: string) {
    return errors[name];
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-3"
    >
      <div className="flex flex-col gap-2">
        <Input
          label="Name"
          name="name"
          type="text"
          errorText={errorFor("name")}
        />

        <Input
          label="Age"
          name="age"
          type="number"
          errorText={errorFor("age")}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          errorText={errorFor("email")}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          errorText={errorFor("password")}
        />

        <Input
          label="Repeat Password"
          name="repeatPassword"
          type="password"
          errorText={errorFor("repeatPassword")}
        />

        <Select label="Gender" name="gender" errorText={errorFor("gender")}>
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
          errorText={errorFor("attachment")}
        />

        <Select
          label="Country"
          name="country"
          autoComplete="country"
          errorText={errorFor("country")}
        >
          <option value="">Select country</option>
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </Select>

        <div>
          <Checkbox
            label="I agree to the terms and conditions"
            name="terms"
            errorText={errorFor("terms")}
          />
        </div>

        <div className={"flex justify-between"}>
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
