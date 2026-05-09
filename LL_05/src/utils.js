/**
 * Генерирует уникальный ID
 * @returns {string} Уникальный идентификатор
 */
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Возвращает CSS класс для редкости
 * @param {string} rarity 
 * @returns {string}
 */
export function getRowClassByRarity(rarity) {
  if (rarity === "legendary") return "legendary";
  if (rarity === "common") return "common";
  return "";
}
