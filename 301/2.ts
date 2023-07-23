class PriorityQueue<T> {
  private readonly arr: T[];
  /**
   * 小顶堆：(a, b) => a - b
   * 大顶堆：(a, b) => b - a
   */
  private compareFunc: (a: T, b: T) => number;

  constructor(compareFunc: (a: T, b: T) => number) {
    this.arr = [];
    this.compareFunc = compareFunc;
  }

  size(): number {
    return this.arr.length;
  }

  getArr(): T[] {
    return this.arr;
  }

  top(): T | undefined {
    return this.arr.length > 0 ? this.arr[0] : undefined;
  }

  add(val: T) {
    const { arr, compareFunc } = this;
    arr.push(val);
    percolateUp();

    /**
     * 自底向上冒泡
     * @param start
     * @param end
     */
    function percolateUp(start: number = arr.length - 1, end: number = 0) {
      if (start <= end) return;

      const originalChildValue = arr[start];
      let childIndex = start;
      let parentIndex = Math.floor((start - 1) / 2);

      while (parentIndex >= end && compareFunc(arr[parentIndex], originalChildValue) >= 0) {
        arr[childIndex] = arr[parentIndex];
        childIndex = parentIndex;
        parentIndex = Math.floor((parentIndex - 1) / 2);
      }

      arr[childIndex] = originalChildValue;
    }
  }

  deleteTop(): T | undefined {
    const { arr } = this;

    if (arr.length === 0) return undefined;
    else if (arr.length === 1) return arr.pop();

    const res = this.arr[0];
    // @ts-ignore
    arr[0] = arr.pop();
    this.percolateDown();

    return res;
  }

  /**
   * 替换堆顶元素
   */
  replaceTopAndAdjustment(val: T) {
    const { arr } = this;
    if (arr.length === 0)
      return;

    arr[0] = val;
    this.percolateDown();
  }

  // static from<T>(val: T[]): PriorityQueue<T> {
  //   const
  // }

  private percolateDown(start: number = 0, end: number = this.arr.length - 1) {
    if (end <= start) return;

    const { arr, compareFunc } = this;

    const originalParentVal = this.arr[start];
    let parentIndex = start,
      childIndex = parentIndex * 2 + 1;

    while (childIndex <= end) {
      // find the fit index between left child and right child
      if (childIndex + 1 <= end && compareFunc(arr[childIndex], arr[childIndex + 1]) >= 0) {
        childIndex++;
      }

      if (compareFunc(originalParentVal, arr[childIndex]) >= 0) {
        arr[parentIndex] = arr[childIndex];
        parentIndex = childIndex;
        childIndex = childIndex * 2 + 1;
      } else {
        break;
      }
    }

    arr[parentIndex] = originalParentVal;
  }
}


class SmallestInfiniteSet {
  set: Set<number>;
  queue: PriorityQueue<number>;
  maxQueue: PriorityQueue<number>

  constructor() {
    this.set = new Set();
    this.queue = new PriorityQueue<number>((a, b) => a - b);
    this.maxQueue = new PriorityQueue<number>((a, b) => b - a);
    this.maxQueue.add(1)
    this.queue.add(1);
    this.set.add(1);
  }

  popSmallest(): number {
    const res = this.queue.deleteTop()!;
    this.set.delete(res);

    if (this.queue.size() === 0) {
      this.queue.add(res + 1);
      this.set.add(res + 1);
      this.maxQueue.add(res + 1)
    }

    return res;
  }

  addBack(num: number): void {
    if (!this.set.has(num)) {
      if (num < this.maxQueue.top()!) {
        this.queue.add(num);
        this.set.add(num)
      }
    }
  }
}

// @ts-ignore
// @ts-ignore
/**
 * Your SmallestInfiniteSet object will be instantiated and called as such:
 * var obj = new SmallestInfiniteSet()
 * var param_1 = obj.popSmallest()
 * obj.addBack(num)
 */
// var obj = new SmallestInfiniteSet()
// var param_1 = obj.popSmallest()
// obj.addBack(608)
// obj.popSmallest()
// obj.addBack(4)
// obj.popSmallest()

// @ts-ignore
// const a = ["addBack","addBack","addBack","popSmallest","popSmallest","addBack","popSmallest","addBack","popSmallest","popSmallest","addBack","addBack","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","addBack","addBack","popSmallest","addBack","addBack","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","addBack","addBack","addBack","addBack","addBack","addBack","addBack","addBack","addBack","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","addBack","popSmallest","addBack","popSmallest","popSmallest","addBack","addBack","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","addBack","addBack","addBack","popSmallest","addBack","addBack","addBack","addBack","addBack","addBack","popSmallest","addBack","addBack","addBack","addBack","addBack","addBack","addBack","addBack","addBack","addBack","addBack","addBack","popSmallest","addBack","popSmallest","addBack","popSmallest","addBack","popSmallest","addBack","addBack","addBack","popSmallest","popSmallest","addBack","popSmallest","addBack","addBack","addBack","addBack","popSmallest","addBack","addBack","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","popSmallest","popSmallest","popSmallest","popSmallest","addBack","popSmallest","addBack","addBack","addBack","popSmallest","popSmallest","addBack","popSmallest","addBack","popSmallest","addBack","popSmallest","popSmallest","addBack","addBack","popSmallest","addBack","popSmallest","addBack","addBack","popSmallest","addBack","popSmallest","popSmallest","popSmallest","addBack","addBack","popSmallest","popSmallest","addBack","addBack","popSmallest","popSmallest","addBack","popSmallest","addBack","popSmallest","addBack","popSmallest","popSmallest","addBack","addBack","popSmallest","addBack","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","popSmallest","addBack","addBack","popSmallest","popSmallest","addBack","popSmallest","addBack","popSmallest","addBack","addBack","popSmallest","addBack","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","popSmallest","addBack","popSmallest","popSmallest","popSmallest","addBack","addBack","addBack","addBack","popSmallest","addBack","addBack","addBack","popSmallest","addBack","popSmallest","addBack","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","addBack","addBack","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","addBack","addBack","addBack","addBack","addBack","popSmallest","addBack","popSmallest","popSmallest","addBack","addBack","popSmallest","addBack","addBack","popSmallest","addBack","addBack","addBack","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","popSmallest","addBack","popSmallest","addBack","popSmallest","popSmallest","popSmallest","addBack","addBack","addBack","popSmallest","addBack","popSmallest","addBack","popSmallest","popSmallest","addBack","popSmallest","popSmallest","addBack","addBack","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","addBack","popSmallest","addBack","addBack","popSmallest","popSmallest","addBack","addBack","addBack","addBack","popSmallest","addBack","addBack","addBack","popSmallest","popSmallest","addBack","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","addBack","addBack","addBack","addBack","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","addBack","addBack","popSmallest","addBack","popSmallest","addBack","popSmallest","popSmallest","addBack","popSmallest","addBack","addBack","addBack","popSmallest","popSmallest","addBack","addBack","addBack","addBack","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","addBack","popSmallest","addBack","popSmallest","addBack","addBack","addBack","popSmallest","popSmallest","popSmallest","addBack","popSmallest","addBack","addBack","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","popSmallest","popSmallest","addBack","addBack","popSmallest","popSmallest","addBack","popSmallest","addBack","addBack","addBack","addBack","popSmallest","popSmallest","addBack","addBack","addBack","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","popSmallest","addBack","popSmallest","addBack","popSmallest","addBack","addBack","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","addBack","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","popSmallest","addBack","addBack","addBack","addBack","popSmallest","popSmallest","addBack","addBack","addBack","popSmallest","addBack","popSmallest","popSmallest","addBack","popSmallest","addBack","addBack","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","addBack","addBack","addBack","popSmallest","popSmallest","addBack","addBack","popSmallest","addBack","addBack","popSmallest","addBack","popSmallest","addBack","addBack","addBack","addBack","addBack","addBack","popSmallest","popSmallest","addBack","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","addBack","addBack","addBack","addBack","addBack","popSmallest","popSmallest","popSmallest","addBack","popSmallest","addBack","addBack","addBack","popSmallest","addBack","popSmallest","popSmallest","addBack","addBack","popSmallest","addBack","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","addBack","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","addBack","popSmallest","addBack","addBack","addBack","addBack","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","popSmallest","addBack","addBack","popSmallest","addBack","popSmallest","addBack","addBack","addBack","addBack","addBack","addBack","addBack","popSmallest","popSmallest","addBack","addBack","popSmallest","addBack","addBack","popSmallest","addBack","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","addBack","addBack","popSmallest","popSmallest","addBack","addBack","addBack","popSmallest","addBack","popSmallest","popSmallest","popSmallest","addBack","addBack","popSmallest","addBack","addBack","addBack","addBack","popSmallest","popSmallest","addBack","popSmallest","addBack","popSmallest","addBack","addBack","addBack","addBack","addBack","addBack","addBack","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","addBack","addBack","popSmallest","addBack","addBack","popSmallest","popSmallest","addBack","addBack","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","popSmallest","addBack","popSmallest","popSmallest","addBack","addBack","popSmallest","addBack","popSmallest","addBack","popSmallest","popSmallest","addBack","addBack","popSmallest","popSmallest","addBack","popSmallest","addBack","addBack","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","popSmallest","addBack","addBack","addBack","popSmallest","popSmallest","addBack","addBack","addBack","addBack","popSmallest","popSmallest","popSmallest","addBack","addBack","addBack","addBack","addBack","addBack","addBack","popSmallest","addBack","popSmallest","addBack","addBack","popSmallest","popSmallest","addBack","addBack","addBack","addBack","addBack","addBack","popSmallest","addBack","addBack","addBack"]
//  const b = [[84],[550],[88],[],[],[152],[],[413],[],[],[359],[33],[],[321],[],[],[],[],[],[],[],[],[827],[839],[618],[165],[],[89],[783],[708],[],[],[],[],[],[],[816],[],[],[],[],[],[],[869],[34],[707],[841],[957],[485],[527],[109],[254],[799],[442],[],[],[],[318],[],[],[980],[],[202],[],[],[993],[119],[],[],[188],[],[],[],[855],[],[],[],[],[],[630],[],[],[],[],[435],[67],[681],[396],[73],[],[218],[179],[868],[157],[435],[334],[],[514],[883],[641],[325],[60],[926],[67],[667],[709],[134],[763],[534],[],[899],[],[389],[],[24],[],[769],[473],[51],[],[],[479],[],[471],[991],[787],[288],[],[599],[455],[],[],[],[],[785],[991],[],[],[],[],[663],[],[990],[484],[246],[],[],[356],[],[618],[],[90],[],[],[27],[466],[],[493],[],[579],[170],[],[42],[],[],[],[645],[710],[],[],[458],[464],[],[],[418],[],[753],[],[441],[],[],[820],[395],[],[731],[19],[],[],[],[],[],[],[],[],[941],[917],[],[865],[537],[],[],[52],[],[604],[],[963],[862],[],[162],[],[],[89],[],[],[],[],[],[],[115],[691],[],[807],[],[],[],[529],[846],[529],[255],[],[799],[395],[759],[],[717],[],[728],[483],[],[],[],[],[],[],[],[],[140],[462],[537],[287],[],[],[],[180],[],[],[],[305],[856],[636],[561],[178],[],[660],[],[],[703],[578],[],[902],[99],[],[477],[259],[768],[],[726],[],[],[],[],[68],[463],[],[984],[],[511],[],[],[],[401],[106],[91],[],[671],[],[233],[],[],[94],[],[],[777],[451],[],[],[],[868],[],[],[133],[],[249],[128],[],[],[942],[991],[406],[886],[],[55],[470],[247],[],[],[943],[68],[],[],[],[],[],[],[],[],[108],[488],[685],[315],[832],[952],[],[],[208],[],[],[],[460],[],[],[],[189],[437],[],[642],[],[316],[],[],[356],[],[138],[628],[520],[],[],[771],[42],[549],[751],[17],[],[],[],[],[],[],[13],[],[],[],[270],[],[210],[],[764],[27],[419],[],[],[],[957],[],[996],[546],[32],[],[],[],[],[],[10],[412],[],[],[690],[220],[],[],[873],[],[219],[296],[647],[936],[],[],[56],[946],[897],[],[579],[],[],[],[],[333],[],[],[],[],[92],[212],[],[80],[],[289],[],[494],[907],[],[],[512],[],[],[],[],[552],[745],[874],[633],[],[],[],[],[],[656],[],[989],[479],[797],[807],[],[],[509],[280],[591],[],[3],[],[],[16],[],[796],[726],[],[],[125],[],[],[],[217],[908],[58],[],[],[432],[692],[],[23],[512],[],[554],[],[249],[953],[662],[143],[808],[627],[],[],[255],[],[952],[],[],[],[],[467],[],[],[852],[41],[302],[730],[644],[],[],[],[383],[],[510],[540],[194],[],[558],[],[],[676],[662],[],[940],[],[],[],[312],[],[],[93],[],[434],[],[],[],[],[150],[],[338],[575],[731],[710],[610],[],[],[],[],[],[],[],[938],[563],[],[],[],[734],[],[],[245],[],[],[],[],[],[173],[],[],[],[],[439],[],[],[],[451],[],[],[],[],[924],[],[],[],[],[],[33],[498],[],[80],[296],[],[391],[],[39],[522],[487],[119],[940],[999],[337],[],[],[406],[696],[],[493],[642],[],[841],[],[],[369],[],[],[],[],[],[396],[],[],[20],[328],[],[],[158],[751],[686],[],[233],[],[],[],[595],[984],[],[676],[101],[75],[397],[],[],[128],[],[242],[],[76],[526],[956],[377],[477],[957],[335],[],[],[],[],[622],[815],[381],[490],[],[908],[231],[],[],[504],[767],[419],[],[],[],[],[],[],[],[],[],[23],[],[408],[],[],[760],[730],[],[319],[],[605],[],[],[939],[638],[],[],[250],[],[513],[903],[],[],[251],[],[],[],[],[],[],[649],[5],[152],[],[],[716],[873],[120],[153],[],[],[],[312],[747],[533],[168],[289],[44],[168],[],[778],[],[971],[883],[],[],[901],[886],[931],[529],[71],[186],[],[805],[919],[670]]
// // b.forEach((arr, index) => {
// //   console.log(arr, index);
// // })
//
// const obj = new SmallestInfiniteSet()
// // @ts-ignore
// a.forEach((func, index) => {
//   if (index === 738)
//     debugger
//   // @ts-ignore
//   // @ts-ignore
//   const res = obj[func].apply(obj, b[index])
//   // @ts-ignore
//   // if (res === 43)
//   //   console.log(index)
//   // @ts-ignore
//   // if (b[index].toString() === 86)
//   //   console.log(index);
//   console.log(res);
//   // if (res === 168)
//   //   console.log(index);
//   // if (b[index].length === 0 && b[index][0] === 86)
// })


