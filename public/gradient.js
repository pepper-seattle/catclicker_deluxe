(function(global) {
  function* createGradient(
    numberOfColors = 50,
    frequency = .1,
    phase = 2,
    width = 55,
    center = 200,
  ) {
    const appendValueAsHexToString = (string, value) => string + value.toString(16);
    const range = (count, start = 1) => [...Array(count).keys()].map(x => x + start);
    const gradient = range(numberOfColors).map((index) => {
      const toChannelValue = channelIndex => Math.round(Math.sin(frequency * index + phase * channelIndex) * width + center); 
      const hexString = range(3).map(toChannelValue).reduce(appendValueAsHexToString, '#');
      return hexString;
      }
    );

    const length = gradient.length;

    let i = 0;
    let j = 1;
    while (i <= length) {
      i += j;
      yield gradient[i];
      if (i % length === 0) j *= -1;
    }
  }
  
  const gradient = createGradient();
  const paw = document.querySelector('.paw');
  
  requestAnimationFrame(function render() {
    const color = gradient.next().value;
    document.body.style.background = color;
    paw.style.fill = color;
    requestAnimationFrame(render);
  });
})(window || {});