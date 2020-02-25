const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/user");
const CompanyController = require("./controllers/company");
const CustomerController = require("./controllers/customer");
const ProjectController = require("./controllers/project");

routes.get("/user", UserController.index);
routes.get("/user/:id", UserController.show);
routes.post("/user", UserController.store);
routes.delete("/user/:id", UserController.destroy);
routes.put("/user/:id", UserController.update);
routes.post("/user/login", UserController.login);

routes.get("/company", CompanyController.index);
routes.get("/companies", CompanyController.index);
routes.get("/company/:id", CompanyController.show);
routes.post("/company", CompanyController.store);
routes.delete("/company/:id", CompanyController.destroy);
routes.put("/company/:id", CompanyController.update);

routes.get("/customer", CustomerController.index);
routes.get("/customer/:id", CustomerController.show);
routes.post("/customer", CustomerController.store);
routes.delete("/customer/:id", CustomerController.destroy);
routes.put("/customer/:id", CustomerController.update);

routes.get("/project", ProjectController.index);
routes.get("/project/:id", ProjectController.show);
routes.post("/project", ProjectController.store);
routes.delete("/project/:id", ProjectController.destroy);
routes.put("/project/:id", ProjectController.update);

module.exports = routes;
