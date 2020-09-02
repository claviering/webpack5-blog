import debounce from './debounce';

function boundingClientRect(config) {
  let imageContentId = config.imageContentId;
  //判断一个元素是不是出现在窗口(视野)
  function isShow(dom) {
    const domObj = dom.getBoundingClientRect();
    let clientHeight = document.documentElement.clientHeight;
    // 可视范围才显示
    let isShow = 0 <= domObj.bottom && domObj.top <= clientHeight;
    return isShow;
  }
  //加载图片
  function loadImg(dom) {
    dom.src = dom.getAttribute('data-src');
    dom.setAttribute('data-isLoaded', 1);
  }
  function init() {
    let imgList = document.querySelectorAll(`#${imageContentId} img:not([data-isLoaded])`);
    imgList.forEach(image => {
      if (isShow(image)) {
        loadImg(image);
      }
    })
  }
  init();
  window.addEventListener('scroll', debounce(init));
}

export default boundingClientRect;