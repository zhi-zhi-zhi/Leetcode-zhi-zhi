function discountPrices(sentence: string, discount: number): string {
  const wordsArr = sentence.split(' ')

  wordsArr.forEach((word, index) => {
    if (word.length < 2 || word[0] !== '$')
      return
    const numStr = word.substring(1)
    for (const digit of numStr)
      if (digit < '0' || digit > '9')
        return

    const num = Number.parseInt(numStr)
    wordsArr[index] = `\$${(num - (discount) / 100 * num).toFixed(2)}`
  })

  return wordsArr.join(' ')
};

// discountPrices("there are $1 $2 and 5$ candies in the shop", 50)