/**
 * @link https://adventofcode.com/2024/day/4
 */

type Dir = string;
type Coords = [number, number];
type Token = { char: string; x: number; y: number };
type Matrix<Cell = string> = Cell[][];
type Rotation = [Dir, number, number];
type Visitor = (coords: Coords, matrix: Matrix) => [Dir, Token[] | null];
type VisitorFactory = (pair: [Dir, Rotation[]]) => Visitor;

export const compass = (dir: string): Rotation[] => {
  const direction = ([x, y]: Coords) =>
    Array.from("XMAS", (char, i) => [char, i * x, i * y] satisfies Rotation);

  switch (dir) {
    case "e":
      return direction([0, 1]);
    case "se":
      return direction([1, 1]);
    case "s":
      return direction([1, 0]);
    case "sw":
      return direction([1, -1]);
    case "w":
      return direction([0, -1]);
    case "nw":
      return direction([-1, -1]);
    case "n":
      return direction([-1, 0]);
    case "ne":
      return direction([-1, 1]);
  }
};

export const protractor = (angle: number) => {
  const rotations: Rotation[] = [
    ["M", -1, -1],
    ["M", 1, -1],
    ["A", 0, 0],
    ["S", 1, 1],
    ["S", -1, 1],
  ];

  switch (angle) {
    case 0:
      return rotations;
    case 90:
      return rotations.map(([char, x, y]) => [char, -y, x]);
    case 180:
      return rotations.map(([char, x, y]) => [char, -x, -y]);
    case 270:
      return rotations.map(([char, x, y]) => [char, y, -x]);
  }
};

export const toMatrix = (data: string): Matrix =>
  data.split(/\n/).map((row) => row.split(""));

export const map = <CB extends (coords: Coords) => unknown>(
  cb: CB,
  matrix: Matrix<unknown>,
) => matrix.map((row, x) => row.map((_, y) => cb([x, y])));

export const flatMap = <CB extends (coords: Coords) => unknown>(
  cb: CB,
  matrix: Matrix<unknown>,
) => matrix.flatMap((row, x) => row.flatMap((_, y) => cb([x, y])));

export const count = (matrix: Matrix<unknown>) =>
  flatMap(([x, y]) => matrix?.[x]?.[y], matrix).length;

export const toVisitor: VisitorFactory = (spec) => {
  const visitor = (rotations: Rotation[], tokens: Token[], matrix: Matrix) => {
    if (!rotations.length) {
      return tokens;
    }

    const [[needle, x, y], ...tail] = rotations;

    const char = matrix?.[x]?.[y];

    if (char !== needle) {
      return null;
    }

    const $tokens: Token[] = [...tokens, { char, x, y }];

    return visitor(tail, $tokens, matrix);
  };

  return ([x, y], matrix) => {
    const [dir, rotations] = spec;

    const $rotations = rotations.map(
      ([char, vx, vy]) => [char, x + vx, y + vy] satisfies Rotation,
    );

    return [dir, visitor($rotations, [], matrix)];
  };
};

export const collect = (matrix: Matrix, visitors: Visitor[]) =>
  map(
    (coords) =>
      visitors.flatMap((visitor) => {
        const hits = visitor(coords, matrix);
        const [, tokens] = hits;

        return tokens?.length ? [tokens] : [];
      }),
    matrix,
  );
