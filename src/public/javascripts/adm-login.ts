

export function admLogin() {
let form = document.querySelector(".form-box")!;

form.addEventListener("submit", async e => {
  e.preventDefault();
  let token: {error: string;} | {value: string;} = await getToken(e);
  console.log(token);
  if("error" in token){
    alert("Login ou senha incorreta");
  }else {
    localStorage.setItem("token", token.value);
    window.location.href = window.location.origin + "/adm/pages"
  }
})

}

async function getToken(e: Event) {
  
  let formValue = new FormData(e.target as HTMLFormElement);
  let formObject: any = {};

  formValue.forEach((value, key) => {
    formObject[key] = value;
  });

  let value =  await fetch(window.location.origin + "/api/confirm-login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      },
    body: JSON.stringify(formObject)
  });

  return await value.json();

}



admLogin();

