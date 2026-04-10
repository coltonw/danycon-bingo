export interface BingoConfig {
  freeSpace: string;
  options: string[];
}

// A 5x5 grid represented as an array of 5 rows, each with 5 strings.
// The center cell [2][2] is always the free space.
export type BingoCard = string[][];
