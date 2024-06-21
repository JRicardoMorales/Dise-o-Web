"use strict";

import { PhotosAPI_auto } from "/js/api/_photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "./utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;

async function handleSubmitPhoto(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    console.log(form)
    
    if (currentPhoto === null) {
        formData.append("userId", sessionManager.getLoggedId());
        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
        formData.append("date", formattedDate);

        try {
            let resp = await PhotosAPI_auto.create(formData);
            console.log(resp)
            let newId = resp.lastId;
            window.location.href = `photo_detail.html?photoId=${newId}`;
        } catch (err) {
            messageRenderer.showErrorMessage(err.response.data.message);
        }
    } else {
        formData.append("userId", currentPhoto.userId);
        formData.append("date", currentPhoto.date);

        try {
            await PhotosAPI_auto.update(formData, photoId); 
            window.location.href = `photo_detail.html?photoId=${photoId}`;
        } catch (err) {
            messageRenderer.showErrorAsAlert(err.response.data.message);
        }
    }
}

async function loadCurrentPhoto() {
    let pageTitle = document.getElementById("page-title");
    let urlInput = document.getElementById("input-url");
    let titleInput = document.getElementById("input-title");
    let descriptionInput = document.getElementById("input-description");
    let visibilityInput = document.getElementById("input-visibility");
    pageTitle.textContent = "Editing a photo";

    try {
        currentPhoto = await PhotosAPI_auto.getById(photoId);
        urlInput.value = currentPhoto.url;
        titleInput.value = currentPhoto.title;
        descriptionInput.value = currentPhoto.description;
        visibilityInput.value = currentPhoto.visibility;
    } catch (err) {
        messageRenderer.showErrorMessage(err.response.data.message);
    }
}

async function main() {

    if(sessionManager.isLogged()) {
        if (photoId) {
            loadCurrentPhoto();
        }
        let refForm = document.getElementById("form-photo-upload");
        refForm.onsubmit = handleSubmitPhoto;
    } else {
        window.location.href = "/login.html";
    }
}

document.addEventListener("DOMContentLoaded", main);