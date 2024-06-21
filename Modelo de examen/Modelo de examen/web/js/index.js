"use strict";

import { messageRenderer } from "/js/renderers/messages.js";

import { galleryRenderer } from "/js/renderers/gallery.js";

import { booksAPI_auto } from "/js/api/_books.js";

async function main() {
    loadAllBooks();
}

async function loadAllBooks(){
    let galleryContainer = document.getElementById("gallery");



    try {
        let books = await booksAPI_auto.getAll();
        let CardGallery = galleryRenderer.asCardGallery(books);
        galleryContainer.appendChild(CardGallery);
    } catch (err) {
        messageRenderer.showErrorMessage("Error while loading photos", err);
    }
}


document.addEventListener("DOMContentLoaded", main);