// ==UserScript==
// @name         Sand-InfoUrgences
// @namespace    https://www.chu-brugmann.be/fr/
// @version      0.1
// @description  Inscription facilitée dans WISH
// @author       Ramakers Alexandre
// @match        http://br400prd.chu-brugmann.be:30700/*
// @grant        GM_addStyle
// ==/UserScript==
// @updateURL    https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-InfoUrgences.user.js
// @downloadURL  https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-InfoUrgences.user.js

/*
Ce fichier modifie le fonctionement de la page WISH Info urgences.

De nombreux éléments non utile à l'inscription des patients des urgences ont été retirés.
Quelques champs sont automatiquement remplis.

Il y a également une vérification des codes qui est faite lorsque le USER veut valider la page. S'il manque des codes, alors la page n'est pas validée et le USER doit corriger ses erreurs.

Lorsque le USER inscrit un SMUR il y a une vériciation selon qu'il s'agit d'un SMUR amené à l'hôpital ou une mission SMUR (via le code 8300 ou 152).
Si le SMUR est amené à l'hôpital, il y a peu de changements et le USER doit remplir les champs habituels.
Sinon, des champs spécifiques à l'inscription d'une mission SMUR apparaissent et le USER doit tout remplir.

Le USER valide manuellement les données et ce fichier vérifie si tout est bien encodé.
*/

(function() {
    'use strict';
    try{
    var distinct = document.querySelector("#f\\:SROAC");

    if (distinct.value != null) {

        document.querySelector("#f\\:SROAC").remove(); // rôle dans l'accident
       // document.querySelector("#f\\:SPIT").remove(); // Id SMUR/PIT 2
      //  document.querySelector("#f\\:SPITsearch").remove(); // image Id SMUR/PIT 2
       // document.querySelector("#f\\:SFPIT").remove(); // N° fiche 1
        document.querySelector("#f\\:SAARD").remove(); //Origine de l'urgence
        document.querySelector("#f\\:SSUIV").remove(); //Suivi pour externes

        document.querySelector("#f\\:SVERV").remove(); //Code
        document.querySelector("#f\\:SAFD").remove(); //Unité de soins
        document.querySelector("#f\\:SAFDsearch").remove(); // Image unité de soins
        document.querySelector("#f\\:SZIEV").remove(); //Hôpital
        document.querySelector("#f\\:SZIEVsearch").remove(); // Image hôpital

        document.querySelector("#f\\:SVERW").remove(); // Image hôpital
        document.querySelector("#f\\:SZIEW").remove(); // ?????
        document.querySelector("#f\\:SZIEWsearch").remove(); // ?????

        document.querySelector("#f\\:SPLA1").remove(); // Endroit
        document.querySelector("#f\\:SPLA2").remove(); // Autre
        document.querySelector("#f\\:SDEST").remove(); // Sortie
        document.querySelector("#f\\:SZIEO").remove(); // Sortie
        document.querySelector("#f\\:SZIEOsearch").remove(); // image Sortie

        document.querySelector("#f\\:LE").remove(); // Lésions
        document.querySelector("#f\\:lesearch").remove(); // Image Lésions

        document.querySelector("#f\\:TR").remove(); // traitements
        document.querySelector("#f\\:trsearch").remove(); // traitements



        // CODE Ci-dessous pour autoremplir certaines parties
        var iDsmur = document.querySelector("#f\\:SSMUR");
        var iDambu = document.querySelector("#f\\:SAMBU");
        var adressePar = document.querySelector("#f\\:SMOYE");
        var origine = document.querySelector("#f\\:SURGE");
        var lieuAvant = document.querySelector("#f\\:SLAAD");
        var motif = document.querySelector("#f\\:SMTUR");
        var description = document.querySelector("#f\\:SREDE");
        if(description.value == ''){
           description.value = localStorage.getItem('Cause');
        }

        if (origine.value == ''){
            origine.value = 'A';
        }
        if (lieuAvant.value == ''){
            lieuAvant.value = '1';
        }
        if (motif.value == ''){
            motif.value = 'Z';
        }
        if (adressePar.value == ''){
            adressePar.value = '1';
        }

        //  CODE Ci-dessous pour modifer la taille du bouton "ENREGISTRER"
        var saveticker = document.querySelector("#f\\:saveButton")
        saveticker.style.display = "none";
        saveticker.style.position = 'fixed';
        saveticker.style.top = '445px';
        saveticker.style.left = '10px';
        saveticker.style.height = '50px';
        saveticker.style.width = '1000px';


        $("body").append ( '                                                          \
<div id="gmPopupContainer">                                               \
<form> <!-- For true form use method="POST" action="YOUR_DESIRED_URL" --> \
\
<button id="gmCloseDlgBtn" type="button" autofocus>ENREGISTRER</button>              \
</form>                                                                   \
</div>                                                                    \
<div id="champSMUR">\
<form>\
<input id="numFiche" name="numFiche" type="text" value="" maxlength="6" size="6" class="inputtext-uc">\
<input id="numEnvoi" name="numEnvoi" type="text" value="" maxlength="3" size="6" class="inputtext-uc">\
<input id="infi" name="infi" type="text" value="" maxlength="25" size="6" class="inputtext-uc">\
<input id="med" name="med" type="text" value="" maxlength="25" size="6" class="inputtext-uc">\
<input id="diag" name="diag" type="text" value="" maxlength="25" size="6" class="inputtext-uc">\
<span id="txtFiche" name="txtFiche" class="bold">Numéro de Fiche</span>\
<span id="txtEnvoi" name="txtEnvoi" class="bold">Numéro Envoi</span>\
<span id="txtInfi" name="txtInfi" class="bold">Infirmier SMUR</span>\
<span id="txtMed" name="txtMed" class="bold">Medecin SMUR</span>\
<span id="txtDiag" name="txtDiag" class="bold">Raison appel SMUR</span>\
</form>\
' );
        $("#champSMUR").hide(); //Cache l'ajout des éléments SMUR si on est pas dans le cas d'un SMUR
        var vraiSMUR;
        var fiche = document.querySelector("#numFiche");
        var envoi = document.querySelector("#numEnvoi");
        var infi = document.querySelector("#infi");
        var med = document.querySelector("#med");
        var diag = document.querySelector("#diag");




        $("#gmCloseDlgBtn").click ( function () {
            $("#gmPopupContainer").hide ();
            description.select();
            document.execCommand("copy");
            if (origine.value == 'C' || origine.value == 'B'){
                if(iDambu.value == ''){
                    alert("Si Origine admission est C, alors Identification ambulance ne peux être vide !");
                    $("#f\\:saveButton").show ();
                }
                else {
                    $("#f\\:saveButton").show ();
                  //  $(document).ready(function(){
                  //      $("#f\\:saveButton").trigger('click');
                  //  });
                }
            }
            if (origine.value == 'E'){
                if((iDambu.value == '') || (iDsmur.value == '')){
                    alert("Si Origine admission est E, alors Identification ambulance ne peux être vide !");
                    $("#f\\:saveButton").show ();
                }
                else {
                    $("#f\\:saveButton").show ();
                  //  $(document).ready(function(){
                  //      $("#f\\:saveButton").trigger('click');
                  //  });
                }
            }
            else if (origine.value == 'D'){
                if(vraiSMUR){
                    if((iDambu.value == '') || (iDsmur.value == '')|| (fiche.value == '')|| (envoi.value == '')|| (med.value == '')|| (infi.value == '')){
                        alert("Si Origine admission est D, alors Identification ambulance, Id SMUR, Numéro de fiche, Numéro d'envoi, Médecin SMUR, Infirmier SMUR ne peut être vide !");
                        $("#f\\:saveButton").show ();
                        $("#f\\:SREDE").show(); //document.querySelector("#f\\:SREDE").removeAttr('disabled');
                    }
                    else {
                        $("#f\\:saveButton").show ();
                        $("#f\\:SREDE").show(); //document.querySelector("#f\\:SREDE").removeAttr('disabled');
                        description = fiche.value + "-" + envoi.value + "-" + med.value + "-" + infi.value + "-" + diag.value;
                        $("#f\\:SREDE").val(description);
                        //motif.value = 'T';
                       // $(document).ready(function(){
                       //     $("#f\\:saveButton").trigger('click');
                       // });
                    }
                }
                else{
                    if((iDambu.value == '') || (iDsmur.value == '')){
                        alert("Si Origine admission est D, alors Identification ambulance, Id SMUR ne peut être vide !");
                        $("#f\\:saveButton").show ();
                    }
                    else {
                        $("#f\\:saveButton").show ();
                   //     $(document).ready(function(){
                   //         $("#f\\:saveButton").trigger('click');
                   //     });
                    }
                }
            }
            else {
                $("#f\\:saveButton").show ();
    //            $(document).ready(function(){
    //            $("#f\\:saveButton").trigger('click');
    //        });
            }
} );

        var replaceArry = [
            [/Rôle dans l'accident/gi, ''],
          //  [/Id SMUR\/PIT 2/gi, ''],
         //   [/N° fiche 2/gi, ''],
            [/Origine de l'urgence/gi, ''],
            [/Transport/gi, ''],
            [/Code/gi, ''],
            [/Unité de soins/gi, ''],
            [/Hôpital/gi, ''],
            [/Origine lésion/gi, ''],
            [/Endroit/gi, ''],
            [/Autre/gi, ''],
            [/Sortie/gi, ''],
            [/Lésions/gi, ''],
            [/traitements/gi, ''],
            [/Suivi pour externes/gi, '']


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
            if(txtNode.nodeValue == '152'){
                vraiSMUR = true;
                $("#champSMUR").show ();
                if(description.value == ''){
                    $("#f\\:SREDE").hide() //document.querySelector("#f\\:SREDE").disabled = true;  // Cache la description si on est dans le cas d'un SMUR
                }
                origine.value = 'D';
                adressePar.value = '6';
                iDsmur.value = '521000';
                iDambu.value = '24110'
            }

            for (var J  = 0;  J < numTerms;  J++) {
                oldTxt  = oldTxt.replace (replaceArry[J][0], replaceArry[J][1]);
            }
            txtNode.nodeValue = oldTxt;
        }


        //--- CSS styles make it work...
        GM_addStyle ( "                                                 \
#gmPopupContainer {                                         \
position:               fixed;                          \
top:                    445px;                            \
left:                   6px;                          \
width:                  1000px;                          \
height:                 55px;                          \
padding:                1em;                            \
background:             powderblue;                     \
border:                 3px double black;               \
border-radius:          1ex;                            \
z-index:                777;                            \
}                                                           \
#gmPopupContainer button{                                   \
position:               fixed;                          \
top:                    445px;                            \
left:                   5px;                          \
width:                  975px;                          \
height:                 30px;                          \
\
cursor:                 pointer;                        \
margin:                 1em 1em 0;                      \
border:                 1px outset buttonface;          \
}                                                           \
#numFiche {                                         \
position:               fixed;                          \
top:                    270px;                            \
left:                   174px;                          \
width:                  100px;                          \
height:                 20px;                          \
}                                                           \
#txtFiche {                                         \
position:               fixed;                          \
top:                    270px;                            \
left:                   11px;                          \
width:                  174px;                          \
height:                 20px;                          \
}   \
#numEnvoi {                                         \
position:               fixed;                          \
top:                    295px;                            \
left:                   174px;                          \
width:                  100px;                          \
height:                 20px;                          \
}                                                           \
#txtEnvoi {                                         \
position:               fixed;                          \
top:                    295px;                            \
left:                   11px;                          \
width:                  174px;                          \
height:                 20px;                          \
}                                                           \
#infi {                                         \
position:               fixed;                          \
top:                    225px;                            \
left:                   627px;                          \
width:                  300px;                          \
height:                 20px;                          \
}                                                           \
#txtInfi {                                         \
position:               fixed;                          \
top:                    225px;                            \
left:                   484px;                          \
width:                  174px;                          \
height:                 20px;                          \
}                                                           \
#med {                                         \
position:               fixed;                          \
top:                    245px;                            \
left:                   627px;                          \
width:                  300px;                          \
height:                 20px;                          \
}                                                           \
#txtMed {                                         \
position:               fixed;                          \
top:                    245px;                            \
left:                   484px;                          \
width:                  174px;                          \
height:                 20px;                          \
}                                                           \
#diag {                                         \
position:               fixed;                          \
top:                    295px;                            \                            \
left:                   627px;                          \
width:                  300px;                          \
height:                 20px;                          \
}                                                           \
#txtDiag {                                         \
position:               fixed;                          \
top:                    295px;                            \                            \
left:                   484px;                          \
width:                  174px;                          \
height:                 20px;                          \
}                                                           \
" );

    }
}catch(err){}
})();