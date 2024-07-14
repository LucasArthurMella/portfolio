import express from "express"; 
import backendRoutes from "./routes/back";
import frontendRoutes from "./routes/front";
import mongoose from "mongoose";
import { getEnv } from "./constants/envs";
import path from "path";
import cors from 'cors';


class App {
  app: express.Application;

  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
    //this.database();
  }
  
  middlewares(){
    //this.app.use(cors());
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "views"));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(express.static(path.join(__dirname, '../dist/public/javascripts')));
    //this.app.use(express.json);
  }

  routes(){
    this.app.use("/api", backendRoutes);
    this.app.use("/", frontendRoutes);
  }

  async database(){
    try {
      mongoose.set("strictQuery", true);
      await mongoose.connect(getEnv().mongoUri);
      console.log("Connect database success");
    } catch (err) {
      console.error("Connect database fail, error: ", err);
    } 
  }

}

export default new App().app;
