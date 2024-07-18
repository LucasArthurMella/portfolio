import { Router } from "express";
import { generateText } from "../../constants/languages";
import admRoutes from "./adm";
const router = Router();

router.get("/", (req, res) => {
  let lang = req.query.lang;

  let treated_lang: "en-US" | "pt-BR";

  if ((lang !== "en-US" && lang !== "pt-BR") || (lang == undefined || lang == "pt-BR")){
    treated_lang = "pt-BR";
  }else {
    treated_lang = "en-US"
  } 

  let texts = generateText(treated_lang);
  
  res.render("home", {texts, lang: treated_lang})

});

router.use("/", admRoutes);

export default router;
