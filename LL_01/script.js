// Задание 1. Подключение внешнего JavaScript-файла
alert("Этот код выполнен из внешнего файла!");
console.log("Сообщение в консоли из внешнего файла");

// Задание 2. Работа с типами данных
// 1. Объявление переменных и работа с типами данных.
const name = "Богдан"; // Имя
const birthYear = 2005; // Год рождения
const isStudent = true; // Логическая переменная

console.log(`Имя: ${name}`);
console.log(`Год рождения: ${birthYear}`);
console.log(`Студент: ${isStudent}`);

// 2. Управление потоком выполнения (условия и циклы)
let score = prompt("Введите ваш балл:");

if (score !== null) {
  score = Number(score);

  if (score >= 90) {
    console.log("Отлично!");
  } else if (score >= 70) {
    console.log("Хорошо");
  } else {
    console.log("Можно лучше!");
  }
}

for (let i = 1; i <= 5; i++) {
  console.log(`Итерация: ${i}`);
}
