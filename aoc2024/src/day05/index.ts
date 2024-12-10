import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getDependencyMap = (rules: string[]) => {
  const dependencies = new Map();
  for (const rule of rules) {
    const [before, after] = rule.split("|").map(Number);
    const afterSet = dependencies.get(before) || new Set();
    afterSet.add(after);
    dependencies.set(before, afterSet);
  }
  return dependencies;
};

const validateUpdates = (dependencies: Map<any, any>, updates: number[][]) => {
  const isInvalid = (update: number[]) =>
    update.some((before, i) =>
      update.slice(i + 1).some((after) => {
        const afterDependencies = dependencies.get(after);
        return afterDependencies?.has(before);
      }),
    );

  const validUpdates = updates.filter((update) => !isInvalid(update));
  return validUpdates;
};

const getMiddleSum = (updates: number[][]) => {
  return updates.reduce((sum, update) => {
    const middleIndex = Math.floor(update.length / 2);
    return sum + update[middleIndex];
  }, 0);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [rules, updates] = input.split("\n\n");
  const rulesArr = rules.split("\n");
  const updatesArr = updates.split("\n").map((x) => x.split(",").map(Number));
  const dependencies = getDependencyMap(rulesArr);
  const validUpdates = validateUpdates(dependencies, updatesArr);
  return getMiddleSum(validUpdates);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [rules, updates] = input.split("\n\n");
  const rulesArr = rules.split("\n");
  const updatesArr = updates.split("\n").map((x) => x.split(",").map(Number));
  const dependencies = getDependencyMap(rulesArr);
  const validUpdates = validateUpdates(dependencies, updatesArr);
  const invalidUpdates = updatesArr.filter(
    (update) => !validUpdates.includes(update),
  );

  const orderedUpdates = invalidUpdates.map((update) => {
    const ordered = [...update];
    for (let i = 0; i < ordered.length - 1; i++) {
      for (let j = i + 1; j < ordered.length; j++) {
        if (dependencies.get(ordered[j])?.has(ordered[i])) {
          [ordered[i], ordered[j]] = [ordered[j], ordered[i]];
        }
      }
    }
    return ordered;
  });

  return getMiddleSum(orderedUpdates);
};
run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
