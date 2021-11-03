
// ? Classe qui crée un objet Film et permet de le sérialiser
export default class Film{
    constructor(
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