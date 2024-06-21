"use strict"

const eventValidator = {
    validateEvent: function (formData) {
        let errors = []

        //Declaramos las variables a verificar
        let name = formData.get('name');
        let eventDate = new Date(formData.get('eventDate'));
        let day = eventDate.getDay();
        let maxParticipants = formData.get('maxParticipants');

        //Comprobamos que funcionan correctamente
        if (name.length % 5 !== 0 && name.length < 3) {
            errors.push("La longitud del nombre debe ser de al menos 3 caracteres y múltiplo de 5");
        }

        if (day == 6 || day == 0) {
            errors.push("La fecha del evento debe ser un día hábil");
        }

        if (maxParticipants < 2 || maxParticipants > 2000) {
            errors.push("El precio debe estar entre 2 y 2000, ambos inclusive");
        }
        return errors;
    }
}

export { eventValidator }