// Enter your code here
const form = document.getElementsByTagName('form')[0];
const input = document.getElementById('input'); 
form.onsubmit = e => {
    e.preventDefault();
    if(input.value.length === 8 || isNaN(input.value))
        alert([...input.value].reverse().join(''));
    else
        alert('Please enter an 8 digit number');
}