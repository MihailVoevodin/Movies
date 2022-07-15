import {SelectInput} from "./MyListFilmsComponents/SelectInput";
import {FilmsCards} from "./MyListFilmsComponents/FilmsCards";

export class MyListComponent {
    
    render() {
        const myListElement = document.createElement('div');

        myListElement.setAttribute('id', 'my-films');
        myListElement.classList.add('my-list');
        myListElement.innerHTML = `
            <div class="container">
                <div class="my-list__title title">My films</div>
                <div class="select">

                </div>
            </div>
        `;

        const selectContainer = myListElement.querySelector('.select');
        const moviesContainer = myListElement.querySelector('.container');

        const SelectInputEl = new SelectInput();
        const FilmsCardsEl = new FilmsCards();

        selectContainer.appendChild(SelectInputEl.render());
        moviesContainer.appendChild(FilmsCardsEl.render());

        return myListElement;
    }

    // moviesContainer = document.querySelector('.my-list__items');
    
    // render() {
    //     if (!Helpers.getSelectInput()) {
    //         SelectInput();
    //     }
    //     SelectFilmsField();
    //     this.moviesContainer.innerHTML = '';
    //     FilmsCards();
        
    //     if (store.detailsInfo) {
    //         DetailsModal(store.detailsInfo);
    //     };
    // }
}
