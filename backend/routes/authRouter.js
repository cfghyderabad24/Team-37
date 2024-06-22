const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");

const routes = express.Router();

//routes
routes.post("/login", loginController);

routes.post("/register", registerController);

module.exports = routes;
