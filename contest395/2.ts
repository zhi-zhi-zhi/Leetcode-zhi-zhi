/**
 * 3 <= nums1.length <= 200
 * nums2.length == nums1.length - 2
 * 0 <= nums1[i], nums2[i] <= 1000
 * 测试用例以这样的方式生成：存在一个整数 x，nums1 中的每个元素都与 x 相加后，再移除两个元素，nums1 可以与 nums2 相等。
 *
 * @param nums1
 * @param nums2
 */
function minimumAddedInteger(nums1: number[], nums2: number[]): number {
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)
  const res = []

  tryAnswer(nums2[0] - nums1[0])
  tryAnswer(nums2[0] - nums1[1])
  tryAnswer(nums2[0] - nums1[2])

  res.sort((a, b) => a - b)
  return res[0]

  function tryAnswer(x: number) {
    const len = findCommonElements(nums1.map(num => num + x), nums2).length

    if (len === nums2.length) res.push(x)
  }
};


function findCommonElements(arr1: number[], arr2: number[]): number[] {
  // 双指针
  let pointer1: number = 0;
  let pointer2: number = 0;
  const commonElements: number[] = [];

  while (pointer1 < arr1.length && pointer2 < arr2.length) {
    if (arr1[pointer1] === arr2[pointer2]) {
      commonElements.push(arr1[pointer1]);
      pointer1++;
      pointer2++;
    } else if (arr1[pointer1] < arr2[pointer2]) {
      pointer1++;
    } else {
      pointer2++;
    }
  }

  return commonElements;
}
