import { describe, expect, it } from "vitest";
import { solver, star1, star2 } from "./joltage";
import fixtures from "./joltage.fixtures.json";

describe("hitmands/day-3/joltage", () => {
  it("should return 89 given a basic example", () => {
    const solve = solver(star1);

    expect(solve("811111111111119")).toBe(89);
  });

  it("should return 357 given the example fixture", () => {
    const solve = solver(star1);

    expect(solve(fixtures.example)).toBe(357);
  });

  it("should return ? given the first fixture", () => {
    const solve = solver(star1);

    expect(solve(fixtures.first)).toBe(17443);
  });

  it("should return 434234234278 given a basic example (star 2)", () => {
    const solve = solver(star2);

    expect(solve("234234234234278")).toBe(434234234278);
  });

  it("should return 3121910778619 given the example fixture", () => {
    const solve = solver(star2);

    expect(solve(fixtures.example)).toBe(3121910778619);
  });

  it("should return ? given the first fixture", () => {
    const solve = solver(star2);

    expect(solve(fixtures.first)).toBe(172167155440541);
  });
});
