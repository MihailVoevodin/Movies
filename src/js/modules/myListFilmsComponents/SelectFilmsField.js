import { some } from "lodash";
import { store } from "./FilmActions";
import FilmActions from "./FilmActions";
import Helpers from "./Helpers";
import { MyListComponent } from '../MyListFilms';

function SelectFilm(filmData) {
    const MyListInstance = new MyListComponent();

    const listFilms = Helpers.getSelectList();
    const selectItem = Helpers.getSelectInput();
    const inputClose = Helpers.getSelectClose();
    const film = document.createElement('li');
    film.classList.add('film-item')

    film.innerHTML = `
        ${filmData.nameRu}  
    `;

    listFilms.appendChild(film);

    film.addEventListener('click', () => {
        FilmActions.addFilm(filmData);
        closeSelectFilmsField(listFilms, inputClose, selectItem);
        MyListInstance.render();
    });

    if (selectItem.value != '') {
        inputClose.style.display = 'block';
    }

    inputClose.addEventListener('click', (event) => {
        event.stopImmediatePropagation()
        closeSelectFilmsField(listFilms, inputClose, selectItem);
    })

    return film;
}

function SelectFilmsField() {
    const filmsForSelect = store.loadedFilms.filter((item) => {
        return !some(store.moviesStorage, {filmId: item.filmId})
    })
    filmsForSelect.forEach((film) => {
        SelectFilm(film);
    });
};

function closeSelectFilmsField(listFilms, inputClose, selectItem) {
    FilmActions.closeSelectFilms();
    inputClose.style.display = 'none';
    listFilms.innerHTML = '';
    selectItem.value = '';
};

export default SelectFilmsField;