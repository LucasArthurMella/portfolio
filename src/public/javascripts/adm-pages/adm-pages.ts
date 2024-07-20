import { checkIfAuthorized } from "../auth" 


export function admPages(){
  checkIfAuthorized();

}

admPages();

