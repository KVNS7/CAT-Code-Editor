<p align="center">
  <a href="https://www.cat.savoircoder.fr/accueil/" target = "_blank" rel = "noopener noreferrer">
    <img width="100" src="https://www.cat.savoircoder.fr/static/moulinette/img/logo/home_logo.png" alt="CAT logo">
  </a>
</p>

<h1 align="center">Code Editor pour CAT</h1>
  
<!--          Sommaire          -->
<br/>
<details>
  <summary>Sommaire</summary>
  <ol>
    <li>
      <a href="#a-propos-du-projet">A propos du projet</a>
      <ul>
        <li><a href="#créé-avec">Créé avec</a></li>
      </ul>
    </li>
    <li>
      <a href="#pour-commencer">Pour commencer</a>
      <ul>
        <li><a href="#prérequis">Prérequis</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#utilisation">Utilisation</a></li>
    <li><a href="#feuille-de-route">Feuille de route</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!------------------------------------------------------------------------------------------------------------------------------------------>
## A propos du projet
<!------------------------------------------------------------------------------------------------------------------------------------------>
<br/>

<p align = "center" >
  <a href = "http://localhost:5173/" target ="_blank" rel ="noopener noreferrer">
    <img width="700" src="public/img/interface-IDE.png" alt="Interface IDE">
  </a>
</p>

L'objectif de ce projet est de proposer une solution contenant un IDE multi-fenêtre, offrant une coloration et affichage d'erreur syntaxique compatible avec plusieurs langages pouvant être intégré à <a href="https://www.cat.savoircoder.fr/accueil/" target ="_blank" rel ="noopener noreferrer"> CAT</a>.

Celui-ci sera finalement relié à un terminal réalisé par <a href="https://github.com/PiravineJEYAMOHAN" target = "_blank" rel = "noopener noreferrer">Piravine JEYAMOHAN</a>, ce qui permettra de pouvoir exécuter le code et de réaliser des commandes sur les fichiers qui seront stockés sur un Docker sous un dossier spécifique à chaque étudiant.
<br/><br/>

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=PiravineJEYAMOHAN&repo=composant-terminal-cat&border_color=7F3FBF&bg_color=0D1117&title_color=C9D1D9&text_color=8B949E&icon_color=7F3FBF)](https://github.com/PiravineJEYAMOHAN/composant-terminal-cat)

Ceci a pour but de :
- simplifier le travail des étudiants sur CAT en leur permettant de compiler et exécuter leurs projets directement sur le site (évite les allés-retour entre IDE et CAT)
- inciter les étudiants à utiliser le terminal, de moins en moins utilisé étant donné le grand nombre d'interfaces créées masquant son usage
- permettre aux enseignants un suivi du code des étudiants

<!------------------------------------------------------------------------------------------------------------------------------------------>
### Créé avec 
<!------------------------------------------------------------------------------------------------------------------------------------------>
<br/>

[![JavaScript version][JavaScript-badge]][JavaScript-url]

[![React version][React-badge]][React-url]

[![Vite version][Vite-badge]][Vite-url]

[![ChakraUI version][Chakra-badge]][Chakra-url]

[![Monaco Editor version][MonacoEditor-badge]][MonacoEditor-url]

[![Docker version][Docker-badge]][Docker-url]

[![Axios version][Axios-badge]][Axios-url]

[![JS-beautify version][js-beautify-badge]][JS-beautify-url]

[![Piston version][Piston-badge]][Piston-url]


<!------------------------------------------------------------------------------------------------------------------------------------------>
## Pour commencer
<!------------------------------------------------------------------------------------------------------------------------------------------>
> Vous trouverez ci-dessous les différentes étapes nécessaires au lancement du projet

<!------------------------------------------------------------------------------------------------------------------------------------------>
### Prérequis
<!------------------------------------------------------------------------------------------------------------------------------------------>
<br/>

Il faut préalablement installer <a href = "https://nodejs.org/en/download" target = "_blank" rel = "noopener noreferrer">Node.js</a> pour pouvoir lancer le projet.

<!------------------------------------------------------------------------------------------------------------------------------------------>
### Installation
<!------------------------------------------------------------------------------------------------------------------------------------------>
<br/>

Une fois le projet importé, il suffit de se placer dans celui-ci avec un terminal et d'exécuter les commandes suivantes :

```sh
npm install
```
```sh
npm update
```

Puis pour lancer le serveur :

```sh
npm run dev 
```

Il ne reste qu'à mettre l'URL donné dans votre navigateur afin d'accéder au site.

<!------------------------------------------------------------------------------------------------------------------------------------------>
## Utilisation
<!------------------------------------------------------------------------------------------------------------------------------------------>
> Partie incomplète
<br/>

<br/>

<!------------------------------------------------------------------------------------------------------------------------------------------>
## Feuille de route
<!------------------------------------------------------------------------------------------------------------------------------------------>
<br/>

- [x] Ajout du bloc d'éditeur de code à la page
- [x] Menu ouvrant avec des paramètres de l'editeur de code (thème, taille de la police, etc... )
- [x] Raccourcis claviers
- [x] Onglets pour avoir plusieurs fichiers
  - [x] Pop-up création de fichier avec choix du langage et du nom du fichier
  - [x] Extension (ex : .c, .py) automatique selon langage du fichier
  - [x] Detection du langage selon le titre du fichier
  - [x] Possibilité de fermer un onglet
  - [x] Possibilité de renommer les fichiers
  - [x] Menu déroulant listant les fichiers pour les affichers en onglet ou non
  - [x] Supprimer les fichiers depuis le menu déroulant
- [x] Fonction d'indentation avec un bouton
- [x] Importation d'un ou plusieurs fichier(s) au tp
- [ ] Affichage des erreurs syntaxiques en les soulignants ( ';' manquant, etc... )
- [ ] Bouton sauvegarder permettant d'enregistrer le/les fichiers :
  - [ ] En local sur machine dans un dossier premièrement
  - [ ] Sur Docker dans un dossier propre à l'étudiant, exemple : *\[numEtudiant] / AlgoProg / TP2 / \[fichier]*

<br/>

<!------------------------------------------------------------------------------------------------------------------------------------------>
## Contact
<!------------------------------------------------------------------------------------------------------------------------------------------>
<br/>

Kevin Soares - ksoares@outlook.fr

Projet : [https://github.com/KVNS7/Code-editor-cat/tree/main](https://github.com/KVNS7/Code-editor-cat/tree/main)

<br/>


<!--              --Variables--              -->

[JavaScript-badge]: https://img.shields.io/badge/JavaScript-%23F7DF1E?style=for-the-badge&logo=javascript&labelColor=grey
[JavaScript-url]: https://developer.mozilla.org/fr/docs/Web/JavaScript

[React-badge]: https://img.shields.io/badge/React%20v18.3.1-%2361DAFB?style=for-the-badge&logo=react&labelColor=grey
[React-url]: https://fr.legacy.reactjs.org/

[Vite-badge]: https://img.shields.io/badge/Vite%20v1.6.8-%23646CFF?style=for-the-badge&logo=vite&labelColor=grey
[Vite-url]: https://vitejs.fr/

[Chakra-badge]: https://img.shields.io/badge/Chakra%20v2.8.2-%23319795?style=for-the-badge&logo=chakraui&labelColor=grey
[Chakra-url]: https://v2.chakra-ui.com/docs/components

[MonacoEditor-badge]: https://img.shields.io/badge/Monaco%20Editor%20v0.48.0-%23007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=%23007ACC&labelColor=grey
[MonacoEditor-url]: https://microsoft.github.io/monaco-editor/docs.html

[Docker-badge]: https://img.shields.io/badge/Docker%20v25.0.3-%232496ED?style=for-the-badge&logo=docker&labelColor=grey
[Docker-url]: https://www.docker.com/

[Axios-badge]: https://img.shields.io/badge/Axios%20v1.6.8-%235A29E4?style=for-the-badge&logo=axios&logoColor=%235A29E4&labelColor=grey
[Axios-url]: https://axios-http.com/fr/docs/intro

[JS-beautify-badge]: https://img.shields.io/badge/js--beautify%20v1.15.1-%23FF9A00?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFlElEQVR4nOyZb2wTZRzHf7279c/RrqxbYX+6dWtnxPjKaNDwSnFzGyCGRHxhRDGGEITBcKXDbk0YFLJEWzAxvBDQGN+ggGEr3YTXi4nGKCBjQDfJBKKCrBsdvV7vn3lutN7au1vLJtuk3zc8PM/z+z333HP36fd3w2CBK7+BuRahNNDW1tZsMBiMj/Zy5MUwDL1///6A3JhGKYggCALDsHlxQoIg8AzDsHJjaiew1Wg0pk6AoijK5/MFrp60/7Ds9evPe9q9LSRJLpKLTSQS9N69ewO/buAuGQhYVHsM7J6O6ecPHK/qX7b++gqPx9NsMpkKk+PxeDze2dnpz3nnC0GKJ+D1infMlPw/RVExn8/nv33WMVJsJspQ33u+PzZ81Rc70dHR4dJqtbpQKNTX39//08W3YaCyEJ6Q5ptIwKjjKFQ889zyp9etW/eaIAhCIBD4dMVT1LPd/so+cU6Mj5hevLbU4/FsN5lM5mQsTdPxPXv2fPSf3YW5VNYUSiQSVFdX16GRnpqw2Ygvlc6Nxfnx0sahStQe3AjDRi1Y5XImOIgu+wLsDA/sjTNOxTxut3srSZKpd2BWKMTzPM+yLGvQafQ4NnXjHA8sRQtx1NbjkDGeyiEAR7FAobZanvS1Z5VCvwcdl0vMeGn6/MgEf8daH7bHOYhfeBMuVpmhVjoepSHiPAZVqH0r5LxcXkJUp+eIxvixwpfC5W63e0ueQtlQKF1jUe5u0cthcWzgHQiXm8CO2uM03K0+AmI/evZtSwrscvF5CkmVC4WSilF8pLRpSLy7P78FA1YSRDLFWIg8+fnkaQx96xhYYiEqZePnikJJKdEI9aOXW+zXavQErh6fC4UUN9De3r5DjkJ/fef4TY5CSOP3+dHFK8M21L68Ea6UGSepc4+GUfsREPtvhpxXKkqIKrn4JIXyXghkKAQSGvzZVzu8tDjzOZZSCCZ/la8iN+o8BjZOmOxTohCKtb4SLv/Q492htO7Db3MeK+eKjKbpWFdX1yc3Q45hE4nLeh6a4aMVTUP2BAupF+9Wr3Pa+dtbXJuMRuPi9PFZrciypBFH0QIl7ctmPkEQOIZhePr4rHghqRCRUAV1vdtxsbq0oFYpRza6F+MjJfXhqt27d28zm81muTmPJ4XgVMOPsP7ccm97x06SJGVPAtWynZ2dH98I1gyWWwtqcll4LMrdLqkP2zzt3mnz88frvoc3zr2QS/4FI+UT6GkKg1H7r+eJsxF4tbe6zeXelk6nJCVGepyDRYV4hdqCyC/Z1gxVt7raFPPA6aZBKNRWSNYeh1UhWf+kSCHQ4XqQUoMHFmguw6eAhBJqPicpJb8jzQNaTA+4JmPt3DaA1Lv6Glj0til90cQdaAjavQrfhRAx9u3bF+C7GwfBapj0PBPMKNT12Hbt2rXFYrFY0mOS34W40w2XwGqYWqmh2IZgJXCCoHqtC1WKx+1yuTb5/f4jwtk1N6BQK+v/RU0k7kLDmXKvp0P0MDRNo98IP3+68RosMdhTc+qCZW63+/2ioqLilLcJrR6GYr3ssy0KPft1PWWtOz7Y6Pf7j850s/NSql4Ix3H8wIEDh+Dr+l/ASjpVM8WYv2Ftr6N1Z+vmgwcPfsZ/U38JLA/uLiLYqpC9ubn53cOHD3/Jnai7AIv1snVxSnF2DNb21rhaWjfrdDr9Q3kh9C/yPaDFdIBrClQXfEAKHMcxjuP4KSTJHMs6H7oOjUYDM/JCqpRIE3efiUBDsApONZ5PpxB3sv48lC1S904ylHs8vZDSdyG+b9UImHWy34VmrBgbgZXd+e9CoqaryIRg0zCQBbIVVs5iuCisDtldLa2PriIDHaYHTKPqe7IWDxzQ3KOryJLKhU4ZmsZTSZWn0Fzrf02hefGH7Jkov4G51j8BAAD//22ifgqEqAVmAAAAAElFTkSuQmCC&logoColor=FF9A00&labelColor=grey
[JS-beautify-url]: https://github.com/beautifier/js-beautify

[Piston-badge]: https://img.shields.io/badge/Piston-rgb(67%2C126%2C180)?style=for-the-badge&labelColor=black
[Piston-url]: https://piston.readthedocs.io/en/latest/
