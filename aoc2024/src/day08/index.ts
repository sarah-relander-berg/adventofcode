import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const parseFrequencies = (lines: string[]) => {
  const frequencies = new Map<string, { x: number; y: number }[]>();
  lines.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (char !== ".") {
        if (!frequencies.has(char)) {
          frequencies.set(char, []);
        }

        frequencies.get(char)!.push({ x, y });
      }
    });
  });
  return frequencies;
};

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput).split("\n");
  const frequencies = parseFrequencies(lines);
  const nodeMap = new Map([["#", []]]);

  const isValidNode = ({ x, y }: { x: number; y: number }) =>
    x >= 0 &&
    x < lines[0].length &&
    y >= 0 &&
    y < lines.length &&
    !nodeMap.get("#")!.some((n) => n.x === x && n.y === y);

  for (const antennas of frequencies.values()) {
    if (antennas.length < 2) continue;

    for (let i = 0; i < antennas.length; i++) {
      const a1 = antennas[i];
      for (let j = 0; j < i; j++) {
        const a2 = antennas[j];

        const dx = a2.x - a1.x;
        const dy = a2.y - a1.y;

        const antinode1 = { x: a1.x + dx * 2, y: a1.y + dy * 2 };
        const antinode2 = { x: a1.x - dx, y: a1.y - dy };

        if (isValidNode(antinode1)) nodeMap.get("#")!.push(antinode1);
        if (isValidNode(antinode2)) nodeMap.get("#")!.push(antinode2);
      }
    }
  }

  return nodeMap.get("#")!.length;
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput).split("\n");
  const frequencies = parseFrequencies(lines);
  const nodeSet = new Set<string>();

  const isValidNode = (x: number, y: number) =>
    x >= 0 && x < lines[0].length && y >= 0 && y < lines.length;

  for (const [freq, antennas] of frequencies) {
    if (antennas.length < 2) continue;

    for (let i = 0; i < antennas.length; i++) {
      const a1 = antennas[i];
      nodeSet.add(`${a1.x},${a1.y}`);

      for (let j = 0; j < i; j++) {
        const a2 = antennas[j];

        const dx = a2.x - a1.x;
        const dy = a2.y - a1.y;

        let [x, y] = [a1.x + dx, a1.y + dy];
        while (isValidNode(x, y)) {
          nodeSet.add(`${x},${y}`);
          x += dx;
          y += dy;
        }

        [x, y] = [a1.x - dx, a1.y - dy];
        while (isValidNode(x, y)) {
          nodeSet.add(`${x},${y}`);
          x -= dx;
          y -= dy;
        }
      }
    }
  }

  return nodeSet.size;
};

run({
  part1: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 14,
      },
    ],
    solution: part1, //295
  },
  part2: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 34,
      },
    ],
    solution: part2, //1034
  },
  trimTestInputs: true,
  onlyTests: false,
});
