import { MyListComponent } from "../MyListFilms";

export const store = {
    moviesStorage: [], //массив с добавленными фильмами через селект
    loadedFilms: [], //массив заполняющийся при загрузке фильмов в селекте
    detailsInfo: null, //объект фильма используемый для модального окна
    selectFilmInputValue: null, //value инпута
    topFilms: [] //массив с загруженным топом фильмов
}

const MyListInstance = new MyListComponent(); //перенес сюда

class FilmActions {
    static initializeState() {
        store.moviesStorage = JSON.parse(localStorage.getItem('movies')) || [];
    }
    static addFilm(filmData) {
        store.moviesStorage.push(filmData);
        store.selectFilmInputValue = null;
        localStorage.setItem('movies', JSON.stringify(store.moviesStorage));
    }
    static removeFilm(filmId) {
        const filteredFilms = store.moviesStorage.filter((item) => item.filmId !== filmId);
        store.moviesStorage = filteredFilms;
        store.loadedFilms = [];
        localStorage.setItem('movies', JSON.stringify(filteredFilms));
        MyListInstance.render();
    }
    static addSelectFilms(films) {
        store.loadedFilms = films;
    }
    static addDetailsModal(filmData) {
        store.detailsInfo = filmData;
        store.loadedFilms = [];
    }
    static deleteDetailsModal() {
        store.detailsInfo = null;
    }
    static selectFilmInputValue(selectItem) {
        store.selectFilmInputValue = selectItem.value;
    }
    static setLoadedFilms(films) {
        store.loadedFilms = films;
    }
    static closeSelectFilms() {
        store.selectFilmInputValue = null;
        store.loadedFilms = [];
    }
    static setTopFilms(films) {
        store.topFilms = films;
    }
}

export default FilmActions;
