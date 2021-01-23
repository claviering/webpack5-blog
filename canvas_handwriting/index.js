import "./index.less"

(function () {
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
  //画板初始化
  function initCanvas() {
    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight - 400;
    //设置线宽
    ctx.lineWidth = '2';
    //线条颜色
    ctx.strokeStyle = 'black';
  }

  let resetDom = document.getElementById("reset")
  resetDom.onclick = function () {
    initCanvas();
  }
  let submitDom = document.getElementById("submit")
  submitDom.onclick = function () {
    predict(canvas)
  }
})()

async function predict(canvasElement) {
  const example = await tf.browser.fromPixels(canvasElement, 1)
  .resizeNearestNeighbor([28, 28])
  .toFloat()
  .div(255.0)
  .reshape([1, 28, 28, 1]);
  console.log('example', example);
  console.log('example.shape', example.shape);
  const prediction = await window.model.predict(example).data();
  var results = Array.from(prediction);
  console.log('results', results);
  let index = results.indexOf(Math.max(...results));
  console.log('index', index, Math.max(...results));
}

async function initModel() {
  console.log('loading model...');
  window.model = await tf.loadLayersModel('http://localhost:9030/dist/model.json');
  console.log('load model');
  
}
initModel()