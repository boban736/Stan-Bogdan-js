/**
 * Функция вывода элементов массива (формат 1)
 * @param {Array} array - Массив для вывода
 */
function printArray(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(`Element ${i}: value ${array[i]}`);
  }
}

/**
 * Функция вывода элементов массива (формат 2)
 * @param {Array} array - Массив для вывода
 */
function printArray1(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(`${i}:  ${array[i]}`);
  }
}

/**
 * Универсальная функция forEach для обхода массива с вызовом колбэка
 * @param {Array} array - Исходный массив
 * @param {Function} callback - Функция обратного вызова
 * @returns {undefined}
 */
function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

/**
 * Создает новый массив на основе вызовов callback для каждого элемента
 * @param {Array} array - Исходный массив
 * @param {Function} callback - Функция-трансформер
 * @returns {Array} Новый массив
 */
function map(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

/**
 * Создает новый массив, содержащий только те элементы, для которых callback вернул true
 * @param {Array} array - Исходный массив
 * @param {Function} callback - Функция-условие
 * @returns {Array} Отфильтрованный массив
 */
function filter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

/**
 * Возвращает первый элемент, удовлетворяющий условию в callback
 * @param {Array} array - Исходный массив
 * @param {Function} callback - Функция-условие
 * @returns {*} Найденный элемент или undefined
 */
function find(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
}

/**
 * Проверяет, удовлетворяет ли хотя бы один элемент условию в callback
 * @param {Array} array - Исходный массив
 * @param {Function} callback - Функция-условие
 * @returns {boolean} true, если найден хотя бы один подходящий элемент
 */
function some(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return true;
    }
  }
  return false;
}

/**
 * Проверяет, удовлетворяют ли все элементы массива условию в callback
 * @param {Array} array - Исходный массив
 * @param {Function} callback - Функция-условие
 * @returns {boolean} true, если все элементы удовлетворяют условию
 */
function every(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i], i, array)) {
      return false;
    }
  }
  return true;
}

/**
 * Применяет callback к каждому элементу массива, сводя его к одному результату
 * @param {Array} array - Исходный массив
 * @param {Function} callback - Функция-редуктор
 * @param {*} [initialValue] - Начальное значение аккумулятора
 * @returns {*} Результат аккумуляции
 */
function reduce(array, callback, initialValue) {
  if (array.length === 0 && initialValue === undefined) {
    return undefined;
  }
  
  let accumulator = initialValue !== undefined ? initialValue : array[0];
  let startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  return accumulator;
}

// === ТЕСТИРОВАНИЕ ===
console.log("=== printArray ===");
printArray(["a", "b", "c"]);

console.log("=== printArray1 ===");
printArray1(["x", "y", "z"]);

console.log("=== forEach ===");
forEach([1, 2, 3], (element, index) => console.log(`Element: ${element}, Index: ${index}`));

console.log("=== map ===");
console.log(map([1, 2, 3], el => el * el)); // [1, 4, 9]

console.log("=== filter ===");
console.log(filter([1, 2, 3, 4, 5], el => el % 2 === 0)); // [2, 4]

console.log("=== find ===");
console.log(find([1, 2, 3, 4], el => el > 2)); // 3

console.log("=== some ===");
console.log(some([1, 3, 5], el => el % 2 === 0)); // false
console.log(some([1, 2, 5], el => el % 2 === 0)); // true

console.log("=== every ===");
console.log(every([2, 4, 6], el => el % 2 === 0)); // true
console.log(every([2, 5, 6], el => el % 2 === 0)); // false

console.log("=== reduce ===");
console.log(reduce([1, 2, 3, 4], (acc, el) => acc + el, 0)); // 10
console.log(reduce([1, 2, 3, 4], (acc, el) => acc * el)); // 24
