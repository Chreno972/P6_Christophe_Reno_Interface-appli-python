// importe la classe Film pour instancier des films
import Film from './film.js';

// conteneur du modal de chaque film
const modal = document.getElementById("modal");
// conteneur d'informations diverses d'un film dans le modal
const modal_renseignements = document.getElementById("renseignements");
// conteneur de l'image d'un film dans le modal
const modal_image_container = document.getElementById("modal_image_container");
// conteneur du titre d'un film dans le modal
const modal_title_container = document.getElementById("modal_title_container");
// conteneur de la description d'un film dans le modal
const modal_description_container = document.getElementById("modal_description_container");
// conteneur de la liste d'acteurs d'un film dans le modal
const modal_actors_container = document.getElementById("modal_actors_container");
// le bouton de fermeture du modal
const modal_button = document.getElementById("modal_button")
// boutons gauche et droite des carousels (catégories de film)
const sliders = document.querySelector("#carousel_box");
const second_sliders = document.querySelector("#top_voted_movies_carousel_box");
const third_sliders = document.querySelector("#most_recent_movies_carousel_box");
const fourth_sliders = document.querySelector("#best_horror_movies_carousel_box");

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ? Fonction destinée à être utilisée par les carousels de catégories de films
async function testData(url1, url2, html_element) {
    // ! url1 => string : récupère l'url de chaque film de la page 1 de l'API 
    // ! url2 => string : récupère l'url de chaque film de la page 2 de l'API 
    // ! html_element => élément html : récupère les images de plusieurs films

    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    // récupère (get) l'url de la page 1 filtrée
    let thing1 = await axios.get(url1);
    // récupère (get) l'url de la page 2 filtrée
    let thing2 = await axios.get(url2);
    // récupère l'url de chaque film de la page 1
    for (let item of thing1.data.results) {
        let url1 = await axios.get(item.url);
        arr1.push(new Film(url1.data.image_url, url1.data.title, url1.data.genres, url1.data.date_published, url1.data.rated, url1.data.imdb_score, url1.data.directors, url1.data.actors, url1.data.duration, url1.data.countries, url1.data.worldwide_gross_income, url1.data.long_description))
    }
    // récupère l'url de chaque film de la page 2
    for (let item of thing2.data.results) {
        let url1 = await axios.get(item.url);
        arr2.push(new Film(url1.data.image_url, url1.data.title, url1.data.genres, url1.data.date_published, url1.data.rated, url1.data.imdb_score, url1.data.directors, url1.data.actors, url1.data.duration, url1.data.countries, url1.data.worldwide_gross_income, url1.data.long_description))
    }
    // rassemble toutes les url de film et n'en garde que 7/10
    arr3 = [...arr1, ...arr2];

    if (html_element === sliders) {
        arr3.splice(-2, 2);
        arr3.splice(0, 1);
     } else {
        arr3.splice(-3, 3);
     }

    // insère l'image de chaque film dans un conteneur html
    arr3.map((cur, index) => {
        html_element.insertAdjacentHTML(
            "beforeend",
            `
            <img class="img-${index} slider-img" id="${cur.titre}" src="${cur.image}" />
            `
        )
    })
    
    // attend 3 secondes, le chargement de toutes les images
    window.setTimeout(() => {
        // pour chaque enfant d'une div
        for (let item of html_element.childNodes) {
            // au click sur cet enfant de la div
            item.addEventListener("click", () => {
                // pour chaque objet film dans l'array arr3
                for (let film of arr3) {
                    // si l'id de l'enfant cliqué = le titre d'un des films récupérés
                    if (item.id == film.titre) {
                        // stocke les informations du film dans le modal html
                        modal_renseignements.innerHTML = `
                        <p class="modal_genres"><strong>Genres :</strong> ${film.genre}</p>
                        <p class="modal_publish_date"><strong>Publié le :</strong> ${film.date_sortie}</p>
                        <p class="modal_rated"><strong>Évaluation :</strong> ${film.rated}</p>
                        <p class="modal_imdb_score"><strong>Score imdb :</strong> ${film.score_lmdb}</p>
                        <p class="modal_directors"><strong>Réalisateurs :</strong> ${film.realisateur}</p
                        <p class="modal_duration"><strong>Durée :</strong> ${film.duree}</p>
                        <p class="modal_countries"><strong>Pays :</strong> ${film.pays}</p>
                        <p class="modal_income"><strong>C.A :</strong> ${film.box_office}$</p>
                        `;
                        modal_image_container.innerHTML = `<img src="${film.image}" class="modal_image"/>`;
                        modal_title_container.innerHTML = `<h2 class="modal_title">${film.titre}</h2>`;
                        modal_description_container.innerHTML = `<p class="modal_description"><strong>Description :</strong> ${film.resume}</p>`
                        modal_actors_container.innerHTML = `<p class="modal_actors"><strong>Acteurs :</strong> ${film.acteurs}</p>`;
                        modal.style.display = "flex";
                    }
                }
            })
        }
    }, 3000)
}

// ferme le modal au click sur "modal_button" (bouton close)
modal_button.addEventListener("click", () => {
    modal.style.display = "none";
});

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ! TOP RATED MOVIES BY IMDB_SCORES

// exécution de la fonction testData pour les films de catégorie "films les mieux notés"
testData(`http://localhost:8000/api/v1/titles?sort_by=-imdb_score`, `http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=2`, sliders);

document.querySelector(".switch_left").addEventListener("click", () => {
    sliders.scrollLeft -= 220;
});
document.querySelector(".switch_right").addEventListener("click", () => {
    sliders.scrollLeft += 220;
});


// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ! TOP RATED MOVIES BY VOTES

// exécution de la fonction testData pour les films de catégorie "films populaires"
testData(`http://localhost:8000/api/v1/titles?sort_by=-votes`, `http://localhost:8000/api/v1/titles?sort_by=-votes&page=2`, second_sliders);

document.querySelector(".second_switch_left").addEventListener("click", () => {
    second_sliders.scrollLeft -= 220;
});
document.querySelector(".second_switch_right").addEventListener("click", () => {
    second_sliders.scrollLeft += 220;
});

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ! MOST RECENT MOVIES

// exécution de la fonction testData pour les films de catégorie "films récents"
testData(`http://localhost:8000/api/v1/titles?sort_by=-year`, `http://localhost:8000/api/v1/titles?sort_by=-year&page=2`, third_sliders);

document.querySelector(".third_switch_left").addEventListener("click", () => {
    third_sliders.scrollLeft -= 220;
});
document.querySelector(".third_switch_right").addEventListener("click", () => {
    third_sliders.scrollLeft += 220;
});

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ! TOP RATED HORROR MOVIES BY VOTES

// exécution de la fonction testData pour les films de catégorie "films d'horreur populaires"
testData(`http://localhost:8000/api/v1/titles?genre=horror&sort_by=-votes`, `http://localhost:8000/api/v1/titles?genre=horror&sort_by=-votes&page=2`, fourth_sliders);

document.querySelector(".fourth_switch_left").addEventListener("click", () => {
    fourth_sliders.scrollLeft -= 220;
});
document.querySelector(".fourth_switch_right").addEventListener("click", () => {
    fourth_sliders.scrollLeft += 220;
});