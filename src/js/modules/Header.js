export class HeaderComponent {
    render() {
        const headerElement = document.createElement('header');

        headerElement.setAttribute('id', 'home');
        headerElement.classList.add('header');
        headerElement.innerHTML = `
            <div class="container">
                <div class="header__content">
                    <h1 class="header__title title">
                        Website for your <span>movies</span>
                    </h1>
                    <p class="header__text">
                        On this website you can keep a list of 
                        watched films, see a list of the best 
                        films and find out information about your favorite
                        movie. Welcome!
                    </p>
                </div>
            </div> 
        `;

        return headerElement;
    }
}
