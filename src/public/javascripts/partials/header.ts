document.addEventListener('DOMContentLoaded', function() {

    const burger = document.querySelector('#main-burguer')!;
    const dashboard = document.querySelector('.main-nav-box2-flex')!;

    burger.addEventListener('click', function() {
        dashboard.classList.toggle('main-nav-open');
    });

    const anchorsDiv = document.querySelector(".main-nav-box2")!;
    const anchors = anchorsDiv.querySelectorAll("*");

    for(let anchor of anchors){
      console.log(anchor);
      anchor.addEventListener("click", () => {
        let burguerContainer = document.querySelector(".main-nav-box2-flex")!;
        if (burguerContainer.classList.contains("main-nav-open")) {
          burguerContainer.classList.toggle("main-nav-open");
        }
      });
    }
});

let dropdowns = document.querySelectorAll(".dropdown");

for (let dropdown of dropdowns) {
  let dropdownContent = dropdown.querySelector(".dropdown-content")!;
  dropdown.addEventListener("click", () => {
    dropdownContent.classList.toggle("show-dropdown");
  });
}
