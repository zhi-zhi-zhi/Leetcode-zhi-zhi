function maximizeSquareArea(m: number, n: number, hFences: number[], vFences: number[]): number {
  hFences.sort((a, b) => a - b)
  vFences.sort((a, b) => a - b)
  const module = 1e9 + 7

  // 首先离散化
  // 最多602*602
}