const cats = document.getElementsByTagName('img');
const meow = document.querySelector('audio');
const muteButton = document.querySelector('.muteButton');

let count = 0;
let width = window.innerWidth;
let height = window.innerHeight;
let factor;
let responsiveSize;

// set initial volume
meow.volume = 0.2;

// changes the size factor of the cat depending on the screen size
function dietPlan() {
	if (width <= 750) {
		factor = .3;
	} else {
		factor = .2;
	}
	responsiveSize = width * factor;
	for(const cat of cats) {
		cat.style.width = `${responsiveSize}px`;
		cat.style.height = `${responsiveSize}px`;
	}
};

// moves cat around to a random part of the screen
function catJump(cat) {
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
for(const cat of cats) {
	catJump(cat);
}

// adds to counter and randomly moves cat upon click
const counter = document.querySelector(".counter");
for(const cat of cats) {
	cat.onclick = () => {
	  meow.play();
	  count += 1;
		counter.innerHTML = "Clicks: " + count;
		catJump(cat);
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
	for(const cat of cats) {
		catJump(cat);
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

//mute button functionality
muteButton.onclick = () => {
	if(!muteButton.hasAttribute("id", "muted")){
		meow.volume = 0;
		muteButton.setAttribute("id", "muted");
	}else{
		meow.volume = 0.2;
		muteButton.removeAttribute("id", "muted");
	}
};

