class TextEditor {
  cursor: number
  stack1: string[]
  stack2: string[]

  constructor() {
    /**
     * 特点：频繁的增删、移动操作
     * 要求：增删、移动时间复杂度，在 log(n) 级别
     */
    this.cursor = 0
    this.stack1 = []
    this.stack2 = []
  }

  addText(text: string): void {
    this.stack1.push(...Array.from(text))
  }

  deleteText(k: number): number {
    const { stack1 } = this
    const n = stack1.length

    return stack1.splice(Math.max(0, n - k), k).length
  }

  cursorLeft(k: number): string {
    const { stack1, stack2 } = this
    while (k-- > 0 && stack1.length > 0)
      stack2.push(stack1.pop()!)
    const n = stack1.length
    // return stack1.slice(Math.max(0, n - Math.min(10, k))).join('')
    return stack1.slice(n > 10 ? n - 10 : 0).join('')
  }

  cursorRight(k: number): string {
    const { stack1, stack2 } = this
    while (k-- > 0 && stack2.length > 0)
      stack1.push(stack2.pop()!)
    const n = stack1.length
    return stack1.slice(n > 10 ? n - 10 : 0).join('')
  }
}

/**
 * Your TextEditor object will be instantiated and called as such:
 * var obj = new TextEditor()
 * obj.addText(text)
 * var param_2 = obj.deleteText(k)
 * var param_3 = obj.cursorLeft(k)
 * var param_4 = obj.cursorRight(k)
 */
//
