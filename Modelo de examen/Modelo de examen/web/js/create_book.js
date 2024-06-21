"use strict ";

import { booksAPI_auto } from "/js/api/_books.js";
import { messageRenderer } from "/js/renderers/messages.js ";

/*
async function main() {

    let registerForm= document.getElementById("form-book-upload");
    registerForm.onsubmit = handleSubmitBook;


}

async function handleSubmitBook(event){
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    formData.append("bookId", 1);

    let errors = [];

        let autor = formData.get("author");
        let numeroPaginas = formData.get("numPages");
        if (autor.length < 3) {
            errors.push("el nombre del autor al menos 3 caracteres");
        }
        if (numeroPaginas < 0 || numeroPaginas > 5000) {
            errors.push("numero mayor a 0 menor que 5000");
        }
        if (errors.length > 0) {
            event.preventDefault();
            let errorsDiv = document.getElementById("errors");
            errorsDiv.innerHTML = "";
            for (let error of errors) {
                messageRenderer.showErrorMessage(error);
            }
        } else {


    try{
        let resp = await booksAPI_auto.create(formData);
        let newId = resp.lastId;
        
        window.location.href=`index.html?bookId=${newId}`;
    } catch (err) {
        messageRenderer.showErrorMessage(err.response.data.message);

    }
}

}
document.addEventListener("DOMContentLoaded", main);
*/

let urlParams = new URLSearchParams(window.location.search);
let bookId = urlParams.get("bookId");


async function main() {

    if (bookId != null){
        loadCurrentBook();
    }

    let registerForm= document.getElementById("form-book-upload");
    registerForm.onsubmit = handleSubmitBook;

    

}



async function handleSubmitBook(event){
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    formData.append("bookId", 1);

    let errors = [];

        let autor = formData.get("author");
        let numeroPaginas = formData.get("numPages");

        if (autor.length < 3) {
            errors.push("el nombre del autor al menos 3 caracteres");
        }
        if (numeroPaginas < 0 || numeroPaginas > 5000) {
            errors.push("numero mayor a 0 menor que 5000");
        }
        
        if (errors.length > 0) {
            event.preventDefault();
            let errorsDiv = document.getElementById("errors");
            errorsDiv.innerHTML = "";
            for (let error of errors) {
                messageRenderer.showErrorMessage(error);
            }
        } else {
            if(bookId == null) {
                try{
                    let resp = await booksAPI_auto.create(formData);
                    let newId = resp.lastId;
        
                    window.location.href=`index.html?bookId=${newId}`;
                } catch (err) {
                messageRenderer.showErrorMessage(err.response.data.message);
                }
            } else {
                updateBook(formData);
            }

                
}
async function updateBook(formData) {
    try {
        let resp = await booksAPI_auto.update(formData, bookId);
        window.location.href = `index.html`;
    } catch (err) {
        messageRenderer.showErrorMessage("No tienes solicitudes nuevas", err)
    }
}


}







async function loadCurrentBook() {
    let titulo = document.getElementById("input-title");
    let autor = document.getElementById("input-author");
    let fecha = document.getElementById("input-releaseDate");
    let paginas = document.getElementById("input-numPages");
    let portada = document.getElementById("input-imageUrl");

    try {
        let currentBook = await booksAPI_auto.getById(bookId);
        console.log(currentBook);
        titulo.value = currentBook.title;
        autor.value = currentBook.author;
        fecha.value = currentBook.releaseDate;
        paginas.value = currentBook.numPages;
        portada.value = currentBook.imageUrl;
    } catch {
        messageRenderer.showErrorMessage("Fallo al cargar el libro");
    }
}



document.addEventListener("DOMContentLoaded", main);