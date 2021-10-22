

let lanceur = document.getElementById("logo");
let best_film = document.getElementById("best_film");
let best_film_image = document.getElementById("best_film_image");
let description = document.getElementById("best_film_description");
let titre = document.getElementById("titre");
let le_tab = [];

get_best_film();

function get_best_film() {
    let url = `http://localhost:8000/api/v1/titles?sort_by=-imdb_score`;
    let inner_best_film = [];
    fetch(url).then((response) => response.json()).then((data) => {
        let inner_data_url = data.results[0].url;
        fetch(inner_data_url).then((resp) => resp.json()).then((inner_data) => {
            titre.innerHTML = inner_data.title;
            best_film_image.src = inner_data.image_url;
            description.innerHTML = inner_data.long_description;
        })
        
    })
}



