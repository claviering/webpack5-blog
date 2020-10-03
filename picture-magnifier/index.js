import './index.less';

class pictureMagnifier {
  constructor() {
    this.scale = 10 // 放大倍数
    this.timer = 200 // 鼠标移动延迟, 防止卡顿
  }
  init() {
    const minImgDom = document.querySelector(".min > img");
    const minImgModalDom = document.querySelector(".min .modal");
    const maxImgDom = document.querySelector(".max");
    const _this = this;
    minImgDom.onmousemove = function (event) {
      clearTimeout(_this.timer);
      _this.timer = setTimeout(()=> {
        // 获取小图的高度宽度
        let offsetHeight = minImgDom.offsetHeight;
        let offsetWidth = minImgDom.offsetWidth;
        // 获取小图浮动窗口的高度宽度
        let mHHalf = minImgModalDom.offsetHeight / 2;
        let mWHalf = minImgModalDom.offsetWidth / 2;
        // 获取大图高度宽度
        let maxHHalf = maxImgDom.offsetHeight / 2;
        let maxWHalf = maxImgDom.offsetWidth / 2;
        let eY = event.offsetY;
        let eX = event.offsetX;
        // 移动大图
        maxImgDom.scrollTo(eX * _this.scale - maxWHalf, eY * _this.scale - maxHHalf)
        // 移动小图浮动窗口的高度宽度
        let mT = eY > mHHalf ? eY - mHHalf : 0; // 上边界处理
        let mL = eX > mWHalf ? eX - mWHalf : 0; // 左边界处理
        mL = (eX > offsetWidth - mWHalf) ? (offsetWidth - mWHalf * 2) : mL; // 右边界处理
        mT = (eY > offsetHeight - mHHalf) ? (offsetHeight - mHHalf * 2) : mT; // 下边界处理
        minImgModalDom.style.cssText = `top:${mT}px;left:${mL}px`
      })
    }
  }
}

let app = new pictureMagnifier();
app.init();