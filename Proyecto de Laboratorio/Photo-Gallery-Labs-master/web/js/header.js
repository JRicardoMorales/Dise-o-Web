"use strict";

import { sessionManager } from "./utils/session.js";

function main() {
    hideOptions();
    showUser();
    let refLogout = document.getElementById("navbar-logout");
    refLogout.onclick = logout;

}

function showUser() {
    let text;
    if(sessionManager.isLogged()) {
        text = "Hello, " + sessionManager.getLoggedUser().username;
    } else {
        text = "Hello, stranger";
    }

    let refText = document.getElementById("navbar-title");
    refText.innerText = text;
}

function logout() {
    sessionManager.logout();
    window.location.href = "/index.html";
}

function hideOptions() {
    if(sessionManager.isLogged()) {
        //Ocultamos opciones login, register
        let refLogin = document.getElementById("navbar-login");
        refLogin.style.display = "none";
        let refRegister = document.getElementById("navbar-register");
        refRegister.style.display = "none";
    } else {
        //Ocultamos opciones logout
        let refLogout = document.getElementById("navbar-logout");
        refLogout.style.display = "none";
        let refCreate = document.getElementById("navbar-create");
        refCreate.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", main);