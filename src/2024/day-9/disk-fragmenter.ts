import * as R from "ramda";

/**
 * @link https://adventofcode.com/2024/day/9
 */

const isEmpty = (token: string): token is "." => token === ".";
const quantify = (token: string): number => Number(token);

const toToken = (char: string, index: number) => {
  // Odd numbers represent empty slots
  const empty = index % 2 === 1;

  const length = quantify(char);

  // Adjust `id` to not-account for empty slots
  const id = `${empty ? "." : index / 2}`;

  return Array.from({ length }, () => id);
};

const sort = (tokens: string[], buffer: "."[] = []) => {
  if (!tokens.length) {
    return buffer;
  }

  const [head, ...tail] = tokens;

  if (!isEmpty(head)) {
    return [head, ...sort(tail, buffer)];
  }

  const last = R.last(tail);
  const init = R.init(tail);

  if (isEmpty(last)) {
    // if the last token is also an empty slot,
    // just buffer it and continue
    return sort([head, ...init], [...buffer, last]);
  }

  // if the last slot is taken,
  // then just swap it with the first empty slot
  return [last, ...sort(init, buffer), head];
};

const uglySort = (tokens: string[]) => {
  const buffer: "."[] = [];
  const res: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const head = tokens[i];

    if (!isEmpty(head)) {
      res.push(head);

      continue;
    }

    while (true) {
      const last = tokens.pop();

      if (isEmpty(last)) {
        buffer.push(last);

        continue;
      }

      res.push(last);
      buffer.push(head);
      break;
    }
  }

  return res.concat(buffer);
};

const checksum = (tokens: string[]) =>
  tokens.reduce(
    (res, token, index) => res + (isEmpty(token) ? 0 : index * quantify(token)),
    0,
  );

export const fragmenter = R.pipe(
  R.split(""),
  R.addIndex(R.chain)(toToken),
  uglySort,
  checksum,
);
