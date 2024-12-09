import { describe, it, expect } from "vitest";
import {
  collect,
  compass,
  count,
  protractor,
  toMatrix,
  toVisitor,
} from "./ceres-search";
import { v1Fixtures, v2Fixtures } from "./fixtures";

describe("hitmands/day-4/ceres-search", () => {
  const v1 = it.each(v1Fixtures);

  v1("expect V1.%s toHaveLength %d", (_, expected, given) => {
    const matrix = toMatrix(given);
    const spec = ["n", "ne", "e", "se", "s", "sw", "w", "nw"].map((dir) => [
      dir,
      compass(dir),
    ]);
    const visitors = spec.map(toVisitor);
    const hits = collect(matrix, visitors);

    expect(count(hits)).toEqual(expected);
  });

  const v2 = it.each(v2Fixtures);

  v2("expect V1.%s toHaveLength %d", (_, expected, given) => {
    const matrix = toMatrix(given);
    const spec = [0, 90, 180, 270].map((angle) => [
      `${angle}d`,
      protractor(angle),
    ]);
    const visitors = spec.map(toVisitor);
    const hits = collect(matrix, visitors);

    expect(count(hits)).toEqual(expected);
  });
});
