// conteneur html de la catégorie "meilleur film"
let best_film = document.getElementById("best_film");
// conteneur html de l'image du meilleur film
let best_film_image = document.getElementById("best_film_image");
// conteneur html de la description du meilleur film
let description = document.getElementById("best_film_description");
// conteneur html du titre du meilleur film
let titre = document.getElementById("titre");
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


//------------------------------------------------------------------------------

// exécution de la fonction get_best_film()
get_best_film();

// ? Fonction destinée à être utilisée par la catégorie meilleur film
function get_best_film() {
    // url de la page filtrée
    let url = `http://localhost:8000/api/v1/titles?sort_by=-imdb_score`;
    // fetch l'url pour récupérer les informations
    // récupère l'url du premier élément (film) de la page
    // fetch l'url de cet élément
    // insère des informations de l'élément dans le document html
    fetch(url).then((response) => response.json()).then((data) => {
        let inner_data_url = data.results[0].url;
        fetch(inner_data_url).then((resp) => resp.json()).then((inner_data) => {
            titre.innerHTML = inner_data.title;
            best_film_image.src = inner_data.image_url;
            description.innerHTML = inner_data.long_description;
// ajouter condition si nul CA
            window.setTimeout(() => {
                best_film_image.addEventListener("click", () => {
                    modal_renseignements.innerHTML = `
                    <p class="modal_genres"><strong>Genres :</strong> ${inner_data.genres}</p>
                    <p class="modal_publish_date"><strong>Publié le :</strong> ${inner_data.date_published}</p>
                    <p class="modal_rated"><strong>Évaluation :</strong> ${inner_data.rated}</p>
                    <p class="modal_imdb_score"><strong>Score imdb :</strong> ${inner_data.imdb_score}</p>
                    <p class="modal_directors"><strong>Réalisateurs :</strong> ${inner_data.directors}</p
                    <p class="modal_duration"><strong>Durée :</strong> ${inner_data.duration}</p>
                    <p class="modal_countries"><strong>Pays :</strong> ${inner_data.countries}</p>
                    <p class="modal_income"><strong>C.A :</strong> ${inner_data.worldwide_gross_income}</p>
                    `;
                    modal_image_container.innerHTML = `<img src="${inner_data.image_url}" class="modal_image"/>`;
                    modal_title_container.innerHTML = `<h2 class="modal_title">${inner_data.title}</h2>`;
                    modal_description_container.innerHTML = `<p class="modal_description"><strong>Description :</strong> ${inner_data.long_description}</p>`
                    modal_actors_container.innerHTML = `<p class="modal_actors"><strong>Acteurs :</strong> ${inner_data.actors}</p>`;
                    modal.style.display = "flex";
                })
            }, 3000)
        })
    })
}

// ferme le modal au click sur "modal_button" (bouton close)
modal_button.addEventListener("click", () => {
    modal.style.display = "none";
});


