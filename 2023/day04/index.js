import fs from 'fs';

// const lines = fs.readFileSync('./example.txt','utf-8').trim().split('\n');
const lines = fs.readFileSync('./data.txt','utf-8').trim().split('\n');

// console.log(lines,'lines')

function part1(lines){
    //Answer: 21088
    const scratchcardScore = lines.reduce((sum,line, index)=>{
        const [,gameData] = line.split(": ")
        const [winners,numbers] = gameData.split(" | ")
        const winnerArray = winners.split(" ");
        const numbersArray = numbers.split(" ");
        const scratchcardWinners = numbersArray.reduce((winners, cur) => cur && winnerArray.includes(cur)?winners+1: winners,0);
        const scratchcardScore = scratchcardWinners?Math.pow(2, scratchcardWinners-1):0;
        return sum + scratchcardScore
    },0);
    return scratchcardScore;
}

function part2(lines){
    //Answer: 6874754
    const scratchcardTotals = Array(lines.length).fill(1);
    lines.map((line, index)=>{
        const [,gameData] = line.split(": ")
        const [winners,numbers] = gameData.split(" | ")
        const winnerArray = winners.split(" ");
        const numbersArray = numbers.split(" ");
        const scratchcardWinners = numbersArray.reduce((winners, cur) => cur && winnerArray.includes(cur)?winners+1: winners,0);
        const scratchcardScore = scratchcardWinners?Math.pow(2, scratchcardWinners-1):0;
        if(scratchcardWinners){
            scratchcardTotals.map((totalValue, totalIndex) => {
                if(totalIndex > index && totalIndex <= index + scratchcardWinners){
                    scratchcardTotals[totalIndex] += scratchcardTotals[index];
                }
            })
        }
    });
    return scratchcardTotals.reduce((s,v)=>s+v);
}

console.log(part1(lines),'part1');
console.log(part2(lines),'part2');