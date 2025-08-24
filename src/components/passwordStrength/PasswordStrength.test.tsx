import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PasswordStrength from ".";

describe("PasswordStrength", () => {
  it("shows reason text for weak password", () => {
    render(<PasswordStrength password="aaaa" />);
    expect(screen.getByText(/uppercase/i)).toBeInTheDocument();
  });
});
