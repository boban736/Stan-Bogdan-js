let inventory = [];

/**
 * Добавляет предмет в инвентарь
 * @param {Object} item - Объект Item или Weapon
 */
export function addItem(item) {
  inventory.push(item);
}

/**
 * Удаляет предмет по ID
 * @param {string} id 
 */
export function removeItem(id) {
  inventory = inventory.filter(item => item.id !== id);
}

/**
 * Возвращает все предметы
 * @returns {Array} Массив предметов
 */
export function getInventory() {
  return inventory;
}

/**
 * Находит предмет по ID
 * @param {string} id 
 * @returns {Object|undefined}
 */
export function getItemById(id) {
  return inventory.find(item => item.id === id);
}

/**
 * Возвращает количество предметов
 * @returns {number}
 */
export function getTotalCount() {
  return inventory.length;
}
