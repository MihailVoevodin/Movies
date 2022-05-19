import { debounce } from "lodash";

function select() {

    

    const _apiKey = 'ba2becc0-f421-4ef5-bf44-ebac95a88660';
    const apiMyFilm = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

    const selectItem = document.querySelector('.film');
    const listFilms = document.querySelector('.my-list__select');
    const inputClose = document.querySelector('.new-film__close');
    const movies = document.querySelector('.my-list__items');
          

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

    function renderClose() {
        if (listFilms.textContent != '') {
            inputClose.style.display = 'block';
            
        } else {
            inputClose.style.display = 'none';
            listFilms.innerHTML = '';
            selectItem.value = '';
        }
    }

    // И тут)
    // Не уверен, что можно использовать после обновления в таком виде, 
    // но это надо поменять инициализацию видимо
    function deleteFilm(item) {
        const filmId = item.getAttribute('filmid');
        moviesStorage = JSON.parse(localStorage.getItem('movies'));
        moviesStorage.filter((film, id) => {

            if (film.filmId == filmId) {
                moviesStorage.splice(id, 1);
            }
        })
        console.log(filmId);
        localStorage.setItem('movies', JSON.stringify(moviesStorage));
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

            movies.innerHTML = displayFilm;
        })
    }




    
    const loadFilms = async (url) => {
        const headers = {
            'Content-type': 'application/json',
            'X-API-KEY': _apiKey,
        };

        const response = await fetch(url, {headers});
        const resultData = await response.json();
        
        return resultData.films || []; 
    };

    const handleLoadFilms = debounce((url, onSuccess) => 
        loadFilms(url).then(onSuccess), 500);


    const renderFilmInList = filmData => {
        const film = document.createElement('li');
        film.classList.add('film-item')
    
        film.innerHTML = `
            ${filmData.nameRu}  
        `
        listFilms.appendChild(film);

        return film;
    }
    
    selectItem.addEventListener('keyup', () => {
        const inputValue = selectItem.value,
              api = `${apiMyFilm}${inputValue}`;
              
        listFilms.innerHTML = '';

        handleLoadFilms(api, (films) =>
            films.slice(0, 6).forEach((film) => {
                
            const filmListItem = renderFilmInList(film);
            filmListItem.addEventListener('click', () => {
                handleListItemClick(film);
            });
            
        }));
    });

    const handleListItemClick = (filmData) => {

        const filmCard = renderFilmCard(filmData);
        const deleteBtn = filmCard.querySelector('.movie__close');

        //Смотреть здесь)

        deleteBtn.addEventListener('click', () => {
            filmCard.remove();
            
            deleteFilm(filmCard);
        })
        console.log(deleteBtn);

        // listFilms.innerHTML = '';
        // selectItem.value = '';

        moviesStorage.push(filmData);
        console.log(moviesStorage);
        localStorage.setItem('movies', JSON.stringify(moviesStorage));
    }

    const renderFilmCard = (filmData) => {
        const movie = document.createElement('li');

        movie.setAttribute('filmId', filmData.filmId);
        movie.classList.add('movie');

        movie.innerHTML = `
            <img src="${filmData.posterUrl}" alt="${filmData.nameEn}">
            <div class="movie__name movie__nameEn">${filmData.nameEn ? filmData.nameEn : ''}</div>
            <div class="movie__name movie__nameRu">${filmData.nameEn ? '( ' + filmData.nameRu + ' )' : filmData.nameRu}</div>
            <div class="movie__genres">${filmData.genres.slice(0, 3).map(genre => ` ${genre.genre}`)}</div>
            <div class="movie__rating movie__rating_${getRatingColor(filmData.rating)}">${filmData.rating != 'null' ? getRating(filmData.rating) : 'no'}</div>
            <div class="movie__close">Удалить</div>
            <div class="movie__info">Подробнее...</div>
        `
        movies.appendChild(movie);

        return movie;
    }


    window.addEventListener('click', (e) => {
        if (listFilms && !e.target.closest('.film')) {
            listFilms.innerHTML = '';
            selectItem.value = '';
        }
    })

    //     closeInput()
    //     console.log(movies);
    //     deleteFilm()


    // }
    
    // deleteFilm()

    // function closeCard() {
        
    //     cards.addEventListener('click', (e) => {
    //         console.log(e.target);
    //         if (!e.target.closest('.card')) {
                
    //             cards.innerHTML = '';

    //             cards.style.display = 'none';
    //             document.body.style.overflow = '';
    //         }
            

    //     })
    // }


    // function createCard() {

    //     const cardTriggers = document.querySelectorAll('.movie__info');

    //     cardTriggers.forEach(e => {
            
    //         const filmId = e.parentNode.getAttribute('filmid');
                
    //         e.addEventListener('click', () => {
    //             console.log(filmId);
    //             moviesStorage = JSON.parse(localStorage.getItem('movies'));
    //             moviesStorage.forEach(item => {
                    
    //                 if (item.filmId == filmId) {
    //                     console.log(item)
    //                     const card = document.createElement('div');
    //                     cards.style.display = 'block';
    //                     card.classList.add('card')
    //                     card.innerHTML = `
    //                         <img class="card__img" src="${item.posterUrl}" alt="${item.nameEn}">
    //                         <div class="card__info">
    //                             <div class="card__name">${item.nameEn ? item.nameEn : ''} ${item.nameEn ? '(' + item.nameRu +')' : item.nameRu}</div>
    //                             <div class="card__type">Type : ${item.type}</div>
    //                             <div class="card__year">Year : ${item.year}</div>
    //                             <div class="card__countries">Countries : ${item.countries.map(countries => ` ${countries.country}`)}</div>
    //                             <div class="card__genres">Genres :${item.genres.map(genre => ` ${genre.genre}`)}</div>
    //                             <div class="card__rating">Rating : ${item.rating}</div>
    //                             <div class="card__length">Length : ${item.filmLength}</div>
    //                             <div class="card__descr">Description :<br>${item.description}</div>
    //                         </div>
                            
    //                     `
    //                     cards.appendChild(card);
    //                     document.body.style.overflow = 'hidden';
    //                     console.log(card);
    //                     closeCard()
    //                 }
                    
    //             })
                    
    //         })
    //     })

    // }

    

    // createCard()
    

    
    
    
}

export default select;