var vueTouchEvents = {
  install: function (Vue, constructorOptions) {
    function touchStartEvent(e) {
      var {x0, y0, hasmoved, lock} = this.$touchObj;
      var touch = e.targetTouches[0], x = touch.pageX, y = touch.pageY;
      x0 = x, y0 = y, hasmoved = 0, lock = 0;
      this.$touchObj.x0 = x0;
      this.$touchObj.y0 = y0;
      this.$touchObj.hasmoved = hasmoved;
      this.$touchObj.lock = lock;
    }
    function touchMoveEvent(e) {
      var {x0, y0, hasmoved, lock, value} = this.$touchObj;
      if (lock) return;
      var touch = e.targetTouches[0], x = touch.pageX, y = touch.pageY, offsetX = x0 - x, offsetY = y0 - y;
      // 阻止滚动
      hasmoved || (hasmoved = 1, Math.abs(offsetX) > Math.abs(offsetY) && e.preventDefault());
      let direction = '';
      if (offsetX <= -50) {
        // 向右
        direction = 'right';
        lock = 1;
        this.$touchObj.lock = lock;
      } else if (offsetX >= 50) {
        // 向左
        direction = 'left';
        lock = 1;
        this.$touchObj.lock = lock;
      } else {
        return;
      }
      if (typeof value === 'function') {
        value(direction, e);
      }
    }
    Vue.directive('touch', {
      bind: function (el, binding) {
        el.$touchObj = {
          x0: 0,
          y0: 0,
          hasmoved: 0,
          lock: 0,
          value: binding.value
        };
        el.addEventListener('touchstart', touchStartEvent);
        el.addEventListener('touchmove', touchMoveEvent);
      },
      unbind: function (el) {
        el.removeEventListener('touchstart', touchStartEvent);
        el.removeEventListener('touchmove', touchMoveEvent);
      }
    })
  }
}
/*
 * Exports
 */
if (typeof module === 'object') {
  module.exports = vueTouchEvents;
} else if (typeof define === 'function' && define.amd) {
  define([], function () {
    return vueTouchEvents;
  });
} else if (window.Vue) {
  window.vueTouchEvents = vueTouchEvents;
  Vue.use(vueTouchEvents);
}