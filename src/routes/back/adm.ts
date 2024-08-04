import { Router } from "express";
import { login } from "../../services/adm";
import jwt from "jsonwebtoken";
import { getEnv } from "../../constants/envs";
import multer from "multer";
import { technologyModel } from "../../models/technology";
import fs from "fs/promises";
import path from "path";
import { cvModel } from "../../models/cv";
import { socialsModel } from "../../models/socials";
import { categoryModel } from "../../models/category";
import { projectModel } from "../../models/project";
import { Category } from "../../models/category";
import { left } from "fp-ts/lib/EitherT";
import { Schema } from "mongoose";
import { mainProjectModel } from "../../models/main-project";
import { authenticateJwt } from "../../middlewares/auth";

const admRoutes = Router();
const imageUrl = "src/public/pictures/dynamic/";

admRoutes.post("/confirm-login", async (req,res) => {

  let result = await login(req.body.email, req.body.password);
  if (result.isOk()) {
    return res.json({value: result.value});
  }else{
    return res.json({error: "Invalid login or password!"});
  }
});

admRoutes.get("/check-token", async (req,res) => {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.json({authenticated: false});

  //console.log(token);

  jwt.verify(token, getEnv().jwtSecret, (err: any, _ok: any) => {
    if (err)  {
      res.json({authenticated: false});
    } else {
      res.json({authenticated: true});
    }
  })
});



const technologyStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUrl + "technology");
  },
  filename: function (req, file, cb) {
    const originalName = path.parse(file.originalname).name;
    cb(null, Date.now() + originalName+".png");
  }
});

//const uploadTechnology = multer({dest: imageUrl + "technology"});
const uploadTechnology = multer({storage: technologyStorage});

admRoutes.post("/adm/technology", authenticateJwt, uploadTechnology.single("image_url"), async (req, res) => {
  let postObject = {name: req.body.name, image_url: req.file?.filename};
  await technologyModel.create(postObject);
  res.redirect(("/adm/pages/technology"));

  //console.log(req.body);
  //console.log(req.file);
});

admRoutes.patch("/adm/technology/:id", authenticateJwt, uploadTechnology.single("image_url"), async (req, res) => {
  let technology = await technologyModel.findById(req.params.id);

  if(technology){
    technology.name = req.body.name;
    if(req.file){
      let imagePath = path.join(__dirname, "../../../"+imageUrl+"technology/"+technology.image_url);
      let file = await fs.unlink(imagePath);
      technology.image_url = req.file?.filename!;
    }
    await technology.save();
  }
  res.redirect(("/adm/pages/technology"));
});


admRoutes.delete("/adm/technology/:id", authenticateJwt, uploadTechnology.single("image_url"), async (req, res) => {
  let technology = await technologyModel.findByIdAndDelete(req.params.id);
  if(technology){
    let imagePath = path.join(__dirname, "../../../"+imageUrl+"technology/"+technology.image_url);
    let file = await fs.unlink(imagePath);
  }
  res.redirect(("/adm/pages/technology"));
});


const documentsUrl = "src/public/documents/dynamic/";

const cvsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, documentsUrl + "cv");
  },
  filename: function (req, file, cb) {
    const originalName = path.parse(file.originalname).name;
    cb(null, Date.now() + originalName+".pdf");
  }
});

//const uploadCv = multer({dest: cvsUrl + "cv"});
const uploadCv = multer({storage: cvsStorage});
admRoutes.post("/adm/cv", authenticateJwt, uploadCv.fields([{name:"cv_portuguese"},{name: "cv_english"}]), async(req,res) => {
  const documents = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  let cvItem = await cvModel.findOne({});
  if(cvItem){

    if(documents?.cv_portuguese){
      if(cvItem.cv_portuguese_url){
        let documentPath = path.join(__dirname, "../../../"+documentsUrl+"cv/"+cvItem.cv_portuguese_url);
        await fs.unlink(documentPath);
      }
      cvItem.cv_portuguese_url = documents.cv_portuguese[0].filename;
    }

    if(documents?.cv_english){
      if(cvItem.cv_english_url){
        let documentPath = path.join(__dirname, "../../../"+documentsUrl+"cv/"+cvItem.cv_english_url);
        await fs.unlink(documentPath);
      }
      cvItem.cv_english_url = documents.cv_english[0].filename;
    }

    await cvItem.save();
  }else{

    let cvObject: { cv_portuguese_url: undefined | string; cv_english_url: undefined | string } = {
      cv_portuguese_url: undefined,
      cv_english_url: undefined
    }

    if(documents.cv_portuguese){
      cvObject.cv_portuguese_url = documents.cv_portuguese[0].filename;
    }
    if(documents.cv_english){
      cvObject.cv_english_url = documents.cv_english[0].filename;
    }

    //const cvObject = {cv_portuguese_url: documents.cv_portuguese[0].filename, cv_english_url: documents.cv_english[0].filename};
    await cvModel.create(cvObject);
  }
  res.redirect("/adm/pages/single/cv")

});

admRoutes.post("/adm/socials", authenticateJwt, async(req,res) => {
  let socials = await socialsModel.findOne({});
  let reqObject = {
    email: req.body.email,
    github: {
      title: req.body.githubTitle,
      url: req.body.githubUrl
    },
    linkedin: {
      title: req.body.linkedinTitle,
      url: req.body.linkedinUrl
    }
  }
  if(socials){   
    socials.email = reqObject.email;
    socials.github = reqObject.github;
    socials.linkedin = reqObject.linkedin;
    await socials.save();
  }else{
    await socialsModel.create(reqObject);
  }
  res.redirect("/adm/pages/single/socials")
});


admRoutes.post("/adm/main-project", authenticateJwt, async(req,res) => {
  let mainProjectObject = {
    project: req.body.project
  }

  await mainProjectModel.create(mainProjectObject);
  res.redirect("/adm/pages/main-project") 
});

admRoutes.patch("/adm/main-project/:id", authenticateJwt, async(req,res) => {
  let mainProjectObject = {
    project: req.body.project
  }

  await mainProjectModel.findByIdAndUpdate(req.params.id, mainProjectObject)
  res.redirect("/adm/pages/main-project") 
});


admRoutes.delete("/adm/main-project/:id", authenticateJwt, async(req,res) => {

  await mainProjectModel.findByIdAndDelete(req.params.id);
  res.redirect("/adm/pages/main-project") 
});

admRoutes.post("/adm/category", authenticateJwt, async(req,res) => {
  const name =  {
    "pt-BR": req.body["name-pt-BR"],
    "en-US": req.body["name-en-US"]
  }
  await categoryModel.create({name});
  res.redirect("/adm/pages/category") 
});

admRoutes.patch("/adm/category/:id", authenticateJwt, async(req,res) => {
  const name =  {
    "pt-BR": req.body["name-pt-BR"],
    "en-US": req.body["name-en-US"]
  }

  const id  = req.params.id;
  let category = await categoryModel.findById(id);
  if(category){
    category.name = {...category.name, ...name};
    await category.save();
  }

  res.redirect("/adm/pages/category") 
});


admRoutes.delete("/adm/category/:id", authenticateJwt, async(req,res) => {
  let projectsWithCategory = await projectModel.find({categories: req.params.id});
  let x: number | string = 2;

  for(let project of projectsWithCategory){
    let leftOverCategories = project?.categories.filter(i => i.toString() != req.params.id);
    project.categories = leftOverCategories as typeof project.categories;
    await project.save();
  }


  await categoryModel.findByIdAndDelete(req.params.id);
  res.redirect("/adm/pages/category") 
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageUrl + "project"); // Folder where the files will be stored
    },
    filename: (req, file, cb) => {
        const originalName = path.parse(file.originalname).name;
        cb(null, Date.now() + originalName+".png"); // Generate unique file name
    }
});

const uploadProject = multer({storage});
admRoutes.post("/adm/project", authenticateJwt, uploadProject.array("pictures"), async(req,res) => {
  let projectObject = {
    pictures: [] as string[],
    link: req.body.link,
    demonstrative_link: req.body.demonstrative_link,
    repository: req.body.repository,
    name: {
      "pt-BR": req.body["name-pt-br"],
      "en-US": req.body["name-en-us"]
    },
    description: {
      "pt-BR": req.body["description-pt-br"],
      "en-US": req.body["description-en-us"]
    },
    categories: req.body.categories 
  }

  if(req.files){
    if(Array.isArray(req.files)){ 
      req.files.forEach((item) => {
        projectObject.pictures.push(item.filename);
      });
    }
  }

  await projectModel.create(projectObject);
  res.redirect("/adm/pages/project");
});


admRoutes.delete("/adm/project/:id", authenticateJwt, async(req,res) => {
  let project = await projectModel.findByIdAndDelete(req.params.id);

  let relatedMainProjects = await mainProjectModel.find({project: req.params.id});
  for (let relatedMainProject of relatedMainProjects){
    await mainProjectModel.findByIdAndDelete(relatedMainProject._id);
  }

  if(project){
    for (let picture of project.pictures){
      let imagePath = path.join(__dirname, "../../../"+imageUrl+"project/"+picture);
      let file = await fs.unlink(imagePath);
    }
  }

  res.redirect("/adm/pages/project");
});


admRoutes.delete("/adm/project/:id/:picture_id", authenticateJwt, uploadProject.array("pictures"), async(req,res) => {

  let project = await projectModel.findById(req.params.id);
  if(project){
    let imagePath = path.join(__dirname, "../../../"+imageUrl+"project/"+req.params.picture_id);
    let file = await fs.unlink(imagePath);
    project.pictures = project?.pictures.filter(i => i != req.params.picture_id);
    await project.save();
  }

  res.redirect("/adm/pages/project/"+req.params.id);
});

admRoutes.patch("/adm/project/:id", authenticateJwt, uploadProject.array("pictures"), async(req,res) => {
  
  let project = await projectModel.findById(req.params.id);
 
  let projectObject = {
    pictures: project?.pictures,
    link: req.body.link,
    demonstrative_link: req.body.demonstrative_link,
    repository: req.body.repository,
    name: {
      "pt-BR": req.body["name-pt-br"],
      "en-US": req.body["name-en-us"]
    },
    description: {
      "pt-BR": req.body["description-pt-br"],
      "en-US": req.body["description-en-us"]
    },
    categories: req.body.categories 
  }

  if(req.files){
    if(Array.isArray(req.files)){ 
      req.files.forEach((item) => {
        projectObject.pictures?.push(item.filename);
      });
    }
  }

  await projectModel.findByIdAndUpdate(req.params.id, projectObject);
  res.redirect("/adm/pages/project");

})



  

export default admRoutes;
