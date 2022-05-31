import { debounce } from "lodash";


const API_KEY = 'ba2becc0-f421-4ef5-bf44-ebac95a88660';
const apiMyFilm = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

const store = {
    moviesStorage: []
}

if (!localStorage.getItem('movies')) {
    localStorage.setItem('movies', JSON.stringify(store.moviesStorage));
}


function select() {

    const selectItem = document.querySelector('.film');
    const listFilms = document.querySelector('.my-list__select');
    const inputClose = document.querySelector('.new-film__close');
    
    FilmActions.initializeState();      

    const RenderInstance = new RenderUtil();

    RenderInstance.render();


            function renderClose() {
        if (listFilms.textContent != '') {
            inputClose.style.display = 'block';
            
        } else {
            inputClose.style.display = 'none';
            listFilms.innerHTML = '';
            selectItem.value = '';
        }
    }
    
    const loadFilms = async (url) => {
        const headers = {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
        };

        const response = await fetch(url, {headers});
        const resultData = await response.json();
        
        return resultData.films || []; 
    };

    const handleLoadFilms = debounce((url, onSuccess) => 
        loadFilms(url).then(onSuccess), 500);


    const renderFilmInList = filmData => {
        const film = document.createElement('li');
        film.classList.add('film-item')
    
        film.innerHTML = `
            ${filmData.nameRu}  
        `
        listFilms.appendChild(film);

        renderClose();

        return film;
    }
    
    selectItem.addEventListener('keyup', () => {
        const inputValue = selectItem.value,
              api = `${apiMyFilm}${inputValue}`;
              
        listFilms.innerHTML = '';

        

        handleLoadFilms(api, (films) =>
            films.slice(0, 6).forEach((film) => {
                
            const filmListItem = renderFilmInList(film);
            filmListItem.addEventListener('click', () => {
                handleListItemClick(film);
            });
            
        }));
    });

    const handleListItemClick = (filmData) => {

        const RenderInstance = new RenderUtil();

        FilmActions.addFilm(filmData);
        RenderInstance.render();
    }

    window.addEventListener('click', (e) => {
        if (listFilms && !e.target.closest('.film')) {
            listFilms.innerHTML = '';
            selectItem.value = '';
        }
    })

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
    //добавил
    static openInfo(container) {
        container.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}


class RenderUtil {
    moviesContainer = document.querySelector('.my-list__items');
    cardsContainer = document.querySelector('.cards');

    handleDeleteClick(filmId) {
        FilmActions.removeFilm(filmId);
        this.render();
    }
    //добавил
    handleInfoClick(filmData) {
        FilmActions.openInfo(this.cardsContainer);
        this.renderInfoCard(filmData)
    }
    //добавил
    handleDeleteInfoClick(card) {
        card.remove();
        this.cardsContainer.style.display = 'none';
        document.body.style.overflow = '';
    }
    //добавил
    renderInfoCard(filmData) {
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
        this.cardsContainer.appendChild(card);
        
        const closeInfo = card.querySelector('.card__close');

        closeInfo.addEventListener('click', () => this.handleDeleteInfoClick(card));

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

        return movie;
    }

    render() {
        // debugger
        
        this.moviesContainer.innerHTML = '';
        store.moviesStorage.forEach((filmData) => {
            const filmCard = this.renderFilmCard(filmData);
            const deleteBtn = filmCard.querySelector('.movie__close');
            const infoBtn = filmCard.querySelector('.movie__info');

            deleteBtn.addEventListener('click', () => this.handleDeleteClick(filmData.filmId));
            infoBtn.addEventListener('click', () => this.handleInfoClick(filmData))
        })
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