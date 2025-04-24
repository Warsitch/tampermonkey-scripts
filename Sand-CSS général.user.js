 // ==UserScript==
// @name         Sand-CSS général
// @namespace    https://www.chu-brugmann.be/fr/
// @version      0.3.2
// @description  Appliquer une feuille de style personnalisée sur les pages Wish
// @author       Ramakers Alexandre
// @match        http://br400prd.chu-brugmann.be:30700/*
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-CSS général.user.js
// @downloadURL  https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-CSS général.user.js
// ==/UserScript==


/*
Ce fichier sert  modifier l' expérience visuelle de WIsh en modifiant 4 couleurs de la page web.
Il permet également de faciliter la navigation dans les différents menus en ôtant une partie des liens proposer de base.
*/

(function() {
    'use strict';

try{
    var distinct = document.querySelector("#f\\:SPTFMT");

    if(distinct.value != null){
/*
SELECTION DE LA PAGE IMPRESSION ETIQUETTE
*/
// On met par défaut le nombre d'étiquette à imprimer à 7
        var etiquette = document.querySelector("#f\\:SPTFMT");
        etiquette.value = '5';

$("body").append ( '                                                          \
<div id="ChampCouleur">\
<form>\
<label> Couleur Page : </label>\
<input type="color" value="#e66465" id="colorDivPage">\
<label> Couleur De fond : </label>\
<input type="color" value="#e66465" id="colorBody">\
<label> Couleur Ligne Tableau : </label>\
<input type="color" value="#e66465" id="colorLigneTableau">\
</form>\
' );

GM_addStyle ( "\
#ChampCouleur {                                         \
position:               fixed;                          \
top:                    310px;                            \
left:                   10px;                          \
width:                  174px;                          \
height:                 20px;                          \
}                                                           \
" );


//window.onload=function(){
    var InputcolorBody = document.getElementById("colorBody");

    InputcolorBody.addEventListener("input", function(){
        localStorage.setItem('colorBodySave', InputcolorBody.value);
    }, false);

    InputcolorBody.value = localStorage.getItem('colorBodySave');

    var InputcolorLigneTableau = document.getElementById("colorLigneTableau");

    InputcolorLigneTableau.addEventListener("input", function(){
        localStorage.setItem('colorLigneTableauSave', InputcolorLigneTableau.value);
    }, false);

    InputcolorLigneTableau.value = localStorage.getItem('colorLigneTableauSave');

    var InputcolorDivPage = document.getElementById("colorDivPage");

    InputcolorDivPage.addEventListener("input", function(){
        localStorage.setItem('colorDivPageSave', InputcolorDivPage.value);
    }, false);

    InputcolorDivPage.value = localStorage.getItem('colorDivPageSave');

//}
    }
}catch(err){}
    // Code change la couleur de la page
    var divChange = document.querySelector("#div-page")
    divChange.style.backgroundColor = localStorage.getItem('colorDivPageSave'); //"rgb(204, 255, 204)";
    // Code change la couleur de la page
    var divChang = document.querySelector("#div-left")
    divChang.style.backgroundColor = localStorage.getItem('colorDivPageSave'); //"rgb(204, 255, 204)";
    // Code change la couleur de la page
    var divChan = document.querySelector("#body")
    divChan.style.backgroundColor = localStorage.getItem('colorBodySave'); //"rgb(146, 191, 155)";
    // Code change la couleur de la page
    var divCha = document.querySelector("#div-buttons")
    divCha.style.backgroundColor = localStorage.getItem('colorBodySave'); //"rgb(146, 191, 155)";

    // Code qui change la couelur des lignes dans les tableaux

    var bodyChange = document.querySelectorAll("tr.dt-blue"), i;

    for (i = 0; i < bodyChange.length; i++) {
        bodyChange[i].style.backgroundColor = localStorage.getItem('colorLigneTableauSave'); //"rgb(220, 250, 220)";
    }

/*
    // Allège le menu au dessus de WISH

    document.querySelector("a[name='CWUH']").remove();// Menu Workflow
    document.querySelector("a[name='WAO']").remove();// Menu Workflow

    document.querySelector("a[name='PBA']").remove();//Menu Patient
    document.querySelector("a[name='PC']").remove();//Menu Patient
    document.querySelector("a[name='PCS']").remove();//Menu Patient
    document.querySelector("a[name='CDP']").remove();//Menu Patient
    document.querySelector("a[name='PAI']").remove();//Menu Patient
    document.querySelector("a[name='PEA']").remove();//Menu Patient
    document.querySelector("a[name='PEH']").remove();//Menu Patient

    document.querySelector("a[name='ALA']").remove();//Menu Admission
    document.querySelector("a[name='CVV']").remove();//Menu Admission
    document.querySelector("a[name='ASP']").remove();//Menu Admission
    document.querySelector("a[name='AIP']").remove();//Menu Admission
    document.querySelector("a[name='AS']").remove();//Menu Admission
    document.querySelector("a[name='AML']").remove();//Menu Admission
    document.querySelector("a[name='AA']").remove();//Menu Admission
    document.querySelector("a[name='AFU']").remove();//Menu Admission
    document.querySelector("a[name='AMB']").remove();//Menu Admission
    document.querySelector("a[name='AD2']").remove();//Menu Admission
    document.querySelector("a[name='CSD']").remove();//Menu Admission
    document.querySelector("a[name='CSRF']").remove();//Menu Admission
    document.querySelector("a[name='CSRF2']").remove();//Menu Admission
    document.querySelector("a[name='CSEF']").remove();//Menu Admission
    document.querySelector("a[name='CSGF']").remove();//Menu Admission

    document.querySelector("a[name='CCG']").remove();//Menu Population
    document.querySelector("a[name='APB']").remove();//Menu Population
    document.querySelector("a[name='APL']").remove();//Menu Population
    document.querySelector("a[name='APMII']").remove();//Menu Population
    document.querySelector("a[name='APMIO']").remove();//Menu Population
*/
    // Crée un nouveau menu au dessus de Wish
    var tableMenu = document.querySelector('#newmenu tbody tr');
    var td1 = document.createElement('td');
   // document.body.innerHTML = "<h1>Today's date is " + d + "</h1>"
    td1.innerHTML = '<a href="#" class="ar">-------->URGENCES<--------</a><div><a name="CLU" href="#" class="close">Listing Urgences</a><a>---------------</a><a name="WPE" href="#">WF Patient urgence</a><a name="WAI" href="#" class="close">WF Admission hospi</a><a>---------------</a><a name="PS" href="#" class="close">Recherche patient</a><a name="PM" href="#" class="close">Info mutuelles</a><a name="AI" href="#" class="close">Admission hospitalisé</a><a name="AO" href="#" class="close">Admission externe</a><a name="AE" href="#" class="close">Info urgence</a><a name="AL2" href="#" class="close">Impression étiquettes</a><a name="CSBF2" href="#" class="close">Bracelets</a></div>';
    tableMenu.append(td1);



})();
