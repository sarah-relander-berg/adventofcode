import fs from "fs";

const lines = fs.readFileSync("./example.txt", "utf-8").trim().split("\n");
// const lines = fs.readFileSync('./data.txt','utf-8').trim().split('\n');
const hands = lines.map((line) => line.split(" "));

/** CHALLENGE: PART ONE */
function part1(lines) {
	//Answer: 248422077 (6440)

	const part1Sorter = handSorter(handScorer(false), cardScorer(cardScore));
	return winnings(part1Sorter);
}

const getHandScore = (hand, scoreSystem) => {};

/** CHALLENGE: PART TWO */
function part2(lines) {
	const part2Sorter = handSorter(handScorer(true), cardScorer(jokerScore));
	return winnings(part2Sorter);
}

const cardScore = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const jokerScore = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

const cardScorer = (cardIndex) => (card) => cardIndex.length - cardIndex.indexOf(card);

const handScorer = (useJokers) => (hand) => {
	const cards = Array.from(hand).reduce((acc, cur) => {
		acc[cur] ? acc[cur]++ : (acc[cur] = 1);
		return acc;
	}, {});
	let jokers = 0;
	if (useJokers) {
		jokers = cards["J"] ?? 0;
		delete cards["J"];
	}
	const kindCounts = Object.keys(cards).length;
	const maxKind = Math.max(...Object.values(cards)) + jokers;
	if (kindCounts <= 1) {
		return 6; // five of a kind
	} else if (kindCounts === 2 && maxKind === 4) {
		return 5; // four of a kind
	} else if (kindCounts === 2) {
		return 4; // full house
	} else if (maxKind === 3) {
		return 3; // three of a kind
	} else if (kindCounts === 3 && maxKind === 2) {
		return 2; // two pair
	} else if (maxKind === 2) {
		return 1; // one pair
	}
	return 0; // high card
};

const handSorter = (handScorer, cardScorer) => (a, b) => {
	if (handScorer(a) !== handScorer(b)) {
		return handScorer(a) - handScorer(b);
	}
	// same hand, sort by card
	for (let i = 0; i < a.length; i++) {
		if (cardScorer(a[i]) !== cardScorer(b[i])) {
			return cardScorer(a[i]) - cardScorer(b[i]);
		}
	}
	return 0;
};

const winnings = (handSorter) => {
	const sorted = hands.sort((a, b) => handSorter(a[0], b[0]));
	return sorted.map((hand, index) => hand[1] * (index + 1)).reduce((a, b) => a + b, 0);
};

console.log(part1(lines), "part1");
console.log(part2(lines), "part2");
