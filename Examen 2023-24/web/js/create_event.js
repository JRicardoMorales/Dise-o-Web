"use strict";
import { eventsAPI_auto } from "./api/_events.js";
import { messageRenderer } from "./renderers/messages.js";
import { eventValidator } from "/js/validators/eventValidator.js";
import { sessionManager } from "/js/utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let eventId = urlParams.get("eventId");
let currentEvent = null;

function main() {
	if (!sessionManager.isLogged()) {
		alert ("No puede editar fotos si no está autorizado!");
		window.location.href = `events.html`; // Cancelar edición si no está autorizado
	} 
	
	document.getElementById("errors").innerHTML="";
    if (eventId !== null) {
        loadCurrentEvent();
    }

    let registerForm = document.getElementById("newEvent-form");
    registerForm.onsubmit = handleSubmitRegister; //enviar el formulario
}

async function handleSubmitRegister(event) { 
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let errors = eventValidator.validateEvent(formData);

    if (currentEvent === null) { // Creating a new event
        // Add the current event ID
        if (errors.length > 0) { // si hay errores
            let errorsDiv = document.getElementById('errors')
            errorsDiv.innerHTML = ""
            for (let error of errors) {
                messageRenderer.showErrorMessage(error)
            }
        } else { // si no hay errores
                try {
                    await eventsAPI_auto.create(formData)
                    window.location.href = 'events.html'
                } catch (err) {
                    messageRenderer.showErrorMessage('Error al crear el evento: ' + err)
                }
        }
    } else { // Updating an existing event
        if (errors.length > 0) { // si hay errores
            let errorsDiv = document.getElementById('errors')
            errorsDiv.innerHTML = ""
            for (let error of errors) {
                messageRenderer.showErrorMessage(error)
            }
        } else { // si no hay errores
            formData.append("eventId", currentEvent.eventId); // Updating an existing photo
		    try {	
                await eventsAPI_auto.update(formData, eventId); // API REST para actualizar la foto
		    	window.location.href = `events.html?eventId=${eventId}`;
		    } 
            catch (err) { 
               messageRenderer.showErrorAsAlert(err.response.data.message); 
            }
        }
    }
}

async function loadCurrentEvent() { //funcion para que aparezca en el formulario un libro existente
	let pageTitle = document.getElementById("text-center");
    pageTitle.textContent=`Editar evento`;

    let nameInput = document.getElementById("name-input"); 
    let eventDateInput = document.getElementById("eventDate-input"); 
    let maxParticipantsInput = document.getElementById("maxParticipants-input"); 
    let placeInput = document.getElementById("place-input"); 
    let imageUrlInput = document.getElementById("imageUrl-input"); 
    try {
        currentEvent = await eventsAPI_auto.getById(eventId);
        nameInput.value = currentEvent.name;
        eventDateInput.value = currentEvent.eventDate;
        maxParticipantsInput.value = currentEvent.maxParticipants;
        placeInput.value = currentEvent.place;
        imageUrlInput.value = currentEvent.imageUrl;
    } catch (err) {
        messageRenderer.showErrorMessage(err.response.data.message);
    }
}

document.addEventListener("DOMContentLoaded", main);