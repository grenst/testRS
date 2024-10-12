/*

// Передаём текст напрямую
// Обрезаем текст, оставляя 2 символа
truncate('hexlet', 2); // he...

// Через переменную
const text = 'it works!';
// Обрезаем текст, оставляя 4 символа
truncate(text, 4); // it w...

*/

// const str = 'If I look back I am lost';

const encrypt = (word) => {
    let result = '';
    for (let i = 0; i < word.length; i++) {
        if ((i + 1) % 2 === 0) {
            result = `${result}${word[i]}${word[i -1]}`
        };
    };
    return word.length % 2 === 0 ? result : result + word[word.length - 1];
};


console.log(encrypt('move')); // omev
console.log(encrypt('attack')); // taatkc
// Если длина строки нечётное
// то последний символ остается на своем месте
console.log(encrypt('go!')); // og!