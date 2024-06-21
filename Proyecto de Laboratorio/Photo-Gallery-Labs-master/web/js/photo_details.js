"use strict";

import { photoRenderer } from "/js/renderers/photos.js";
import { PhotosAPI_auto } from "/js/api/_photos.js";
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

async function loadPhotoById() {
    let photoContainer = document.querySelector("#photo-details-column");

    try {
        let photo = await PhotosAPI_auto.getById(photoId);
        let photoDetails = photoRenderer.asDetails(photo);
        photoContainer.appendChild(photoDetails);
    } catch (err) {
        messageRenderer.showErrorMessage("Error loading photo", err);
    }
}

async function handleDelete(event) {
    let answer = confirm("Do you really want to delete this photo?");

    if (answer) {
        try {
            await PhotosAPI_auto.delete(photoId);
            window.location = "/index.html";        
        } catch (err) {
            messageRenderer.showErrorMessage(err.response.data.message);
        }
    }
}

function handleEdit(event) {
    window.location.href = "edit_photo.html?photoId=" + photoId;
}

async function main() {
    if (photoId === null) {
        messageRenderer.showErrorMessage("Please, provide a photoId");
        return;
    }
    await loadPhotoById()

    let deleteBtn = document.querySelector("#button-delete");
    deleteBtn.onclick = handleDelete;

    let editBtn = document.querySelector("#button-edit");
    editBtn.onclick = handleEdit;
}

document.addEventListener("DOMContentLoaded", main);