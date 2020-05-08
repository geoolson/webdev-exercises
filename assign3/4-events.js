// Enter your code here
const [ divWidth, divHeight ] = document.getElementsByTagName('div');
window.onresize = () => {
    divWidth.innerText = window.innerWidth;
    divHeight.innerText = window.innerHeight;
}
