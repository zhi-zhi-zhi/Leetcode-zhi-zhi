function vowelStrings(words: string[], left: number, right: number): number {
  const special = new Set(["a", "e", "i", "o", "u"]);

  return words
  .slice(left, right + 1)
  .filter(word =>
    special.has(word[0])
    && special.has(word.at(-1)))
    .length;
};
