import { describe, expect, it } from "vitest";
import { solver, star1, star2 } from "./invalid-ids";
import fixtures from "./invalid-ids.fixtures.json";

describe("hitmands/day-2/invalid-ids", () => {
  it("should return 1227775554 given the example fixture", () => {
    const solve = solver(star1);

    expect(solve(fixtures.example)).toBe(1227775554);
  });

  it("should return 17077011375 given the first fixture", () => {
    const solve = solver(star1);

    expect(solve(fixtures.first)).toBe(17077011375);
  });

  it("should return 4174379265 given the example fixture (star 2)", () => {
    const solve = solver(star2);

    expect(solve(fixtures.example)).toBe(4174379265);
  });

  it("should return 36037497037 given the first fixture (star 2)", () => {
    const solve = solver(star2);

    expect(solve(fixtures.first)).toBe(36037497037);
  });
});
