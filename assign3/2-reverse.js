// Enter your code here
const [form] = document.getElementsByTagName('form');
const input = document.getElementById('input');
form.onsubmit = e => {
    e.preventDefault();
    if (isNaN(input.value)) {
        alert('Please enter an 8 digit number');
        return;
    }
    else if (input.value < 0 && input.value.length === 9)
        alert('-' + [...input.value].slice(1).reverse().join(''));
    else if (input.value.length === 8 && input.value >= 0)
        alert([...input.value].reverse().join(''));
    else
        alert('Please enter an 8 digit number');
}