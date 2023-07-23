interface Coord {
  x: number;
  y: number;
}

interface Info {
  // count from [bottom, left, top, right]
  pathFrom: [number, number, number, number];
  pathCount: number;
}

function countPaths(grid: number[][]): number {
  let res = 0;
  const module = 1e9 + 7;
  const m = grid.length;
  const n = grid[0].length;

  const help: Info[][] = Array.from(Array(m), () => Array(n).fill(undefined));
  const queue: Coord[] = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      help[i][j] = { pathFrom: [0, 0, 0, 0], pathCount: 1 };

      if (isValley(i, j))
        queue.push({ x: i, y: j });
    }
  }

  const dirs = [[-1, 0, 0], [0, 1, 1], [1, 0, 2], [0, -1, 3]];
  while (queue.length > 0) {
    const { x, y } = queue.shift()!;
    const { pathCount } = help[x][y];

    for (const [xd, yd, dir] of dirs) {
      const nx: number = x + xd, ny: number = y + yd;
      if (!check(nx, ny, grid[x][y]))
        continue;

      help[nx][ny].pathCount = (help[nx][ny].pathCount - help[nx][ny].pathFrom[dir] + pathCount) % module;
      help[nx][ny].pathFrom[dir] = pathCount;

      if (isPeak(nx, ny))
        queue.push({ x: nx, y: ny });
    }
  }

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      res = (res + help[i][j].pathCount) % module;

  return res;

  /** 当前数 <= 四个方向的数，即为谷底，加入队列 **/
  function isValley(i: number, j: number): boolean {
    return (i + 1 >= m || grid[i][j] <= grid[i + 1][j])
      && (i - 1 < 0 || grid[i][j] <= grid[i - 1][j])
      && (j + 1 >= n || grid[i][j] <= grid[i][j + 1])
      && (j - 1 < 0 || grid[i][j] <= grid[i][j - 1]);
  }

  /** 为避免重复加入，检查当前山峰四个方向是否都已经符合要求，符合即加入队列， **/
  function isPeak(i: number, j: number): boolean {
    return (i + 1 >= m || grid[i + 1][j] >= grid[i][j] || help[i][j].pathFrom[0] > 0) // bottom
      && (j - 1 < 0 || grid[i][j - 1] >= grid[i][j] || help[i][j].pathFrom[1] > 0) // left
      && (i - 1 < 0 || grid[i - 1][j] >= grid[i][j] || help[i][j].pathFrom[2] > 0) // top
      && (j + 1 >= n || grid[i][j + 1] >= grid[i][j] || help[i][j].pathFrom[3] > 0); // right
  }

  function check(i: number, j: number, num: number): boolean {
    return 0 <= i && i < m && 0 <= j && j < n && grid[i][j] > num;
  }
}

function countPathsDFS(grid: number[][]): number {
  const module = 1e9 + 7;
  const m = grid.length;
  const n = grid[0].length;
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  const memo: number[][] = Array.from(Array(m), () => Array(n).fill(-1));

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      dfs(i, j);


  let res = 0;
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      res = (res + memo[i][j]) % module;

  return res;

  function dfs(i: number, j: number): number {
    if (memo[i][j] !== -1)
      return memo[i][j];

    let count = 1;
    for (const [xd, yd] of dirs)
      if (check(i + xd, j + yd, grid[i][j]))
        count = (count + dfs(i + xd, j + yd)) % module;

    memo[i][j] = count;
    return memo[i][j];
  }

  function check(i: number, j: number, num: number): boolean {
    return 0 <= i && i < m && 0 <= j && j < n && grid[i][j] < num;
  }
}
