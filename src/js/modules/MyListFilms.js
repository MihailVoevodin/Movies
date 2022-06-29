import Helpers from "./myListFilmsComponents/Helpers";
import SelectInput from "./myListFilmsComponents/SelectInput";
import SelectFilmsField from "./myListFilmsComponents/SelectFilmsField";
import DetailsModal from "./myListFilmsComponents/DetailsModal";
import FilmsCards from "./myListFilmsComponents/FilmsCards";
import { store } from "./myListFilmsComponents/FilmActions";


export class MyList {
    get moviesContainer() {
        return document.querySelector('.my-list__items');
    }
    
    render() {
        if (!Helpers.getSelectInput()) {
            SelectInput();
        }
        SelectFilmsField();
        this.moviesContainer.innerHTML = '';
        FilmsCards();
        
        if (store.detailsInfo) {
            DetailsModal(store.detailsInfo);
        }

        // Внутри этой функции должен быть создан div элемент внутрь которого ты уже будешь аппендить элемент который возвращется от
        /**
         * SelectInput.render()
         * SelectFilmsField.render()
         * FilmsCards.render()
         * DetailsModal.render()
         */
    }
}
