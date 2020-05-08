const url = 'https://pokeapi.co/api/v2/pokemon/';

// Enter your code here
async function getAllPokemon() {
    let res = await fetch(`${url}?limit=${10000}`);
    let data = await res.json();
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = data.results.reduce( (acc, curr) => {
        const name = curr.name.charAt(0).toUpperCase() + curr.name.slice(1);
        return acc + `<span class="d-block">${name}</span>`;
    },'');
}
getAllPokemon();
