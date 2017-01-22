/**
 * @denghao.me
 * 2017-01-22
 * v1.1
 */
;
(function(window, undefined) {
  function mSlider(options) {
    this.opts = {
      'direction': options.direction || 'left', //弹层方向:left|right|top|bottom
      'distance': options.distance || '60%', //弹层宽度:%|auto
      'dom': this.Q(options.dom), //容器dom
      'time': options.time || "" //自动关闭时间，单位毫秒
    };
    this.rnd = parseInt(Math.random() * 1000);
    this.box = this.opts.dom[0];
    this.mask = '';
    this.init();
  }

  mSlider.prototype = {
    Q: function(dom) {
      return document.querySelectorAll(dom);
    },
    addEvent: function(obj, ev, fn) {
      if (obj.attachEvent) {
        obj.attachEvent("on" + ev, fn);
      } else {
        obj.addEventListener(ev, fn, false);
      }
    },

    /*
     * 初始化
     */
    init: function() {
      var self = this;
      // 条件判断
      if (!self.box) {
        alert('未正确绑定弹窗容器');
        return;
      }
      // 生成遮罩
      var m = document.createElement('div');
      m.setAttribute('class', 'mSlider-mask' + self.rnd);
      self.Q('body')[0].appendChild(m);
      self.mask = this.Q('.mSlider-mask' + self.rnd)[0];
      //弹层方向
      switch (self.opts.direction) {
        case 'top':
          self.top = '0';
          self.left = '0';
          self.width = '100%';
          self.height = self.opts.distance;
          self.translate = '0,-100%,0';
          break;
        case 'bottom':
          self.top = self.minusPer('100%', self.opts.distance);
          self.left = '0';
          self.width = '100%';
          self.height = self.opts.distance;
          self.translate = '0,100%,0';
          break;
        case 'right':
          self.top = '0';
          self.left = self.minusPer('100%', self.opts.distance);
          self.width = self.opts.distance;
          self.height = document.documentElement.clientHeight + 'px';
          self.translate = '100%,0,0';
          break;
        default:
          self.top = '0';
          self.left = '0';
          self.width = self.opts.distance;
          self.height = document.documentElement.clientHeight + 'px';
          self.translate = '-100%,0,0';
      }

      //容器样式
      self.box.style.position = 'fixed';
      self.box.style.top = self.top;
      self.box.style.left = self.left;
      self.box.style.width = self.width;
      self.box.style.height = self.height;
      self.box.style.zIndex = 99;
      self.box.style.overflowY = 'auto';
      self.box.style.backgroundColor = "white";
      self.box.style.webkitTransition = "all .3s ease-out";
      self.box.style.transition = "all .3s ease-out";
      self.box.style.webkitTransform = 'translate3d(' + self.translate + ')';
      self.box.style.transform = 'translate3d(' + self.translate + ')';

      //遮罩处理
      self.mask.style.position = 'fixed';
      self.mask.style.top = 0;
      self.mask.style.left = 0;
      self.mask.style.width = '100%';
      self.mask.style.height = '100%';
      self.mask.style.opacity = '0';
      self.mask.style.backgroundColor = 'black';
      self.mask.style.zIndex = '98';
      self.mask.style.pointerEvents = 'none';
      self.mask.style.webkitTransition = "all .3s ease-out";
      self.mask.style.transition = "all .3s ease-out";
      self.mask.style.webkitBackfaceVisibility = 'hidden';

      self.addEvent(self.mask, "touchmove", function(e) {
        e.preventDefault();
      })
      self.addEvent(self.mask, "click", function(e) {
        e.preventDefault();
        self.close();
      })

    },

    /*
     *  %相减
     */
    minusPer: function(a, b) {
      var n1 = parseInt(a),
        n2 = parseInt(b),
        r = n1 - n2;
      return (isNaN(r) || r <= 0) ? '0%' : (r + '%')
    },

    /*
     * 打开弹窗
     */
    open: function() {
      var self = this;

      setTimeout(function() {
        self.box.style.opacity = 1;
        self.box.style.transform = 'translate3d(0,0,0)';
        self.box.style.webkitTransform = 'translate3d(0,0,0)';
        self.mask.style.opacity = 0.6;
        self.mask.style.pointerEvents = 'auto';
      })

      if (self.opts.time) {
        self.timer = setTimeout(function() {
          self.close()
        }, self.opts.time);
      }
    },

    /*
     * 关闭弹窗
     */
    close: function() {
      var self = this;
      self.timer && clearTimeout(self.timer);
      self.box.style.webkitTransform = 'translate3d(' + self.translate + ')';
      self.box.style.transform = 'translate3d(' + self.translate + ')';
      self.mask.style.opacity = 0;
      self.mask.style.pointerEvents = 'none';
    }
  }
  window.mSlider = mSlider;
})(window)
