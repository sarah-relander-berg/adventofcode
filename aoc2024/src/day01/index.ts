import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  const array1: number[] = [];
  const array2: number[] = [];

  lines.forEach((line, index) => {
    const values = line.split("   ");
    array1[index] = parseInt(values[0]);
    array2[index] = parseInt(values[1]);
  });

  array1.sort((a, b) => a - b);
  array2.sort((a, b) => a - b);

  let sum = 0;
  for (let i = 0; i < array1.length; i++) {
    sum += Math.abs(array1[i] - array2[i]);
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  const array1: number[] = [];
  const array2: number[] = [];

  lines.forEach((line, index) => {
    const values = line.split("   ");
    array1[index] = parseInt(values[0]);
    array2[index] = parseInt(values[1]);
  });

  let similarityScore = 0;

  array1.forEach((num) => {
    const occurrences = array2.filter((x) => x === num).length;
    similarityScore += num * occurrences;
  });

  return similarityScore;
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
