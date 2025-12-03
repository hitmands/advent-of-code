import * as R from "ramda";

type Solver = (fn: (input: number[]) => number) => (input: string) => number;

const largestWith =
  (length: number) =>
  (digits: number[]): number => {
    if (length === 0 || R.isEmpty(digits)) {
      return 0;
    }

    const max = (window: number, cursor: number, prev = -1, prevIndex = -1) => {
      if (cursor >= window) {
        return [prev, prevIndex];
      }

      const digit = R.nth(cursor, digits)!;
      const nextCursor = R.inc(cursor);

      if (digit > prev) {
        return max(window, nextCursor, digit, cursor);
      }

      return max(window, nextCursor, prev, prevIndex);
    };

    const selector = (digits: number[], needed: number, index: number = 0) => {
      if (needed === 0) {
        return [];
      }

      const remaining = R.dec(needed);

      const [digit, nextIndex] = max(R.length(digits) - remaining, index);

      return `${digit}`.concat(selector(digits, remaining, R.inc(nextIndex)));
    };

    return +selector(digits, length);
  };

export const star1 = largestWith(2);
export const star2 = largestWith(12);

export const solver: Solver = (fn) => (input) =>
  R.flow(input, [
    R.split("\n"),
    R.map(R.split("")),
    R.map(R.map(Number)),
    R.map(fn),
    R.sum,
  ]);
