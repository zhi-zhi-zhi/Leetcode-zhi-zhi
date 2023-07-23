function maximumBeauty(flowers: number[], newFlowers: number, target: number, full: number, partial: number): number {
  flowers.sort((a, b) => a - b);

  let beFull = 0;
  while (flowers.length > 0 && flowers[flowers.length - 1] >= target) {
    beFull++;
    flowers.pop();
  }

  const n = flowers.length;
  const preSum = Array(n).fill(0);

  for (let i = 0; i < n; i++)
    preSum[i] = (i === 0 ? 0 : preSum[i - 1]) + flowers[i];

  const diff: number[] = Array(n).fill(0);
  for (let i = 1; i < n; i++)
    diff[i] = flowers[i] * (i) - preSum[i - 1];

  let res = 0;
  console.log(flowers);
  console.log(diff);
  for (let i = n - 1; i >= 0; i--) {
    if (newFlowers < 0) break;

    if (newFlowers + preSum[i] >= target * (i + 1))
      res = Math.max(res, (target - 1) * partial + full * (n - i - 1));
    else {
      const p = upperBound(diff, newFlowers, 0, i) - 1;
      const each = Math.trunc((preSum[p] + newFlowers) / (p + 1));
      console.log("each: ", each);
      res = Math.max(res, each * partial + full * (n - i - 1));
    }

    newFlowers -= (target - flowers[i]);
  }

  if (newFlowers >= 0)
    res = Math.max(res, n * full);

  return res + beFull * full;
};


function upperBound(nums: number[], target: number, left: number = 0, right: number = nums.length - 1): number {
  console.log(nums, target, left, right);
  while (left <= right) {
    const mid = left + Math.trunc((right - left) / 2);

    if (nums[mid] < target)
      left = mid + 1;
    else
      right = mid - 1;
  }

  console.log(left);
  return left;
}

// console.log(maximumBeauty([20,1,15,17,10,2,4,16,15,11]
//   ,2
//   ,20
//   ,10,
//   2)
// );


function secondMinimum(n: number, edges: number[][], time: number, change: number): number {

  // 建图
  const graph: number[][] = Array.from(Array(n + 1), () => Array<number>());
  edges.forEach(([u, v]) => {
    graph[u].push(v);
    graph[v].push(u);
  });


  const distance = Array.from(Array(n + 1), () => [1e15, 1e15]);
  distance[1][0] = 0;
  const queue = [{ vertex: 1, preTime: 0 }];

  while (distance[n][1] === 1e15) {
    const { vertex, preTime } = queue.shift()!;

    if (preTime > distance[vertex][1])
      continue;

    for (const neibor of (graph[vertex])) {
      const newTime = preTime + time + (Math.floor(preTime / change) % 2 === 1 ? (change - preTime % change) : 0);
      if (newTime < distance[neibor][0]) {
        distance[neibor][0] = newTime;
        queue.push({ vertex: neibor, preTime: newTime });
      } else if (newTime + 1 > distance[neibor][0]
        && newTime + 1 < distance[neibor][1]) {
        distance[neibor][1] = newTime;
        queue.push({ vertex: neibor, preTime: newTime });

        if (neibor === n)
          return newTime;
      }
    }
  }

  return -1;
}

function balancedString(s: string): number {
  const n = s.length;
  const x = n / 4;

  const count: Record<string, number> = {};
  Array.from(s).forEach((char, index) => {
    count[char] = (count[char] ?? 0) + 1;
  });

  let left = 0, right = n;
  while (left <= right) {
    const k = left + Math.trunc((right - left) / 2);

    if (check(k))
      right = k - 1
    else
      left = k + 1
  }

  return left;

  function check(k: number): boolean {
    const sum: Record<string, number> = {};

    for (let i = 0; i < n; i++) {
      sum[s[i]] = (sum[s[i]] ?? 0) + 1;
      if (i >= k)
        sum[s[i - k]] = (sum[s[i - k]] ?? 1) - 1;

      let flag = true;
      for (const char in count)
        if (count[char] - (sum[char] ?? 0) > x) {
          flag = false
          break
        }
      if (flag)
        return true
    }

    return false;
  }
}

function balancedString2(s: string): number {
  const n = s.length;
  const x = n / 4;

  const count: Record<string, number> = {};
  Array.from(s).forEach((char, index) => {
    count[char] = (count[char] ?? 0) + 1;
  });

  let res = 1e10
  let slow = 0, fast = 0
  const sum: Record<string, number> = {};
  while (slow < n) {
    while (fast < n && !check()) {
      sum[s[fast]] = (sum[s[fast]] ?? 0) + 1
      fast++
    }
    if (check())
      res = Math.min(res, fast - slow)
    sum[s[slow]] = sum[s[slow]] - 1
    slow++
  }

  return Math.max(0, res)

  function check() {
    for (const char in count)
      if (count[char] - (sum[char] ?? 0) > x)
        return false
    return true
  }
}


// console.log(balancedString2('QWER'));
// console.log(balancedString2('QQER'));
// console.log(balancedString2('QQQR'));

function scheduleCourse(courses: number[][]): number {

}
