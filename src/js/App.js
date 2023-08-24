import {MenuComponent} from './modules/menu';
import {HeaderComponent} from './modules/Header'
import {TopListComponent} from './modules/topFilms';
import {MyListComponent} from './modules/myListFilms';
import {ScrollComponent} from './modules/scroll';

class AppClass {
    get root() {
        return document.getElementById('root');
    }
    render() {
        this.root.innerHTML = '';
        const MenuElement = new MenuComponent();
        const HeaderElement = new HeaderComponent();
        const TopListElement = new TopListComponent();
        const MyListElement = new MyListComponent();
        const ScrollElement = new ScrollComponent();

        this.root.appendChild(MenuElement.render());
        this.root.appendChild(HeaderElement.render());
        this.root.appendChild(TopListElement.render());
        this.root.appendChild(MyListElement.render());
        this.root.appendChild(ScrollElement.render());
    }
}

export const App = new AppClass();