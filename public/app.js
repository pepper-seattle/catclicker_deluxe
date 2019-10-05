const cats = document.getElementsByTagName('img');
const meow = document.querySelector('audio');

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
	for(let i = 0, len = cats.length; i < len; i++) {
		cats[i].style.width = `${responsiveSize}px`;
		cats[i].style.height = `${responsiveSize}px`;
	}
};

// moves cat around to a random part of the screen
function catJump(catIndex) {
	let randomWidth = Math.floor((Math.random() * (width - responsiveSize)) + 1);
	let randomHeight = Math.floor((Math.random() * (height - responsiveSize)) + 1);
	let header = document.querySelector("header");
	let headerHeight = header.offsetHeight;
	if (randomHeight <= headerHeight) {
		randomHeight += headerHeight;
	};
	cats[catIndex].style.left = `${randomWidth}px`;
	cats[catIndex].style.top = `${randomHeight}px`;
};

// sets initial size and position of cat
dietPlan();
for(let i = 0, len = cats.length; i < len; i++) {
	catJump(i);
}

// adds to counter and randomly moves cat upon click
const counter = document.querySelector(".counter");
	for(let i = 0, len = cats.length; i < len; i++) {
		cats[i].onclick = () => {
		  meow.play();
		  count += 1;
			counter.innerHTML = "Clicks: " + count;
			catJump(i);
		};
	}

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
	for(let i = 0, len = cats.length; i < len; i++) {
		catJump(i);
	}
});

//fetch API for cat's fact upon button click
document.getElementById('catButton').onclick = () => {
var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://catfact.ninja/fact?max_length=200'
fetch(proxyUrl + targetUrl)
  .then(response => response.json())
  .then(data => {
    document.getElementById('catFact').innerHTML = data.fact;
    return data;
  })
  .catch(e => {
    console.log(e);
    return e;
  });
};