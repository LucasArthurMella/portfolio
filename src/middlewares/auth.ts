import { getEnv } from "../constants/envs";
import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";


export function authenticateJwt(req: Request, res: Response, next:NextFunction){
  const authHeader = req.headers['authorization']
  const headerToken = authHeader && authHeader.split(' ')[1]
  const inputToken = req.query.token as string;
  jwt.verify(inputToken, getEnv().jwtSecret, (err: any, _ok: any) => {
    if (err)  {
      if (headerToken != null){ 
        jwt.verify(headerToken, getEnv().jwtSecret, (err: any, _ok: any) => {
          if(err){
            res.redirect("/adm");
            //res.json({message: "Not Authenticated"});
          } else {
            next();
          }
        })
        }else{
          res.redirect("/adm");
          //res.json({message: "Not Authenticated"});
        }
      } else {
        next();
      }
    })
  }
