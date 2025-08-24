import { createSlice } from "@reduxjs/toolkit";

interface Country {
  value: string;
  label: string;
}

const initialState: Country[] = [
  { value: "au", label: "Australia" },
  { value: "us", label: "United States" },
  { value: "cn", label: "China" },
  { value: "in", label: "India" },
  { value: "uk", label: "United Kingdom" },
  { value: "br", label: "Brazil" },
  { value: "ca", label: "Canada" },
  { value: "jp", label: "Japan" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

const countriesSlice = createSlice({
  name: "countries",
  initialState: initialState,
  reducers: {},
});

export default countriesSlice.reducer;
