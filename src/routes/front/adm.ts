import { Router } from "express";


const admRoutes = Router();

admRoutes.get("/adm", (req,res) => {
  res.render("adm/adm-login")
});


admRoutes.get("/adm/pages", (req,res) => {
  res.render("adm/main");
});





export default admRoutes;
