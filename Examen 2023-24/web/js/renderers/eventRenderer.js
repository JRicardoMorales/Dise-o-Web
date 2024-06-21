"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const eventRenderer = {

    asCard: function (event) { 
        let html = `<div class="card flex-row">
                        <img class="card-img w-25 p-2" src="${event.imageUrl}" alt="${event.name}">
                        <div class="card-body col">
                            <h3><b>${event.name}</b></h3>
                            <p><b>Fecha: </b>${event.eventDate}</p>
                            <p><b>Número máximo de participantes: </b>${event.maxParticipants}</p>
                            <p><b>Lugar del evento: </b>${event.place}</p>
                            <a href="create_event.html?eventId=${event.eventId}"><button>Editar evento</button></a>
                        </div>
                    </div>`
        let card = parseHTML(html)
        return card
    }
}

export { eventRenderer };