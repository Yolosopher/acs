// BURGER
const burgerContainer = document.getElementById('burger')
const headerNav = document.querySelector('.header__nav')
const body = document.querySelector('body')

burgerContainer.addEventListener('click', () => {
    headerNav.classList.toggle('toggled')
    body.classList.toggle('noscroll')
})

const cells = document.querySelectorAll('.periodic__content__row__cell')


cells.forEach(cell => {
    cell.addEventListener('click', () => {
        let td = cell.closest('td')
        if (cell.classList.contains('shown')) {
            cell.classList.remove('shown')
        } else {
            cells.forEach(each => each.classList.remove('shown'))
            cell.classList.add('shown')
        }
    })
})