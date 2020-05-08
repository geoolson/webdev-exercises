// Enter your code here
const [form] = document.getElementsByTagName('form');
form.onsubmit = e => {
    e.preventDefault();
    console.log(`name: ${document.getElementById('name').value}`);
    console.log(`email: ${document.getElementById('email').value}`);
    console.log(`comments: ${document.getElementById('comments').value}`);
    console.log(`newsletter: ${document.getElementById('newsletter').value}`);
}
