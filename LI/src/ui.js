import { getTransactions, deleteTransaction } from './storage.js';

// DOM Элементы
const elements = {
  transactionsContainer: document.getElementById('transactions-container'),
  emptyMessage: document.getElementById('empty-message'),
  totalBalance: document.getElementById('total-balance'),
  totalIncome: document.getElementById('total-income'),
  totalExpense: document.getElementById('total-expense'),
};

/**
 * Форматирование числа в молдавских леях
 * @param {number} amount 
 * @returns {string}
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('ro-MD', { style: 'currency', currency: 'MDL' }).format(amount);
}

/**
 * Отрисовка одной транзакции
 * @param {Object} t 
 * @returns {HTMLElement}
 */
function createTransactionElement(t) {
  const div = document.createElement('div');
  div.className = `transaction-item ${t.type}`;
  div.dataset.id = t.id;

  const amountSign = t.type === 'income' ? '+' : '-';
  
  div.innerHTML = `
    <div class="t-info">
      <h4>${t.category}</h4>
      <small>${new Date(t.date).toLocaleDateString()} ${t.description ? '| ' + t.description : ''}</small>
    </div>
    <div class="t-actions">
      <div class="t-amount">${amountSign} ${formatCurrency(t.amount)}</div>
      <button class="btn danger delete-btn" data-id="${t.id}">✖</button>
    </div>
  `;
  return div;
}

/**
 * Обновление дашборда (баланс, доходы, расходы)
 * @param {Array} transactions 
 */
export function updateDashboard(transactions) {
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  elements.totalIncome.textContent = formatCurrency(income);
  elements.totalExpense.textContent = formatCurrency(expense);
  elements.totalBalance.textContent = formatCurrency(balance);
}

/**
 * Отрисовка списка транзакций с учетом фильтров
 * @param {string} filterType - 'all', 'income', 'expense'
 * @param {string} searchQuery - текст для поиска
 */
export function renderTransactions(filterType = 'all', searchQuery = '') {
  const transactions = getTransactions();
  elements.transactionsContainer.innerHTML = '';

  // Фильтрация
  const filtered = transactions.filter(t => {
    const matchType = filterType === 'all' || t.type === filterType;
    const matchSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  // Сортировка по дате (новые сверху)
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filtered.length === 0) {
    elements.emptyMessage.classList.remove('hidden');
  } else {
    elements.emptyMessage.classList.add('hidden');
    filtered.forEach(t => {
      elements.transactionsContainer.appendChild(createTransactionElement(t));
    });
  }

  // Обновляем дашборд (статистика всегда по всем транзакциям, независимо от фильтра)
  updateDashboard(transactions);
}

/**
 * Инициализация событий списка (Удаление через делегирование)
 * @param {Function} onChange Callback после изменения данных
 */
export function initListEvents(onChange) {
  elements.transactionsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const id = e.target.dataset.id;
      if (confirm('Вы уверены, что хотите удалить эту операцию?')) {
        deleteTransaction(id);
        onChange();
      }
    }
  });
}
