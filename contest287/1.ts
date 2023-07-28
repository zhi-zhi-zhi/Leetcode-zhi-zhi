/**
 * @param {string} current
 * @param {string} correct
 * @return {number}
 */
var convertTime = function(current, correct) {
  let diff = (parseInt(correct.substring(0,2)) - parseInt(current.substring(0, 2))) * 60
  + (parseInt(correct.substring(3)) - parseInt(current.substring(3)))

  let res = 0
  res += Math.trunc(diff / 60)
  diff %= 60
  res += Math.trunc(diff / 15)
  diff %= 15
  res += Math.trunc(diff / 5)
  diff %= 5
  res += diff

  return res
};