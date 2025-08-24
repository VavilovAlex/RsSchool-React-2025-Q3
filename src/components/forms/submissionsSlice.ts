import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export interface SubmissionItem {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  attachment: string;
  country: string;
  terms: true;
  createdAt: number;
}

interface SubmissionsState {
  items: SubmissionItem[];
  lastAddedId?: string;
}

const initialState: SubmissionsState = {
  items: [],
};

const submissionsSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    addSubmission: {
      reducer(state, action: PayloadAction<SubmissionItem>) {
        state.items.push(action.payload);
        state.lastAddedId = action.payload.id;
      },
      prepare(item: Omit<SubmissionItem, "id" | "createdAt">) {
        return {
          payload: {
            ...item,
            id: nanoid(),
            createdAt: Date.now(),
          },
        };
      },
    },
  },
});

export const { addSubmission } = submissionsSlice.actions;
export default submissionsSlice.reducer;
