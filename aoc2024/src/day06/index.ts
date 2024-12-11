import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const directions = [
  { x: 0, y: -1, char: "^" },
  { x: 1, y: 0, char: ">" },
  { x: 0, y: 1, char: "v" },
  { x: -1, y: 0, char: "<" },
];

const getKey = ({ x, y }) => `${x},${y}`;

const isValidPosition = (
  { x, y }: { x: number; y: number },
  width: number,
  height: number,
) => x >= 0 && x < width && y >= 0 && y < height;

const initMap = (input: string) => {
  const lines = input.split("\n");
  const width = lines[0].length;
  const height = lines.length;
  const galaxyMap = new Set();

  let positionStart = { x: 0, y: 0 };
  let direction = 0;
  lines.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === "#") {
        galaxyMap.add(`${x},${y}`);
        continue;
      }
      const directionIndex = directions.findIndex((d) => d.char === char);
      if (directionIndex !== -1) {
        positionStart = { x, y };
        direction = directionIndex;
      }
    }
  });
  return { galaxyMap, positionStart, direction, width, height };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const { galaxyMap, positionStart, direction, width, height } = initMap(input);
  let currentPos = positionStart;
  let currentDirection = direction;

  const visited = new Set();

  while (true) {
    const keyCurrent = `${currentPos.x},${currentPos.y}`;
    if (!visited.has(keyCurrent)) {
      visited.add(keyCurrent);
    }

    const nextPos = {
      x: currentPos.x + directions[currentDirection].x,
      y: currentPos.y + directions[currentDirection].y,
    };
    const keyNext = getKey(nextPos);

    if (!isValidPosition(nextPos, width, height)) {
      break;
    }

    if (galaxyMap.has(keyNext)) {
      currentDirection = (currentDirection + 1) % 4;
      continue;
    }

    currentPos = nextPos;
  }

  return visited.size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const { galaxyMap, positionStart, direction, width, height } = initMap(input);
  let currentPos = positionStart;
  let currentDirection = direction;

  const visited = new Set();
  const obstructions = new Set();

  while (true) {
    const keyCurrent = `${currentPos.x},${currentPos.y}`;
    if (!visited.has(keyCurrent)) {
      visited.add(keyCurrent);
    }

    const nextPos = {
      x: currentPos.x + directions[currentDirection].x,
      y: currentPos.y + directions[currentDirection].y,
    };
    const keyNext = getKey(nextPos);
    const keyStart = getKey(positionStart);

    if (!isValidPosition(nextPos, width, height)) {
      break;
    }

    if (galaxyMap.has(keyNext)) {
      currentDirection = (currentDirection + 1) % 4;
      continue;
    }

    // possible obstruction
    if (
      keyNext !== keyStart &&
      !obstructions.has(keyNext) &&
      !visited.has(keyNext)
    ) {
      const directionChecked = new Set<string>();

      const checkDirection = (pos: { x: number; y: number }, dir: number) => {
        const nextPosInner = {
          x: pos.x + directions[dir].x,
          y: pos.y + directions[dir].y,
        };
        const keyNextInner = getKey(nextPosInner);
        const keyNextDirection = `${keyNextInner}-${dir}`;

        if (!isValidPosition(nextPosInner, width, height)) {
          return null;
        }

        if (galaxyMap.has(keyNextInner) || keyNextInner === keyNext) {
          return { newPos: pos, newDir: (dir + 1) % 4 };
        }

        if (directionChecked.has(keyNextDirection)) {
          obstructions.add(keyNext);
          return null;
        }

        directionChecked.add(keyNextDirection);
        return { newPos: nextPosInner, newDir: dir };
      };

      let steps = 0;
      let result = checkDirection(currentPos, (currentDirection + 1) % 4);
      while (result && steps < width * height * directions.length) {
        result = checkDirection(result.newPos, result.newDir);
        steps++;
      }
    }

    currentPos = nextPos;
  }

  return obstructions.size;
};

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
  onlyTests: false,
});
