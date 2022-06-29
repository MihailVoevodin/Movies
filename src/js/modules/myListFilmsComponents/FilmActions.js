import { MyListComponent } from "../MyListFilms";
import {App} from "../../App";

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
        App.render();
    }
    static addFilm(filmData) {
        store.moviesStorage.push(filmData);
        store.selectFilmInputValue = null;
        localStorage.setItem('movies', JSON.stringify(store.moviesStorage));
        App.render();
    }
    static removeFilm(filmId) {
        const filteredFilms = store.moviesStorage.filter((item) => item.filmId !== filmId);
        store.moviesStorage = filteredFilms;
        store.loadedFilms = [];
        localStorage.setItem('movies', JSON.stringify(filteredFilms));
        App.render();
    }
    static addSelectFilms(films) {
        store.loadedFilms = films;
        App.render();
    }
    static addDetailsModal(filmData) {
        store.detailsInfo = filmData;
        store.loadedFilms = [];
        App.render();
    }
    static deleteDetailsModal() {
        store.detailsInfo = null;
        App.render();
    }
    static selectFilmInputValue(selectItem) {
        store.selectFilmInputValue = selectItem.value;
        App.render();
    }
    static setLoadedFilms(films) {
        store.loadedFilms = films;
        App.render();
    }
    static closeSelectFilms() {
        store.selectFilmInputValue = null;
        store.loadedFilms = [];
        App.render();
    }
    static setTopFilms(films) {
        store.topFilms = films;
        App.render();
    }
}

export default FilmActions;
