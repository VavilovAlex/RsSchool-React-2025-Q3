import Input from "@components/input";
import Select from "@components/select";
import Checkbox from "@components/checkbox";
import { useAppSelector } from "@/hooks/redux.ts";

export default function UncontrolledForm() {
  const countries = useAppSelector((state) => state.countries);

  return (
    <div className={"flex flex-col gap-2"}>
      <Input label="Name" name="name" type="text" />
      <Input label="Age" name="age" type="number" />
      <Input label="Email" name="email" type="email" />
      <Input label="Password" name="password" type="password" />
      <Input label="Repeat Password" name="repeatPassword" type="password" />
      <Select label="Gender" name="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="prefer-not-to-say">Prefer not to say</option>
      </Select>
      <Input label="Attachment" name="attachment" type="file" />
      <Select label="Country" name="country" autoComplete="country">
        {countries.map((country) => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </Select>
      <Checkbox label="I agree to the terms and conditions" name="terms" />
    </div>
  );
}
