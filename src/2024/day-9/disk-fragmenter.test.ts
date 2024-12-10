import { describe, it, expect } from "vitest";

import { fragmenter } from "./disk-fragmenter";
import { v1Fixtures } from "./fixtures";

describe("hitmands/day-9/disk-fragmenter", () => {
  const v1 = it.each(v1Fixtures);

  v1("%#", (_, given, expected) => {
    expect(fragmenter(given)).toBe(expected);
  });
});
