import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const isSafe = (report: number[]) => {
  let increasing = true;
  let decreasing = true;

  for (let i = 1; i < report.length; i++) {
    if (report[i] <= report[i - 1]) increasing = false;
    if (report[i] >= report[i - 1]) decreasing = false;
  }

  for (let i = 1; i < report.length; i++) {
    const diff = Math.abs(report[i] - report[i - 1]);
    if (diff < 1 || diff > 3) return false;
  }

  return increasing || decreasing;
};

const isSafeDampened = (report: number[]) => {
  for (let skip = 0; skip < report.length; skip++) {
    const filtered = report.filter((_, i) => i !== skip);
    if (isSafe(filtered)) return true;
  }
  return false;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const reports = input.split("\n");

  let safeReports = 0;
  for (let i = 0; i < reports.length; i++) {
    const report = reports[i].split(" ").map(Number);
    if (isSafe(report)) {
      safeReports++;
    }
  }

  return safeReports;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const reports = input.split("\n");

  let safeReports = 0;
  for (let i = 0; i < reports.length; i++) {
    const report = reports[i].split(" ").map(Number);
    if (isSafeDampened(report)) {
      safeReports++;
    }
  }

  return safeReports;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
