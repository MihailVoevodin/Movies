import { store } from "./FilmActions";
import FilmActions from "./FilmActions";
import Helpers from "./Helpers";


export class FilmsCards {

    FilmCard(filmData) {
    
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
            <div class="movie__info">Подробнее</div>
        `;
    
        const deleteBtn = movie.querySelector('.movie__close');
        const infoBtn = movie.querySelector('.movie__info');
        
        deleteBtn.addEventListener('click', () => handleDeleteClick(filmData.filmId));
        infoBtn.addEventListener('click', () => handleDetailsModalClick(filmData));
    
        return movie;
    }

    render() {
        const moviesContainer = document.createElement('ul');
        moviesContainer.classList.add('my-list__items');
        console.log(store.moviesStorage);
        const filmCards = store.moviesStorage.map(this.FilmCard);

        moviesContainer.append(...filmCards);

        return moviesContainer;
    }
}

function handleDeleteClick(filmId) {
    FilmActions.removeFilm(filmId);
};
function handleDetailsModalClick(filmData) {
    FilmActions.addDetailsModal(filmData);
    console.log(store.detailsInfo)
};
