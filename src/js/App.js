import menu from './modules/menu';
import {TopList} from './modules/TopFilms';
import {MyList} from './modules/MyListFilms';
import scroll from './modules/scroll';

class AppClass {
    get root() {
        return document.getElementById('root');
    }
    render() {
        this.root.innerHTML = '';

        const MyListComponent = new MyList();
        const TopListComponent = new TopList();

        this.root.appendChild(menu());
        this.root.appendChild(TopListComponent.render());
        this.root.appendChild(MyListComponent.render());
        this.root.appendChild(scroll());
    }
}

export const App = new AppClass();
