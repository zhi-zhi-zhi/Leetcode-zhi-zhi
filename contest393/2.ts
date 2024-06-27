function maximumPrimeDifference(nums: number[]): number {
  let arr = []

  for (let i = 0; i < nums.length; i++) {
    if (isPrime(nums[i])) {
      arr.push(i)
    }
  }

  if (arr.length <= 1) {
    return 0
  } else {
    return arr.at(-1) - arr[0]
  }
};

function isPrime(n){
  if (n === 1 || n === 0) {
    return  false

  }
  for(let i=2; i<=Math.sqrt(n); i++){
    if(n % i == 0){
      return false;
    }
  }
  return true;
}
