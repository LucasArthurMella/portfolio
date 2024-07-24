import { Router } from "express";
import { findAndLoadPage } from "../../services/adm";


const admRoutes = Router();

admRoutes.get("/adm", (req,res) => {
  res.render("adm/adm-login")
});


admRoutes.get("/adm/pages", (req,res) => {
  res.render("adm/main", {see: "none"});
});


admRoutes.get("/adm/pages/single/:page", (req, res) => {
  findAndLoadPage(req, res, "single");
});

admRoutes.get("/adm/pages/:page", (req,res) => {
  findAndLoadPage(req, res, "list");
});


admRoutes.get("/adm/pages/:page/new", (req,res) => {
  findAndLoadPage(req, res, "new");
});


admRoutes.get("/adm/pages/:page/:id", (req,res) => {
  findAndLoadPage(req, res, "edit");
});






export default admRoutes;
