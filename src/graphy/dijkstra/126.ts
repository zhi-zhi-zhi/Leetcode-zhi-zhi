function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
  if (!wordList.includes(endWord))
    return [];
  if (!wordList.includes(beginWord))
    wordList.push(beginWord);
  const graph = new Map<string, string[]>();
  const n = wordList.length;

  for (let i = 0; i < n; i++) {
    const arr = graph.get(wordList[i]) ?? [];

    for (let j = i + 1; j < n; j++) {
      if (countDiff(wordList[i], wordList[j]) === 1) {
        const arr2 = graph.get(wordList[j]) ?? [];
        arr.push(wordList[j]);
        arr2.push(wordList[i]);
        graph.set(wordList[j], arr2);
      }
    }

    graph.set(wordList[i], arr);
  }


  const pre = new Map<string, string[]>();
  const visited = new Set<string>();
  const queue = [beginWord];
  const res: string[][] = [];

  let flag = false

  while (queue.length) {
    const next: string[] = []
    const curSet = new Set(queue)

    for (const cur of queue) {
      if (visited.has(cur))
        continue;
      visited.add(cur);

      if (cur === endWord) {
        flag=true
      }

      for (const neighbor of (graph.get(cur) ?? [])) {
        if (!visited.has(neighbor) && !curSet.has(neighbor)) {
          next.push(neighbor);
          const preArr = pre.get(neighbor) ?? []
          preArr.push(cur)
          pre.set(neighbor, preArr);
        }
      }
    }

    if (flag)
      break
    queue.splice(0, queue.length, ...next)
  }

  // 回溯建路径
  const path = [endWord]
  dfs(endWord, path)

  return res;

  function countDiff(str1: string, str2: string): number {
    let res = 0;

    for (let i = 0; i < str1.length; i++)
      if (str1[i] !== str2[i])
        res++;

    return res;
  }

  function dfs(str: string, path: string[]): void {
    if (str === beginWord)
      res.push([...path].reverse())

    for (const x of (pre.get(str) ?? [])) {
      path.push(x)
      dfs(x, path)
      path.pop()
    }
  }
}

