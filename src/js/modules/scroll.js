export class ScrollComponent {

    showScrollBtn(scrollElement) {
        if (window.pageYOffset >= '1000') {
            scrollElement.style.display = 'block';
        } else {
            scrollElement.style.display = 'none';
        }
    };

    scrollToTop() {
        window.scrollTo(0, 0);
    };



    render() {
        const scrollElement = document.createElement('div');

        scrollElement.classList.add('scroll-top', 'animate__animated', 'animate__slideInUp', 'animate__delay-2s', 'animate__infinite', 'animate__slow')
        scrollElement.innerHTML =`
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <g transform="translate(12.000000, 12.000000) rotate(-180.000000) translate(-12.000000, -12.000000) translate(5.000000, 8.500000)" stroke="#fff" stroke-width="1.5">
                        <polyline id="Stroke-1" points="14 0 7 7 0 0"></polyline>
                    </g>
                </g>
            </svg>
        `;

        window.addEventListener('scroll', () => this.showScrollBtn(scrollElement));
        scrollElement.addEventListener('click', () => this.scrollToTop());

        return scrollElement;
    }
}
