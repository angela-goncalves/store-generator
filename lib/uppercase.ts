export function capitalizeFirstLetter(word: string): string {
  const rest = word.slice(1).toLowerCase();
  return word.charAt(0).toUpperCase() + rest;
}

export function changeNameToLink(word: string): string {
  return word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/ç/g, "c")
    .replace(/[^a-zA-Z0-9]/g, "-");
}
