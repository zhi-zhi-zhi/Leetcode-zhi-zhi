/**
 * 实现TaskQueue
 */

class AsyncControl {
  /**
   * promise 队列
   */
    // @ts-ignore
  queue: Promise[]
  /**
   * 当前执行个数
   */
  count: number
  /**
   * 同时执行限制个数
   */
  limit: number

  constructor(limit: number) {
    this.limit = limit
    this.queue = []
    this.count = 0
  }


  /**
   * parameter promiseArray: 待执行的 promise 个数
   */
  // @ts-ignore
  sendPromise(promiseArray: Promise[]) {
    this.queue.push(...promiseArray)
    this.handleQueue()
  }

  private handleQueue() {
    if (this.queue.length === 0) return

    let canExecuteCount = Math.min(this.limit - this.count, this.queue.length)
    this.count = this.count + canExecuteCount

    for (let i = 0; i < canExecuteCount; i++) {
      const task = this.queue.shift()

      task().then((val) => {
        console.log(val)
      }, (error) => {
        console.log(error)
      }).finally(() => {
        // 释放资源
        this.count--
        this.handleQueue()
      })
    }
  }
}

const asyncControl = new AsyncControl(10)

const testQueue = []

for (let i = 0; i < 20; i++) {
  testQueue.push(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve((20 - i) * 100)
      }, (20 - i) * 100)
    })
  })
}

asyncControl.sendPromise(testQueue)

