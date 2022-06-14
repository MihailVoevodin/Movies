import { debounce } from "lodash";
import { loadFilms } from "../FilmService";


const apiMyFilm = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

const store = {
    moviesStorage: [],
    loadedFilms: [],
    detailsInfo: null,
    inputValue: null,
}

if (!localStorage.getItem('movies')) {
    localStorage.setItem('movies', JSON.stringify(store.moviesStorage));
}

function select() {

    const selectItem = document.querySelector('.film');
    const listFilms = document.querySelector('.my-list__select');
    const inputClose = document.querySelector('.new-film__close');
    const pullRequest = 0;
    const request = null;

    FilmActions.initializeState();      

    const RenderInstance = new RenderUtil();

    RenderInstance.render();

//перенес запрос в отдельный файл 

    const handleLoadFilms = debounce((url, onSuccess) => 
        loadFilms(url).then(onSuccess), 500);

//удалил RenderFilmInList
    
    selectItem.addEventListener('keyup', () => {
        store.inputValue = selectItem.value;
        const  api = `${apiMyFilm}${store.inputValue}`;
              
        listFilms.innerHTML = '';

        handleLoadFilms(api, (films) => {
            store.loadedFilms = films;
            console.log(store.loadedFilms);
            store.loadedFilms.forEach((film) => {
                //перенес функционал в эту функцию весь
                RenderInstance.renderSelectFilmsField(listFilms, inputClose, selectItem, film);
            });
        });
    });
    //заменил эту функцию, перенес всё в одну
    // const handleListItemClick = (filmData) => {

    //     const RenderInstance = new RenderUtil();

    //     FilmActions.addFilm(filmData);
    //     RenderInstance.render();
    // }

    //удалил обработчик на window
}

class FilmActions {
    static initializeState() {
        store.moviesStorage = JSON.parse(localStorage.getItem('movies'));
    }
    static addFilm(filmData) {
        store.moviesStorage.push(filmData);
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
    //исправил
    static addDetailsInfo(filmData) {
        store.detailsInfo = filmData;
    }
    //добавил
    static deleteDetailsInfo(card) {
        store.detailsInfo = null;
        card.remove();
    }
}

class RenderUtil {
    moviesContainer = document.querySelector('.my-list__items');
    modalContainer = document.querySelector('.modal__container');

    //Функция из renderClose and RenderFilmInList
    renderSelectFilmsField(listFilms, inputClose, selectItem, filmData) {
        const film = document.createElement('li');
        film.classList.add('film-item')
    
        film.innerHTML = `
            ${filmData.nameRu}  
        `;

        listFilms.appendChild(film);

        film.addEventListener('click', () => {
            FilmActions.addFilm(filmData);
            this.render();
            store.inputValue = null;
        });

        if (selectItem.value != '') {
            inputClose.style.display = 'block';
        }

        film.addEventListener('click', () => {
            this.closeSelectFilmsField(listFilms, inputClose, selectItem);
            console.log(store.loadedFilms);
        })
        inputClose.addEventListener('click', () => {
            //при нажатии на крест почему-то в консоли много выводов происходит
            this.closeSelectFilmsField(listFilms, inputClose, selectItem);
            console.log(store.loadedFilms);
        })
        
        return film;
    }
    //функция на закрытие селекта
    closeSelectFilmsField(listFilms, inputClose, selectItem) {
        inputClose.style.display = 'none';
        listFilms.innerHTML = '';
        selectItem.value = '';
        store.inputValue = null;
        store.loadedFilms = [];
    }

    handleDeleteClick(filmId) {
        FilmActions.removeFilm(filmId);
        this.render();
    }
    //добавил upd исправил
    handleDetailsInfoClick(filmData) {
        FilmActions.addDetailsInfo(filmData);
        this.render();
    }
    //добавил upd исправил
    handleDeleteInfoClick(card) {
        FilmActions.deleteDetailsInfo(card);
        this.modalContainer.style.display = 'none';
        document.body.style.overflow = '';
    }

    renderDetailsInfoModal(filmData) {
        const card = document.createElement('div');

        card.classList.add('card')
        card.innerHTML = `
            <img class="card__img" src="${filmData.posterUrl}" alt="${filmData.nameEn}">
            <div class="card__info">
                <div class="card__name">${filmData.nameEn ? filmData.nameEn : ''} ${filmData.nameEn ? '(' + filmData.nameRu +')' : filmData.nameRu}</div>
                <div class="card__type">Type : ${filmData.type}</div>
                <div class="card__year">Year : ${filmData.year}</div>
                <div class="card__countries">Countries : ${filmData.countries.map(countries => ` ${countries.country}`)}</div>
                <div class="card__genres">Genres :${filmData.genres.map(genre => ` ${genre.genre}`)}</div>
                <div class="card__rating">Rating : ${filmData.rating}</div>
                <div class="card__length">Length : ${filmData.filmLength}</div>
                <div class="card__descr">Description :<br>${filmData.description}</div>
                <div class="card__close"><svg width="10" height="10" viewBox="0 0 29 30"     fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.1568 14.5231L28.4489 3.23075C29.1837 2.49623 29.1837 1.30861 28.4489 0.574085C27.7144 -0.160437 26.5267 -0.160437 25.7922 0.574085L14.4998 11.8665L3.20781 0.574085C2.47295 -0.160437 1.28567 -0.160437 0.551149 0.574085C-0.183716 1.30861 -0.183716 2.49623 0.551149 3.23075L11.8432 14.5231L0.551149 25.8155C-0.183716 26.55 -0.183716 27.7376 0.551149 28.4721C0.917206 28.8385 1.39852 29.0226 1.87948 29.0226C2.36045 29.0226 2.84141 28.8385 3.20781 28.4721L14.4998 17.1798L25.7922 28.4721C26.1586 28.8385 26.6396 29.0226 27.1205 29.0226C27.6015 29.0226 28.0825 28.8385 28.4489 28.4721C29.1837 27.7376 29.1837 26.55 28.4489 25.8155L17.1568 14.5231Z" fill="white"/>
                </svg></div>
            </div>
            
        `
        this.modalContainer.appendChild(card);

        //перенес работу с версткой
        this.modalContainer.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        const closeBtn = card.querySelector('.card__close'); //поменял название

        closeBtn.addEventListener('click', () => this.handleDeleteInfoClick(card));

        return card;
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
        infoBtn.addEventListener('click', () => this.handleDetailsInfoClick(filmData));

        return movie;
    }

    render() {
        // debugger
        this.moviesContainer.innerHTML = '';
        store.moviesStorage.forEach((filmData) => {
            this.renderFilmCard(filmData);
            //перенес слушатели в их функцию
        })
        if (store.detailsInfo) {
            this.renderDetailsInfoModal(store.detailsInfo);
        }
        
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
}

export default select;