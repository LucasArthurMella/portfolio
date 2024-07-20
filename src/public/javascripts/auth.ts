

export async function checkIfAuthorized(){
  const token = localStorage.getItem('token');

  let result = await fetch(window.location.origin + "/api/check-token", {
      headers: {
      'Authorization': `Bearer ${token}`
      }
    }
  )

  let value = await result.json();
  if(!value.authenticated){
    window.location.href= window.location.origin + "/adm";
  }

}
