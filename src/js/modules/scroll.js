function scroll() {
    const scrollBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > '1000') {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    })
    

    scrollBtn.addEventListener('click', () => {
        window.scrollTo(0, 0);
    })
}

export default scroll;
