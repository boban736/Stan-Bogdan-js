import { getInventory, getTotalCount, getItemById, removeItem } from './inventory.js';
import { getRowClassByRarity } from './utils.js';

const tableBody = document.querySelector("#inventory-table tbody");
const totalItemsSpan = document.querySelector("#total-items");
const detailsText = document.querySelector("#details-text");

/**
 * Обновляет счетчик предметов
 */
export function updateTotalItems() {
  totalItemsSpan.textContent = getTotalCount();
}

/**
 * Добавляет строку в таблицу
 * @param {Object} item 
 */
export function renderItemRow(item) {
  const tr = document.createElement("tr");
  tr.dataset.id = item.id;
  tr.className = getRowClassByRarity(item.rarity);

  const damageText = item.category === "weapon" ? item.damage : "—";

  // Автоматический вызов метода attack()/damage() для оружия
  if (item.category === "weapon") {
    console.log(item.attack());
  }

  tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.category}</td>
    <td>${item.rarity}</td>
    <td>${damageText}</td>
    <td><button class="delete-btn" data-action="delete">Удалить</button></td>
  `;

  tableBody.appendChild(tr);
  updateTotalItems();
}

/**
 * Инициализирует слушатели событий для таблицы (Делегирование)
 */
export function initTableEvents() {
  const table = document.querySelector("#inventory-table");

  // Делегирование на клик (для удаления)
  table.addEventListener("click", (e) => {
    if (e.target.dataset.action === "delete") {
      const tr = e.target.closest("tr");
      const id = tr.dataset.id;
      
      // Анимация перед удалением
      tr.classList.add("fade-out");
      setTimeout(() => {
        tr.remove();
        removeItem(id);
        updateTotalItems();
        detailsText.textContent = "Наведите курсор на предмет в таблице, чтобы увидеть описание.";
      }, 500);
    }
  });

  // Делегирование на mouseover (для отображения деталей)
  table.addEventListener("mouseover", (e) => {
    const tr = e.target.closest("tr");
    if (tr && tr.dataset.id) {
      const item = getItemById(tr.dataset.id);
      if (item) {
        detailsText.textContent = item.getInfo();
      }
    }
  });
}
