import { store } from "./FilmActions";
import { MyListComponent } from '../MyListFilms';
import FilmActions from "./FilmActions";
import Helpers from "./Helpers";


function FilmCard(filmData) {
    const moviesContainer = document.querySelector('.my-list__items');
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
    moviesContainer.appendChild(movie);

    const deleteBtn = movie.querySelector('.movie__close');
    const infoBtn = movie.querySelector('.movie__info');

    deleteBtn.addEventListener('click', () => handleDeleteClick(filmData.filmId));
    infoBtn.addEventListener('click', () => handleDetailsModalClick(filmData));

    return movie;
}

function FilmsCards() {
    store.moviesStorage.forEach((filmData) => {
        FilmCard(filmData);
    });
}

function handleDeleteClick(filmId) {
    FilmActions.removeFilm(filmId);
    const MyListInstance = new MyListComponent();//не пойму куда запихнуть, пишет нет доступа перед инициализацией
    MyListInstance.render();
};
function handleDetailsModalClick(filmData) {
    FilmActions.addDetailsModal(filmData);
    const MyListInstance = new MyListComponent();//не пойму куда запихнуть, пишет нет доступа перед инициализацией
    MyListInstance.render();
};

export default FilmsCards;
