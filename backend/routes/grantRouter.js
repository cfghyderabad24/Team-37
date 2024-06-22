const express = require("express");
const routes = express.Router;

routes.get("/getRoutes", require("../controllers/grantController"));

module.exports = routes;
