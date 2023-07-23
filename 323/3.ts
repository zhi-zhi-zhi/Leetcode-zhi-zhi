class Allocator {
  memory: number[];

  constructor(n: number) {
    this.memory = Array(n).fill(-1);
  }

  allocate(size: number, mID: number): number {
    for (let i = 0; i < this.memory.length; i++) {
      if (this.memory[i] !== -1) continue;

      let temp = i, flag = false;
      let j = 0;
      while (j < size) {
        if (this.memory[temp + j] !== -1) {
          flag = true;
          break;
        }
        j++;
      }

      if (flag) {
        i = temp + j - 1;
        continue;
      }

      for (let j = 0; j < size; j++) {
        this.memory[temp + j] = mID;
      }

      return temp;
    }

    return -1
  }

  free(mID: number): number {
    let count = 0;
    for (let i = 0; i < this.memory.length; i++) {
      if (this.memory[i] === mID) {
        count++;
        this.memory[i] = -1;
      }
    }
    return count;
  }
}

/**
 * Your Allocator object will be instantiated and called as such:
 * var obj = new Allocator(n)
 * var param_1 = obj.allocate(size,mID)
 * var param_2 = obj.free(mID)
 */
