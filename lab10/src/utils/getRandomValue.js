/**
 * @param {number} min
 * @param {number} max
 *
 * @return {number} value
 */
export function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
