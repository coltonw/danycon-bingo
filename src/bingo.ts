import type { BingoCard, BingoConfig } from "./types";

/** Fisher-Yates shuffle — returns a new shuffled array, does not mutate input. */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Returns `n` unique randomly-selected items from `arr`. */
export function sample<T>(arr: T[], n: number): T[] {
  if (arr.length < n) {
    throw new Error(`Cannot sample ${n} items from a pool of only ${arr.length}.`);
  }
  return shuffle(arr).slice(0, n);
}

/** Generates a single 5×5 BingoCard from the config. */
export function generateCard(config: BingoConfig): BingoCard {
  const picked = sample(config.options, 24);
  // Build a flat 25-element array with the free space in the center (index 12).
  const flat: string[] = [...picked.slice(0, 12), config.freeSpace, ...picked.slice(12)];
  // Chunk into 5 rows of 5.
  const card: BingoCard = [];
  for (let row = 0; row < 5; row++) {
    card.push(flat.slice(row * 5, row * 5 + 5));
  }
  return card;
}

/** Generates `count` independently-randomized BingoCards. */
export function generateCards(config: BingoConfig, count: number): BingoCard[] {
  return Array.from({ length: count }, () => generateCard(config));
}
