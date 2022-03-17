/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/menu.js":
/*!********************************!*\
  !*** ./src/js/modules/menu.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function menu() {
    const menu = document.querySelector('.header__top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > '100') {
            menu.style.backgroundColor = "#b00";
        } else {
            menu.style.backgroundColor = "transparent";
        }
    })
}

/* harmony default export */ __webpack_exports__["default"] = (menu);

/***/ }),

/***/ "./src/js/modules/select.js":
/*!**********************************!*\
  !*** ./src/js/modules/select.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function select() {

    const _apiKey = 'ba2becc0-f421-4ef5-bf44-ebac95a88660',
          apiMyFilm = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

    const selectItem = document.querySelector('.film'),
          listFilms = document.querySelector('.my-list__select'),
          inputClose = document.querySelector('.new-film__close'),
          movies = document.querySelector('.my-list__items');


    function getRatingColor(rate) {
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

    function getRating(rate) {
        if (rate.includes('%')) {
            return [rate.substr(0, 1), rate.substr(1, 1)].join('.')
        } else {
            return rate
        }
    }

    function closeInput() {
        if (listFilms.textContent != '') {
            inputClose.style.display = 'block';
        } else {
            inputClose.style.display = 'none';
        }
    }

    function deleteFilm() {
        const deleteBtns = document.querySelectorAll('.movie__close');

        deleteBtns.forEach((e, id) => {
            e.addEventListener('click', (item) => {
                item.target.parentNode.remove();
                console.log(item.target);
                moviesStorage = JSON.parse(localStorage.getItem('movies'));
                moviesStorage.splice(id, 1);
                localStorage.setItem('movies', JSON.stringify(moviesStorage));
            })
        })
    }
    
    let moviesStorage = [];

    if (localStorage.getItem('movies')) {
        moviesStorage = JSON.parse(localStorage.getItem('movies'));
        let displayFilm = '';
        moviesStorage.forEach(item => {
            console.log(item);
            
            displayFilm += `
            <li class='movie'>
                <img src="${item.posterUrl}" alt="${item.nameEn}">
                <div class="movie__name movie__nameEn">${item.nameEn ? item.nameEn : ''}</div>
                <div class="movie__name movie__nameRu">${item.nameEn ? '( ' + item.nameRu + ' )' : item.nameRu}</div>
                <div class="movie__genres">${item.genres.slice(0, 3).map(genre => ` ${genre.genre}`)}</div>
                <div class="movie__rating movie__rating_${getRatingColor(item.rating)}">${item.rating != 'null' ? getRating(item.rating) : 'no'}</div>
                <div class="movie__close">Удалить</div>
            </li>
            `
            console.log(item.rating);
            movies.innerHTML = displayFilm;
        })
        
    }


    selectItem.addEventListener('keyup', () => {
        const inputValue = selectItem.value,
              api = `${apiMyFilm}${inputValue}`;
              
        listFilms.innerHTML = '';

        getFilm(api);
    })

    async function getFilm(url) {
        const res = await fetch(url, {
            headers: {
                'Content-type': 'application/json',
                'X-API-KEY': _apiKey,
            },
        })

        const resData = await res.json();
        resData.films.slice(0, 6).forEach(item => {
            const film = document.createElement('li');
            film.classList.add('film-item')
            film.innerHTML = `
                ${item.nameRu}  
            `
            listFilms.appendChild(film);
            film.addEventListener('click', () => {
                console.log(item);
                const movie = document.createElement('li');
                
                movie.classList.add('movie')
                movie.innerHTML = `
                    <img src="${item.posterUrl}" alt="${item.nameEn}">
                    <div class="movie__name movie__nameEn">${item.nameEn ? item.nameEn : ''}</div>
                    <div class="movie__name movie__nameRu">${item.nameEn ? '( ' + item.nameRu + ' )' : item.nameRu}</div>
                    <div class="movie__genres">${item.genres.slice(0, 3).map(genre => ` ${genre.genre}`)}</div>
                    <div class="movie__rating movie__rating_${getRatingColor(item.rating)}">${item.rating != 'null' ? getRating(item.rating) : 'no'}</div>
                    <div class="movie__close">Удалить</div>
                `
                movies.appendChild(movie);
                listFilms.innerHTML = '';
                selectItem.value = '';
                closeInput()
                
                moviesStorage.push(item);
                console.log(moviesStorage);
                localStorage.setItem('movies', JSON.stringify(moviesStorage));
                deleteFilm()
             })
            
        })

        window.addEventListener('click', (e) => {
            if (listFilms && !e.target.closest('.film')) {
                listFilms.innerHTML = '';
                selectItem.value = '';
            }
            closeInput()
        })

        closeInput()
        console.log(movies);
        deleteFilm()


    }
    
    deleteFilm()

}

/* harmony default export */ __webpack_exports__["default"] = (select);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/menu */ "./src/js/modules/menu.js");
/* harmony import */ var _modules_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/select */ "./src/js/modules/select.js");

// import topFilms from './modules/topFilms';


    (0,_modules_menu__WEBPACK_IMPORTED_MODULE_0__["default"])();
    //   topFilms();
    (0,_modules_select__WEBPACK_IMPORTED_MODULE_1__["default"])();
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map