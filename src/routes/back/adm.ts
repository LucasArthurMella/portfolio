import { Router } from "express";
import { login } from "../../services/adm";
import jwt from "jsonwebtoken";
import { getEnv } from "../../constants/envs";

const admRoutes = Router();

admRoutes.post("/confirm-login", async (req,res) => {
  console.log(req.body);

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

  console.log(token);

  jwt.verify(token, getEnv().jwtSecret, (err: any, _ok: any) => {
    if (err)  {
      res.json({authenticated: false});
    } else {
      res.json({authenticated: true});
    }
  })
});



export default admRoutes;
