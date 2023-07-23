function findValidSplit(nums) {
  const primeMap = nums.map(num => (new PrimeFactorizer(num)).factor)

  let preMap = {}
  let endMap = {}

  for (let i = 0; i < nums.length; i++) {
    for (let key in primeMap[i]) {
      endMap[key] = (endMap[key] ?? 0) + primeMap[i][key]
    }
  }

  for (let i = 0; i < nums.length - 1; i++) {
    for (let key in primeMap[i]) {
      preMap[key] = (preMap[key] ?? 0) + primeMap[i][key]
      endMap[key] = (endMap[key] ?? 0) - primeMap[i][key]
    }

    let flag = false
    for (let key in preMap) {
      if (endMap[key] > 0) flag = true
    }

    if (!flag) return i
  }

  return -1
};


function gcd(a, b) {
  if (a % b === 0)
    return b
  return gcd(b, a % b)
}


function isPrime(n){
  for(let i=2; i<=Math.sqrt(n); i++){
    if(n % i == 0){
      return false;
    }
  }
  return true;
}

function PrimeFactorizer(n){
  //用来存储结果的hash
  let hash = {};
  while(n > 1){
    //从最小的质数开始除
    for(let i=2; i<=n; i++){
      if(isPrime(i) && n % i == 0){
        //如果hash中有这个质数，则存储的数目+1
        if(hash[i]){
          hash[i] = hash[i] + 1;
        }//否则把该质数作为key，value为1
        else{
          hash[i] = 1;
        }
        //除掉这个最小的质数因子
        n /= i;
      }
    }
  }
  //给实例上加个factor属性
  this.factor = hash;
  hash = null;
}


console.log(findValidSplit([4,7,15,8,3,5]));
