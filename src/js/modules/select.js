import { some } from "lodash";
import { debouncedLoadFilms } from "../FilmService";


const apiMyFilm = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

const store = {
    moviesStorage: [],
    loadedFilms: [],
    detailsInfo: null,
    selectFilmInputValue: null,
}

function select() {
    FilmActions.initializeState();      

    const RenderInstance = new RenderUtil();

    RenderInstance.render();

    
}

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

class RenderUtil {
    moviesContainer = document.querySelector('.my-list__items');
    modalContainer = document.querySelector('.modal__container');
    selectContainer = document.querySelector('.select');



    renderSelectFilm(filmData) {
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
            this.closeSelectFilmsField(listFilms, inputClose, selectItem);
            this.render();
        });

        if (selectItem.value != '') {
            inputClose.style.display = 'block';
        }

        inputClose.addEventListener('click', (event) => {
            event.stopImmediatePropagation()
            this.closeSelectFilmsField(listFilms, inputClose, selectItem);
        })

        return film;
    }

    renderSelectInput() {
        const selectInputField = document.createElement('div');

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

        this.selectContainer.appendChild(selectInputField);
        const listFilms = document.querySelector('.my-list__select');
        const selectItem = document.querySelector('.film');

        selectItem.addEventListener('keyup', () => {
            FilmActions.selectFilmInputValue(selectItem);
            const  apiUrl = `${apiMyFilm}${store.selectFilmInputValue}`;
                  
            listFilms.innerHTML = '';
    
            debouncedLoadFilms(apiUrl, (films) => {
                FilmActions.setLoadedFilms(films);
                console.log(store.loadedFilms);
                this.render();
            });
        });

        return listFilms;
    }

    renderSelectFilmsField() {
        const filmsForSelect = store.loadedFilms.filter((item) => {
            return !some(store.moviesStorage, {filmId: item.filmId})
        })
        filmsForSelect.forEach((film) => {
            this.renderSelectFilm(film);
        });
    };

    closeSelectFilmsField(listFilms, inputClose, selectItem) {
        FilmActions.closeSelectFilms();
        inputClose.style.display = 'none';
        listFilms.innerHTML = '';
        selectItem.value = '';
    };

    handleDeleteClick(filmId) {
        FilmActions.removeFilm(filmId);
        this.render();
    };
    handleDetailsModalClick(filmData) {
        FilmActions.addDetailsModal(filmData);
        this.render();
    };
    handleDeleteModalClick(modal) {
        FilmActions.deleteDetailsModal();
        modal.remove();
        this.modalContainer.style.display = 'none';
        document.body.style.overflow = '';
    }

    renderDetailsModal(filmData) {
        const modal = document.createElement('div');

        modal.classList.add('modal')
        modal.innerHTML = `
            <img class="modal__img" src="${filmData.posterUrl}" alt="${filmData.nameEn}">
            <div class="modal__info">
                <div class="modal__name">${filmData.nameEn ? filmData.nameEn : ''} ${filmData.nameEn ? '(' + filmData.nameRu +')' : filmData.nameRu}</div>
                <div class="modal__type">Type : ${filmData.type}</div>
                <div class="modal__year">Year : ${filmData.year}</div>
                <div class="modal__countries">Countries : ${filmData.countries.map(countries => ` ${countries.country}`)}</div>
                <div class="modal__genres">Genres :${filmData.genres.map(genre => ` ${genre.genre}`)}</div>
                <div class="modal__rating">Rating : ${filmData.rating}</div>
                <div class="modal__length">Length : ${filmData.filmLength}</div>
                <div class="modal__descr">Description :<br>${filmData.description}</div>
                <div class="modal__close"><svg width="10" height="10" viewBox="0 0 29 30"     fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.1568 14.5231L28.4489 3.23075C29.1837 2.49623 29.1837 1.30861 28.4489 0.574085C27.7144 -0.160437 26.5267 -0.160437 25.7922 0.574085L14.4998 11.8665L3.20781 0.574085C2.47295 -0.160437 1.28567 -0.160437 0.551149 0.574085C-0.183716 1.30861 -0.183716 2.49623 0.551149 3.23075L11.8432 14.5231L0.551149 25.8155C-0.183716 26.55 -0.183716 27.7376 0.551149 28.4721C0.917206 28.8385 1.39852 29.0226 1.87948 29.0226C2.36045 29.0226 2.84141 28.8385 3.20781 28.4721L14.4998 17.1798L25.7922 28.4721C26.1586 28.8385 26.6396 29.0226 27.1205 29.0226C27.6015 29.0226 28.0825 28.8385 28.4489 28.4721C29.1837 27.7376 29.1837 26.55 28.4489 25.8155L17.1568 14.5231Z" fill="white"/>
                </svg></div>
            </div>
            
        `
        this.modalContainer.appendChild(modal);
        this.modalContainer.style.display = 'block';
        document.body.style.overflow = 'hidden';

        this.modalContainer.addEventListener('click', (e) => {
            if (e.target === this.modalContainer) {
                this.handleDeleteModalClick(modal);
            }
        })
        
        const closeModalBtn = modal.querySelector('.modal__close'); //поменял название

        closeModalBtn.addEventListener('click', () => this.handleDeleteModalClick(modal));

        return modal;
    }

    renderFilmCard(filmData) {
        const movie = document.createElement('li');
        
        movie.setAttribute('filmId', filmData.filmId);
        movie.classList.add('movie');

        movie.innerHTML = `
            <img src="${filmData.posterUrl}" alt="${filmData.nameEn}">
            <div class="movie__name movie__nameEn">${filmData.nameEn ? filmData.nameEn : ''}</div>
            <div class="movie__name movie__nameRu">${filmData.nameEn ? '( ' + filmData.nameRu + ' )' : filmData.nameRu}</div>
            <div class="movie__genres">${filmData.genres.slice(0, 3).map(genre => ` ${genre.genre}`)}</div>
            <div class="movie__rating movie__rating_${Helpers.getRatingColor(filmData.rating)}">${filmData.rating != 'null' ? Helpers.getRating(filmData.rating) : 'no'}</div>
            <div class="movie__close">Удалить</div>
            <div class="movie__info">Подробнее...</div>
        `
        this.moviesContainer.appendChild(movie);

        const deleteBtn = movie.querySelector('.movie__close');
        const infoBtn = movie.querySelector('.movie__info');

        deleteBtn.addEventListener('click', () => this.handleDeleteClick(filmData.filmId));
        infoBtn.addEventListener('click', () => this.handleDetailsModalClick(filmData));

        return movie;
    }

    renderFilmsCards() {
        store.moviesStorage.forEach((filmData) => {
            this.renderFilmCard(filmData);
        });
    }

    render() {
        if (!Helpers.getSelectInput()) {
            this.renderSelectInput();
        }
        this.moviesContainer.innerHTML = '';
        this.renderFilmsCards();
        this.renderSelectFilmsField();

        if (store.detailsInfo) {
            this.renderDetailsModal(store.detailsInfo);
        };
    }
}

class Helpers {

    static getRatingColor(rate) {
        if (rate === 'null') {
            return 'grey';
        } else if (rate >= '7') {
            return 'green';
        } else if (rate >= '4') {
            return 'orange';
        } else {
            return 'red';
        }
    }

    static getRating(rate) {
        if (rate.includes('%')) {
            return [rate.substr(0, 1), rate.substr(1, 1)].join('.')
        } else {
            return rate
        }
    }

    static getSelectList() {
        return document.querySelector('.my-list__select');
    }
    static getSelectClose() {
        return document.querySelector('.new-film__close');
    }
    static getSelectInput() {
        return document.querySelector('.film');
    }
}

export default select;