const express = require("express");
const SendEmailController = require("../controllers/sendEmail.controller");

const route = express.Router();

route.post("/send-email", SendEmailController.SendEmail);

module.exports = route;
