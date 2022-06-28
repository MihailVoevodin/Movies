import FilmActions from "./myListFilmsComponents/FilmActions";
import Helpers from "./myListFilmsComponents/Helpers";
import SelectInput from "./myListFilmsComponents/SelectInput";
import SelectFilmsField from "./myListFilmsComponents/SelectFilmsField";
import DetailsModal from "./myListFilmsComponents/DetailsModal";
import FilmsCards from "./myListFilmsComponents/FilmsCards";
import { store } from "./myListFilmsComponents/FilmActions";



function myList() {
    FilmActions.initializeState();      

    const MyListInstance = new MyListComponent();

    MyListInstance.render();
}

export class MyListComponent {
    moviesContainer = document.querySelector('.my-list__items');
    
    render() {
        if (!Helpers.getSelectInput()) {
            SelectInput();
        }
        SelectFilmsField();
        this.moviesContainer.innerHTML = '';
        FilmsCards();
        
        if (store.detailsInfo) {
            DetailsModal(store.detailsInfo);
        };
    }
}

export default myList;
