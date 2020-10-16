const backdrop = document.querySelector(".backdrop");
const sideDrawer = document.querySelector(".nav__menu");
const menuToggle = document.querySelector("#nav-toggle");

function backdropClickHandler() {
  backdrop.style.display = "none";
  sideDrawer.classList.remove("open");
}

function menuToggleClickHandler() {
  sideDrawer.classList.toggle("open");
  if ((backdrop.style.display === "none" || backdrop.style.display === "")) {
    backdrop.style.display = "block";
  } else {
    backdrop.style.display = "none";
  }
}

backdrop.addEventListener("click", backdropClickHandler);
menuToggle.addEventListener("click", menuToggleClickHandler);
