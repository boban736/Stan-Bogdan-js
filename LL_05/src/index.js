import { Item, Weapon } from './classes.js';
import { addItem } from './inventory.js';
import { generateId } from './utils.js';
import { renderItemRow, initTableEvents } from './ui.js';

const form = document.querySelector("#item-form");
const categorySelect = document.querySelector("#category");
const damageContainer = document.querySelector("#damage-container");
const damageInput = document.querySelector("#damage");
const errorDiv = document.querySelector("#form-error");

// Показываем/скрываем поле урона в зависимости от категории
categorySelect.addEventListener("change", () => {
  if (categorySelect.value === "weapon") {
    damageContainer.style.display = "block";
    damageInput.required = true;
  } else {
    damageContainer.style.display = "none";
    damageInput.required = false;
  }
});

// Обработка отправки формы
form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorDiv.textContent = "";

  const name = document.querySelector("#name").value.trim();
  const category = categorySelect.value;
  const rarity = document.querySelector("#rarity").value;
  const description = document.querySelector("#description").value.trim();
  const damage = parseFloat(damageInput.value);

  // Валидация
  if (!name || !description) {
    errorDiv.textContent = "Заполните обязательные поля!";
    return;
  }

  if (category === "weapon" && (isNaN(damage) || damage <= 0)) {
    errorDiv.textContent = "Введите корректный урон для оружия!";
    return;
  }

  const id = generateId();
  let newItem;

  if (category === "weapon") {
    newItem = new Weapon(id, name, category, rarity, description, damage);
  } else {
    newItem = new Item(id, name, category, rarity, description);
  }

  addItem(newItem);
  renderItemRow(newItem);
  
  form.reset();
  damageContainer.style.display = "none";
});

// Инициализация событий таблицы
initTableEvents();
