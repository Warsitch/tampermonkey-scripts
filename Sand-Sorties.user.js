// ==UserScript==
// @name         Sand-Sorties
// @namespace    https://www.chu-brugmann.be/fr/
// @version      0.1
// @description  Inscription facilitée dans WISH
// @author       Ramakers Alexandre
// @match        http://br400prd.chu-brugmann.be:30700/*
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-Sorties.user.js
// @downloadURL  https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-Sorties.user.js
// ==/UserScript==

/*
Ce fichier modifie le fonctionnement de la page WISH Sorties réelles.

Lorsque la page est chargée, les champs sont automatiquement remplis pour un patient normal.

Le USER doit enregister manuellement la page.

*/

(function() {
    'use strict';
    try{

    var distinct = document.querySelector("#f\\:STSOR");

    if (distinct.value != null) {

        var type = document.querySelector("#f\\:STSOR");
        var destination = document.querySelector("#f\\:SCDES");



$("body").append ( '                                                          \
<div id="gmPopupContainer">                                               \
<form> <!-- For true form use method="POST" action="YOUR_DESIRED_URL" --> \
<button id="gmCloseSortieDirect" type="button">SORTIE ---- IMMEDIATE</button>              \
<button id="gmCloseSortieHospit" type="button">SORTIE ---- HOSPIT</button>              \
<button id="gmCloseSortieTrois" type="button">SORTIE ---- Après minuit (+3 heures)</button>              \
<button id="gmCloseSortieTroismemejour" type="button">SORTIE ---- Même JOUR (+3 heures)</button>              \
<button id="gmClose" type="button">FERMER</button>              \
</form>                                                                   \
</div>                                                                    \
' );

        $("#gmCloseSortieDirect").click ( function () {
            $("#gmPopupContainer").hide ();
            if (type.value == ''){
                type.value = '1';
                destination.value = '1';
            }
        } );
        $("#gmClose").click ( function () {
            $("#gmPopupContainer").hide ();
        } );
        $("#gmCloseSortieHospit").click ( function () {
            $("#gmPopupContainer").hide ();
            if (type.value == ''){
                type.value = '9';
                destination.value = 'A';
                var destcomm = document.querySelector("#f\\:SDEST");
                destcomm.value = 'U0?';
                $("#f\\:SDEST").focus();
            }
        } );
        $("#gmCloseSortieTrois").click ( function () {
            $("#gmPopupContainer").hide ();
            if (type.value == ''){
                var date = document.querySelector("#f\\:SDSOR");
                var hsortie = document.querySelector("#f\\:SHSOR");
                var destcomm = document.querySelector("#f\\:SDEST");
                var tempo = document.getElementsByClassName("ouputtext");
                destcomm.value = tempo[0].innerHTML;
                tempo = destcomm.value.substr(11,16);

                tempo = tempo.substr(0,2);
                tempo = (parseInt(tempo) + 3)%24;

     // !!!!!!!  Cidessous à ne pas changer est correct si TEMPO est correct

                if (tempo < 3){
                    tempo = String(tempo);
                    hsortie.value = hsortie.value.substr(2,5);
                    hsortie.value = tempo.concat('', hsortie.value);
                }
                 else{
                    tempo = String(tempo);
                    hsortie.value = hsortie.value.substr(2,5);
                    hsortie.value = tempo.concat('', hsortie.value);
                    destcomm.value = date.value.substr(0,2);
                    destcomm.value = parseInt(destcomm.value) - 1;
                    date.value = date.value.substr(2,10);
                    destcomm.value = destcomm.value.concat('', date.value);
                    date.value = destcomm.value;
                 }

               destcomm.value = '';
                type.value = '1';
                destination.value = '1';
                $("#f\\:SHSOR").focus();
            }

        } );

        $("#gmCloseSortieTroismemejour").click ( function () {
            $("#gmPopupContainer").hide ();
            if (type.value == ''){
                var date = document.querySelector("#f\\:SDSOR");
                var hsortie = document.querySelector("#f\\:SHSOR");
                var destcomm = document.querySelector("#f\\:SDEST");
                var tempo = document.getElementsByClassName("ouputtext");
                destcomm.value = tempo[0].innerHTML;
                tempo = destcomm.value.substr(11,16);

                tempo = tempo.substr(0,2);
                tempo = (parseInt(tempo) + 3)%24;

     // !!!!!!!  Cidessous à ne pas changer est correct si TEMPO est correct

                if (tempo < 3){
                    tempo = String(tempo);
                    hsortie.value = hsortie.value.substr(2,5);
                    hsortie.value = tempo.concat('', hsortie.value);
                }
                 else{
                    tempo = String(tempo);
                    hsortie.value = hsortie.value.substr(2,5);
                    hsortie.value = tempo.concat('', hsortie.value);
                    destcomm.value = date.value.substr(0,2);
                    destcomm.value = parseInt(destcomm.value);
                    date.value = date.value.substr(2,10);
                    destcomm.value = destcomm.value.concat('', date.value);
                    date.value = destcomm.value;
                 }

               destcomm.value = '';
                type.value = '1';
                destination.value = '1';
                $("#f\\:SHSOR").focus();
            }

        } );


//--- CSS styles make it work...
GM_addStyle ( "                                                 \
    #gmPopupContainer {                                         \
        position:               fixed;                          \
        top:                    150px;                            \
        left:                   255px;                          \
        width:                  355px;                          \
        height:                 215px;                          \
        padding:                1em;                            \
        background:             powderblue;                     \
        border:                 3px double black;               \
        border-radius:          1ex;                            \
        z-index:                777;                            \
    }                                                           \
    #gmCloseSortieDirect{                                   \
        position:               fixed;                          \
        top:                    155px;                            \
        left:                   250px;                          \
        width:                  340px;                          \
        height:                 30px;                          \
        text-align:             left;                         \
        padding:                0px 35px;                          \
        cursor:                 pointer;                        \
        margin:                 1em 1em 0;                      \
        border:                 1px outset buttonface;          \
    }                                                           \
    #gmCloseSortieHospit{                                   \
        position:               fixed;                          \
        top:                    195px;                            \
        left:                   250px;                          \
        width:                  340px;                          \
        height:                 30px;                          \
        text-align:             left;                         \
        padding:                0px 35px;                          \
        cursor:                 pointer;                        \
        margin:                 1em 1em 0;                      \
        border:                 1px outset buttonface;          \
    }                                                           \
    #gmCloseSortieTrois{                                   \
        position:               fixed;                          \
        top:                    235px;                            \
        left:                   250px;                          \
        width:                  340px;                          \
        height:                 30px;                          \
        text-align:             left;                         \
        padding:                0px 35px;                          \
        cursor:                 pointer;                        \
        margin:                 1em 1em 0;                      \
        border:                 1px outset buttonface;          \
    }    \
    #gmCloseSortieTroismemejour{                                   \
        position:               fixed;                          \
        top:                    275px;                            \
        left:                   250px;                          \
        width:                  340px;                          \
        height:                 30px;                          \
        text-align:             left;                         \
        padding:                0px 35px;                          \
        cursor:                 pointer;                        \
        margin:                 1em 1em 0;                      \
        border:                 1px outset buttonface;          \
    }                                                           \
    #gmClose{                                   \
        position:               fixed;                          \
        top:                    315px;                            \
        left:                   350px;                          \
        width:                  170px;                          \
        height:                 30px;                          \
        text-align:             left;                         \
        padding:                0px 35px;                          \
        cursor:                 pointer;                        \
        margin:                 1em 1em 0;                      \
        border:                 1px outset buttonface;          \
    }                                                           \
" );

        //  CODE Ci-dessous pour modifer la taille du bouton "ENREGISTRER"
        var saveticker = document.querySelector("#f\\:saveButton")
        saveticker.style.position = 'fixed';
        saveticker.style.top = '480px';
        saveticker.style.left = '10px';
        saveticker.style.height = '50px';
        saveticker.style.width = '1000px';
        //  CODE Ci-dessous pour rempalcer par le vide les textes présents sur la page qui sont inutiles

    }
}catch(err){}
})();