const HUMAN_NUMBER_ALPHABET = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
export function humanNumber(n: number) {
  let index = 0;
  while (n >= 1000 && ++index < HUMAN_NUMBER_ALPHABET.length) {
    n /= 1000;
  }
  n = Math.round(n * 10) / 10;
  return index === 0 ? n : n + HUMAN_NUMBER_ALPHABET[index - 1];
}
