# Utilistation de l'interface web et del'api "OCMovies-API"

# description de l'interface web
- Cette interface filtre les données d'une API Rest python', pour les afficher sous format de catégories.

---

## Installation locale de l'interface web

- Cloner ce dépôt de code à l'aide de la commande 
  `$ git clone https://github.com/Chreno972/P6_Christophe_Reno_Interface-appli-python.git` 
(vous pouvez également télécharger le code en temps qu'archive zip)

- Si vous avez téléchargé le dossier de l'interface web sous format zip, créer un dossier vide où vous voulez sur votre ordinateur, et placez le dossier de l'interface dezzipé dedans.
- Sinon, faites le git clone depuis le dossier vide pour y ajouter le dossier de l'interface web

---

## Installation locale de l'API

- Faites de même pour le dossier de l'API, rendez-vous [ici](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)

- Cloner ce dépôt de code à l'aide de la commande 
  ` $ git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git` 
(vous pouvez également télécharger le code en temps qu'archive zip)

- Si vous avez téléchargé le dossier de l'API sous format zip, créer un dossier placez le dossier de l'API dezzipé dans le dossier qui contient celui de l'interface web.
- Sinon, faites le git clone depuis le dossier vide pour y ajouter le dossier de l'interface web
- Et maintenant, vous devez avoir dans votre dossier, les sous dossiers suivants: 
- `app et OCMovies-API-EN-FR` et un fichier `index.html`, un fichier `gitignore`, ainsi qu'un fichier `README.md`.

---

## Manipulations

- En ce qui concerne l'interface web (`app`), aucune autre manipulation n'est à prévoir.
- Depuis votre terminal, dirigez vous dans le dossier de l'API:
```bash
cd OCMovies-API-EN-FR
```
Cette API exécutable localement peut être installée en suivant les étapes décrites ci-dessous. L'usage de pipenv est recommandé, mais des instuctions utilisant venv et pip sont également fournies plus bas. Si pipenv n'est pas encore installé sur votre ordinateur, vous trouverez des instuctions d'installation détaillées [sur cette page](docs/pipenv/installation-fr.md).

---

- Maintenant, vous pouvez décider d'installer les différents composants necessaires à l'exécution de l'API et au lancement de son serveur local avec pipenv ou venv.

---

## Installation et exécution de l'application avec pipenv

1. Cloner ce dépôt de code à l'aide de la commande `$ git clone clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git` (vous pouvez également télécharger le code [en temps qu'archive zip](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/archive/refs/heads/master.zip))
2. Rendez-vous depuis un terminal à la racine du répertoire ocmovies-api-fr avec la commande `$ cd ocmovies-api-fr`
3. Installez les dépendances du projet à l'aide de la commande `pipenv install` 
4. Créer et alimenter la base de données à l'aide de la commande `pipenv run python manage.py create_db`
5. Démarrer le serveur avec `pipenv run python manage.py runserver`

Lorsque le serveur fonctionne, après l'étape 5 de la procédure, l'API OCMovies peut être interrogée à partir des points d'entrée commençant par l'url de base [http://localhost:8000/api/v1/](http://localhost:8000/api/v1/). Le point d'entrée principal permettant de consulter les films est [http://localhost:8000/api/v1/titles](http://localhost:8000/api/v1/titles/). Si vous accédez à cette url depuis un navigateur,ce dernier vous présentera une interface naviguable servant de documentation et de laboratoire d'expériementation. Vous trouvez également une documentation plus formelle en bas de ce README.

Les étapes 1 à 4 ne sont requises que pout l'installation initiale. Pour les lancements ultérieurs du serveur de l'API, il suffit d'exécuter l'étape 5 à partir du répertoire racine du projet.

---

## Installation et exécution de l'application sans pipenv (avec venv et pip)

1. Cloner ce dépôt de code à l'aide de la commande `$ git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git` (vous pouvez également télécharger le code [en temps qu'archive zip](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/archive/refs/heads/master.zip))
2. Rendez-vous depuis un terminal à la racine du répertoire ocmovies-api-fr avec la commande `$ cd ocmovies-api-fr`
3. Créer un environnement virtuel pour le projet avec `$ python -m venv env` sous windows ou `$ python3 -m venv env` sous macos ou linux.
4. Activez l'environnement virtuel avec `$ env\Scripts\activate` sous windows ou `$ source env/bin/activate` sous macos ou linux.
5. Installez les dépendances du projet avec la commande `$ pip install -r requirements.txt`
6. Créer et alimenter la base de données avec la commande `$ python manage.py create_db`
7. Démarrer le serveur avec `$ python manage.py runserver`

Lorsque le serveur fonctionne, après l'étape 7 de la procédure, l'API OCMovies peut être interrogée à partir des points d'entrée commençant par l'url de base [http://localhost:8000/api/v1/](http://localhost:8000/api/v1/). Le point d'entrée principal permettant de consulter les films est [http://localhost:8000/api/v1/titles](http://localhost:8000/api/v1/titles/). Si vous accédez à cette url depuis un navigateur,ce dernier vous présentera une interface naviguable servant de documentation et de laboratoire d'expériementation. Vous trouvez également une documentation plus formelle en bas de ce README.

Les étapes 1 à 6 ne sont requises que pout l'installation initiale. Pour les lancements ultérieurs du serveur de l'API, il suffit d'exécuter les étapes 4 et 7 à partir du répertoire racine du projet.

---

## Lancement

- Maintenant que votre environnement virtuel est activé et que votre server tourne, lancez le fichier index.html avec le serveur local. Vous pouvez maintenant tester toutes les fonctionnalités de l'interface web.