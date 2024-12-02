import fs from "fs";

const lines = fs.readFileSync("./example.txt", "utf-8").trim().split("\n");
// const lines = fs.readFileSync('./data.txt','utf-8').trim().split('\n');

const map = lines.map((line) => line.split("").map((c) => parseInt(c)));

/** CHALLENGE: PART ONE */
function part1(lines) {
	// Answer: 1155 (102)
	const minHeatLoss = shortestPath(map, 0, 3);
	return minHeatLoss;
}

/** CHALLENGE: PART TWO */
function part2(lines) {
	// Answer: 1283 (94)
	const minHeatLoss = shortestPath(map, 4, 10);
	return minHeatLoss;
}

const next = { R: [1, 0], L: [-1, 0], U: [0, -1], D: [0, 1], "": [0, 0] };
const nextXY = (x, y, dir) => [x + next[dir][0], y + next[dir][1]];

const opposite = { R: "L", L: "R", U: "D", D: "U" };
const getPossibleDirs = (dir) =>
	["R", "D", "U", "L"].filter((d) => d !== opposite[dir]);

const shortestPath = (map, minSteps, maxSteps) => {
	const visited = new Map();
	const queue = [
		{ x: 0, y: 0, dir: "", dirSteps: minSteps, temp: -map[0][0] },
	];
	let min = 999999;
	while (queue.length > 0) {
		const { x: ox, y: oy, dir, dirSteps, temp: prevTemp } = queue.shift();
		const [x, y] = nextXY(ox, oy, dir);

		// out of bounds
		if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) continue;
		// too many steps in same direction
		if (dirSteps > maxSteps) continue;
		// already too big
		const temp = prevTemp + map[y][x];
		if (temp >= min) continue;
		// already visited with same or better temp
		const prev = visited.get(`${x},${y},${dir},${dirSteps}`);
		if (prev && prev <= temp) continue;
		visited.set(`${x},${y},${dir},${dirSteps}`, temp);

		if (
			dirSteps >= minSteps &&
			x === map[0].length - 1 &&
			y === map.length - 1
		) {
			min = Math.min(min, temp); // reach goal, update min
		} else {
			const possibleDirs =
				dirSteps < minSteps ? [dir] : getPossibleDirs(dir);
			const nextSteps = possibleDirs.map((n) => ({
				x,
				y,
				dir: n,
				dirSteps: dir === n ? dirSteps + 1 : 1,
				temp,
			}));
			queue.push(...nextSteps);
			queue.sort((a, b) => a.temp - b.temp);
		}
	}
	return min;
};

console.log(part1(lines), "part1");
console.log(part2(lines), "part2");
