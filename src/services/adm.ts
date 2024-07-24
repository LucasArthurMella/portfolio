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

      if(action=="list"){
        let items = await selectModelGetItems(req.params.page);
        res.render("adm/main", { see: req.params.page, action: action, items});
      } else if (action == "edit"){
        let item = await selectModelFindItemById(req.params.page, req.params.id);
        res.render("adm/main", { see: req.params.page, action: action, item});
      } else if(action == "single"){
        let item = await selectModelSingle(req.params.page);
        res.render("adm/main", { see: req.params.page, action: action, item});
      }else{
        res.render("adm/main", { see: req.params.page, action: action});
      }

    }
  })

}

async function selectModelGetItems(page: string){
  if(page == "technology"){
    return await technologyModel.find({});
  }
}

async function selectModelFindItemById(page:string, id: string){
  if(page == "technology"){
    return await technologyModel.findById(id);
  }
}

async function selectModelSingle(page: string) {
  if(page == "cv"){
    return await cvModel.findOne({});
  }else if (page=="socials"){
    return await socialsModel.findOne({});
  }
}



