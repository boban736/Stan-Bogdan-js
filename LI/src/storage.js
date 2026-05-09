const STORAGE_KEY = 'finance_transactions';

/**
 * Получить транзакции из LocalStorage
 * @returns {Array} Массив транзакций
 */
export function getTransactions() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Сохранить транзакции в LocalStorage
 * @param {Array} transactions 
 */
export function saveTransactions(transactions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

/**
 * Добавить новую транзакцию
 * @param {Object} transaction 
 */
export function addTransaction(transaction) {
  const transactions = getTransactions();
  transactions.push(transaction);
  saveTransactions(transactions);
}

/**
 * Удалить транзакцию по ID
 * @param {string} id 
 */
export function deleteTransaction(id) {
  let transactions = getTransactions();
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions(transactions);
}
