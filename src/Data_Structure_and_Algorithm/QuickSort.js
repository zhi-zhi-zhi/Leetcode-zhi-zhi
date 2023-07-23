let t = function(data) {
  if (!Array.isArray(data)) {
    return;
  }

  return quickSortCore(data, 0, data.length - 1);
};

/**
 *
 * @param {number[]} data
 * @param {number} start
 * @param {number} end
 */
function quickSortCore(data, start, end) {
  if (start === end) {
    return;
  }

  let index = partition(data, 0, end);
  if (index > start) {
    quickSortCore(data, start, index - 1);
  }
  if (index < end) {
    quickSortCore(data, index + 1, end);
  }
}

/**
 * @param {number[]} data
 * @param {number} start
 * @param {number} end
 */
function partition(data, start, end) {

  // 随机选择一个基数
  let randomIndex = start + Math.floor(Math.random() * (end - start));
  // 把基数放到最后面
  swap(data, randomIndex, end);

  // 将比基数小的放到数组前面
  let small = start - 1;
  for (let i = start; i < end; i++) {
    if (data[i] < data[end]) {
      small++;

      if (small !== i) {
        swap(data, small, i);
      }
    }
  }

  // 将基数放到适合位置
  swap(data, ++small, end);

  return small;
}

function swap(data, indexOne, indexTwo) {
  let temp = data[indexOne];
  data[indexOne] = data[indexTwo];
  data[indexTwo] = temp;
}
