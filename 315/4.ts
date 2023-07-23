class UnionFind {
  parent: number[];
  rank: number[];

  constructor(n: number) {
    this.parent = Array(n).fill(0).map((_, index) => index);
    this.rank = Array(n).fill(1);
  }

  find(key: number): number {
    if (this.parent[key] === key) return key;

    const root = this.find(this.parent[key]);
    this.parent[key] = root;
    return root;
  }

  union(a: number, b: number) {
    let aRoot = this.find(a), aRootRank = this.rank[aRoot],
      bRoot = this.find(b), bRootRank = this.rank[bRoot];

    if (aRoot === bRoot) return;

    if (aRootRank < bRootRank)
      [aRoot, bRoot] = [bRoot, aRoot];

    this.parent[bRoot] = aRoot;
    this.rank[aRoot] = aRootRank + bRootRank;
    this.rank[bRoot] = 0;
  }

  isConnected(a: number, b: number) {
    return this.find(a) === this.find(b);
  }
}

function hitBricks(grid: number[][], hits: number[][]): number[] {
  const m = grid.length, n = grid[0].length;
  const res = Array(hits.length).fill(0)

  const copy = grid.map(item => [...item])
  const uf = new UnionFind(m * n + 1)

  for (const [row, col] of hits)
    copy[row][col] = 0

  const help = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (copy[i][j] === 1) {
        if (i === 0)
          uf.union(j, m * n)

        for (const [ra, ca] of help) {
          const nr = i + ra, nc = j + ca
          if (0 <= nr && nr < m && 0 <= nc && nc < n && copy[nr][nc] === 1)
            uf.union(i * n + j, nr * n + nc)
        }
      }
    }
  }

  for (let i = hits.length - 1; i >= 0; i--) {
    const [r, c] = hits[i]

    if (grid[r][c] === 0) continue

    const oldCount = uf.rank[uf.find(m*n)]
    copy[r][c] = 1
    if (r === 0)
      uf.union(c, m * n)

    for (const [ra, ca] of help) {
      const nr = r + ra, nc = c + ca
      if (0 <= nr && nr < m && 0 <= nc && nc < n && copy[nr][nc] === 1)
        uf.union(r * n + c, nr * n + nc)
    }
    const newCount = uf.rank[uf.find(m*n)]
    res[i] = newCount === oldCount ? 0 : newCount - 1 - oldCount
  }

  return res
}
