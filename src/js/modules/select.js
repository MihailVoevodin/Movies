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

export default select;