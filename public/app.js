let count = 0;

const cat = document.querySelector('img');
const meow = document.querySelector('audio');
const counter = document.querySelector(".counter");
cat.onclick = () => {
  meow.play()
  count += 1;
  counter.innerHTML = "Clicks: " + count;
};
