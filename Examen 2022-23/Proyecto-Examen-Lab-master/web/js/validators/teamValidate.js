"use strict";
const teamValidator = {
validateCreateTeam: function (formData) {


    let errors = [];

    let president = formData.get("president");
    let fieldCapacity = formData.get("fieldCapacity");

    if (president.length < 3){
    errors.push("El presidente debe tener al menos 3 caracteres.");
    }

    
    if (president.length % 5 != 0) {
        errors.push("La longitud del presidente debe ser multiplo de 5.")
    }

    if (fieldCapacity < 100 || fieldCapacity > 200000) {
    errors.push("Los participantes deben ser entre 100 y 200000.");
    }

    return errors;
    }
    
};
export { teamValidator };