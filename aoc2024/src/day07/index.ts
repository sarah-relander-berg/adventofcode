import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const evaluate = (nums: number[], ops: string[]): number => {
  let result = nums[0];
  for (let i = 0; i < ops.length; i++) {
    const nextNum = nums[i + 1];
    switch (ops[i]) {
      case "+":
        result += nextNum;
        break;
      case "*":
        result *= nextNum;
        break;
      case "||":
        result = parseInt(`${result}${nextNum}`);
    }
  }
  return result;
};

const isValidEquation = (
  nums: number[],
  target: number,
  opsActive: string[] = ["+", "*"],
  ops: string[] = [],
): boolean => {
  if (ops.length === nums.length - 1) {
    return evaluate(nums, ops) === target;
  }
  for (const op of opsActive) {
    if (isValidEquation(nums, target, opsActive, [...ops, op])) {
      return true;
    }
  }
  return false;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const equations = input.split("\n").map((line) => {
    const [test, numbers] = line.split(": ");
    return {
      target: parseInt(test),
      nums: numbers.split(" ").map(Number),
    };
  });

  return equations
    .filter((eq) => isValidEquation(eq.nums, eq.target))
    .reduce((sum, eq) => sum + eq.target, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const equations = input.split("\n").map((line) => {
    const [test, numbers] = line.split(": ");
    return {
      target: parseInt(test),
      nums: numbers.split(" ").map(Number),
    };
  });

  return equations
    .filter((eq) => isValidEquation(eq.nums, eq.target, ["+", "*", "||"]))
    .reduce((sum, eq) => sum + eq.target, 0);
};

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
