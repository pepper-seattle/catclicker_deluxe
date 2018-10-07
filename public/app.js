let count = 0;

const cat = document.querySelector('img');
const counter = document.querySelector(".counter");
cat.onclick = () => {
  count += 1;
  counter.innerHTML = "Clicks: " + count;
};