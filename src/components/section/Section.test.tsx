import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Section from "./Section.tsx";

describe("Section component", () => {
  it("renders title", () => {
    render(
      <Section title="My Section">
        <div />
      </Section>,
    );

    expect(screen.getByText("My Section")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <Section title="_">
        <span>Child Content</span>
      </Section>,
    );

    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});
