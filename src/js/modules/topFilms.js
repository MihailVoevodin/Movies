import Helpers from "../Helpers";
import FilmActions from "../FilmActions";
import { loadFilms } from "../FilmServices";
import { store } from "../FilmActions";
import { TOP_FILMS_URL } from "../Const";

export class TopListComponent {
    
    createTopFilmsCard(item) {
        const movie = document.createElement('div');
        movie.classList.add('movie');
        console.log(Helpers.getRating(item.rating));
        movie.innerHTML = `
        <div>
            <img src="${item.posterUrl}" alt="${item.nameEn}">
            <div class="movie__name movie__nameEn">${item.nameEn ? item.nameEn : ''}</div>
            <div class="movie__name movie__nameRu">${item.nameEn ? '( ' + item.nameRu + ' )' : item.nameRu}</div>
            <div class="movie__genres">${item.genres.slice(0, 3).map(genre => ` ${genre.genre}`)}</div>
            <div class="movie__rating movie__rating_${Helpers.getRatingColor(item.rating)}">${item.rating !== null ? Helpers.getRating(item.rating) : 'no'}</div>
        </div>
        `;
        return movie;
    }

    render() {
        const topListElement = document.createElement('div');

        topListElement.setAttribute('id', 'top-films');
        topListElement.classList.add('top-films');
        topListElement.innerHTML = `
            <div class="container">
                <div class="top-films__title title">Top films</div>
                <div class="movies"></div>
            </div>
        `;

        const topListContainer = topListElement.querySelector('.movies');

        if (store.topFilms.length) {
            const filmCards = store.topFilms.map(this.createTopFilmsCard);
            topListContainer.append(...filmCards);
        } else {
            loadFilms(TOP_FILMS_URL).then(films => {
                FilmActions.setTopFilms(films);
            });
        }

        return topListElement; 
    }
}
