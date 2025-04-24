// ==UserScript==
// @name         Sand-AdmissionHospit
// @namespace    https://www.chu-brugmann.be/fr/
// @version      0.1
// @description  Inscription facilitée dans WISH
// @author       Ramakers Alexandre
// @match        http://br400prd.chu-brugmann.be:30700/*
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-AdmissionHospit.user.js
// @downloadURL  https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-AdmissionHospit.user.js
// ==/UserScript==

/*
Ce fichier modifie la page WISH Admisson hospitalisation.
Il permet de compléter automatiquement cette page selon les données utilisées par les urgences si tout est vide.

Il faut voir si on accepte que la page soit validé d'office ou si on demande tjrs la confirmation du user.
*/

(function() {
    'use strict';
try{
    var distinct = document.querySelector("#f\\:STARC");

    if(distinct.value != null){
        // Code ci-dessous pour préremplir la page Wish
        var docteur = document.querySelector("#f\\:SADOC");
        var docteurH = document.querySelector("#f\\:SHDOC");
        var service = document.querySelector("#f\\:SDEPT");
        var unite = document.querySelector("#f\\:SNSID");
        var chambre = document.querySelector("#f\\:SROOM");
        var lit = document.querySelector("#f\\:SBED");
        var tarifa = document.querySelector("#f\\:STARC");
        var tarifb = document.querySelector("#f\\:STARE");
        var tarifc = document.querySelector("#f\\:STARS");
        var etiquette = document.querySelector("#f\\:SETPF");
        if(docteur.value == ''){
            docteur.value = 'mooso';
            docteurH.value = 'mooso';
            service.value = '8300';
            unite.value = 'U01';
            chambre.value = '01';
            lit.value = '01';
            tarifa.value = '9';
            tarifb.value = '9';
            tarifc.value = '9';
            etiquette.value = '0'

            document.querySelector("#f\\:SASCO").remove(); // Assurance complémentaire
            document.querySelector("#f\\:SVIST").remove(); // Visite permise
            document.querySelector("#f\\:SCOMA").remove(); // Commentaire assurance
            document.querySelector("#f\\:SCOM1").remove(); // Commentaire admission 1
            document.querySelector("#f\\:SCOM2").remove(); // Commentaire admission 2

            //  CODE Ci-dessous pour modifer la taille du bouton "ENREGISTRER"
            var saveticker = document.querySelector("#f\\:saveButton")
            saveticker.style.position = 'fixed';
            saveticker.style.top = '550px';
            saveticker.style.left = '10px';
            saveticker.style.height = '50px';
            saveticker.style.width = '1000px';

            //  CODE Ci-dessous pour rempalcer par le vide les textes présents sur la page qui sont inutiles

            var replaceArry = [
                [/Assurance complémentaire/gi, ''],
                [/Visites permises/gi, ''],
                //  [/Envoi facture/gi, ''],
                [/Commentaire assurance/gi, ''],
                [/Commentaire d'admission/gi, '']



            ];
            var numTerms    = replaceArry.length;
            var txtWalker   = document.createTreeWalker (
                document.body,
                NodeFilter.SHOW_TEXT,
                {   acceptNode: function (node) {
                    //-- Skip whitespace-only nodes
                    if (node.nodeValue.trim() )
                        return NodeFilter.FILTER_ACCEPT;
                    return NodeFilter.FILTER_SKIP;
                }
                },
                false
            );
            var txtNode     = null;

            while (txtNode  = txtWalker.nextNode () ) {
                var oldTxt  = txtNode.nodeValue;

                for (var J  = 0; J < numTerms; J++) {
                    oldTxt  = oldTxt.replace (replaceArry[J][0], replaceArry[J][1]);
                }
                txtNode.nodeValue = oldTxt;
            }

          //  $(document).ready(function(){
          //      $("#f\\:backButton").trigger('click');
          //  });

        }

    }
}catch(err){}

})();