export class MenuComponent {
    
    windowMenuScroll(menu) {
        if (window.pageYOffset > '50') {
            menu.style.backgroundColor = "#b00";
        } else {
            menu.style.backgroundColor = "transparent";
        }
    }

    openMenu(menuSide) {
        menuSide.classList.add('active');
    } 

    closeMenu(menuSide) {
        menuSide.classList.remove('active');
    }

    closeMenuClick(e, menuSide) {
        if (!e.target.closest('.hamburger-menu') && !e.target.closest('.hamburger')) {
            menuSide.classList.remove('active');
        }
    }

    render() {
        const menuElement = document.createElement('div');

        menuElement.innerHTML = `
            <div class="header__top">
                <div class="container">
                    <div class="header__top_wrapper">
                        <a class="logo" href="#"><img src="img/logo.png" alt="Fast Food"></a>
                        <nav class="menu">
                            <ul class="menu__list">
                                <li class="menu__list-item">
                                    <a class="menu__list-link" href="#home">Home</a>
                                </li>
                                <li class="menu__list-item">
                                    <a class="menu__list-link" href="#top-films">Top films</a>
                                </li>
                                <li class="menu__list-item">
                                    <a class="menu__list-link" href="#my-films">My films</a>
                                </li>
                            </ul>
                        </nav>
                        <div class="hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hamburger-menu">
                <div class="hamburger-menu__close">
                    <svg width="29" height="30" viewBox="0 0 29 30"     fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.1568 14.5231L28.4489 3.23075C29.1837 2.49623 29.1837 1.30861 28.4489 0.574085C27.7144 -0.160437 26.5267 -0.160437 25.7922 0.574085L14.4998 11.8665L3.20781 0.574085C2.47295 -0.160437 1.28567 -0.160437 0.551149 0.574085C-0.183716 1.30861 -0.183716 2.49623 0.551149 3.23075L11.8432 14.5231L0.551149 25.8155C-0.183716 26.55 -0.183716 27.7376 0.551149 28.4721C0.917206 28.8385 1.39852 29.0226 1.87948 29.0226C2.36045 29.0226 2.84141 28.8385 3.20781 28.4721L14.4998 17.1798L25.7922 28.4721C26.1586 28.8385 26.6396 29.0226 27.1205 29.0226C27.6015 29.0226 28.0825 28.8385 28.4489 28.4721C29.1837 27.7376 29.1837 26.55 28.4489 25.8155L17.1568 14.5231Z" fill="white"/>
                    </svg>
                </div>
                <ul class="hamburger-menu__list">
                    <li class="hamburger-menu__item"><a class="hamburger-menu__link" href="#home">Home</a></li>
                    <li class="hamburger-menu__item"><a class="hamburger-menu__link" href="#top-films">Top films</a></li>
                    <li class="hamburger-menu__item"><a class="hamburger-menu__link" href="#my-films">My films</a></li>
                </ul>
            </div>
        `;

        const menu = menuElement.querySelector('.header__top');
        const menuClose = menuElement.querySelector('.hamburger-menu__close');
        const menuSide = menuElement.querySelector('.hamburger-menu');
        const menuOpen = menuElement.querySelector('.hamburger');
        const menuItems = menuElement.querySelectorAll('.hamburger-menu__link');

        window.addEventListener('scroll', () => this.windowMenuScroll(menu));
        menuOpen.addEventListener('click', () => this.openMenu(menuSide)); 
        menuClose.addEventListener('click', () => this.closeMenu(menuSide));
        document.addEventListener('click', (e) => this.closeMenuClick(e, menuSide));
        menuItems.forEach(item => {
            item.addEventListener('click', () => this.closeMenu(menuSide))
        });

        return menuElement;
    }
}
