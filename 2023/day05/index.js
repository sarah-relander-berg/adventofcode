import fs from "fs";

// const lines = fs.readFileSync("./example.txt", "utf-8").trim().split("\n");
const lines = fs.readFileSync('./data.txt','utf-8').trim().split('\n');

// console.log(lines,'lines')

/** CHALLENGE: PART ONE */
function part1(lines) {
	// answer: 579439039

	const [seeds, categoryMaps] = getMapData(lines);

	//go thru maps, get location
	const seedLocations = seeds.map((seed) => {
		let seedLocation = seed;
		Object.entries(categoryMaps).forEach(([categoryMap, mapArray]) => {
			seedLocation = mapArray.reduce((tempSeedLocation, mapLine) => {
				const [mapValue, mapStart, mapLength] = mapLine;

				return seedLocation >= mapStart &&
					seedLocation < mapStart + mapLength
					? mapValue + (seedLocation - mapStart)
					: tempSeedLocation;
			}, seedLocation);
		});
		return seedLocation;
	});

	return Math.min(...seedLocations);
}

/** CHALLENGE: PART TWO */
function part2(lines) {
	//answer: 7873084

	const [seeds, categoryMaps] = getMapData(lines);
    //backward search time!
	const categoryMapsReverse = [...categoryMaps].reverse();

	const seedGroups = [];
	seeds.forEach((r, i) => {
		if (i % 2 === 0) {
			seedGroups.push([
				seeds[i],
				seeds[i] + seeds[i + 1] - 1,
			]);
		}
	});

	let location = -1;
	let find = false;
	while (!find) {
        location++;
		const seedValue = findSeedValue(location, [...categoryMapsReverse]);
		if (isValidSeed(seedValue, seedGroups)) {
			find = true;
		}
	}
	return location;
}

/** FUNCTION : getMapData */
const getMapData = (lines) => {
	let seeds = [];
	const categoryMaps = [];

	// make a map
	let currentMap = -1;
	lines.map((line) => {
		if (line.includes("seeds: ")) {
			seeds = line
				.split("seeds: ")[1]
				.split(" ")
				.map((value) => Number(value));
		} else if (line.includes("map")) {
			currentMap++;
		} else if (line) {
			if (!categoryMaps[currentMap])
				categoryMaps[currentMap] = [];
			categoryMaps[currentMap].push(
				line.split(" ").map((value) => Number(value))
			);
		}
	});
	return [seeds, categoryMaps];
};

/** FUNCTION : findSeedValue */
const findSeedValue = (location, maps) => {
    if (maps.length === 0) return location;
    const mapArr = maps.shift();
    const len = mapArr.length;
    for (let i = 0; i < len; i++) {
        // const [mapLineStart, mapLineValue, mapLineLength] = mapArr[i]; //makes it slow
        const mapLineStart = mapArr[i][0];
        const mapLineEnd = mapArr[i][0] + mapArr[i][2];
        if (location >= mapLineStart && location <= mapLineEnd) {
            const diff = mapLineStart - mapArr[i][1];
            return findSeedValue(location - diff, maps);
        }
    }
    return findSeedValue(location, maps);
}

/** FUNCTION : isValidSeed */
const isValidSeed = (seed, seedGroups) => {
    for (const group of seedGroups) {
        if (seed >= group[0] && seed <= group[1]) {
            return true;
        }
    }
    return false;
}


console.log(part1(lines), "part1");
console.log(part2(lines), "part2");