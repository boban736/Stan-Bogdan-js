import { addTransaction } from './storage.js';
import { renderTransactions, initListEvents } from './ui.js';

// DOM элементы
const modal = document.getElementById('transaction-modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const form = document.getElementById('transaction-form');
const errorDiv = document.getElementById('form-error');

// Фильтры
const filterType = document.getElementById('filter-type');
const searchInput = document.getElementById('search-input');

/**
 * Простая генерация уникального ID
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

/**
 * Открытие модального окна
 */
function openModal() {
  modal.classList.remove('hidden');
  form.reset();
  errorDiv.textContent = '';
}

/**
 * Закрытие модального окна
 */
function closeModal() {
  modal.classList.add('hidden');
}

/**
 * Обработка добавления новой транзакции
 */
function handleFormSubmit(e) {
  e.preventDefault();
  
  const type = document.getElementById('type').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value.trim();
  const description = document.getElementById('description').value.trim();

  // Дополнительная валидация
  if (isNaN(amount) || amount <= 0) {
    errorDiv.textContent = 'Сумма должна быть положительным числом.';
    return;
  }
  if (!category) {
    errorDiv.textContent = 'Укажите категорию.';
    return;
  }

  const transaction = {
    id: generateId(),
    date: new Date().toISOString(),
    type,
    amount,
    category,
    description
  };

  addTransaction(transaction);
  closeModal();
  updateView();
}

/**
 * Обновление интерфейса
 */
function updateView() {
  renderTransactions(filterType.value, searchInput.value);
}

/**
 * Инициализация всего приложения
 */
export function initApp() {
  // События модалки
  openModalBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Событие формы
  form.addEventListener('submit', handleFormSubmit);

  // События фильтров (обновление при изменении)
  filterType.addEventListener('change', updateView);
  searchInput.addEventListener('input', updateView);

  // Инициализация удаления
  initListEvents(updateView);

  // Первичная отрисовка
  updateView();
}
