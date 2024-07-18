import { Router } from "express";
import  helloworldRoute  from "./helloworld"
import { generateText } from "../../constants/languages";
const router = Router();

router.get("/", (req, res) => {

  let texts = generateText("pt-BR");

  res.render("home", {texts})

});

router.get("/adm", (req,res) => {
  res.render("adm-login")
});

export default router;
