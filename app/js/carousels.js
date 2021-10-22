import Film from './film.js';

const modal = document.getElementById("modal");
const modal_renseignements = document.getElementById("renseignements");
const modal_image_container = document.getElementById("modal_image_container");
const modal_title_container = document.getElementById("modal_title_container");
const modal_description_container = document.getElementById("modal_description_container");
const modal_actors_container = document.getElementById("modal_actors_container");
const modal_button = document.getElementById("modal_button")

async function testData(url1, url2, html_element) {
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    let thing1 = await axios.get(url1);
    let thing2 = await axios.get(url2);
    for (let item of thing1.data.results) {
        let url1 = await axios.get(item.url);
        arr1.push(new Film(url1.data.image_url, url1.data.title, url1.data.genres, url1.data.date_published, url1.data.rated, url1.data.imdb_score, url1.data.directors, url1.data.actors, url1.data.duration, url1.data.countries, url1.data.worldwide_gross_income, url1.data.long_description))
    }
    for (let item of thing2.data.results) {
        let url1 = await axios.get(item.url);
        arr2.push(new Film(url1.data.image_url, url1.data.title, url1.data.genres, url1.data.date_published, url1.data.rated, url1.data.imdb_score, url1.data.directors, url1.data.actors, url1.data.duration, url1.data.countries, url1.data.worldwide_gross_income, url1.data.long_description))
    }
    arr3 = [...arr1, ...arr2];
    arr3.splice(-3, 3)
    
    arr3.map((cur, index) => {
        html_element.insertAdjacentHTML(
            "beforeend",
            `
            <img class="img-${index} slider-img" id="${cur.titre}" src="${cur.image}" />
            `
        )
    })
    window.setTimeout(() => {
        for (let item of html_element.childNodes) {
            item.addEventListener("click", () => {
                for (let film of arr3) {
                    if (item.id == film.titre) {
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


modal_button.addEventListener("click", () => {
    modal.style.display = "none";
})


// ? carousel sliders switches
const sliders = document.querySelector("#carousel_box");
const second_sliders = document.querySelector("#top_voted_movies_carousel_box");
const third_sliders = document.querySelector("#most_recent_movies_carousel_box");
const fourth_sliders = document.querySelector("#best_horror_movies_carousel_box");
let scrollPerClick = 1000;
let scrollAmount = 0;

// ? Scrolls the carousel elements to the left
function scrollLeft(sl) {
    sl.scrollTo({
        top: 0,
        left: (scrollAmount -= scrollPerClick),
        behavior: "smooth"
    });

    if(scrollAmount < 0) {
        scrollAmount = 0
    }
}
// ? Scrolls the carousel elements to the right
function scrollRight(sl) {
    if(scrollAmount <= sl.scrollWidth - sl.clientWidth) {
        sl.scrollTo({
            top: 0,
            left: (scrollAmount += scrollPerClick),
            behavior: "smooth"
        });
    }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ! TOP RATED MOVIES BY IMDB_SCORES

// ? gets the informations from the API to display them in the carousel
testData(`http://localhost:8000/api/v1/titles?sort_by=-imdb_score`, `http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=2`, sliders);

document.querySelector(".switch_left").addEventListener("click", () => {
    scrollLeft(sliders)
});
document.querySelector(".switch_right").addEventListener("click", () => {
    scrollRight(sliders)
});


// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ! TOP RATED MOVIES BY VOTES

// ? gets the informations from the API to display them in the carousel
testData(`http://localhost:8000/api/v1/titles?sort_by=-votes`, `http://localhost:8000/api/v1/titles?sort_by=-votes&page=2`, second_sliders);

document.querySelector(".second_switch_left").addEventListener("click", () => {
    scrollLeft(second_sliders)
});
document.querySelector(".second_switch_right").addEventListener("click", () => {
    scrollRight(second_sliders)
});

let le_test = second_sliders.getElementsByTagName("img");

// window.setTimeout(() => {
//     for (let item of second_sliders.childNodes) {
//         console.log(item.id)
//     }
// }, 3000)
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ! MOST RECENT MOVIES

// ? gets the informations from the API to display them in the carousel
testData(`http://localhost:8000/api/v1/titles?sort_by=-year`, `http://localhost:8000/api/v1/titles?sort_by=-year&page=2`, third_sliders);

document.querySelector(".third_switch_left").addEventListener("click", () => {
    scrollLeft(third_sliders)
});
document.querySelector(".third_switch_right").addEventListener("click", () => {
    scrollRight(third_sliders)
});

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ! TOP RATED HORROR MOVIES BY VOTES

// ? gets the informations from the API to display them in the carousel
testData(`http://localhost:8000/api/v1/titles?genre=horror&sort_by=-votes`, `http://localhost:8000/api/v1/titles?genre=horror&sort_by=-votes&page=2`, fourth_sliders);

document.querySelector(".fourth_switch_left").addEventListener("click", () => {
    scrollLeft(fourth_sliders)
});
document.querySelector(".fourth_switch_right").addEventListener("click", () => {
    scrollRight(fourth_sliders)
});