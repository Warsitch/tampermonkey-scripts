// ==UserScript==
// @name         Sand-AdmissionUrg
// @namespace    https://www.chu-brugmann.be/fr/
// @version      0.3.2
// @description  Inscription facilitée dans WISH
// @author       Ramakers Alexandre
// @match        http://br400prd.chu-brugmann.be:30700/*
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-AdmissionUrg.user.js
// @downloadURL  https://raw.githubusercontent.com/Warsitch/tampermonkey-scripts/main/sand-AdmissionUrg.user.js
// ==/UserScript==

(function() {
    'use strict';
    try {
        const distinct = document.querySelector("#f\\:OriginDate");
        if (distinct?.value != null) {
            let mut = false;
            const validValues = new Set([
                '109-1', '109-2', '109-A',
                '110-1', '110-2', '110-A',
                '120-1', '120-2', '120-A',
                '126-1', '126-2', '126-A',
                '128-1', '128-2', '128-A',
                '134-1', '134-2', '134-A',
                '135-1', '135-2', '135-A',
                '206-1', '206-2', '206-A',
                '216-1', '216-2', '216-A',
                '228-1', '228-2', '228-A',
                '235-1', '235-2', '235-A',
                '306', '306-1', '306-2', '306-A',
                '319-1', '319-2', '319-A',
                '323-1', '323-2', '323-A',
                '403-1', '403-2', '403-A',
                '501-1', '501-2', '501-A',
                '509-1', '509-2', '509-A',
                '526-1', '526-2', '526-A',
                '602-1', '602-2', '602-A',
                '695-1', '695-2', '695-A',
                '910-1', '910-2', '910-A'
            ]);

            const txtWalker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: function (node) {
                        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
                    }
                },
                false
            );

            while (txtWalker.nextNode()) {
                const txtNode = txtWalker.currentNode;
                const trimmed = txtNode.nodeValue.trim();
                if (validValues.has(trimmed)) {
                    mut = true;
                }
            }

            document.querySelector("#f\\:SADOC").value = 'mooso';
            localStorage.setItem('workflowAuto', 'false');

            $("body").append(`
<div id="gmPopupContainer">
  <form>
    <button id="gmCloseNORMALE" type="button">INSCRIPTION ---- NORMALE</button>
    <button id="gmCloseSMUR" type="button">INSCRIPTION ---- SMUR</button>
    <button id="gmCloseCPAS" type="button">INSCRIPTION ---- CPAS</button>
    <button id="gmCloseMEDIP" type="button">INSCRIPTION ---- MEDIPRIMA</button>
    <button id="gmClose" type="button">FERMER</button>
  </form>
</div>`);

            const actions = {
                gmCloseNORMALE: () => {
                    document.querySelector("#f\\:SDEPT").value = '8300';
                    if (!mut) document.querySelector("#f\\:SMOTE").value = '59';
                },
                gmCloseSMUR: () => {
                    const service = document.querySelector("#f\\:SDEPT");
                    const heure = document.querySelector("#f\\:SHADM");
                    const date = document.querySelector("#f\\:SDADM");
                    service.value = '152';
                    heure.value = '';
                    date.value = '99' + date.value.substr(2);
                    if (!mut) document.querySelector("#f\\:SMOTE").value = '59';
                },
                gmCloseCPAS: () => {
                    document.querySelector("#f\\:SDEPT").value = '8300';
                    document.querySelector("#f\\:SADSU").value = 'U';
                    if (!mut) document.querySelector("#f\\:SMOTE").value = '58';
                },
                gmCloseMEDIP: () => {
                    document.querySelector("#f\\:SDEPT").value = '8300';
                    document.querySelector("#f\\:SMOTE").value = '45';
                    document.querySelector("#f\\:SADSU").value = 'U';
                },
                gmClose: () => {}
            };

            for (let id in actions) {
                $(`#${id}`).click(() => {
                    $("#gmPopupContainer").hide();
                    actions[id]();
                    $("#f\\:saveButton").show();
                });
            }

            GM_addStyle(`#gmPopupContainer, #gmPopupContainer button {
                font-family: sans-serif;
            }
            #gmPopupContainer {
                position: fixed;
                top: 150px;
                left: 255px;
                width: 380px;
                height: 215px;
                padding: 1em;
                background: powderblue;
                border: 3px double black;
                border-radius: 1ex;
                z-index: 777;
            }
            #gmPopupContainer button {
                display: block;
                width: 340px;
                height: 30px;
                margin: 0.5em auto;
                text-align: left;
                padding-left: 35px;
                border: 1px outset buttonface;
                cursor: pointer;
            }`);

            ["#f\\:SCASE", "#f\\:SAGRP", "#f\\:SAGRPsearch", "#f\\:SSVP"].forEach(sel => {
                const el = document.querySelector(sel);
                if (el) el.remove();
            });

            const saveBtn = document.querySelector("#f\\:saveButton");
            saveBtn.style.display = "none";
            saveBtn.style.height = '50px';
            saveBtn.style.width = '1000px';
            saveBtn.style.margin = '-150px -1200px 0px 0px';

            const replaceArry = [
                [/N° admission/gi, ''],
                [/[\"'()]/g, ''],
                [/Service provenance/g, ''],
                [/Provenance N° Agr/gi, '']
            ];

            const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
            while (textWalker.nextNode()) {
                let node = textWalker.currentNode;
                let text = node.nodeValue;
                for (let [regex, repl] of replaceArry) {
                    text = text.replace(regex, repl);
                }
                node.nodeValue = text;
            }
        }
    } catch (err) {}
})();
