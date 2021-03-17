// BURGER
const burgerContainer = document.getElementById('burger')
const headerNav = document.querySelector('.header__nav')
const body = document.querySelector('body')

burgerContainer.addEventListener('click', () => {
    headerNav.classList.toggle('toggled')
    body.classList.toggle('noscroll')
})






