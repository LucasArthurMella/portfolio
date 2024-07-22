import { Router } from "express";
import { login } from "../../services/adm";
import jwt from "jsonwebtoken";
import { getEnv } from "../../constants/envs";
import multer from "multer";
import { technologyModel } from "../../models/technology";

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





export default admRoutes;
