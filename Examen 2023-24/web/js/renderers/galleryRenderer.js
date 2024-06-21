"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { eventRenderer } from "./eventRenderer.js";

const galleryRenderer = {

    asGallery: function (events) {
        let galleryContainer = parseHTML('<div class="events"></div>')
        let row = parseHTML('<div class="row gap-3"></div>')
        galleryContainer.appendChild(row)

        let counter = 0

        for (let event of events) {
            let card = eventRenderer.asCard(event)
            row.appendChild(card)

            if (counter % 3 === 0) {
                let row = parseHTML('<div class="row"></div>')
                galleryContainer.appendChild(row)
            }
        }

        return galleryContainer
    }
}

export { galleryRenderer };