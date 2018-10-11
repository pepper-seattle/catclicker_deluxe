const cat = document.querySelector('img');
const meow = document.querySelector('audio');

let count = 0;
let width = window.innerWidth;
let height = window.innerHeight;
let factor;
let responsiveSize;
let kittyPool = [];
let kittyPoolLimit = 10;

/**
 * Preloads some cat images to be used within the game
 */
(function preloadCats() {
  kittyPool.push((new Image().src = 'cat.png'));

  function getRandomSize() {
    let minSize = 200;
    let maxSize = 600;

    return [
      minSize + Math.floor(Math.random() * (maxSize - minSize)),
      minSize + Math.floor(Math.random() * (maxSize - minSize))
    ];
  }

  while (kittyPool.length < kittyPoolLimit) {
    let size = getRandomSize();
    kittyPool.push(
      (new Image().src = `https://placekitten.com/${size[0]}/${size[1]}`)
    );
  }
})();

/**
 * Gets a random cat image from the pool
 */
function getCatImage() {
  return kittyPool[Math.floor(Math.random() * kittyPoolLimit)];
}

// changes the size factor of the cat depending on the screen size
function dietPlan() {
  if (width <= 750) {
    factor = 0.3;
  } else {
    factor = 0.2;
  }
  responsiveSize = width * factor;
  cat.style.width = `${responsiveSize}px`;
  cat.style.height = `${responsiveSize}px`;
}

// moves cat around to a random part of the screen
function catJump() {
  let randomWidth = Math.floor(Math.random() * (width - responsiveSize) + 1);
  let randomHeight = Math.floor(Math.random() * (height - responsiveSize) + 1);
  let header = document.querySelector('header');
  let headerHeight = header.offsetHeight;
  if (randomHeight <= headerHeight) {
    randomHeight += headerHeight;
  }
  cat.style.left = `${randomWidth}px`;
  cat.style.top = `${randomHeight}px`;
}

// sets initial size and position of cat
dietPlan();
catJump();

// adds to counter and randomly moves cat upon click
const counter = document.querySelector('.counter');
cat.onclick = () => {
  meow.play();
  count += 1;
  counter.innerHTML = 'Clicks: ' + count;
  cat.src = getCatImage();
  catJump();
};

// resets counter upon click
counter.onclick = () => {
  count = 0;
  counter.innerHTML = 'Clicks: ' + count;
};

// resizes and moves cat upon window resize
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  dietPlan();
  catJump();
});

//fetch API for cat's fact upon button click
document.getElementById('catButton').onclick = () => {
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://catfact.ninja/fact?max_length=200';

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
