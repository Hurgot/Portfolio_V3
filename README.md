# Portfolio BTS SIO

Ce portfolio est conçu pour présenter vos projets et compétences en développement. Il est facile à modifier grâce au fichier JavaScript.

## Structure du projet

- `index.html` : Page principale
- `css/style.css` : Styles et animations
- `js/script.js` : Script contenant les données et la logique (à modifier pour changer le contenu)
- `images/` : Dossier pour les images des projets

## Comment modifier le portfolio

1. **Texte "À propos"** : Modifiez la valeur `"about"` dans l'objet `data` de `js/script.js`.

2. **Compétences** : Ajoutez ou supprimez des éléments dans le tableau `"skills"`.

3. **Projets** : Modifiez le tableau `"projects"`. Chaque projet a :
   - `title` : Titre du projet
   - `description` : Description
   - `image` : Chemin vers l'image (placez les images dans `images/`)
   - `link` : Lien vers le projet ou dépôt GitHub

4. **Contact** : Modifiez les informations dans l'objet `"contact"`.

5. **Styles** : Pour changer l'apparence, éditez `css/style.css`.

6. **Animations** : Les animations sont en CSS pur. Vous pouvez les ajuster dans le fichier CSS.

## Lancer le portfolio

Ouvrez `index.html` dans un navigateur web. Pour un serveur local, utilisez une extension VS Code comme "Live Server".

## Ajouter des sections

Pour ajouter une nouvelle section, modifiez `index.html`, `js/script.js` et `css/style.css` en conséquence.