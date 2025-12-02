import { describe, expect, it } from "vitest";
import { solver, star1, star2 } from "./secret-entrance";
import fixtures from "./secret-entrance.fixtures.json";

describe("hitmands/day-1/secret-entrance", () => {
  it("should return 3 given the example fixture", () => {
    const solve = solver(star1);

    expect(solve(fixtures.example)).toBe(3);
  });

  it("should return 1064 given star-1 fixture", () => {
    const solve = solver(star1);

    expect(solve(fixtures.first)).toBe(1064);
  });

  it("should return 6 given the example fixture (star 2)", () => {
    const solve = solver(star2);

    expect(solve(fixtures.example)).toBe(6);
  });

  it("should return 10 given R1000", () => {
    const solve = solver(star2);

    expect(solve("R1000")).toBe(10);
  });

  it("should return 6122 given star-2 fixture", () => {
    const solve = solver(star2);

    expect(solve(fixtures.first)).toBe(6122);
  });
});
