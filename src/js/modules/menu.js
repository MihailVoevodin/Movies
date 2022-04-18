function menu() {
    const menu = document.querySelector('.header__top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > '50') {
            menu.style.backgroundColor = "#b00";
        } else {
            menu.style.backgroundColor = "transparent";
        }
    })

    const menuClose = document.querySelector('.hamburger-menu__close'),
          menuSide = document.querySelector('.hamburger-menu'),
          menuOpen = document.querySelector('.hamburger');

    menuOpen.addEventListener('click', () => {
        menuSide.classList.add('active');
    }) 

    menuClose.addEventListener('click', () => {
        menuSide.classList.remove('active');
    })

    document.addEventListener('click', e => {
        if (!e.target.closest('.hamburger-menu') && !e.target.closest('.hamburger')) {
            menuSide.classList.remove('active');
        }
    })

    const menuItems = document.querySelectorAll('.hamburger-menu__item');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuSide.classList.remove('active');
        })
    })

}

export default menu;