"use strict";

import { authAPI_auto } from "./api/_auth.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "./utils/session.js";
import { userValidator } from "/js/validators/users.js";

async function handleSubmit(event) {
    let formData = new FormData(event.target);
   
    let errors = userValidator.validateUser(formData);
    event.preventDefault();

    //Mostrar errores de validación
    if (errors.length > 0) {
       
        for (let e of errors) {
            messageRenderer.showErrorMessage(e);
        }
    }
    //Llevar a cabo la funcionalidad del form
    try {
        let result = await authAPI_auto.register(formData);
        console.log(result);
        sessionManager.login(result.sessionToken, result.user);
        window.location.href = "/index.html";
    } catch(error) {
        messageRenderer.showErrorMessage(error);
    }
}

function main() {
    let form = document.getElementById("register-form");
    form.onsubmit = handleSubmit;

}

document.addEventListener("DOMContentLoaded", main);