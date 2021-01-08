import debounce from './debounce';

function offsetLazyLoading(config) {
  let imageContentId = config.imageContentId;
  //判断一个元素是不是出现在窗口(视野)
  function isShow(dom) {
    let clientHeight = document.documentElement.clientHeight;
    let scrollTop = document.documentElement.scrollTop;
    // 可视范围才显示
    let isShow = (scrollTop <= dom.offsetHeight + dom.offsetTop) && (dom.offsetTop <= clientHeight + scrollTop);
    return isShow;
  }
  //加载图片
  function loadImg(dom) {
    let imgdom = dom.querySelector('.data-img');
    imgdom.src = imgdom.getAttribute('data-src');
    imgdom.onload = function () {
      imgdom.setAttribute('data-loaded', 1);
      dom.setAttribute('data-loaded', 1);
    }
  }
  function init() {
    let imgList = document.querySelectorAll(`#${imageContentId} .img-box:not([data-loaded])`);
    imgList.forEach(image => {
      if (isShow(image)) {
        loadImg(image);
      }
    })
  }
  init();
  window.addEventListener('scroll', debounce(init));
}

export default offsetLazyLoading;