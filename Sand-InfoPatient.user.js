// ==UserScript==
// @name         Sand-InfoPatient
// @namespace    https://www.chu-brugmann.be/fr/
// @version      0.3
// @description  Inscription facilitée dans WISH
// @author       Ramakers Alexandre
// @match        http://br400prd.chu-brugmann.be:30700/*
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-InfoPatient.user.js
// @downloadURL  https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-InfoPatient.user.js
// ==/UserScript==

(function () {
  'use strict';

  try {
    const nomField = document.querySelector('#f\\:SNOMP');
    const previousNom = localStorage.getItem('key');

    if (!nomField) return;

    // Champs à retirer
    const fieldsToRemove = [
      '#f\\:SATNM', '#f\\:SCLNG', '#f\\:SMARI', '#f\\:SDDBL', '#f\\:SNIDE',
      '#f\\:SCHAD', '#f\\:SDCPR', '#f\\:SSECU', '#f\\:SREGN', '#f\\:SDETC4',
      '#f\\:SEMPL', '#f\\:SDEMPL', '#f\\:SCST2', '#f\\:SCST2search',
      '#f\\:SCST3', '#f\\:SCST3search', '#f\\:SCST5', '#f\\:SCST5search'
    ];
    fieldsToRemove.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.remove();
    });

    // Création input "Raison de la visite"
    const raisonHTML = `
      <div id="RaisonVenue">
        <form>
          <input id="Raison" name="Raison" value="" type="text" maxlength="100" size="6" class="inputtext-uc">
          <span id="RaisonTxt" name="RaisonTxt" class="bold">Raison de la visite</span>
        </form>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', raisonHTML);

    const raisonInput = document.querySelector('#Raison');
    raisonInput.onchange = () => {
      localStorage.setItem('Cause', raisonInput.value);
    };

    // Appel eHealth si nom a changé
    if (nomField.value !== previousNom) {
      localStorage.setItem('key', nomField.value);
      const ehealthBtn = document.querySelector('#f\\:ehealthButton');
      if (ehealthBtn) ehealthBtn.click();
    }

    // Mise en forme du bouton save
    const saveBtn = document.querySelector('#f\\:saveButton');
    if (saveBtn) {
      Object.assign(saveBtn.style, {
        position: 'fixed', top: '480px', left: '10px', height: '50px', width: '1000px'
      });
    }

    // Remplacement de textes inutiles
    const replacements = [
      [/Langue/gi, ''], [/Etat civil/gi, ''], [/Nom du partenaire/gi, ''],
      [/Code doublon/gi, ''], [/N° carte d'identité/gi, ''], [/Date de modification/gi, ''],
      [/Date de création/gi, ''], [/Code chgmt. d'adresse/gi, ''], [/Adresse précédente/gi, ''],
      [/Date chgmt. d'adresse/gi, ''], [/Confidentiel/gi, ''], [/Religion/gi, ''],
      [/Date décès/gi, ''], [/Codes statistiques/gi, 'Id. dout./Pat. agress'],
      [/Membre du personnel/gi, ''], [/Réduction/gi, ''], [/%/gi, ''], [/au/gi, ''], [/Code message/gi, '']
    ];

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });

    let node;
    while ((node = walker.nextNode())) {
      replacements.forEach(([regex, replacement]) => {
        node.nodeValue = node.nodeValue.replace(regex, replacement);
      });
    }

    // Bloc droit "check-list + bouton workflow"
    const noteBox = document.createElement('div');
    noteBox.innerHTML = `Il faut vérifier :<br>- l'adresse<br>- le numéro de téléphone<br>- Le médecin traitant`;
    Object.assign(noteBox.style, {
      position: 'fixed', top: '0', right: '0', width: '16.5vw', height: '100vh',
      backgroundColor: '#b6f0c2', padding: '20px', fontSize: '1.5em',
      fontFamily: 'Arial, sans-serif', lineHeight: '1.6', boxSizing: 'border-box', zIndex: '9999'
    });

    const workflowButton = document.createElement('button');
    workflowButton.textContent = 'Lancer le workflow';
    Object.assign(workflowButton.style, {
      fontSize: '1em', padding: '10px 15px', marginTop: '20px', cursor: 'pointer',
      backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '5px'
    });

    workflowButton.onclick = () => {
      localStorage.setItem('workflowAuto', 'true');
      if (saveBtn) saveBtn.click();
      else alert("Le bouton de sauvegarde (f:savebutton) n'a pas été trouvé.");
    };


    noteBox.appendChild(workflowButton);
    document.body.appendChild(noteBox);

    // Style champs "raison"
    GM_addStyle(`
      #Raison {
        position: fixed;
        top: 172px;
        left: 560px;
        width: 300px;
        height: 23px;
        background: rgb(255,150,150);
      }
      #RaisonTxt {
        position: fixed;
        top: 174px;
        left: 434px;
        width: 130px;
        height: 20px;
      }
    `);

  } catch (err) {
    console.error('Erreur dans Sand-InfoPatient:', err);
  }
})();
