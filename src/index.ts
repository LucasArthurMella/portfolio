import server from "./server";

function main(){
  try {
    server.listen(3000, () => {
      console.log("Connection to express server sucessfull!");
    })
  }catch(e){
      console.log("Connection to express server failed!");
      console.log(e);
  }
}

main();
