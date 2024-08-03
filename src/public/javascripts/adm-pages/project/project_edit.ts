
let deletePictureButtons = document.querySelectorAll<HTMLAnchorElement>(".project-picture-anchor");

for(let item of deletePictureButtons){

  item.addEventListener("click", async e => {
    e.preventDefault();
    await fetch(item.href, {
      method:"DELETE"
    })
    location.reload();
  })

}


