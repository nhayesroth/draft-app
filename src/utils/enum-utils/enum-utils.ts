export function toNormalCase(stringEnum: string): string {
  return stringEnum
    .split('_')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');

  function capitalizeFirstLetter(word: string): string {
    const array = word.split('');
    array[0] = array[0].toUpperCase();
    for (let i = 1; i < array.length; i += 1) {
      array[i] = array[i].toLowerCase();
    }
    return array.join('');
  }
}
