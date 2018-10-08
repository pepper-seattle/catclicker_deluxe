const cat = document.querySelector('img');
let count = 0;
let width = window.innerWidth;
let height = window.innerHeight;
let factor;
let responsiveSize;

// changes the size factor of the cat depending on the screen size
function dietPlan() {
	if (width <= 750) {
		factor = .3;
	} else {
		factor = .2;
	}
	responsiveSize = width * factor;
	cat.style.width = `${responsiveSize}px`;
	cat.style.height = `${responsiveSize}px`;
};

// moves cat around to a random part of the screen
function catJump() {
	let randomWidth = Math.floor((Math.random() * (width - responsiveSize)) + 1);
	let randomHeight = Math.floor((Math.random() * (height - responsiveSize)) + 1);
	let header = document.querySelector("header");
	let headerHeight = header.offsetHeight;
	if (randomHeight <= headerHeight) {
		randomHeight += headerHeight;
	};
	cat.style.left = `${randomWidth}px`;
	cat.style.top = `${randomHeight}px`;
};

// sets initial size and position of cat
dietPlan();
catJump();

// adds to counter and randomly moves cat upon click
const counter = document.querySelector(".counter");
cat.onclick = () => {
  count += 1;
  counter.innerHTML = "Clicks: " + count;
	catJump();
};

// resets counter upon click
counter.onclick = () => {
	count = 0;
  counter.innerHTML = "Clicks: " + count;
};

// resizes and moves cat upon window resize
window.addEventListener("resize", () => {
	width = window.innerWidth;
	height = window.innerHeight;
	dietPlan();
	catJump();
});
