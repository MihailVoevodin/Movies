import Helpers from "../../Helpers";
import FilmActions from "../../FilmActions";
import { store } from '../../FilmActions';

export class FilmCard {

    render() {
        const moviesContainer = Helpers.getMyFilmsContainer();
        const lastEl = store.moviesStorage[store.moviesStorage.length - 1]
        const filmCard = renderMyFilmCard(lastEl);
        moviesContainer.appendChild(filmCard);

        return moviesContainer;
    }
}

export function renderMyFilmCard(filmData) {
    const movie = document.createElement('li');
    movie.setAttribute('filmId', filmData.filmId);
    movie.classList.add('movie');

    movie.innerHTML = `
        <img src="${filmData.posterUrl}" alt="${filmData.nameEn}">
        <div class="movie__name movie__nameEn">${filmData.nameEn ? filmData.nameEn : ''}</div>
        <div class="movie__name movie__nameRu">${filmData.nameEn ? '( ' + filmData.nameRu + ' )' : filmData.nameRu}</div>
        <div class="movie__genres">${filmData.genres.slice(0, 3).map(genre => ` ${genre.genre}`)}</div>
        <div class="movie__rating movie__rating_${Helpers.getRatingColor(filmData.rating)}">${filmData.rating !== 'null' ? Helpers.getRating(filmData.rating) : 'no'}</div>
        <div class="movie__close">Удалить</div>
        <div class="movie__info">Подробнее</div>
    `;

    const deleteBtn = movie.querySelector('.movie__close');
    const infoBtn = movie.querySelector('.movie__info');
    
    deleteBtn.addEventListener('click', () => handleDeleteClick(filmData.filmId, movie));
    infoBtn.addEventListener('click', () => handleDetailsModalClick(filmData));

    return movie;
}

function handleDeleteClick(filmId, movie) {
    FilmActions.removeFilm(filmId);
    movie.remove();
}
function handleDetailsModalClick(filmData) {
    FilmActions.addDetailsModal(filmData);
}
