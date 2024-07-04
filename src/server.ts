import express from "express"; 
import backendRoutes from "./routes/back";
import frontendRoutes from "./routes/front";

class App {
  app: express.Application;

  constructor(){
    this.app = express();
    //this.middlewares();
    this.routes();
    //this.database();
  }
  
  middlewares(){
    this.app.use(express.json);
  }

  routes(){
    this.app.use("/api", backendRoutes);
    this.app.use("/", frontendRoutes);
  }

  async database(){
    
  }

}

export default new App().app;
