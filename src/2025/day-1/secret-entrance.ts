import * as R from "ramda";

type Solver = (
  fn: (dial: number, a: number) => number,
) => (input: string) => number;

const direction = (rotation: string) => (R.head(rotation) === "L" ? -1 : 1);
const steps = (rotation: string) => parseInt(rotation.slice(1), 10);

export const star1 = (dial: number): number => Number(dial === 0);

export const star2 = (dial: number, a: number): number =>
  R.flow(a, [
    Math.abs,
    R.inc,
    R.range(1),
    R.map((i) => (a > 0 ? /* clockwise */ i : /* counterclockwise */ -i)),
    R.map((i) => dial + Number(i)),
    R.filter((i) => Number(i) % 100 === 0),
    R.length,
  ]);

export const solver: Solver = (fn) => (input) =>
  R.flow(input, [
    R.split("\n"),
    R.map<string, number>((token) => direction(token) * steps(token)),
    R.reduce(
      (res, a) => {
        const password = fn(res.dial, a) + res.password;

        const dial = (((res.dial + a) % 100) + 100) % 100;

        return { dial, password };
      },
      { dial: 50, password: 0 },
    ),
    R.prop("password"),
  ]);
