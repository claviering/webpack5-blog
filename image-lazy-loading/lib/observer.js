function observer(config) {
  let imageContentId = config.imageContentId;

  function init() {
    let imgList = document.querySelectorAll(`#${imageContentId} .data-img:not([data-loaded])`);
    let observer = new IntersectionObserver(entries => {
      entries.forEach(item => {
        if (item.isIntersecting) {
          item.target.src = item.target.dataset.src; // 开始加载图片
          observer.unobserve(item.target); // 停止监听已开始加载的图片
        }
      });
    });
    imgList.forEach(item => {
      item.onload = function () {
        item.dataset.loaded = 1;
      }
      observer.observe(item)
    });
  }
  init();
}

export default observer;