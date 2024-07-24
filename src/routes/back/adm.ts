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

const admRoutes = Router();

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

const imageUrl = "src/public/pictures/dynamic/";
const uploadTechnology = multer({dest: imageUrl + "technology"});

admRoutes.post("/adm/technology", uploadTechnology.single("image_url"), async (req, res) => {
  let postObject = {name: req.body.name, image_url: req.file?.filename};
  await technologyModel.create(postObject);
  res.redirect(("/adm/pages/technology"));

  //console.log(req.body);
  //console.log(req.file);
});

admRoutes.patch("/adm/technology/:id", uploadTechnology.single("image_url"), async (req, res) => {
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


admRoutes.delete("/adm/technology/:id", uploadTechnology.single("image_url"), async (req, res) => {
  let technology = await technologyModel.findByIdAndDelete(req.params.id);
  if(technology){
    let imagePath = path.join(__dirname, "../../../"+imageUrl+"technology/"+technology.image_url);
    let file = await fs.unlink(imagePath);
  }
  res.redirect(("/adm/pages/technology"));
});


const cvsUrl = "src/public/documents/dynamic/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, cvsUrl + "cv");
  },
  filename: function (req, file, cb) {
    const originalName = path.parse(file.originalname).name;
    cb(null, `${originalName}.pdf`);
  }
});

//const uploadCv = multer({dest: cvsUrl + "cv"});
const uploadCv = multer({storage});
admRoutes.post("/adm/cv", uploadCv.fields([{name:"cv_portuguese"},{name: "cv_english"}]), async(req,res) => {
  const documents = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  let cvItem = await cvModel.findOne({});
  if(cvItem){

    if(documents?.cv_portuguese){
      if(cvItem.cv_portuguese_url){
        let documentPath = path.join(__dirname, "../../../"+cvsUrl+"cv/"+cvItem.cv_portuguese_url);
        await fs.unlink(documentPath);
      }
      cvItem.cv_portuguese_url = documents.cv_portuguese[0].filename;
    }

    if(documents?.cv_english){
      if(cvItem.cv_english_url){
        let documentPath = path.join(__dirname, "../../../"+cvsUrl+"cv/"+cvItem.cv_english_url);
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

admRoutes.post("/adm/socials", async(req,res) => {
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





export default admRoutes;
