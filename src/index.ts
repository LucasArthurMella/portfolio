import { getEnv } from "./constants/envs";
import server from "./server";

function main(){

  let env = getEnv();

  try {
    server.listen(env.server.port, () => {
      console.log("Connection to express server sucessfull!");
      console.log("Running on: ",env.server.host,":",env.server.port);
      console.log("Mongo Uri: ", env.mongoUri);
    })
  }catch(e){
      console.log("Connection to express server failed!");
      console.log(e);
  }
}

main();
