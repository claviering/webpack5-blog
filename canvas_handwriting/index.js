import "./index.less"

(function () {
  let init = true;
  let loading = false;
  let resultElement = document.getElementById("result")
  //获得画布元素
  var canvas = document.getElementById("canvas");
  //获得二维绘图对象
  var ctx = canvas.getContext("2d");
  initCanvas();
  //每次绘画重新开始
  canvas.onmousedown = function (e) {
    var e = e || window.event;
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    document.onmousemove = function (e) {
      var e = e || window.event;
      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.stroke();
    };
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
  canvas.ontouchstart = function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
    var e = e && e.touches[0];
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    document.ontouchmove = function (e) {
      var e = e && e.touches[0];
      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.stroke();
    };
    document.ontouchend = function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
      document.touchmove = null;
      document.touchend = null;
    };
  };
  //画板初始化
  function initCanvas() {
    canvas.width = 300;
    canvas.height = 300;
    canvas.style.backgroundColor = 'black';
    //设置线宽
    ctx.lineWidth = '10';
    //线条颜色
    ctx.strokeStyle = 'white';
    ctx.lineJoin = 'round';
  }

  let resetDom = document.getElementById("reset")
  resetDom.onclick = function () {
    initCanvas();
  }
  let submitDom = document.getElementById("submit")
  submitDom.onclick = function () {
    if (init || loading) return;
    predict()
  }
  async function predict() {
    loading = true;
    const example = await tf.browser.fromPixels(canvas, 1)
    .resizeNearestNeighbor([28, 28])
    .toFloat()
    .div(255.0)
    .reshape([1, 28, 28, 1]);
    const prediction = await window.model.predict(example).data();
    var results = Array.from(prediction);
    loading = false;
    format(results)
  }

  function format(results) {
    let list = results.map((item, index) => ({
      index: index,
      cred: (item * 100).toFixed(2)
    }))
    list = list.sort((a,b) => (a.cred < b.cred) ? 1 : ((b.cred < a.cred) ? -1 : 0))
    let bodyDom = document.querySelectorAll('.result')
    list.forEach((item, index) => {
      bodyDom[index].innerHTML = `识别结果: ${item.index} 可信度: ${item.cred}%`;
    })

  }
  
  async function initModel() {
    document.getElementById("submit").innerText = "模型初始化中..."
    window.model = await tf.loadLayersModel(window.location.href + 'dist/model.json');
    init = false;
    document.getElementById("submit").innerText = "识别"
  }
  initModel()
})()
