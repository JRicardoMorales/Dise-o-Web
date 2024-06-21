"use strict";

import { galleryRenderer } from "./renderers/gallery.js";
import { teamRenderer } from "./renderers/team.js";
import { teamsAPI_auto } from "./api/_teams.js";
import { parseHTML } from "./utils/parseHTML.js";


async function main() {

    await loadGallery();

    let teams = await teamsAPI_auto.getAll();

    let cards = document.querySelectorAll(".card-body");
   for (let i = 0; i < cards.length; i++){
        let card = cards[i];
        let row = parseHTML('<div class="row" id="filabtn"></div>');
        let btn = document.createElement('a');
        btn.innerText = "Editar team";
        btn.style.color = "white";
        btn.style.textDecoration = "none";
        btn.classList.add("btn-primary");
        btn.classList.add("text-center");
        btn.href = "create_team.html?teamId=" + teams[i].teamId;
        row.appendChild(btn);
        card.appendChild(row);
   }

}


async function   loadGallery(){
    let teams = await teamsAPI_auto.getAll();
    let container = document.getElementById("content");
    let gallery = teamRenderer.asTable(teams);
    container.appendChild(gallery);

}
document.addEventListener("DOMContentLoaded", main);