let count = 0;

const cat = document.querySelector('img');
const growl = document.querySelector('audio');
const counter = document.querySelector(".counter");
cat.onclick = () => {
  count += 1;
  growl.play();
  counter.innerHTML = "Clicks: " + count;
};
