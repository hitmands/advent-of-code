import * as R from "ramda";

type Solver = (fn: (input: number) => boolean) => (input: string) => number;

export const star1 = (number: number) => R.test(/^(\d+)\1$/, `${number}`);

export const star2 = (number: number) => R.test(/^(\d+)\1+$/, `${number}`);

export const solver: Solver = (fn) => (input) =>
  R.flow(input, [
    R.split(","),
    R.map(R.split("-")),
    R.map<string[], number[]>(([start, end]) => R.range(+start, R.inc(+end))),
    R.map(R.filter(fn)),
    R.flatten,
    R.sum,
  ]);
