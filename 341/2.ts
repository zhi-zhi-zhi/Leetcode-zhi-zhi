function maxDivScore(nums: number[], divisors: number[]): number {
  const divisorsFiltered = Array.from(
    new Set(divisors),
  ).sort((a, b) => a - b);

  let res = [divisorsFiltered[0], -1];

  for (let i = 0; i < divisorsFiltered.length; i++) {
    let count = nums.filter(
      num => num % divisorsFiltered[i] === 0,
    ).length;
    if (count > res[1])
      res = [i, count];
  }

  return divisorsFiltered[res[0]];
};

maxDivScore([4, 7, 9, 3, 9], [5, 2, 3]);
