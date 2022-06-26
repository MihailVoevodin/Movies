import { debouncedLoadFilms } from '../../FilmServices';
import { store } from '../myListFilms';
import FilmActions from './FilmActions';
import { RenderUtil } from '../myListFilms';

const apiMyFilm = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const selectContainer = document.querySelector('.select');

function renderSelectInput() {
    
    const selectInputField = document.createElement('div');

    const RenderInstance = new RenderUtil();

    selectInputField.classList.add('new-film');

    selectInputField.innerHTML = `
        <input type="text" class="film" placeholder="Введите название фильма">
        <div class="new-film__close">
            <svg width="10" height="10" viewBox="0 0 29 30"     fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.1568 14.5231L28.4489 3.23075C29.1837 2.49623 29.1837 1.30861 28.4489 0.574085C27.7144 -0.160437 26.5267 -0.160437 25.7922 0.574085L14.4998 11.8665L3.20781 0.574085C2.47295 -0.160437 1.28567 -0.160437 0.551149 0.574085C-0.183716 1.30861 -0.183716 2.49623 0.551149 3.23075L11.8432 14.5231L0.551149 25.8155C-0.183716 26.55 -0.183716 27.7376 0.551149 28.4721C0.917206 28.8385 1.39852 29.0226 1.87948 29.0226C2.36045 29.0226 2.84141 28.8385 3.20781 28.4721L14.4998 17.1798L25.7922 28.4721C26.1586 28.8385 26.6396 29.0226 27.1205 29.0226C27.6015 29.0226 28.0825 28.8385 28.4489 28.4721C29.1837 27.7376 29.1837 26.55 28.4489 25.8155L17.1568 14.5231Z" fill="black"/>
            </svg>
        </div>
        <div class="my-list__wrapper">
            <ul class="my-list__select">

            </ul>
        </div>
    `;

    selectContainer.appendChild(selectInputField);
    const listFilms = document.querySelector('.my-list__select');
    const selectItem = document.querySelector('.film');

    selectItem.addEventListener('keyup', () => {
        FilmActions.selectFilmInputValue(selectItem);
        const  apiUrl = `${apiMyFilm}${store.selectFilmInputValue}`;
              
        listFilms.innerHTML = '';

        debouncedLoadFilms(apiUrl, (films) => {
            FilmActions.setLoadedFilms(films);
            console.log(store.loadedFilms);
            RenderInstance.render();
        });
    });

    return selectInputField;
}

export default renderSelectInput;