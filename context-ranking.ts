import axios from 'axios'
// @ts-ignore
import dayjs from 'dayjs'


const fs = require('fs')
// const LEETCODE_CN = 'https://leetcode-cn.com/contest/api/ranking/weekly-contest-270/?pagination=2&region=global'
const WEEK_COUNTS = 284

async function handleGetRankOfUsers(userList: any[]) {
  const promiseList: any[] = []
  const PAGINATION_AMOUNT = 518

  for (let i = 1; i <= PAGINATION_AMOUNT; i++) {
    setTimeout(async() => {
      console.log(i)
      promiseList.push(axios.get(`https://leetcode.com/contest/api/ranking/weekly-contest-${WEEK_COUNTS}/?pagination=${i}&region=global`, {
        timeout: 10000
      }).catch(e => {
        console.log(i, 'gg')
      }))
      // promiseList.push(axios.get(`https://leetcode-cn.com/contest/api/ranking/weekly-contest-270/?pagination=${i}&region=global`))
      if (i === PAGINATION_AMOUNT) await match()
    }, i * 1000)
  }

  async function match() {
    console.log('wait')
    const result = await Promise.all(promiseList)
    console.log('end')
    const matchResult: any[] = []

    const data = result.reduce((allRank, item) => allRank.concat(item?.data.total_rank ?? []), [])
    fs.writeFile(`./${WEEK_COUNTS}-weekly-contest.json`, JSON.stringify(data), (err: any) => {
      if (err) {
        console.error(err)
        return
      }
      //文件写入成功。
    })
    data.forEach((rankRecord: any) => {
      const index = userList.findIndex(user => user.username === rankRecord.username)
      if (index !== -1) {
        matchResult.push({
          name: userList[index].name,
          username: rankRecord.username,
          score: rankRecord.score,
          rank: rankRecord.rank,
          // @ts-ignore
          finishTime: dayjs.unix(rankRecord.finish_time).format('YYYY-MM-DD HH:mm:ss')
        })

        userList.splice(index, 1)
      }
    })

    matchResult.forEach(user => {
      console.log(`name: ${user.name}, username: ${user.username}, score: ${user.score}, rank: ${user.rank}, finishTime: ${user.finishTime}`)
    })
    userList.forEach(user => {
      console.log(`name: ${user.name}, username: ${user.username}, description: 无成绩`)
    })
  }
}

const userList = [
  {
    username: 'zhi-zhi',
    name: '谭强',
  }, {
    username: 'evilc',
    name: '刘雨鑫'
  }, {
    username: 'already_taken',
    name: '苏腾'
  }, {
    username: 'JiangZStar',
    name: '蒋其鑫'
  }, {
    username: 'IcingPig',
    name: '朱斌'
  }, {
    username: 'pqqin',
    name: '潘琴'
  }]

handleGetRankOfUsers(userList)
  .then(r => {/* do nothing */
  })