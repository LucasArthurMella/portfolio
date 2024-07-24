import { Router } from "express";
import { generateText } from "../../constants/languages";
import admRoutes from "./adm";
import { technologyModel } from "../../models/technology";
import { cvModel } from "../../models/cv";
import { socialsModel } from "../../models/socials";
const router = Router();

router.get("/", async (req, res) => {
  let lang = req.query.lang;

  let treated_lang: "en-US" | "pt-BR";

  if ((lang !== "en-US" && lang !== "pt-BR") || (lang == undefined || lang == "pt-BR")){
    treated_lang = "pt-BR";
  }else {
    treated_lang = "en-US"
  } 

  let texts = generateText(treated_lang);
  let socials = await socialsModel.findOne({});
  let cv = await cvModel.findOne({});
  let technologies = await technologyModel.find({});  
  res.render("home", {lang: treated_lang, texts, socials, cv, technologies});

});

router.use("/", admRoutes);

export default router;
