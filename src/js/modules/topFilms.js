import Helpers from "./myListFilmsComponents/Helpers";
import FilmActions from "./myListFilmsComponents/FilmActions";
import { topLoadFilms } from "../FilmServices";
import { store } from "./myListFilmsComponents/FilmActions";
import { TOP_FILMS_URL } from "./Const";


function topList() {
    const TopListInstance = new TopListComponent();

    topLoadFilms(TOP_FILMS_URL, (films) => {
        FilmActions.setTopFilms(films);
        TopListInstance.render();
    })
}

class TopListComponent {
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
            return movie;
    }

    createTopFilmsCards() {
        store.topFilms.forEach((filmData) => {
            this.topFilmsContainer.appendChild(this.createTopFilmsCard(filmData));
        })
    }

    render() {
        this.createTopFilmsCards()
    }
}

export default topList;
