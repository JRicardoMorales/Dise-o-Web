import { parseHTML } from "../utils/parseHTML.js";
import { teamRenderer } from "../renderers/team.js";

const galleryRenderer = {
    asCardGallery: function (photos) {

        let galleryContainer = parseHTML('<div class="team-gallery"></div>');
        let row = parseHTML('<div class="row"></div>');
        galleryContainer.appendChild(row);

        for (let photo of photos) {

            let row = parseHTML('<div class="row"></div>');
            galleryContainer.appendChild(row);
            let card = teamRenderer.asCard(photo);
            row.appendChild(card);

        }

        return galleryContainer;
        }
        
    };
    
export { galleryRenderer };