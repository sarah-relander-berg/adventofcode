import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const sumMulRegEx = (input: string) => {
  const mulRegex = /mul\((\d+),(\d+)\)/g;
  let matches;
  let sum = 0;

  while ((matches = mulRegex.exec(input)) !== null) {
    const num1 = parseInt(matches[1]);
    const num2 = parseInt(matches[2]);
    sum += num1 * num2;
  }

  return sum;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return sumMulRegEx(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const minimizeInput = input.replace(/\n/g, "");
  const cleanedInput = minimizeInput.replace(/don't\(\).*?(?=do\(\)|$)/g, "");
  return sumMulRegEx(cleanedInput);
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
