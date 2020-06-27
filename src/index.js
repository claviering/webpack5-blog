const flipNumber = require('flip-number-9-squares');
import "flip-number-9-squares/index.css";
const config = {
  app: 'app', // 容器 id
  play: 'play', // 按钮 id
  time: 1, // 动画时间 单位 s
  timingFunction: 'linear', // transition-timing-function: 动画速度函数
};
flipNumber.flip(config);