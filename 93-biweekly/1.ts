function maximumValue(strs: string[]): number {
  const digit = [];
  for (let i = 0; i < 10; i++)
    digit.push(`${i}`);
  return Math.max(...strs.map(str => {
    const arr = Array.from(str);
    if (arr.every(char => digit.includes(char))) {
      return Number.parseInt(str);
    } else if (arr.some(char => digit.includes(char))) {
      return str.length
    } else {
      return str.length
    }
  }));
};
