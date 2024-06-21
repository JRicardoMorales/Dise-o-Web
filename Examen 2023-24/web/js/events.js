"use strict";

import { eventsAPI_auto } from "./api/_events.js";
import { galleryRenderer } from "./renderers/galleryRenderer.js";

async function main() {
    loadContests()
}

async function loadContests() {
    let events = await eventsAPI_auto.getAll()
    let eventsGallery = galleryRenderer.asGallery(events)
    document.getElementById('events').appendChild(eventsGallery)
}

document.addEventListener("DOMContentLoaded", main);
