/**
 * Базовый класс предмета
 */
export class Item {
  /**
   * @param {string} id
   * @param {string} name
   * @param {string} category
   * @param {string} rarity
   * @param {string} description
   */
  constructor(id, name, category, rarity, description) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.rarity = rarity;
    this.description = description;
  }

  /**
   * @returns {string} Информация о предмете
   */
  getInfo() {
    return `[${this.rarity.toUpperCase()}] ${this.name} (${this.category}): ${this.description}`;
  }
}

/**
 * Класс оружия
 */
export class Weapon extends Item {
  constructor(id, name, category, rarity, description, damage) {
    super(id, name, category, rarity, description);
    this.damage = damage;
  }

  /**
   * @returns {string} Сообщение об атаке
   */
  attack() {
    return `Оружие ${this.name} нанесло ${this.damage} урона!`;
  }
}
