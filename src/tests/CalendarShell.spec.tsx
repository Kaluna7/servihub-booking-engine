import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CalendarShell } from "../components/CalenderShell";

describe("CalendarShell", () => {
  it("renders calendar container", () => {
    render(<CalendarShell />);
    expect(screen.getByRole("grid")).toBeDefined();
  });
});
