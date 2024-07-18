import { userModel } from "../models/user";
import * as bcrypt from 'bcrypt';
import { Either, left, right } from 'fp-ts/Either';
import jwt from "jsonwebtoken";
import { getEnv } from "../constants/envs";

let envVars = getEnv();
console.log("env é:" + envVars);

export async function login(email: string, password: string): Promise<Either<string, string>> {
  let login = await userModel.findOne({email})!;

  const salts = 10;
  const hash = await bcrypt.hash(password, salts);

  if(hash == login?.hash) {
    const token = jwt.sign({email: login.email}, envVars.jwtSecret, {expiresIn: "1h"});
    return right(token);
  }else{
    return left("Incorrect email or password!");
  }


}

export async function createUser(email: string, password: string){
  const salts = 10;
  const hash = await bcrypt.hash(password, salts);
  await userModel.create({email, hash })
}

