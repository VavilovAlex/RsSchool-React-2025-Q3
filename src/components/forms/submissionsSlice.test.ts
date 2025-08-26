import reducer, {
  addSubmission,
  type SubmissionItem,
} from "./submissionsSlice";
import { describe, it, expect } from "vitest";
import { setupStore } from "@/store";

describe("submissionsSlice", () => {
  it("addSubmission action populates id and createdAt and reducer appends item", () => {
    const initial = { items: [] as SubmissionItem[], lastAddedId: undefined };
    const action = addSubmission({
      name: "John",
      age: 30,
      email: "john@example.com",
      password: "Aa1!",
      repeatPassword: "Aa1!",
      gender: "male",
      attachment: "data:image/png;base64,x",
      country: "Australia",
      terms: true,
    });
    const newState = reducer(initial, action);
    expect(newState.items).toHaveLength(1);
    const item = newState.items[0];
    expect(item.id).toBeTruthy();
    expect(item.createdAt).toBeTypeOf("number");
    expect(newState.lastAddedId).toBe(item.id);
  });

  it("store updates state after dispatching addSubmission", () => {
    const store = setupStore();
    store.dispatch(
      addSubmission({
        name: "Jane",
        age: 28,
        email: "jane@example.com",
        password: "Aa1!",
        repeatPassword: "Aa1!",
        gender: "female",
        attachment: "data:image/png;base64,x",
        country: "Canada",
        terms: true,
      }),
    );
    const s = store.getState().submissions;
    expect(s.items).toHaveLength(1);
    expect(s.lastAddedId).toBe(s.items[0].id);
  });
});
