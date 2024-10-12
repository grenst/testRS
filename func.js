/*

// Передаём текст напрямую
// Обрезаем текст, оставляя 2 символа
truncate('hexlet', 2); // he...

// Через переменную
const text = 'it works!';
// Обрезаем текст, оставляя 4 символа
truncate(text, 4); // it w...

*/
const getNumberExplanation = (value) => {
    switch (value ) {
        case 666 :
            return 'devil number';
        case 42 :
            return 'answer for everything';
        case 7 :
            return 'prime number';
        default :
            return 'just a number';
    };
};

console.log(getNumberExplanation(8)) // You win!
console.log(getNumberExplanation(666)) // Try again!
console.log(getNumberExplanation(42)) // Try again!
console.log(getNumberExplanation(7)) // Try again!