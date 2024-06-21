"use strict";
import { authAPI_auto } from "./api/_auth.js";
import {messageRenderer} from "./renderers/messages.js";
import { sessionManager } from "./utils/session.js";

function main() {
    let refBtn = document.getElementById("btn-login");
    refBtn.onclick = login;
}

async function login() {
    let formData = new FormData(document.getElementById("login-form"));
    try {
        let result = await authAPI_auto.login(formData);
        sessionManager.login(result.sessionToken, result.user);
        window.location.href = "/index.html";
    } catch(error) {
        messageRenderer.showErrorMessage(error);
    }
}

document.addEventListener("DOMContentLoaded", main);