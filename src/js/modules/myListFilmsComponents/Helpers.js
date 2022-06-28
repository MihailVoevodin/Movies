class Helpers {

    static getRatingColor(rate) {
        if (rate === 'null') {
            return 'grey';
        } else if (rate >= '7') {
            return 'green';
        } else if (rate >= '4') {
            return 'orange';
        } else {
            return 'red';
        }
    }

    static getRating(rate) {
        if (rate.includes('%')) {
            return [rate.substr(0, 1), rate.substr(1, 1)].join('.')
        } else {
            return rate
        }
    }

    static getSelectList() {
        return document.querySelector('.my-list__select');
    }
    static getSelectClose() {
        return document.querySelector('.new-film__close');
    }
    static getSelectInput() {
        return document.querySelector('.film');
    }
}

export default Helpers;
