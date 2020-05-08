const url = 'https://pokeapi.co/api/v2/pokemon/';

// Enter your code here
fetch(`${url}?limit=${10000}`)
    .then(res => res.json())
    .then(data => {
        const resultDiv = document.getElementById('results');
        resultDiv.innerHTML = data.results.reduce( (acc, curr) => {
            const name = curr.name.charAt(0).toUpperCase() + curr.name.slice(1);
            return acc + `<span class="d-block">${name}</span>`;
        },'');
    });
