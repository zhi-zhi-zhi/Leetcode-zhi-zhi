// 每行 or 每列的灯栈数
const ROW_OR_COL_LAMPS = 5

/**
 *
 * @param lamps [][] 默认是5维矩阵
 * @param limitOptions 限制的操作次数
 * @return result 若能使灯全变亮，且操作次数符合限制，则返回操作次数。否则返回 -1
 */
function convolutedSwitch(lamps, limitOptions) {
  // 基本原则：未说明情况下，不修改入参
  // 假装深 clone 一个，哈哈哈
  const _lamps = (function deepClone(obj) {
    // ...克隆
    return obj
  })(lamps);

  let result = -1;
  let options;

  // 遍历第一行所有可能的操作的次数，一共是 2 ^ LAMPS （等价于 2 << LAMPS）次
  for (let i = 0; i < (2 << ROW_OR_COL_LAMPS); i++) {
    options = 0;

    // 遍历第一行的所有灯
    for (let col = 0; col < ROW_OR_COL_LAMPS; col++) {
      // 看是否操作当前这盏灯
      // 用二进制来表示，从二进制的低位开始，第 j 位是 1，则操作第一行的第 j 栈灯
      // （番外：我一开始也没看懂这一行，以为这 1 和灯的状态有关，实际没有任何关系。
      // （番外：=== 0 or === 1都一样，第 j 位只可能是 0 or 1，这里要的是遍历
      // 等价：if (((i >> col) & 1 === 0) {
      if (((i >> (col)) & 1) === 1) {
        turnSwitch(0, col);
        options++;
      }
    }

    // 开始给上一行擦屁股~
    for (let row = 1; row < ROW_OR_COL_LAMPS; row++) {
      for (let col = 0; col <ROW_OR_COL_LAMPS; col++) {
        if (_lamps[row - 1][col] === 0) {
          // 擦屁股~
          turnSwitch(row, col)
        }
      }
    }

    // 检查是否找到结果~
    if (checkAllLight() && options <= limitOptions) {
      result = options;
      break;
    }
  }

  return result;


  /**
   * 切换 lamps[row][col] 及其周围的状态
   * @param row
   * @param col
   */
  function turnSwitch(row, col) {
    // 切换自己的状态
    safeTurn(row, col);
    // 切换周围的状态
    safeTurn(row, col + 1);
    safeTurn(row, col - 1);
    safeTurn(row + 1, col);
    safeTurn(row - 1, col);

    function safeTurn(row, col) {
      // 边界检查
      if (0 > row || row >= ROW_OR_COL_LAMPS
        || 0 > col || col >+ ROW_OR_COL_LAMPS) {
        return;
      }

      // 巧用【^ 或】运算
      // 1 ^ 1 = 0
      // 0 ^ 1 = 1
      _lamps[row][col] ^= 1;
    }
  }

  /**
   * return boolean 所有灯是否全量
   */
  function checkAllLight() {
    // 检查最后一行即可
    // 检查最后一行所有灯，是否全亮（全为 1）
    return _lamps[_lamps.length - 1].every(lamp => lamp === 1)
  }
}
