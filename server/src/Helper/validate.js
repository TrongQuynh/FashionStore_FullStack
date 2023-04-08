
const accountModel = require("../models/account.model");

module.exports = {

    isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
        return pattern.test(emailAddress);
    },

    isHaveInvalidCharecter(str) {
        const invalidRegex = /[()_+\-=\[\]{};':"\\|,.<>\/?]/;
        return invalidRegex.test(str);
    },

    isValidPassword(password) {
        const invalidRegex = /[()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (this.isHaveInvalidCharecter(password)) {
            return false;
        }
        return /[!@#$%^&*]/.test(password) && /[A-Z][a-z]/.test(password) && /[\d]/.test(password);
    },

    isValidatePhonenumber(phonenumber) {
        return String(phonenumber).length == 10 ? true : false;
    },

    // Validate data register account
    async validate_register_account(account) {
        const { username, phonenumber, email, pwd, conf_pwd, address } = account;

        let phonenumberDB = await accountModel.findOne({ phonenumber }).exec();

        let result = {
            "isValid": false,
            "message": "Success"
        };

        if (username.length == 0) {
            result["message"] = "Please enter your user name.";
            return result;
        }

        if (!this.isValidEmailAddress(email) && email.length > 0) {
            result["message"] = "Email wrong format.";
            return result;
        }

        if (!this.isValidatePhonenumber(phonenumber)) {
            result["message"] = "Phonenumber wrong format";
            return result;
        }

        if (phonenumberDB) {
            result["message"] = "Phonenumber already exits";
            return result;
        }

        if (pwd != conf_pwd) {
            result["message"] = "Password and Confirm password is not same.";
            return result;
        }

        if (pwd.length == 0) {
            result["message"] = "Password not fill.";
            return result;
        }

        if (pwd.length < 12) {
            result["message"] = "Password too short.";
            return result;
        }

        if (!this.isValidPassword(pwd)) {
            result["message"] = "Password invalid";
            return result;
        }

        result["isValid"] = true;
        return result;


    }
}