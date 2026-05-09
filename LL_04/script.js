// ==========================================
// ЧАСТЬ 1: ИСПОЛЬЗОВАНИЕ КЛАССОВ (ES6 Classes)
// ==========================================

/**
 * Класс, представляющий базовый предмет в инвентаре
 */
class Item {
  /**
   * @param {string} name - Название предмета
   * @param {number} weight - Вес предмета
   * @param {string} rarity - Редкость (common, uncommon, rare, legendary)
   */
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /**
   * Возвращает информацию о предмете
   * @returns {string} Строка с информацией
   */
  getInfo() {
    return `${this.name} [${this.rarity}] - Weight: ${this.weight}kg`;
  }

  /**
   * Изменяет вес предмета
   * @param {number} newWeight - Новый вес
   */
  setWeight(newWeight) {
    this.weight = newWeight;
  }
}

/**
 * Класс, представляющий оружие (наследуется от Item)
 */
class Weapon extends Item {
  /**
   * @param {string} name - Название оружия
   * @param {number} weight - Вес
   * @param {string} rarity - Редкость
   * @param {number} damage - Урон
   * @param {number} durability - Прочность (0-100)
   */
  constructor(name, weight, rarity, damage, durability = 100) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  /**
   * Переопределенный метод получения информации (полиморфизм)
   * @returns {string}
   */
  getInfo() {
    return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}%`;
  }

  /**
   * Использование оружия (уменьшает прочность)
   */
  use() {
    if (this.durability >= 10) {
      this.durability -= 10;
      console.log(`${this.name} использован. Прочность: ${this.durability}%`);
    } else if (this.durability > 0) {
      this.durability = 0;
      console.log(`${this.name} сломан!`);
    } else {
      console.log(`${this.name} уже сломан и не может быть использован.`);
    }
  }

  /**
   * Починка оружия (восстанавливает прочность до 100)
   */
  repair() {
    this.durability = 100;
    console.log(`${this.name} полностью починен.`);
  }
}

// ==========================================
// ЧАСТЬ 2: ИСПОЛЬЗОВАНИЕ ФУНКЦИЙ-КОНСТРУКТОРОВ
// ==========================================

/**
 * Функция-конструктор базового предмета
 * @param {string} name
 * @param {number} weight
 * @param {string} rarity
 */
function ItemConstructor(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

ItemConstructor.prototype.getInfo = function() {
  return `${this.name} [${this.rarity}] - Weight: ${this.weight}kg`;
};

ItemConstructor.prototype.setWeight = function(newWeight) {
  this.weight = newWeight;
};

/**
 * Функция-конструктор оружия (наследует ItemConstructor)
 */
function WeaponConstructor(name, weight, rarity, damage, durability = 100) {
  // Вызов родительского конструктора
  ItemConstructor.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;
}

// Наследование прототипа
WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
WeaponConstructor.prototype.constructor = WeaponConstructor;

WeaponConstructor.prototype.getInfo = function() {
  // Вызов родительского getInfo
  const baseInfo = ItemConstructor.prototype.getInfo.call(this);
  return `${baseInfo}, Damage: ${this.damage}, Durability: ${this.durability}%`;
};

WeaponConstructor.prototype.use = function() {
  if (this.durability >= 10) {
    this.durability -= 10;
    console.log(`${this.name} использован. Прочность: ${this.durability}%`);
  } else {
    this.durability = 0;
    console.log(`${this.name} сломан!`);
  }
};

WeaponConstructor.prototype.repair = function() {
  this.durability = 100;
  console.log(`${this.name} полностью починен.`);
};

// ==========================================
// ТЕСТИРОВАНИЕ
// ==========================================
console.log("=== ТЕСТ ES6 КЛАССОВ ===");
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);
console.log(sword.getInfo());

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log(`Прочность после использования: ${bow.durability}`);
bow.repair();
console.log(`Прочность после починки: ${bow.durability}`);

console.log("\n=== ТЕСТ ОПЦИОНАЛЬНОЙ ЦЕПОЧКИ (?.) ===");
const inventory = {
  slot1: bow,
  slot2: null
};
// Если в слоте нет оружия, вызова getInfo не произойдет и вернется undefined (ошибки не будет)
console.log("Слот 1:", inventory.slot1?.getInfo());
console.log("Слот 2:", inventory.slot2?.getInfo());

console.log("\n=== ТЕСТ ФУНКЦИЙ-КОНСТРУКТОРОВ ===");
const dagger = new WeaponConstructor("Iron Dagger", 1.2, "common", 8, 20);
console.log(dagger.getInfo());
dagger.use();
dagger.use();
dagger.use(); // Должен сломаться
