import { Router } from "express";
import { generateTextHome, generateTextProjects, generateTextSingleProject } from "../../constants/languages";
import admRoutes from "./adm";
import { technologyModel } from "../../models/technology";
import { cvModel } from "../../models/cv";
import { socialsModel } from "../../models/socials";
import { findProject, getCategories, getMainProjects, getProjects } from "../../services/adm";
import mongoose, { Schema } from "mongoose";
import { mainProjectModel } from "../../models/main-project";
const router = Router();

router.get("/", async (req, res) => {
  let lang = req.query.lang;

  let treated_lang: "en-US" | "pt-BR";

  if ((lang !== "en-US" && lang !== "pt-BR") || (lang == undefined || lang == "pt-BR")){
    treated_lang = "pt-BR";
  }else {
    treated_lang = "en-US"
  } 

  let texts = generateTextHome(treated_lang);
  let socials = await socialsModel.findOne({});
  let cv = await cvModel.findOne({});
  let technologies = await technologyModel.find({});  
  let mainProjects = await getMainProjects();
  res.render("home", {lang: treated_lang, texts, socials, cv, technologies, mainProjects});

});

router.get("/projects", async (req,res) => {

  const lang = req.query.lang;
  let treated_lang: "en-US" | "pt-BR";

  if ((lang !== "en-US" && lang !== "pt-BR") || (lang == undefined || lang == "pt-BR")){
    treated_lang = "pt-BR";
  }else {
    treated_lang = "en-US"
  } 

  const texts = generateTextProjects(treated_lang);
  const socials = await socialsModel.findOne({});
  
  let categoriesAcquired = req.query.categories as string[] | string | undefined;
  let convertedCategories: mongoose.Types.ObjectId[] | undefined = undefined;


  if(categoriesAcquired){
    if(typeof categoriesAcquired == "string"){
      categoriesAcquired = [categoriesAcquired];
    }
    convertedCategories = categoriesAcquired.map(s => new mongoose.Types.ObjectId(s));
  }
  
  const queryParams = {
    project_name: req.query.project_name as string | undefined,  
    categories: convertedCategories
  }

  const projects = await getProjects({
    ...queryParams,
    lang: treated_lang
  });


  const categories = await getCategories();

  res.render("projects", {lang: treated_lang, texts, socials, projects, categories, queryParams });


});

router.get("/projects/:id", async (req,res) => {

  const lang = req.query.lang;
  let treated_lang: "en-US" | "pt-BR";

  if ((lang !== "en-US" && lang !== "pt-BR") || (lang == undefined || lang == "pt-BR")){
    treated_lang = "pt-BR";
  }else {
    treated_lang = "en-US"
  }

  const texts = generateTextSingleProject(treated_lang);
  const socials = await socialsModel.findOne({});
  const project = await findProject(req.params.id);
  console.log(project);
  res.render("project", {lang: treated_lang, texts, socials, project });

});
  
router.use("/", admRoutes);

export default router;
