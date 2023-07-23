interface Food {
  food: string;
  rating: number;
}

/**
 * 线段树类
 * @param {number[]} nums
 */
var SeqTree = function (nums: Food[]) {
  this.nums = nums;
  this.tree = new Array(4 * nums.length).fill(undefined) as Food[];
  this.build(0, 0, nums.length - 1);
};

/**
 * 建树方法
 * @param {*} node 当前树节点
 * @param {*} start 当前树节点涵盖范围的起点
 * @param {*} end 当前树节点涵盖范围的终点
 * @return {void}
 */
SeqTree.prototype.build = function (node: number, start: number, end: number) {
  if (start === end) {
    this.tree[node] = this.nums[start];
    return;
  }
  const mid = start + Math.floor((end - start) / 2);
  const leftNode = 2 * node + 1;
  const rightNode = 2 * node + 2;
  this.build(leftNode, start, mid);
  this.build(rightNode, mid + 1, end);
  // this.tree[node] = this.tree[leftNode] + this.tree[rightNode];
  if (this.tree[leftNode].rating === this.tree[rightNode].rating) {
    if (this.tree[leftNode].food < this.tree[rightNode].food) {
      this.tree[node] = { ...this.tree[leftNode] };
    } else {
      this.tree[node] = { ...this.tree[rightNode] };
    }
  } else {
    if (this.tree[leftNode].rating > this.tree[rightNode].rating) {
      this.tree[node] = { ...this.tree[leftNode] };
    } else {
      this.tree[node] = { ...this.tree[rightNode] };
    }
  }
};

/**
 * 对外使用的更新方法
 * @param {number} index 需要修改的节点下标
 * @param {number} val 需要修改的数值
 * @return {void}
 */
SeqTree.prototype.update = function (index: number, val: Food) {
  this.change(0, 0, this.nums.length - 1, index, val);
};

/**
 * 更新树节点
 * @param {*} node 当前树节点
 * @param {*} start 涵盖范围的起点
 * @param {*} end 涵盖范围的终点
 * @param {*} idx 需要修改的节点下标
 * @param {*} val 需要修改的数值
 * @return {void}
 */
SeqTree.prototype.change = function (node: number, start: number, end: number, idx: number, val: Food) {
  if (start === end) {
    this.tree[node] = val;
  } else if (idx < start || end < idx) {
    return;
  } else {
    const mid = start + Math.floor((end - start) / 2);
    const leftNode = 2 * node + 1;
    const rightNode = 2 * node + 2;
    if (start <= idx && idx <= mid) {
      this.change(leftNode, start, mid, idx, val);
    } else {
      this.change(rightNode, mid + 1, end, idx, val);
    }
    // this.tree[node] = this.tree[leftNode] + this.tree[rightNode];

    if (this.tree[leftNode].rating === this.tree[rightNode].rating) {
      if (this.tree[leftNode].food < this.tree[rightNode].food) {
        this.tree[node] = { ...this.tree[leftNode] };
      } else {
        this.tree[node] = { ...this.tree[rightNode] };
      }
    } else {
      if (this.tree[leftNode].rating > this.tree[rightNode].rating) {
        this.tree[node] = { ...this.tree[leftNode] };
      } else {
        this.tree[node] = { ...this.tree[rightNode] };
      }
    }
  }
};

// /**
//  * 对外使用的区间求和方法
//  * @param {number} left 查询区间的左节点
//  * @param {number} right 查询区间的右节点
//  * @return {number} 返回区间和
//  */
// SeqTree.prototype.sumRange = function (left: number, right: number) {
//   return this.query(0, 0, this.nums.length - 1, left, right);
// };

/**
 * 对外使用的区间最大值方法
 * @param {number} left 查询区间的左节点
 * @param {number} right 查询区间的右节点
 * @return {number} 返回区间和
 */
SeqTree.prototype.maxRange = function (left: number = 0, right: number = this.nums.length - 1) {
  return this.query(0, 0, this.nums.length - 1, left, right);
};

/**
 * 查询范围的最大值
 * @param {*} node 当前树节点
 * @param {*} start 涵盖范围的起点
 * @param {*} end 涵盖范围的终点
 * @param {*} l 查询区间的左节点
 * @param {*} r 查询区间的右节点
 * @return {number} 返回区间和
 */
SeqTree.prototype.query = function (node: number, start: number, end: number, l: number, r: number): Food {
  if (r < start || end < l) {
    return null;
  } else if (l <= start && end <= r) {
    return this.tree[node];
  } else {
    const mid = start + Math.floor((end - start) / 2);
    const leftNode = 2 * node + 1;
    const rightNode = 2 * node + 2;
    const leftMax = this.query(leftNode, start, mid, l, r);
    const rightMax = this.query(rightNode, mid + 1, end, l, r);

    if (leftMax.rating === rightMax.rating) {
      if (leftMax.food < rightMax.food) {
        // this.tree[node] = { ...this.tree[leftNode] }
        return leftMax;
      } else {
        // this.tree[node] = { ...this.tree[rightNode] }
        return rightMax;
      }
    } else {
      if (leftMax.rating > rightMax.rating) {
        // this.tree[node] = { ...this.tree[leftNode] }
        return leftMax;
      } else {
        // this.tree[node] = { ...this.tree[rightNode] }
        return rightMax;
      }
    }
  }
};

class FoodRatings {
  seqTreeMap: Map<string, typeof SeqTree>;
  foodToCuisineMap: Map<string, string>;
  foodToIndexMap: Map<string, number>;

  constructor(foods: string[], cuisines: string[], ratings: number[]) {
    const map = new Map<string, Food[]>();
    const foodToCuisineMap = new Map<string, string>()
    const foodToIndexMap = new Map<string, number>()
    for (let i = 0; i < foods.length; i++) {
      const food = foods[i], cuisine = cuisines[i], rating = ratings[i];
      foodToCuisineMap.set(food, cuisine)
      if (map.has(cuisine)) {
        const arr = map.get(cuisine)!
        arr.push({ food, rating})
        foodToIndexMap.set(food, arr.length - 1)
      } else {
        const arr = [{ food, rating }]
        map.set(cuisine, arr)
        foodToIndexMap.set(food, 0)
      }
    }
    this.foodToCuisineMap = foodToCuisineMap
    this.foodToIndexMap = foodToIndexMap

    // 建立线段树
    const seqTreeMap = new Map<string, typeof SeqTree>()
    for (const entry of Array.from(map.entries())) {
      seqTreeMap.set(entry[0], new SeqTree(entry[1]))
    }
    this.seqTreeMap = seqTreeMap
  }

  changeRating(food: string, newRating: number): void {
    const cuisine = this.foodToCuisineMap.get(food)

    if (cuisine) {
      const seqTree = this.seqTreeMap.get(cuisine)!
      const index = this.foodToIndexMap.get(food)!
      // @ignore
      seqTree.prototype.update.call(seqTree, index, { food, rating: newRating})
    }
  }

  highestRated(cuisine: string): string {
    const seqTree = this.seqTreeMap.get(cuisine)!
    return seqTree.prototype.maxRange.call(seqTree)
  }
}

/**
 * Your FoodRatings object will be instantiated and called as such:
 * var obj = new FoodRatings(foods, cuisines, ratings)
 * obj.changeRating(food,newRating)
 * var param_2 = obj.highestRated(cuisine)
 */
const foods = ["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"]
const cuisines = ["korean", "japanese", "japanese", "greek", "japanese", "korean"]
const ratings = [9, 12, 8, 15, 14, 7]
var obj = new FoodRatings(foods, cuisines, ratings)
console.log(obj.highestRated('korean'));
console.log(obj.highestRated('japanese'));
console.log(obj.highestRated('korean'));
console.log(obj.changeRating('sushi',16));
console.log(obj.highestRated('japanese'));
console.log(obj.changeRating('ramen',16));
console.log(obj.highestRated('japanese'));
