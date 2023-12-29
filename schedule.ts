const timeout = (time: number) => new Promise<number>((resolve, reject) => {
  setTimeout(() => resolve(time), time)
})

type PromiseCreator = {
  (...args: any[]): Promise<any>
}

class Schedule {
  taskRunningCount = 0
  queue = [] as PromiseCreator[]
  queueMap = new Map<PromiseCreator, {
    resolve: (arg: any) => void,
    reject: (err: any) => void,
    promise: Promise<any>
  }>()

  add<T extends PromiseCreator>(promiseCreator: T): ReturnType<T> {
    this.queue.push(promiseCreator)

    let resolve = null, reject = null
    const res = new Promise<any>((res, rej) => {
      resolve = res
      reject = rej
    }) as ReturnType<T>
    this.queueMap.set(promiseCreator, {
      resolve,
      reject,
      promise: res
    })

    this.flush()

    return res
  }


  private flush() {
    this.queue.forEach(promiseCreator => {
      const {resolve, reject} = this.queueMap.get(promiseCreator)!

      if (this.taskRunningCount < 2) {
        this.queue.shift()
        this.taskRunningCount++
        promiseCreator()
          .then((res) => {
            resolve(res)
            this.taskRunningCount--
            this.queueMap.delete(promiseCreator)
            this.flush()
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  }
}

const startTime = new Date()
const schedule = new Schedule()
const addTask = (time: number, order: any) => {
  schedule.add(() => {
    return timeout(time)
  })
    .then((res) => {
      console.log(res, order, '-- use time: ', new Date().valueOf() - startTime.valueOf())
    })
}

addTask(1000, 1)
addTask(500, 2)
addTask(300, 3)
addTask(600, 5)
addTask(100, 6)
addTask(400, 7)

