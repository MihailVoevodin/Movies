import { App } from "./App";
import {DetailsModalComponent} from "./modules/MyListFilmsComponents/DetailsModal";
import { FilmCard } from "./modules/MyListFilmsComponents/FilmCard";
import { FilmsCards } from "./modules/MyListFilmsComponents/FilmsCards";

export const store = {
    moviesStorage: [], //массив с добавленными фильмами через селект
    loadedFilms: [], //массив заполняющийся при загрузке фильмов в селекте
    detailsInfo: null, //объект фильма используемый для модального окна
    selectFilmInputValue: null, //value инпута
    topFilms: [] //массив с загруженным топом фильмов
}

class FilmActions {
    static initializeState() {
        store.moviesStorage = JSON.parse(localStorage.getItem('movies')) || [];
        App.render();
    }
    static addFilm(filmData) {
        store.moviesStorage.push(filmData);
        store.selectFilmInputValue = null;
        localStorage.setItem('movies', JSON.stringify(store.moviesStorage));
        const FilmCardElement = new FilmCard();
        FilmCardElement.render();
    }
    static removeFilm(filmId) {
        const filteredFilms = store.moviesStorage.filter((item) => item.filmId !== filmId);
        store.moviesStorage = filteredFilms;
        store.loadedFilms = [];
        localStorage.setItem('movies', JSON.stringify(filteredFilms));
        const FilmsCardsComponent = new FilmsCards();
        FilmsCardsComponent.render();
    }
    static addSelectFilms(films) {
        store.loadedFilms = films;
        App.render();
    }
    static addDetailsModal(filmData) {
        store.detailsInfo = filmData;
        store.loadedFilms = [];
        const DetailsModalElement = new DetailsModalComponent()
        DetailsModalElement.render();
    }
    static deleteDetailsModal() {
        store.detailsInfo = null;
    }
    static selectFilmInputValue(selectItem) {
        store.selectFilmInputValue = selectItem;
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
        App.render();
    }
}

export default FilmActions;
