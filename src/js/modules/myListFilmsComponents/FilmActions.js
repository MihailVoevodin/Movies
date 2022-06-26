import { store } from "../myListFilms";


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
        store.loadedFilms = [];
        store.moviesStorage = filteredFilms;
        localStorage.setItem('movies', JSON.stringify(filteredFilms));
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
}

export default FilmActions;