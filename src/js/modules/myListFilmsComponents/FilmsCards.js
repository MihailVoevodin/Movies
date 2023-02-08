import { store } from '../../FilmActions';
import { renderMyFilmCard } from './FilmCard';

export class FilmsCards {

    render() {
        const moviesContainer = document.createElement('ul');
        moviesContainer.classList.add('my-list__items');
        const filmCards = store.moviesStorage.map(renderMyFilmCard);

        moviesContainer.append(...filmCards);

        return moviesContainer;
    }
}
