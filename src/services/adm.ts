import { userModel } from "../models/user";
import * as bcrypt from 'bcrypt';
import { ok, err, Result } from 'neverthrow'
import jwt from "jsonwebtoken";
import { getEnv } from "../constants/envs";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { technologyModel } from "../models/technology";
import { cvModel } from "../models/cv";
import { socialsModel } from "../models/socials";
import { categoryModel } from "../models/category";
import { projectModel } from "../models/project";

let envVars = getEnv();

export async function login(email: string, password: string): Promise<Result<string, string>> {
  let login = await userModel.findOne({email})!;


  if(await bcrypt.compare(password, login?.hash!)) {
    const token = jwt.sign({email: login?.email}, envVars.jwtSecret, {expiresIn: "1h"});
    return ok(token);
  }else{
    return err("Incorrect email or password!");
  }
}

export async function createUser(email: string, password: string){
  const salts = 10;
  const hash = await bcrypt.hash(password, salts);
  await userModel.create({email, hash })
}

export function findAndLoadPage(req: Request, res: Response, action: string) {

  let page = req.params.page;
  const filePath = path.join(__dirname, `../views/adm/pages/${page}/${action}.ejs`);
  //console.log(filePath);

  fs.access(filePath, fs.constants.F_OK, async (err) => {
    if(err){
      console.log(action);
      res.redirect("/adm/pages");
    }else{
      let cssExists = await checkCssExistence(req.params.page, action);
      if(action=="new"){
        let items = await handleNew(req.params.page);
        if(items){
          res.render("adm/main", { see: req.params.page, action: action, items, cssExists});
        }else{
          res.render("adm/main", { see: req.params.page, action: action, cssExists});
        }
      } else if(action=="list"){
        let items = await handleList(req.params.page);
        res.render("adm/main", { see: req.params.page, action: action, items, cssExists});
      } else if (action == "edit"){
        let item = await handleEdit(req.params.page, req.params.id);
        res.render("adm/main", { see: req.params.page, action: action, item, cssExists});
      } else if(action == "single"){
        let item = await handleSingle(req.params.page);
        res.render("adm/main", { see: req.params.page, action: action, item, cssExists});
      }else{
        res.render("adm/main", { see: req.params.page, action: action, cssExists});
      }

    }
  })

}

async function handleNew(page: string){
  if(page == "project"){
    return await categoryModel.find({});
  }
}

async function handleList(page: string){
  if(page == "technology"){
    return await technologyModel.find({});
  }
  else if (page == "category") {
    return await categoryModel.find({});
  }
  else if (page == "project") {
    return await projectModel.find({});
  }
}

async function handleEdit(page:string, id: string){
  if(page == "technology"){
    return await technologyModel.findById(id);
  }
  else if (page == "category") {
    return await categoryModel.findById(id);
  }
  else if (page == "project") {
    let project = await projectModel.findById(id);
    let registered_categories = await categoryModel.find({});
    return {project, registered_categories};
  }
}

async function handleSingle(page: string) {
  if(page == "cv"){
    return await cvModel.findOne({});
  }else if (page=="socials"){
    return await socialsModel.findOne({});
  }
}

async function checkCssExistence(page:string, action: string){
  const filePath = path.join(__dirname, `../public/stylesheets/adm/pages/${page}/${action}.css`);
  let cssExists = false;
  try{
    await fs.promises.access(filePath);
    cssExists = true;
  }catch{}

  return cssExists;
}

