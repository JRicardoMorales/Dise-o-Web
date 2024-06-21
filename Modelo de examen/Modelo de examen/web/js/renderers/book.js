"use strict"

import { parseHTML } from "/js/utils/parseHTML.js";

const bookRenderer = {

    asCard: function(book){
        let html = `<div class="col-md-4 col-lg-4">
        <div class="card">
        
            <img class="card-img-top custom-card-img" src="${book.imageUrl}" alt="Card image">
            <div class="card-body">
                <h4 class="card-title">${book.title}</h4> 
                <p class="card-author">${book.author}</p>
                <p class="card-releaseDate">${book.releaseDate}</p>
                <p class="card-numPages">${book.numPages}</p>
                <a href="create_book.html?bookId=${book.bookId}"><button  class="btn btn-primary">Editar</button></a>
                <a href="delete_book.html?bookId=${book.bookId}"><button class="btn btn-danger" id="button-delete">Eliminar</button></a>
                </div>
                
            </div>
            
        </div>

    </div>`

        let card=parseHTML(html);
        return card;



    }
};


export {bookRenderer};