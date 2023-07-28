class StreamChecker {
  // noinspection TypeScriptFieldCanBeMadeReadonly
  private streamCharList: any[]
  // noinspection TypeScriptFieldCanBeMadeReadonly
  private obj: any

  constructor(words: string[]) {
    // index tree
    this.obj = {}
    this.streamCharList = []

    words.forEach(word => {
      word.split('').reverse()
        .reduce((obj, char, index, src) => {
          if (obj === false) return false

          if (obj.hasOwnProperty(char)) {
            if (obj[char].hasNext === false) {
              // pseudo break
              return false
            } else {
              if (index === src.length - 1) {
                obj[char] = {
                  hasNext: false
                }
                // return obj[char];
              } else {
                // return obj[char];
              }
            }
          } else {
            obj[char] = {
              hasNext: index !== src.length - 1
            }

            // return obj[char];
          }

          return obj[char]
        }, this.obj)
    })
  }

  query(letter: string): boolean {
    this.streamCharList.push(letter)
    let obj = this.obj

    for (let i = this.streamCharList.length - 1; i >= 0; i--) {
      const curChar = this.streamCharList[i]

      if (obj.hasOwnProperty(curChar)) {
        if (obj[curChar].hasNext === false) {
          return true
        } else {
          obj = obj[curChar]
        }
      } else {
        return false
      }
    }

    return false
  }
}

// const obj = new StreamChecker(["cd","bcd","d","xyz","bayz","ayz",'xaz']);
// const testQueryArr = ["a","b","c","d","e","f","g","h","i","j","k","l"]
// testQueryArr.forEach(char => {
//   console.log(obj.query(char))
// })
/**
 * Your StreamChecker object will be instantiated and called as such:
 * var obj = new StreamChecker(words)
 * var param_1 = obj.query(letter)
 */