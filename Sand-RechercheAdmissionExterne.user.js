// ==UserScript==
// @name         Sand-RechercheAdmissionExterne
// @namespace    https://www.chu-brugmann.be/fr/
// @version      0.3
// @description  Inscription facilitée dans WISH
// @author       Ramakers Alexandre
// @match        http://br400prd.chu-brugmann.be:30700/*
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-RechercheAdmissionExterne.user.js
// @downloadURL  https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-RechercheAdmissionExterne.user.js
// ==/UserScript==

/*
Ce fichier modifie la page WISH Recherche Admission externe.

Il déplace le bouton ajouter admission et le situe à la place de "suivant"

*/

(function() {
    'use strict';
    try{
    var mut;
    var distinct = document.querySelector("#f\\:outaddButton");

    if(distinct.value != null){

        //  CODE Ci-dessous pour modifer la taille du bouton "Ajouter Externe"
        var saveticker = document.querySelector("#f\\:outaddButton")
        saveticker.style.position = 'fixed';
        saveticker.style.top = '640px';
        saveticker.style.left = '1394px';
        saveticker.style.height = '50px';
        saveticker.style.width = '200px';

        //  CODE Ci-dessous pour modifer la taille du bouton "Suivant"
        var btnSuivant = document.querySelector("#f\\:wf_next")
        btnSuivant.style.position = 'fixed';
        btnSuivant.style.top = '615px';
        btnSuivant.style.left = '5px';
        btnSuivant.style.height = '50px';
        btnSuivant.style.width = '100px';

                //  CODE Ci-dessous pour modifer la taille du bouton "Suivant"
        var btnRetour = document.querySelector("#f\\:backButton")
        btnRetour.style.position = 'fixed';
        btnRetour.style.top = '676px';
        btnRetour.style.left = '175px';
        btnRetour.style.height = '20px';
        btnRetour.style.width = '100px';

    }

    }catch(err){}
})();
