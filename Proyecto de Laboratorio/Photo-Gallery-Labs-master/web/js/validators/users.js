"use strict";


const userValidator = {
    validateRegister: function (formData) {
        let errors = [];
        let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;

        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let password = formData.get("password");
        let password2 = formData.get("password2");

        if (firstName.length < 3 || lastName.length < 3) {
            errors.push("The first and last name should have more than 3 characters");
        }

        if (password !== password2) {
            errors.push("The passwords must match");
        } 

        if (!regex.test(password)) {
            errors.push("Your password must be 8-15 characters long, contain letters and numbers");
        }

        return errors;
    }
};


export { userValidator };