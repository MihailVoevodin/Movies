import Helpers from "./myListFilmsComponents/Helpers";
import SelectInput from "./myListFilmsComponents/SelectInput";
import SelectFilmsField from "./myListFilmsComponents/SelectFilmsField";
import DetailsModal from "./myListFilmsComponents/DetailsModal";
import FilmsCards from "./myListFilmsComponents/FilmsCards";
import { store } from "./myListFilmsComponents/FilmActions";


export class MyListComponent {
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
    }
}
