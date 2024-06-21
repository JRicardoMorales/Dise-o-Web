"use strict";

import { galleryRenderer } from '/js/renderers/gallery.js';
import { photoswithusersAPI_auto } from '/js/api/_photoswithusers.js';
import { messageRenderer } from "/js/renderers/messages.js";

function handleMouseEnter(event) {
    let card = event.target;
    card.style.border = "2px solid blue";
}

function handleMouseLeave(event) {
    let card = event.target;
    card.style.border = "none";
}

async function loadAllPhotos(){

    let container = document.getElementById("gallery");
    try{
        let photos = await photoswithusersAPI_auto.getAll();
        let gallery = galleryRenderer.asCardGallery(photos);
        container.appendChild(gallery);
    } catch (err) {
        messageRenderer.showErrorMessage("Error while loading photos", err);
    }

}

async function main() {

    await loadAllPhotos()
    
    let cards = document.querySelectorAll("div.card");
    for (let card of cards) {
        card.onmouseenter = handleMouseEnter;
        card.onmouseleave = handleMouseLeave;
    }

}

document.addEventListener("DOMContentLoaded", main);