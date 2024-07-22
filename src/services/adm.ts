import { userModel } from "../models/user";
import * as bcrypt from 'bcrypt';
import { ok, err, Result } from 'neverthrow'
import jwt from "jsonwebtoken";
import { getEnv } from "../constants/envs";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";

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
  const filePath = path.join(__dirname, `../views/adm/pages/${page}/list.ejs`);
  //console.log(filePath);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if(err){
      res.redirect("/adm/pages");
    }else{
      res.render("adm/main", { see: req.params.page, action: action});
    }
  })

}

