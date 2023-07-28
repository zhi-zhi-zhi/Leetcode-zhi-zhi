function maxPalindromes(s, k) {

}

// javascript implementation of the approach
var N = 100

// Pre-processing function
function pre_process(dp, s) {

  // Get the size of the string
  var n = s.length

  // Initially mark every
  // position as false
  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      dp[i][j] = false
    }
  }

  // For the length
  for (j = 1; j <= n; j++) {

    // Iterate for every index with
    // length j
    for (i = 0; i <= n - j; i++) {

      // If the length is less than 2
      if (j <= 2) {

        // If characters are equal
        if (s[i] == s[i + j - 1]) {
          dp[i][i + j - 1] = true
        }
      }
      // Check for equal
      else if (s[i] == s[i + j - 1]) {
        dp[i][i + j - 1] = dp[i + 1][i + j - 2]
      }
    }
  }
}

// Function to return the number of pairs
function countPairs(s) {
  // Create the dp table initially
  var dp = Array(N).fill().map(() => Array(N).fill(false))
  pre_process(dp, s)
  var n = s.length

  // Declare the left array
  var left = Array(n).fill(0)

  // Declare the right array
  var right = Array(n).fill(0)

  // Initially left[0] is 1
  left[0] = 1

  // Count the number of palindrome
  // pairs to the left
  for (i = 1; i < n; i++) {

    for (j = 0; j <= i; j++) {

      if (dp[j][i] == true) {
        left[i]++
      }
    }
  }

  // Initially right most as 1
  right[n - 1] = 1

  // Count the number of palindrome
  // pairs to the right
  for (i = n - 2; i >= 0; i--) {

    right[i] = right[i + 1]

    for (j = n - 1; j >= i; j--) {

      if (dp[i][j] == true) {
        right[i]++
      }
    }
  }

  var ans = 0

  // Count the number of pairs
  for (i = 0; i < n - 1; i++) {
    ans += left[i] * right[i + 1]
  }

  return ans
}

// Driver code

var s = "abacaba"
console.log(countPairs(s))

// This code is contributed by todaysgaurav
