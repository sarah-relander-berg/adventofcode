import fs from "fs";

// const lines = fs.readFileSync('./example.txt','utf-8').trim().split('\n');
const lines = fs.readFileSync("./data.txt", "utf-8").trim().split("\n");
// console.log(lines,'lines')

/* CHALLENGE: PART ONE */
function part1(lines) {
	//Answer: 540131

	let totalSum = 0;
	lines.map((line, lineIndex) => {
		const regex = /\d+/g;
		let match;
		while ((match = regex.exec(line)) !== null) {
			const match_index = match.index;
			const match_value = match[0];
			const startIndex = Math.max(0, match_index - 1);
			const endIndex = Math.min(lines[1].length - 1, match_index + match_value.length + 1);
			let searchMatrix = [];
			searchMatrix.push(lineIndex > 0 ? lines[lineIndex - 1]?.slice(startIndex, endIndex) : "");
			searchMatrix.push(line.slice(startIndex, endIndex));
			searchMatrix.push(lineIndex < lines.length - 1 ? lines[lineIndex + 1]?.slice(startIndex, endIndex) : "");
			if (searchMatrix.some((line) => containsSpecialCharacters(line))) {
				totalSum += Number(match_value);
			}
		}
	});
	return totalSum;
}

/* CHALLENGE: PART TWO */
function part2(lines) {
	//Answer: 86879020

	let gearsMap = new Map();
	lines.map((line, lineIndex) => {
		const regex = /\d+/g;
		let match;
		while ((match = regex.exec(line)) !== null) {
			const match_index = match.index;
			const match_value = match[0];
			const startIndex = Math.max(0, match_index - 1);
			const endIndex = Math.min(lines[1].length - 1, match_index + match_value.length + 1);

			let searchMatrix = [];
			searchMatrix.push(lineIndex > 0 ? lines[lineIndex - 1]?.slice(startIndex, endIndex) : "");
			searchMatrix.push(line.slice(startIndex, endIndex));
			searchMatrix.push(lineIndex < lines.length - 1 ? lines[lineIndex + 1]?.slice(startIndex, endIndex) : "");

			const gearCheck = searchMatrix.filter((line) => containsGearCharacter(line));
			if (gearCheck.length == 1) {
				const lineOfGear = searchMatrix.findIndex((item) => item.includes("*"));
				let indexOfGear = startIndex + searchMatrix[lineOfGear].indexOf("*");
				const gearIndex = `${lineIndex - 1 + lineOfGear}-${indexOfGear}`;
				if (gearsMap.has(`gear-${gearIndex}`)) {
					let currentArray = gearsMap.get(`gear-${gearIndex}`);
					currentArray.push(Number(match_value));
					gearsMap.set(`gear-${gearIndex}`, currentArray);
				} else {
					gearsMap.set(`gear-${gearIndex}`, [Number(match_value)]);
				}
			}
		}
	});

	let gearRatioSum = 0;
	for (let [key, values] of gearsMap) {
		if (values.length === 2) {
			gearRatioSum += values[0] * values[1];
		}
	}
	return gearRatioSum;
}

/* FUNCTION : containsSpecialCharacters */
function containsSpecialCharacters(inputString) {
	if (!inputString) return false;
	return inputString.match(/[^0-9.]/g);
}

/* FUNCTION : containsGearCharacter (one '*') */
function containsGearCharacter(inputString) {
	if (!inputString) return false;
	return inputString.match(/^[^*]*\*[^*]*$/g);
}

console.log(part1(lines), "part1");
console.log(part2(lines), "part2");
