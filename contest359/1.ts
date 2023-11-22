function isAcronym(words: string[], s: string): boolean {
  return words.map(item => item[0]).join('') === s
};