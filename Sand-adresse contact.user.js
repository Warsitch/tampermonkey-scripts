// ==UserScript==
// @name         Sand-adresse contact
// @namespace    https://www.chu-brugmann.be/fr/
// @version      0.3
// @description  Inscription facilitée dans WISH
// @author       Ramakers Alexandre
// @match        http://br400prd.chu-brugmann.be:30700/*
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-adresse contact.user.js
// @downloadURL  https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-adresse contact.user.js
// ==/UserScript==

/*
Ce fichier gère l'automatisation du worflow
*/

(function() {
    'use strict';
      try {
          const nomField = document.querySelector('#f\\:SCDAD');
      if (!nomField) return;



    // Vérifie si on est dans le workflow automatique
    const isWorkflowActive = localStorage.getItem('workflowAuto') === 'true';

    // Exemple : remplissage automatique d'un champ si en mode workflow
    if (isWorkflowActive) {
        const saveBtn = document.querySelector('#f\\:wf_next');
        if (saveBtn) saveBtn.click();
        else alert("Le bouton de sauvegarde (f:savebutton) n'a pas été trouvé.");
    }
  } catch (err) {
    console.error('Erreur dans Sand-InfoPatient:', err);
  }


})();
