import { describe, it, expect } from "vitest";
import { templates } from "../components/TemplateEngine";

describe("TemplateEngine", () => {
  it("has at least two templates", () => {
    expect(templates.length).toBeGreaterThanOrEqual(2);
  });
  it("tuition-class template has required fields", () => {
    const t = templates.find((x) => x.id === "tuition-class");
    expect(t).toBeTruthy();
    expect(t!.fields.length).toBeGreaterThan(0);
  });
});
