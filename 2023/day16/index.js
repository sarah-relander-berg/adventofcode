import fs from "fs";

// const lines = fs.readFileSync("./example.txt", "utf-8").trim().split("\n");
const lines = fs.readFileSync("./data.txt", "utf-8").trim().split("\n");
const tiles = lines.map((line) => line.split(""));

/** CHALLENGE: PART ONE */
function part1(lines) {
	// Answer: 7074 (46)
	const energizedMap = processMap(new Map(), [{ x: 0, y: 0, dx: 1, dy: 0 }]);
	return energizedMap.size;
}

/** CHALLENGE: PART TWO */
function part2(lines) {
	// Answer: 7530 (51)
	let maxEnergizedCount = 0;
	for (let index = 0; index < tiles.length; index++) {
		let energizedMapFromLeft = processMap(new Map(), [
			{ x: 0, y: index, dx: 1, dy: 0 },
		]);
		let energizedMapFromRight = processMap(new Map(), [
			{ x: tiles[0].length - 1, y: index, dx: -1, dy: 0 },
		]);
        let energizedMapFromTop = processMap(new Map(), [
			{ x: index, y: 0, dx: 0, dy: 1 },
		]);
		let energizedMapFromBottom = processMap(new Map(), [
			{ x: index, y: tiles.length - 1, dx: 0, dy: -1 },
		]);
		maxEnergizedCount = Math.max(
			maxEnergizedCount,
			energizedMapFromLeft.size,
			energizedMapFromRight.size,
            energizedMapFromTop.size,
            energizedMapFromBottom.size
		);
	}
	return maxEnergizedCount;
}


/** FUNCTION : processMap */
const processMap = (map, lights) => {
	while (lights.length > 0) {
		lights = lights.map((light) => processLight(light, map)).flat();
	}
	return map;
};

/** FUNCTION : processLight */
const processLight = (light, map) => {
	const { x, y, dx, dy } = light;
	if (x < 0 || y < 0 || x >= tiles[0].length || y >= tiles.length) {
		return [];
	}
	if (!map.has(`${x},${y}`)) {
		map.set(`${x},${y}`, new Set());
	} else if (map.get(`${x},${y}`).has(`${dx},${dy}`)) {
		return []; // loop, exit
	}
	map.get(`${x},${y}`).add(`${dx},${dy}`);

	const currentTile = tiles[y][x];
	let next = [{ dx, dy }];

	// split light
	if (currentTile === "|" && dx !== 0) {
		next = [
			{ dx: dy, dy: -1 },
			{ dx: dy, dy: 1 },
		];
	}
	if (currentTile === "-" && dy !== 0) {
		next = [
			{ dx: -1, dy: dx },
			{ dx: 1, dy: dx },
		];
	}
	// bent light
	if (currentTile === "/") {
		next = [{ dx: -dy, dy: -dx }];
	}
	if (currentTile === "\\") {
		next = [{ dx: dy, dy: dx }];
	}
	return next.map(({ dx, dy }) => ({ x: x + dx, y: y + dy, dx, dy }));
};

console.log(part1(lines), "part1");
console.log(part2(lines), "part2");
