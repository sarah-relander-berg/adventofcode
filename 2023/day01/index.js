import fs from 'fs';

// const lines = fs.readFileSync('./example.txt','utf-8').trim().split('\n');
const lines = fs.readFileSync('./data.txt','utf-8').trim().split('\n');

// console.log(lines,'lines')

function part1(lines){
    //answer: 54940
    const values = lines.map((line)=> {
        let lineObj = line.split('');
        let first = lineObj.find((v)=> !Number.isNaN(Number(v)))
        let last = lineObj.findLast((v)=> !Number.isNaN(Number(v)))
        return Number(first+last);
    }); 
    
    return values.reduce((s,v)=> s+v);
}

function part2(lines){
    //answer: 54208
    //replace with numbers
    const resultArray = lines.map((line)=> replaceWordsWithNumbers(line));
    // console.log(resultArray,'resultArray')

    //reuse part one
    return part1(resultArray);
}

function replaceWordsWithNumbers(inputString) {
    const wordToNumber = {
        zero: '0',
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9'
    };
    let resultString = '';
    let currentIndex = 0;

    while (currentIndex < inputString.length) {
        const foundMatchEntry = Object.entries(wordToNumber).find(([key]) => inputString.startsWith(key, currentIndex));
        resultString += foundMatchEntry ? foundMatchEntry[1] : inputString[currentIndex];
        currentIndex++;
    }
    return resultString;
  }
  
  console.log(part1(lines),'part1');
  console.log(part2(lines),'part2');
  