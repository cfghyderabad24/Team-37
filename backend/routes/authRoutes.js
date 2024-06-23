const express = require("express");
const {
  registerController,
  loginController,
  projectController,
} = require("../controllers/authController");

const routes = express.Router();

//routes
routes.post("/login", loginController);

routes.post("/register", registerController);

routes.post("/projects", projectController);

module.exports = routes;
