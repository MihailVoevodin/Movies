import { debounce } from "lodash";

const API_KEY = 'ba2becc0-f421-4ef5-bf44-ebac95a88660';

 
async function loadFilms(url){
    const headers = {
        'Content-type': 'application/json',
        'X-API-KEY': API_KEY,
    };

    const response = await fetch(url, {headers});
    const resultData = await response.json();
    
    return resultData.films || []; 
};

export const debouncedLoadFilms = debounce((url, onSuccess) => 
loadFilms(url).then(onSuccess), 500);

async function loadTopFilms(url) {
    const headers = {
        'Content-type': 'application/json',
        'X-API-KEY': API_KEY,
    };

    const response = await fetch(url, {headers});
    const resultData = await response.json();

    return resultData.films || [];
}

export const topLoadFilms = (url, onSuccess) => 
    loadTopFilms(url).then(onSuccess);

