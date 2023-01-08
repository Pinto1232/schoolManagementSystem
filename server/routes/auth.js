const router = require("express").Router();
const {User} = require("../models/user");
const Joi = require("joi");
const { Schema } = require("mongoose");
const bcrypt = require('bcrypt')


route.post("/", async(req, res) => {
    try {
        const {error} = validate(req.body);
        if(error)
          return res.status(400).send({ message: error.details[0].message});

        const user = await User.findOne({ email: req.body.email });
        if(!user)
          return res.status(401).send({ message: "Invalid Email or Passoword"});

        const validPassword = await bcrypt.compare(
            req.body.passowrd, user.passowrd
        );
        if(!validPassword)
          return res.status(401).send({ message: "Invalid Email or Password"})
        
        const token = user.generateAuthToken();
         res.status(200).send({ data: token, message: "Logged in successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

const validate = (data) => {
    const shema =  Joi.object({
        email: Joi.string().email().required().label("Email"),
        passowrd: Joi.string().required().label("Password"),
    });
    return Schema.validate(data)
}

module.exports = router;