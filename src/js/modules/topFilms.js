import Helpers from "./myListFilmsComponents/Helpers";
import { topLoadFilms } from "../FilmServices";


const store = {
    topFilms: []
}

const apiUrlTop = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';

function topFilms() {
    
    const RenderInstance = new RenderUtil;

    RenderInstance.render();

    topLoadFilms(apiUrlTop, (films) => {
        FilmActions.setTopFilms(films);
        RenderInstance.render();
    })
}

class FilmActions {
    static setTopFilms(films) {
        store.topFilms = films;
    }
}

class RenderUtil {
    topFilmsContainer = document.querySelector('.movies');

    createTopFilmsCard(item) {
            const movie = document.createElement('div');
            movie.classList.add('movie');
            movie.innerHTML = `
            <div>
                <img src="${item.posterUrl}" alt="${item.nameEn}">
                <div class="movie__name movie__nameEn">${item.nameEn ? item.nameEn : ''}</div>
                <div class="movie__name movie__nameRu">${item.nameEn ? '( ' + item.nameRu + ' )' : item.nameRu}</div>
                <div class="movie__genres">${item.genres.slice(0, 3).map(genre => ` ${genre.genre}`)}</div>
                <div class="movie__rating movie__rating_${Helpers.getRatingColor(item.rating)}">${Helpers.getRating(item.rating)}</div>
            </div>
            `;
            this.topFilmsContainer.appendChild(movie);
    }

    createTopFilmsCards() {
        store.topFilms.forEach((filmData) => {
            this.createTopFilmsCard(filmData);
        })
    }

    render() {
        this.createTopFilmsCards()
    }
}

export default topFilms;