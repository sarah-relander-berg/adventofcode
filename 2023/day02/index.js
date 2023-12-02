import fs from 'fs';

// const games = fs.readFileSync('./example.txt','utf-8').trim().split('\n');
const games = fs.readFileSync('./data.txt','utf-8').trim().split('\n');
// console.log(games,'games')

const ELF_SCENARIO = {
    red: 12,
    green: 13,
    blue: 14,
};

/* CHALLENGE: PART ONE */
function part1(games){
    //answer: 2545
    const passSum = games.reduce((sum, game, index) => {
        const gameColorMax = getGameColorMax(game)
        if (Object.entries(gameColorMax).every(([color, count]) => count <= ELF_SCENARIO[color])) {
            return sum + (index + 1);
        }
        return sum;
    }, 0);
    return passSum;
}

/* CHALLENGE: PART TWO */
function part2(games){
    //answer: 78111
    const powerSum = games.reduce((sum, game, index) => {
        const gameColorMax = getGameColorMax(game)
        return sum + (gameColorMax.red * gameColorMax.green * gameColorMax.blue);
    }, 0);
    return powerSum;
}

/* FUNCTION : getGameColorMax */
function getGameColorMax(game){
    const [, gameData] = game.split(": ");
    const subGames = gameData.split("; ");

    const maxCounts = subGames.reduce((subGameMax, subGame) => {
        const subGameData = subGame.split(', ');
        subGameData.forEach((subGameDataColor) => {
            const [count, color] = subGameDataColor.split(' ');
            const countValue = parseInt(count);
            subGameMax[color] = Math.max(subGameMax[color], countValue);
        });
        return subGameMax;
    }, { red: 0, green: 0, blue: 0 });

    return maxCounts;
}

console.log(part1(games),'part1');
console.log(part2(games),'part2?');
  


