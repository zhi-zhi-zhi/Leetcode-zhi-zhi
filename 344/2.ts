class FrequencyTracker {
  frequencyMap: Map<number, number>
  numberMap: Map<number, number>
  constructor() {
    this.frequencyMap = new Map()
    this.numberMap = new Map()
  }

  add(number: number): void {
    this.numberMap.set(number, (this.numberMap.get(number) ?? 0) + 1)
    this.frequencyMap.set(this.numberMap.get(number) - 1,
      (this.frequencyMap.get(this.numberMap.get(number) - 1) ?? 1) - 1)

    this.frequencyMap.set(this.numberMap.get(number),
      (this.frequencyMap.get(this.numberMap.get(number)) ?? 0) + 1)
  }

  deleteOne(number: number): void {
    if (!(this.numberMap.get(number) > 0)) return

    this.numberMap.set(number, this.numberMap.get(number) - 1)
    this.frequencyMap.set(this.numberMap.get(number),
      (this.frequencyMap.get(this.numberMap.get(number)) ?? 0) + 1)

    this.frequencyMap.set(this.numberMap.get(number) + 1,
      (this.frequencyMap.get(this.numberMap.get(number) + 1) ?? 1) - 1)
  }

  hasFrequency(frequency: number): boolean {
    return this.frequencyMap.get(frequency) > 0
  }
}

/**
 * Your FrequencyTracker object will be instantiated and called as such:
 * var obj = new FrequencyTracker()
 * obj.add(number)
 * obj.deleteOne(number)
 * var param_3 = obj.hasFrequency(frequency)
 */
