import FilmActions from "./myListFilmsComponents/FilmActions";
import Helpers from "./myListFilmsComponents/Helpers";
import renderSelectInput from "./myListFilmsComponents/renderSelectInput";
import renderSelectFilmsField from "./myListFilmsComponents/renderSelectFilmsField";
import renderDetailsModal from "./myListFilmsComponents/renderDetailsModal";
import renderFilmsCards from "./myListFilmsComponents/renderFilmsCards";


export const store = {
    moviesStorage: [],
    loadedFilms: [],
    detailsInfo: null,
    selectFilmInputValue: null,
}

function myListFilms() {
    FilmActions.initializeState();      

    const RenderInstance = new RenderUtil();

    RenderInstance.render();
}

export class RenderUtil {
    moviesContainer = document.querySelector('.my-list__items');
    
    render() {
        if (!Helpers.getSelectInput()) {
            renderSelectInput();
        }
        renderSelectFilmsField();
        this.moviesContainer.innerHTML = '';
        renderFilmsCards();
        
        if (store.detailsInfo) {
            renderDetailsModal(store.detailsInfo);
        };
    }
}

export default myListFilms;