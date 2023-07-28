function minimizedStringLength(s: string): number {
  return new Set(Array.from(s)).size
};