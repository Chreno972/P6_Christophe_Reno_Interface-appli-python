// créer un ul avec des lis avec fetch api
// let url = 'http://localhost:8000/api/v1/titles/'
// fetch(url).then((response) => response.json()).then((data) => {
//     console.log(data);
//     let affichage = '<ul>';
//     for(let ville of data){
//         affichage += `<li>${ville.nom}</li>`;
//     }
//     affichage += '</ul>';
// })
// avec la fonction fléchée, quand on ,n'a qu'un résultat, pas besoin de return, ni de function, ni d'accolades

class Film{
    constructor(
        link,
        image,
        titre,
        genre,
        date_sortie,
        rated,
        score_lmdb,
        realisateur,
        acteurs,
        duree,
        pays,
        box_office,
        resume
    ) {
        this.link = link;
        this.image = image;
        this.titre = titre;
        this.genre = genre;
        this.date_sortie = date_sortie;
        this.rated = rated;
        this.score_lmdb = score_lmdb;
        this.realisateur = realisateur;
        this.acteurs = acteurs;
        this.duree = duree;
        this.pays = pays;
        this.box_office = box_office;
        this.resume = resume;
    }

    serialize_film() {
        let serialized_film = {
            "lien" : this.link,
            "image" : this.image,
            "titre" : this.titre,
            "genre" : this.genre,
            "date_de_sortie" : this.date_sortie,
            "noté" : this.rated,
            "score_lmdb" : this.score_lmdb,
            "réalisateur" : this.realisateur,
            "acteurs" : this.acteurs,
            "durée" : this.duree,
            "pays" : this.pays,
            "box_office" : this.box_office,
            "résumé" : this.resume
        };
        return serialized_film;
    }
}

let lanceur = document.getElementById("logo");
let best_film = document.getElementById("best_film");
let le_tab = [];

lanceur.addEventListener("click", function(e) {
    e.preventDefault();
    let i = 1;
    while (i <= 20) {
        let url = `http://localhost:8000/api/v1/titles/?page=${i}`
        fetch(url).then((response) => response.json()).then((data) => {
            for (let title of data.results) {
                let film_url = title.url
                fetch(film_url).then((resp) => resp.json()).then((dat) => {
                    le_tab.push(new Film(
                        dat.url,
                        dat.image_url,
                        dat.title,
                        dat.genres,
                        dat.date_published,
                        dat.rated,
                        dat.directors,
                        dat.actors, 
                        dat.duration,
                        dat.countries,
                        dat.worldwide_gross_income,
                        dat.long_description,)
                        .serialize_film()
                    )
                })
            }
        })
        i += 1;
    }
    console.log(le_tab[1]);
    let arr;
    if (localStorage.getItem("meilleur_film") === null) {
        arr = [];
    } else {
        arr = JSON.parse(localStorage.getItem("meilleur_film"));
    }

    arr.push(le_tab[6]);
    localStorage.setItem("meilleur_film", JSON.stringify(arr));
})
let best_film_image = document.getElementById("best_film_image");
let titre = document.getElementById("titre");

let maxter = JSON.parse(localStorage.getItem("meilleur_film"));

titre.innerHTML = maxter[1]["titre"];
best_film_image.src = maxter[1]["image"];




    // fetch(url).then((response) => response.json()).then((data) => {
    //     for (let imd of data.results) {
    //         le_tab.push(imd.title, imd.genres, imd.year, imd.directors + '\n')
    //     }
    // })


