// micro and macro task 执行机制
// 首先执行 macro task 队列中的第一个，在这里就是当前文件
// 在当前 macro task 的执行过程中，所有遇到的 micro task 放入队列，macro 同样放入队列
// 当前 macro task 执行完后
// 清空 micro task queue，在清空的过程中所有遇到的 micro 和 macro 同样放入队列
// 清完完后，再从 macro task queue 中取对头，周而复始
// import Promise from './MyPromise.js'


// @ts-ignore
// const Promise = require('./MyPromise.js')

// pr0F p0P pr1P p1P p2P p3P p4P p5P
// micro queue: 0, 1
// console.log:
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxF
// micro queue: 1, xx.then( => fulfill p0)
// console.log: 0
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxF
// micro queue: xx.then(() => fulfill p0) 2
// console.log: 0, 1

// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxF
// micro queue: 2, () => fulfill p0
// console.log: 0, 1
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxF
// micro queue: () => fulfill p0, 3
// console.log: 0, 1, 2
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxF
// micro queue: 3, 4
// console.log: 0, 1, 2
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxF
// micro queue: 4, 5
// console.log: 0, 1, 2, 3
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxF
// micro queue: 5
// console.log: 0, 1, 2, 3, 4
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxF
// micro queue:
// console.log: 0, 1, 2, 3, 4, 5

// pr0F p0P pr1P p1P p2P p3P p4P p5P
// micro queue: 0, 1
// console.log:
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxP
// micro queue: 1, fulfill xx, xx.then( => fulfill p0)
// console.log: 0
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxP
// micro queue: () => fulfill xx, xx.then( => fulfill p0), 2
// console.log: 0, 1
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxF
// micro queue: xx.then( => fulfill p0), 2
// console.log: 0, 1
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxF
// micro queue: 2, () => fulfill p0
// console.log: 0, 1
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxF
// micro queue: () => fulfill p0, 3
// console.log: 0, 1, 2
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxF
// micro queue: 3, 4
// console.log: 0, 1, 2
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxF
// micro queue: 4, 5
// console.log: 0, 1, 2, 3
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxF
// micro queue: 5
// console.log: 0, 1, 2, 3, 4
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P  xxF
// micro queue:
// console.log: 0, 1, 2, 3, 4, 5





// pr0F p0P pr1P p1P p2P p3P p4P p5P
// micro queue: 0, 1
// console.log:
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P xF xxP xxxP
// micro queue: 1, () => fulfill xx, xxx.then(() => fulfill p0)
// console.log: 0
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P xF xxP xxxP
// micro queue: () => fulfill xx, xxx.then( => fulfill p0), 2
// console.log: 0, 1
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P xF xxF xxxP
// micro queue: xxx.then(() => fulfill p0), 2, () => fulfill xxx,
// console.log: 0, 1
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P xF xxF xxxP
// micro queue: 2, () => fulfill xxx,
// console.log: 0, 1
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P xF xxF xxxP
// micro queue: () => fulfill xxx, 3
// console.log: 0, 1, 2
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P xF xxF xxxF
// micro queue: 3, () => fulfill p0
// console.log: 0, 1, 2
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P xF xxF xxxF
// micro queue: () => fulfill p0, 5
// console.log: 0, 1, 2, 3
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P xF xxF xxxF
// micro queue: 5, 4
// console.log: 0, 1, 2, 3
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P xF xxF xxxF
// micro queue: 4
// console.log: 0, 1, 2, 3, 5
//
// pr0F p0P pr1P p1P p2P p3P p4P p5P xF xxF xxxF
// micro queue: 4
// console.log: 0, 1, 2, 3, 4,
//



Promise
.resolve()
.then(() => {
  console.log(0)

  return Promise.resolve(4)
  // return Promise.resolve().then(() => 4)
  // return Promise.resolve().then().then(() => 4)
}).then((res) => {
  console.log(res)
})

Promise
.resolve()
.then(() => {
  console.log(1)
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(5)
})


//
// let a, b, c, d, e, f, g, h ,i
//
// // macro task queue: [current file]
// // micro task queue: []
// //
// a = Promise.resolve()
// // console.log(a, b, c, d, e, f, g, h , i)
// b = Promise.resolve()
// // console.log(a, b, c, d, e, f, g, h , i)
//
//
// c = a.then(() => {
//   console.log(0)
//   // e =
//   // macro task queue: []
//   // micro task queue: [b, e]
//   // console.log(a, b, c, d, e, f, g, h , i)
//   // return 4
//   return Promise.resolve(4)
//   return Promise.resolve(4).then(a => 4)
//   // return Promise.resolve(4).then(a => 4).then(() => 4)
// })
//
// d = b.then(() => {
//   console.log(1)
//   // macro task queue: []
//   // micro task queue: [e, d]
//   // console.log(a, b, c, d, e, f, g, h , i)
// })
//
//
// f = c.then(res => {
//   console.log(res)
//   // console.log(a, b, c, d, e, f, g, h , i)
// })
//
// g = d.then(() => {
//   console.log(2)
//   // console.log(a, b, c, d, e, f, g, h , i)
// })
//
// h = g.then(() => {
//   console.log(3)
//   // console.log(a, b, c, d, e, f, g, h , i)
// })
//
// i = h.then(() => {
//   console.log(5)
//   // console.log(a, b, c, d, e, f, g, h , i)
// })
// i.then(() => {
//   console.log(6)
// })
// // 1.


// 2.
// macro task queue: []
// micro task queue: [0, 1]

// 3.
// macro task queue: []
// micro task queue: [resolve4, 2]

// 3.
// macro task queue: []
// micro task queue: [resolve4, 2]

// 4.
// macro task queue: []
// micro task queue: [4, 3]

// 4.
// macro task queue: []
// micro task queue: [5]