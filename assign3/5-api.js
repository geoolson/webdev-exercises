const url = 'https://restcountries.eu/rest/v2/all';

// Enter your code here
const formatPop = num =>{
    const reversedStr = num.toString().split('').reverse().join('');
    const commas = reversedStr.match(/.{1,3}/g).join(',');
    return commas.split('').reverse().join('');
};
const resultDiv = document.getElementById('results');
fetch(url)
    .then(res => res.json())
    .then(data => {
        resultDiv.innerHTML = data.reduce((acc, curr) => {
            const { name, population } = curr;
            return acc + `<p>${name}: ${formatPop(population)}</p>`;
        }, '');
    });
