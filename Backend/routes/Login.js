const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const custSignIn = require("../Models/CustomerSignupModel")
const { auth } = require("../Utils/passport");
auth();

//Route to handle Post Request Call
router.post('/login', (req, res) => {
    custSignIn.findOne({ Email:req.body.email,Password:req.body.password}, (error, customer) => {
        if (error) {
            res.status(500).end("Error Occured");
        }
        if (customer) {
            const payload = { _id: customer._id, name: customer.Name};
            const token = jwt.sign(payload, "cmpe273", {
                expiresIn: 1008000
            });
            res.status(200).send(JSON.stringify("JWT " + token));
        }
        else {
            res.status(401).end("Invalid Credentials");
        }
    });
});

module.exports = router;