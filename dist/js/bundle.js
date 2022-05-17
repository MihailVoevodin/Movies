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
        if (window.pageYOffset > '50') {
            menu.style.backgroundColor = "#b00";
        } else {
            menu.style.backgroundColor = "transparent";
        }
    })

    const menuClose = document.querySelector('.hamburger-menu__close'),
          menuSide = document.querySelector('.hamburger-menu'),
          menuOpen = document.querySelector('.hamburger');

    menuOpen.addEventListener('click', () => {
        menuSide.classList.add('active');
    }) 

    menuClose.addEventListener('click', () => {
        menuSide.classList.remove('active');
    })

    document.addEventListener('click', e => {
        if (!e.target.closest('.hamburger-menu') && !e.target.closest('.hamburger')) {
            menuSide.classList.remove('active');
        }
    })

    const menuItems = document.querySelectorAll('.hamburger-menu__item');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuSide.classList.remove('active');
        })
    })

}

/* harmony default export */ __webpack_exports__["default"] = (menu);

/***/ }),

/***/ "./src/js/modules/scroll.js":
/*!**********************************!*\
  !*** ./src/js/modules/scroll.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function scroll() {
    const scrollBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > '1000') {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    })
    

    scrollBtn.addEventListener('click', () => {
        window.scrollTo(0, 0);
    })
}

/* harmony default export */ __webpack_exports__["default"] = (scroll);

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
          movies = document.querySelector('.my-list__items'),
          cards = document.querySelector('.cards');
          

          


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
            <li class='movie' filmId=${item.filmId}>
                <img src="${item.posterUrl}" alt="${item.nameEn}">
                <div class="movie__name movie__nameEn">${item.nameEn ? item.nameEn : ''}</div>
                <div class="movie__name movie__nameRu">${item.nameEn ? '( ' + item.nameRu + ' )' : item.nameRu}</div>
                <div class="movie__genres">${item.genres.slice(0, 3).map(genre => ` ${genre.genre}`)}</div>
                <div class="movie__rating movie__rating_${getRatingColor(item.rating)}">${item.rating != 'null' ? getRating(item.rating) : 'no'}</div>
                <div class="movie__close">Удалить</div>
                <div class="movie__info">Подробнее...</div>
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

                    const movie = document.createElement('li');

                    movie.setAttribute('filmId', item.filmId);
                    movie.classList.add('movie');


                    const ids = document.querySelectorAll('li.movie');
                    const filmId = ids.map(item => {
                        const id = item.getAttribute('filmid');
                        console.log(id)
                        return id;
                    })
                    console.log(ids);
                    console.log(filmId);
                    console.log(item.filmId);
                    // if (item.filmId != filmId) {
                        movie.innerHTML = `
                            <img src="${item.posterUrl}" alt="${item.nameEn}">
                            <div class="movie__name movie__nameEn">${item.nameEn ? item.nameEn : ''}</div>
                            <div class="movie__name movie__nameRu">${item.nameEn ? '( ' + item.nameRu + ' )' : item.nameRu}</div>
                            <div class="movie__genres">${item.genres.slice(0, 3).map(genre => ` ${genre.genre}`)}</div>
                            <div class="movie__rating movie__rating_${getRatingColor(item.rating)}">${item.rating != 'null' ? getRating(item.rating) : 'no'}</div>
                            <div class="movie__close">Удалить</div>
                            <div class="movie__info">Подробнее...</div>
                        `
                        movies.appendChild(movie);
                        listFilms.innerHTML = '';
                        selectItem.value = '';
                        closeInput()
                        
                        moviesStorage.push(item);
                        console.log(moviesStorage);
                        localStorage.setItem('movies', JSON.stringify(moviesStorage));
                        deleteFilm()
                        createCard()
                    // } else {
                    //     alert('This film in yhe list yet!');
                    // }
                    
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

    function closeCard() {
        const card = document.querySelector('.card')
        
        cards.addEventListener('click', (e) => {
            console.log(e.target);
            if (!e.target.closest('.card')) {
                
                e.target.innerHTML = '';
                cards.style.display = 'none';
                document.body.style.overflow = '';
            }
            

        })
    }


    function createCard() {

        const cardTriggers = document.querySelectorAll('.movie__info');

        cardTriggers.forEach(e => {
            
            const filmId = e.parentNode.getAttribute('filmid');
                
            e.addEventListener('click', () => {
                console.log(filmId);
                moviesStorage = JSON.parse(localStorage.getItem('movies'));
                moviesStorage.forEach(item => {
                    
                    if (item.filmId == filmId) {
                        console.log(item)
                        const card = document.createElement('div');
                        cards.style.display = 'block';
                        card.classList.add('card')
                        card.innerHTML = `
                            <img class="card__img" src="${item.posterUrl}" alt="${item.nameEn}">
                            <div class="card__info">
                                <div class="card__name">${item.nameEn ? item.nameEn : ''} ${item.nameEn ? '(' + item.nameRu +')' : item.nameRu}</div>
                                <div class="card__type">Type : ${item.type}</div>
                                <div class="card__year">Year : ${item.year}</div>
                                <div class="card__countries">Countries : ${item.countries.map(countries => ` ${countries.country}`)}</div>
                                <div class="card__genres">Genres :${item.genres.map(genre => ` ${genre.genre}`)}</div>
                                <div class="card__rating">Rating : ${item.rating}</div>
                                <div class="card__length">Length : ${item.filmLength}</div>
                                <div class="card__descr">Description :<br>${item.description}</div>
                            </div>
                            
                        `
                        cards.appendChild(card);
                        document.body.style.overflow = 'hidden';
                        console.log(card);
                        closeCard()
                    }
                    
                })
                    
            })
        })

    }

    

    createCard()
    

    
    
    
}

/* harmony default export */ __webpack_exports__["default"] = (select);

/***/ }),

/***/ "./src/js/modules/topFilms.js":
/*!************************************!*\
  !*** ./src/js/modules/topFilms.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function topFilms() {
    const _apiKey = 'ba2becc0-f421-4ef5-bf44-ebac95a88660',
      apiUrlPopular = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
      

    getPopularFilms(apiUrlPopular)

    async function getPopularFilms(url) {
        const res = await fetch(url, {
            headers: {
                'Content-type': 'application/json',
                'X-API-KEY': _apiKey,
            },
        })

        const resData = await res.json();
        createCards(resData)
    }

    function createCards(card) {
        const movies = document.querySelector('.movies');

        card.films.forEach(item => {
            const movie = document.createElement('div')
            movie.classList.add('movie')
            movie.innerHTML = `
            <div>
                <img src="${item.posterUrl}" alt="${item.nameEn}">
                <div class="movie__name movie__nameEn">${item.nameEn ? item.nameEn : ''}</div>
                <div class="movie__name movie__nameRu">${item.nameEn ? '( ' + item.nameRu + ' )' : item.nameRu}</div>
                <div class="movie__genres">${item.genres.slice(0, 3).map(genre => ` ${genre.genre}`)}</div>
                <div class="movie__rating movie__rating_${getRatingColor(item.rating)}">${getRating(item.rating)}</div>
            </div>
            `
            movies.appendChild(movie)
        })

    }


    function getRatingColor(rate) {
        if (rate >= '7') {
            return 'green';
        } else if (rate > '5') {
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
}

/* harmony default export */ __webpack_exports__["default"] = (topFilms);

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
/* harmony import */ var _modules_topFilms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/topFilms */ "./src/js/modules/topFilms.js");
/* harmony import */ var _modules_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/select */ "./src/js/modules/select.js");
/* harmony import */ var _modules_scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/scroll */ "./src/js/modules/scroll.js");





    (0,_modules_menu__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_topFilms__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_select__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_scroll__WEBPACK_IMPORTED_MODULE_3__["default"])();
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map