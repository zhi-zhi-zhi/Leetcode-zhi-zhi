import { log } from 'util'

function hardestWorker(n: number, logs: number[][]): number {
  let maxTime = -1
  let id = Number.MAX_SAFE_INTEGER

  let start = 0
  for (let i = 0; i < logs.length; i++) {
    if (logs[i][1] - start > maxTime) {
      id = logs[i][0]
      maxTime = logs[i][1] - start
    } else if (logs[i][1] - start === maxTime && logs[i][0] < id) {
      id = logs[i][0]
    }

    start = logs[i][1]
  }


  return id
}
