import { checkIfAuthorized } from "../auth" 


export function admPages(){
  checkIfAuthorized();
  
  let sidebarClickabeGroupButtons = document.querySelectorAll(".side-bar-clickable-group-button")

  sidebarClickabeGroupButtons.forEach( item => {

    item.addEventListener("click", e => {
      e.preventDefault();
      let sibling = item.parentElement!.nextElementSibling;
      if (sibling && sibling.classList.contains("children-group-inactive")) {
        sibling.classList.remove("children-group-inactive");
        sibling.classList.add(("children-group-active"));
      }else if(sibling && sibling.classList.contains("children-group-active")){
        sibling.classList.remove("children-group-active");
        sibling.classList.add(("children-group-inactive"));
      }
    })
  });

  let forms = document.querySelectorAll("form");

  const localStorageValue = localStorage.getItem('token')!;
  for(let form of forms){
    //const hiddenInput = document.createElement('input');
    //hiddenInput.type = 'hidden';
    //hiddenInput.name="token"
    //hiddenInput.value = localStorageValue;
    //form.appendChild(hiddenInput);
    const actionUrl = new URL(form.action);
    actionUrl.searchParams.append("token", localStorageValue);
    form.action = actionUrl.href
  }


  
}

admPages();

