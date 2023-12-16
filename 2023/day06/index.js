import fs from "fs";

// const lines = fs.readFileSync('./example.txt','utf-8').trim().split('\n');
const lines = fs.readFileSync("./data.txt", "utf-8").trim().split("\n");

/** CHALLENGE: PART ONE */
function part1(lines) {
	// Answer: 512295 (288)
	const [times, distances] = lines.map((r) => {
		return r
			.split(":")[1]
			.split(" ")
			.filter((v) => v);
	});
	const winningOptions = times.reduce((powerWins, raceTime, index) => {
		const raceDistance = Number(distances[index]);
		let count = getWinCount(raceTime, raceDistance);
		return powerWins * count;
	}, 1);
	return winningOptions;
}

/** CHALLENGE: PART TWO */
function part2(lines) {
	// Answer: 36530883 (71503)
	const [time, distance] = lines.map((r) => {
		return r
			.split(":")[1]
			.split(" ")
			.filter((v) => v)
			.join("");
	});
	const raceTime = Number(time);
	const raceDistance = Number(distance);
	let count = getWinCount(raceTime, raceDistance);
	return count;
}


/** FUNCTION : getWinCount */
function getWinCount(raceTime, raceDistance) {
	let count = 0;
	for (let time = 1; time <= raceTime; time++) {
		if (time * (raceTime - time) > raceDistance) {
			count++;
		}
	}
	return count;
}


console.log(part1(lines), "part1");
console.log(part2(lines), "part2");
