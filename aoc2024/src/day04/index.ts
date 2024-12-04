import run from "aocrunner";
const parseInput = (rawInput: string) => rawInput;

const checkWord = (str: string, word: string) => {
  const reverse = str.split("").reverse().join("");
  return str === word || reverse === word;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  const matrix = lines.map((line) => line.split(""));

  const word = "XMAS";
  const rows = matrix.length;
  const cols = matrix[0].length;
  let count = 0;

  const directions = [
    (i: number, j: number, k: number) => matrix[i][j + k],
    (i: number, j: number, k: number) => matrix[i + k][j],
    (i: number, j: number, k: number) => matrix[i + k][j + k],
    (i: number, j: number, k: number) => matrix[i + k][j - k],
  ];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      directions.forEach((dir) => {
        try {
          const string = [0, 1, 2, 3].map((k) => dir(i, j, k)).join("");
          if (checkWord(string, word)) count++;
        } catch {
          // Out of bounds, skip
        }
      });
    }
  }

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  const matrix = lines.map((line) => line.split(""));

  const word = "MAS";
  const rows = matrix.length;
  const cols = matrix[0].length;
  let count = 0;

  const direction1 = (i: number, j: number, k: number) => matrix[i + k][j + k];
  const direction2 = (i: number, j: number, k: number) => matrix[i + k][j - k];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      try {
        const diagonal1 = [-1, 0, 1].map((k) => direction1(i, j, k)).join("");
        const diagonal2 = [-1, 0, 1].map((k) => direction2(i, j, k)).join("");
        if (checkWord(diagonal1, word) && checkWord(diagonal2, word)) count++;
      } catch {
        // Out of bounds, skip
      }
    }
  }

  return count;
};

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
