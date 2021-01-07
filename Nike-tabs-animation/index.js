import './index.less';

let delayStart = 0.1;
let delayStep = 0.05;

const itemsLen = [17, 11, 5]

for (let item = 1; item <= 3; item++) {
  console.log('item', item);
  let items = document.querySelector(`.items-${item}`)
  let itemsinnerHTML = '';
  let delay = delayStart;
  for (let index = 0; index < itemsLen[item - 1]; index++) {
    if (index && index%2 === 0) {
      delay = Number.parseFloat(delay)
      delay = delay + delayStep
    }
    delay = Number.parseFloat(delay).toFixed(2);
    let content = Math.random().toFixed(2);
    itemsinnerHTML += `<div class="item" style="transition-delay: ${delay}s">${content}</div>`;
  }
  items.innerHTML = itemsinnerHTML;
  
}
