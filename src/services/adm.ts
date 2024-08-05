import { userModel } from "../models/user";
import * as bcrypt from 'bcrypt';
import { ok, err, Result } from 'neverthrow'
import jwt from "jsonwebtoken";
import { getEnv } from "../constants/envs";
import { query, Request, Response } from "express";
import path from "path";
import fs from "fs";
import { technologyModel } from "../models/technology";
import { cvModel } from "../models/cv";
import { socialsModel } from "../models/socials";
import { categoryModel } from "../models/category";
import { projectModel } from "../models/project";
import { mainProjectModel } from "../models/main-project";
import mongoose, { Schema } from "mongoose";

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
  else if (page == "main-project"){
    return await projectModel.find({});
  }
}

async function handleList(page: string){
  if(page == "technology"){
    return await technologyModel.find({});
  }
  else if (page == "main-project"){
    return await mainProjectModel.find({}).populate("project");
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
  else if (page == "main-project") {
    let projects = await projectModel.find();
    let main_project = await mainProjectModel.findById(id);

    return {projects, main_project}
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

type projectSearch = {
  project_name: string | undefined, 
  categories: mongoose.Types.ObjectId[] | undefined,
  lang: string
}

export async function getProjects(queryParams: projectSearch){
  try{ 
  let searchOptions = {};
  if(queryParams.categories){
  searchOptions = {
      categories: {
        $all: queryParams.categories
      }
    }
  }

  let projects = await projectModel.find(searchOptions);
      if (queryParams.project_name) {
        const regexPattern = new RegExp(
          queryParams.project_name
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            .normalize('NFD') //desconsidera acentos
            .replace(/[\u0300-\u036f]/g, ''), //desconsidera acentos
          'ui'
        );

        if(queryParams.lang == "pt-BR"){
        projects = projects.filter((project) =>
          regexPattern.test(
            project.name["pt-BR"].normalize('NFD') //desconsidera acentos
              .replace(/[\u0300-\u036f]/g, '') //desconsidera acentos
          )
        );
        }else {

        projects = projects.filter((project) =>
          regexPattern.test(
            project.name["en-US"].normalize('NFD') //desconsidera acentos
              .replace(/[\u0300-\u036f]/g, '') //desconsidera acentos
          )
        );
        }

      }
  return projects; 
  }catch(e){
    return null;
  }
}

export async function findProject(id: string){
  try{
    let project = await projectModel.findById(id);
    return project;
  }catch(e){
    return null;
  }
  
}

export async function getMainProjects(){
  try{
    let mainProjects = await mainProjectModel.find({}).populate("project");
    return mainProjects;
  }catch(e){
    return null;
  }
}

export async function getCategories(){
  try{
    let categories = await categoryModel.find({}).sort("name");
    return categories;
  }catch(e){
    return null;
  }
}






