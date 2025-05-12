// ==UserScript==
// @name         Sand-info mutuelle patient
// @namespace    https://www.chu-brugmann.be/fr/
// @version      1.0
// @description  Inscription facilitée dans WISH
// @author       Ramakers Alexandre
// @match        http://br400prd.chu-brugmann.be:30700/*
// @grant        GM_addStyle
// @updateURL    https://github.com/Warsitch/tampermonkey-scripts/raw/refs/heads/main/sand-info mutuelle patient.user.js
// @downloadURL  https://github.com/Warsitch/tampermonkey-scripts/raw/refs/heads/main/sand-info mutuelle patient.user.js
// ==/UserScript==


/*
Ce fichier gère l'automatisation du worflow
*/

(function() {
    'use strict';
      try {
          const nomField = document.querySelector('#f\\:SNOSUP');
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
