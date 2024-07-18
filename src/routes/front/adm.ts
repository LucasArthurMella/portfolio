import { Router } from "express";
import { login } from "../../services/adm";
import { isRight } from "fp-ts/lib/Either";


const admRoutes = Router();

admRoutes.get("/adm", (req,res) => {
  res.render("adm-login")
});

admRoutes.post("/confirm-login", async (req,res) => {
  let result = await login(req.body.email, req.body.password);
});

admRoutes.get("/adm/pages", (req,res) => {
  res.render("adm-login")
});





export default admRoutes;
