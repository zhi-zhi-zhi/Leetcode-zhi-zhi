function findArray(pref: number[]): number[] {
  const n = pref.length
  const arr = Array(n).fill(0)

  arr[0] = pref[0]

  // pres[i] ^ arr[i-1]= arr[i-1] ^ arr[i] & arr[i-1]
  for (let i = 1; i < n; i++) {
    arr[i] = pref[i] ^ pref[i-1]
  }

  return arr
}
