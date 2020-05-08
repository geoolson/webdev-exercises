// Enter your code here
const fizzBuzz = () => {
    let result = ''
    for(let i = 1; i <= 100; ++i){
        let line = i%3 === 0 ?'fizz':'';
        line += i%5 === 0 ?'buzz':'';
        line = line === "" ? i : line;
        result += `<p>${line}</p>`;
    }
    return result;
};
const results = document.getElementById("results");
results.innerHTML = fizzBuzz();