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

const sizes = document.querySelectorAll('.size__tallas');
const colors = document.querySelectorAll('.sneaker__color');
const sneaker = document.querySelectorAll('.sneaker__img');

function changeSize(){
    sizes.forEach(size => size.classList.remove('active'));
    this.classList.add('active');
}

function changeColor(){
    let primary = this.getAttribute('primary');
    console.log(primary)
    let color = this.getAttribute('color');
    let sneakerColor = document.querySelector(`.sneaker__img[color="${color}"]`);

    colors.forEach(c => c.classList.remove('active__bg'));
    this.classList.add('active__bg');

    document.documentElement.style.setProperty('--primary', primary);

    sneaker.forEach(s => s.classList.remove('shows'));
    sneakerColor.classList.add('shows')
}

sizes.forEach(size => size.addEventListener('click', changeSize));
colors.forEach(c => c.addEventListener('click', changeColor));