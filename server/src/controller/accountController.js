
const accountModel = require("../models/account.model");
const bcrypt = require('bcryptjs');
const Helper = require("../Helper/validate");

module.exports = {

    // [POST] /api/account/login
    async login(req, res) {
        try {
            const {phonenumber, pwd} = req.body;

            if(!Helper.isValidatePhonenumber(phonenumber) || Helper.isHaveInvalidCharecter(phonenumber) || Helper.isHaveInvalidCharecter(pwd)){
                return res.json({
                    message:"Phonenumber or Password was wrong 1",
                    status: 401
                }); 
            }

            const account = await accountModel.findOne({phonenumber}).lean().exec();
            
            if(!account){
                return res.json({
                    message:"Phonenumber or Password was wrong 2",
                    status: 401
                });
            }
            console.log(pwd);
            const result = await bcrypt.compare(pwd, account.password);
            return res.status(200).json({
                message: result ? "Success" : "Phonenumber or Password was wrong 3",
                status: result ? 200 : 401
            })

        } catch (error) {
            console.log(error);
            return res.json({
                message:"Error",
                status: 500
            });
        }
    },

    // [POST] /api/account/register
    async register(req, res) {
        try {
            const { username, phonenumber,email, pwd, conf_pwd, address } = req.body;
            let validate = await Helper.validate_register_account(req.body);

            if (!validate.isValid) {
                return res.status(200).json({
                    "status": 401,
                    "message": validate.message
                })
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(pwd, salt);

            let newAccount = new accountModel({
                email: email,
                phonenumber,
                username,
                address,
                password: hash,
            }).save();

            console.log({
                email: email,
                phonenumber,
                username,
                address,
                password: hash,
            });

            return res.status(200).json({
                "status": 200,
                "message": "Success"
            });

        } catch (error) {
            console.log(error);
            return res.json({
                message:"Error",
                status: 500
            })
        }


    }
}