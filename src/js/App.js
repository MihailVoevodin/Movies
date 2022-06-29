import menu from './modules/menu';
import {TopListComponent} from './modules/TopFilms';
import {MyListComponent} from './modules/MyListFilms';
import scroll from './modules/scroll';

class AppClass {
    get root() {
        return document.getElementById('root');
    }
    render() {
        this.root.innerHTML = '';

        const MyList = new MyListComponent();
        const TopList = new TopListComponent();

        this.root.appendChild(menu());
        this.root.appendChild(TopList.render());
        this.root.appendChild(MyList.render());
        this.root.appendChild(scroll());
    }
}

export const App = new AppClass();
