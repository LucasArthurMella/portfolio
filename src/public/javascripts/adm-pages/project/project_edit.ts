
let deletePictureButtons = document.querySelectorAll<HTMLAnchorElement>(".project-picture-anchor");

for(let item of deletePictureButtons){

  const token = localStorage.getItem('token')!;
  item.addEventListener("click", async e => {
    e.preventDefault();
    await fetch(item.href, {
      method:"DELETE",
      headers:{
      'Authorization': `Bearer ${token}`
      }
    })
    location.reload();
  })

}


