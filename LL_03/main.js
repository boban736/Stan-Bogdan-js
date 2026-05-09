/**
 * Пример массива транзакций для тестирования
 */
const transactions = [
  {
    transaction_id: "1",
    transaction_date: "2023-10-01",
    transaction_amount: 150.0,
    transaction_type: "debit",
    transaction_description: "Покупка продуктов",
    merchant_name: "Supermarket",
    card_type: "debit",
  },
  {
    transaction_id: "2",
    transaction_date: "2023-10-02",
    transaction_amount: 50.0,
    transaction_type: "credit",
    transaction_description: "Возврат средств",
    merchant_name: "Online Store",
    card_type: "credit",
  },
  {
    transaction_id: "3",
    transaction_date: "2023-11-15",
    transaction_amount: 200.0,
    transaction_type: "debit",
    transaction_description: "Оплата интернета",
    merchant_name: "ISP Provider",
    card_type: "debit",
  },
  {
    transaction_id: "4",
    transaction_date: "2023-11-20",
    transaction_amount: 1000.0,
    transaction_type: "debit",
    transaction_description: "Покупка техники",
    merchant_name: "Electronics Store",
    card_type: "credit",
  },
];

/**
 * 1. Возвращает массив уникальных типов транзакций
 * @param {Array} transactions - массив транзакций
 * @returns {Array} - массив уникальных типов
 */
function getUniqueTransactionTypes(transactions) {
  const types = new Set(transactions.map(t => t.transaction_type));
  return Array.from(types);
}

/**
 * 2. Вычисляет сумму всех транзакций
 * @param {Array} transactions - массив транзакций
 * @returns {number} - общая сумма
 */
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * 3. Вычисляет общую сумму транзакций за указанный год, месяц и день [extra]
 * @param {Array} transactions 
 * @param {number} [year] 
 * @param {number} [month] 
 * @param {number} [day] 
 * @returns {number}
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
  return transactions.filter(t => {
    const date = new Date(t.transaction_date);
    if (year !== undefined && date.getFullYear() !== year) return false;
    // month передается от 1 до 12
    if (month !== undefined && (date.getMonth() + 1) !== month) return false;
    if (day !== undefined && date.getDate() !== day) return false;
    return true;
  }).reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * 4. Возвращает транзакции указанного типа (debit или credit)
 * @param {Array} transactions 
 * @param {string} type 
 * @returns {Array}
 */
function getTransactionByType(transactions, type) {
  return transactions.filter(t => t.transaction_type === type);
}

/**
 * 5. Возвращает массив транзакций в указанном диапазоне дат
 * @param {Array} transactions 
 * @param {string} startDate - формат YYYY-MM-DD
 * @param {string} endDate - формат YYYY-MM-DD
 * @returns {Array}
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return transactions.filter(t => {
    const d = new Date(t.transaction_date).getTime();
    return d >= start && d <= end;
  });
}

/**
 * 6. Возвращает массив транзакций по магазину
 * @param {Array} transactions 
 * @param {string} merchantName 
 * @returns {Array}
 */
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(t => t.merchant_name === merchantName);
}

/**
 * 7. Возвращает среднее значение транзакций
 * @param {Array} transactions 
 * @returns {number}
 */
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}

/**
 * 8. Возвращает массив транзакций с суммой в диапазоне
 * @param {Array} transactions 
 * @param {number} minAmount 
 * @param {number} maxAmount 
 * @returns {Array}
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}

/**
 * 9. Вычисляет общую сумму дебетовых транзакций
 * @param {Array} transactions 
 * @returns {number}
 */
function calculateTotalDebitAmount(transactions) {
  const debitTransactions = getTransactionByType(transactions, "debit");
  return calculateTotalAmount(debitTransactions);
}

/**
 * 10. Возвращает месяц, в котором было больше всего транзакций
 * @param {Array} transactions 
 * @returns {number|null} Возвращает номер месяца от 1 до 12
 */
function findMostTransactionsMonth(transactions) {
  if (transactions.length === 0) return null;
  const monthCounts = {};
  transactions.forEach(t => {
    const month = new Date(t.transaction_date).getMonth() + 1;
    monthCounts[month] = (monthCounts[month] || 0) + 1;
  });
  
  let maxMonth = null;
  let maxCount = 0;
  for (const [month, count] of Object.entries(monthCounts)) {
    if (count > maxCount) {
      maxCount = count;
      maxMonth = parseInt(month);
    }
  }
  return maxMonth;
}

/**
 * 11. Возвращает месяц, в котором было больше всего дебетовых транзакций
 * @param {Array} transactions 
 * @returns {number|null}
 */
function findMostDebitTransactionMonth(transactions) {
  return findMostTransactionsMonth(getTransactionByType(transactions, "debit"));
}

/**
 * 12. Возвращает каких транзакций больше всего
 * @param {Array} transactions 
 * @returns {string} - "debit", "credit" или "equal"
 */
function mostTransactionTypes(transactions) {
  const debitCount = getTransactionByType(transactions, "debit").length;
  const creditCount = getTransactionByType(transactions, "credit").length;
  
  if (debitCount > creditCount) return "debit";
  if (creditCount > debitCount) return "credit";
  return "equal";
}

/**
 * 13. Возвращает массив транзакций, совершенных до указанной даты
 * @param {Array} transactions 
 * @param {string} date - формат YYYY-MM-DD
 * @returns {Array}
 */
function getTransactionsBeforeDate(transactions, date) {
  const targetDate = new Date(date).getTime();
  return transactions.filter(t => new Date(t.transaction_date).getTime() < targetDate);
}

/**
 * 14. Возвращает транзакцию по ее уникальному идентификатору (id)
 * @param {Array} transactions 
 * @param {string} id 
 * @returns {Object|undefined}
 */
function findTransactionById(transactions, id) {
  return transactions.find(t => t.transaction_id === id);
}

/**
 * 15. Возвращает новый массив, содержащий только описания транзакций
 * @param {Array} transactions 
 * @returns {Array}
 */
function mapTransactionDescriptions(transactions) {
  return transactions.map(t => t.transaction_description);
}

// === ТЕСТИРОВАНИЕ ===
console.log("Уникальные типы:", getUniqueTransactionTypes(transactions));
console.log("Сумма всех транзакций:", calculateTotalAmount(transactions));
console.log("Сумма за 2023-10:", calculateTotalAmountByDate(transactions, 2023, 10));
console.log("Дебетовые транзакции:", getTransactionByType(transactions, "debit"));
console.log("Транзакции в диапазоне (октябрь):", getTransactionsInDateRange(transactions, "2023-10-01", "2023-10-31"));
console.log("Транзакции Supermarket:", getTransactionsByMerchant(transactions, "Supermarket"));
console.log("Средняя транзакция:", calculateAverageTransactionAmount(transactions));
console.log("Транзакции от 100 до 300:", getTransactionsByAmountRange(transactions, 100, 300));
console.log("Сумма всех debit:", calculateTotalDebitAmount(transactions));
console.log("Месяц с макс кол-вом транзакций:", findMostTransactionsMonth(transactions));
console.log("Месяц с макс кол-вом debit:", findMostDebitTransactionMonth(transactions));
console.log("Каких транзакций больше:", mostTransactionTypes(transactions));
console.log("До 2023-11-01:", getTransactionsBeforeDate(transactions, "2023-11-01"));
console.log("Поиск ID=3:", findTransactionById(transactions, "3"));
console.log("Описания:", mapTransactionDescriptions(transactions));

// Тестирование граничных случаев [extra]
console.log("=== Граничные случаи ===");
const emptyArray = [];
const singleTransactionArray = [transactions[0]];

console.log("Пустой массив (среднее):", calculateAverageTransactionAmount(emptyArray)); // 0
console.log("Один элемент (сумма):", calculateTotalAmount(singleTransactionArray)); // 150
console.log("Пустой массив (макс месяц):", findMostTransactionsMonth(emptyArray)); // null
