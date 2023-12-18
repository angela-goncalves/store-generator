export function capitalizeFirstLetter(word: string | null): string {
  if (word) {
    const rest = word.slice(1).toLowerCase();
    return word.charAt(0).toUpperCase() + rest;
  }
  return "";
}
