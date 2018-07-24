/*
 * 侧边滑出弹层插件 mSlider.js
 * DH (https://denghao.me)
 * 2018-07
 */
;
(function (window, undefined) {
  function mSlider(options) {
    this.opts = {
      'direction': options.direction || 'left', //弹层方向:left|right|top|bottom
      'distance': options.distance || '60%', //弹层宽度:px|%|auto
      'dom': this.Q(options.dom), //容器dom
      'zIndex': options.zIndex || 100,
      'time': options.time || "", //自动关闭时间，单位毫秒
      'maskClose': (options.maskClose + '').toString() !== 'false' ? true : false, //点击遮罩关闭弹层
      "onOpen": options.onOpen || '',
      "onClose": options.onClose || ''
    };
    this.rnd = this.rnd();
    this.dom = this.opts.dom[0];
    this.wrap = '';
    this.inner = '';
    this.mask = '';
    this.init();
  }

  mSlider.prototype = {
    Q: function (dom) {
      return document.querySelectorAll(dom);
    },
    isMobile: function () {
      return navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) ? true : false;
    },
    addEvent: function (obj, ev, fn) {
      if (obj.attachEvent) {
        obj.attachEvent("on" + ev, fn);
      } else {
        obj.addEventListener(ev, fn, false);
      }
    },
    rnd: function () {
      return Math.random().toString(36).substr(2, 6);
    },
    /*
     * 初始化
     */
    init: function () {
      var _this = this;
      // 条件判断
      if (!_this.dom) {
        console.log('未正确绑定弹窗容器');
        return;
      }
      // 生成遮罩
      var wrapNode = document.createElement('div');
      var innerNode = document.createElement('div');
      var maskNode = document.createElement('div');
      wrapNode.setAttribute('class', 'mSlider-main ms-' + _this.rnd);
      innerNode.setAttribute('class', 'mSlider-inner');
      maskNode.setAttribute('class', 'mSlider-mask');
      _this.Q("body")[0].appendChild(wrapNode);
      _this.Q(".ms-" + _this.rnd)[0].appendChild(innerNode);
      _this.Q(".ms-" + _this.rnd)[0].appendChild(maskNode);

      _this.wrap = _this.Q('.ms-' + _this.rnd)[0];
      _this.inner = _this.Q('.ms-' + _this.rnd + ' .mSlider-inner')[0];
      _this.mask = _this.Q('.ms-' + _this.rnd + ' .mSlider-mask')[0];
      // 嵌入内容
      _this.inner.appendChild(_this.dom);

      //弹层方向
      switch (_this.opts.direction) {
        case 'top':
          _this.top = '0';
          _this.left = '0';
          _this.width = '100%';
          _this.height = _this.opts.distance;
          _this.translate = '0,-100%,0';
          break;
        case 'bottom':
          _this.bottom = '0';
          _this.left = '0';
          _this.width = '100%';
          _this.height = _this.opts.distance;
          _this.translate = '0,100%,0';
          break;
        case 'right':
          _this.top = '0';
          _this.right = '0';
          _this.width = _this.opts.distance;
          _this.height = document.documentElement.clientHeight + 'px';
          _this.translate = '100%,0,0';
          break;
        default:
          //left
          _this.top = '0';
          _this.left = '0';
          _this.width = _this.opts.distance;
          _this.height = document.documentElement.clientHeight + 'px';
          _this.translate = '-100%,0,0';
      }

      //外部容器样式
      _this.wrap.style.display = 'none';
      _this.wrap.style.position = 'fixed';
      _this.wrap.style.top = '0';
      _this.wrap.style.left = '0';
      _this.wrap.style.width = '100%';
      _this.wrap.style.height = '100%';
      _this.wrap.style.zIndex = _this.opts.zIndex;

      // 内容区样式
      _this.inner.style.position = "absolute";
      _this.inner.style.top = _this.top;
      _this.inner.style.bottom = _this.bottom;
      _this.inner.style.left = _this.left;
      _this.inner.style.right = _this.right;
      _this.inner.style.width = _this.width;
      _this.inner.style.height = _this.height;
      _this.inner.style.backgroundColor = "#fff";
      _this.inner.style.transform = 'translate3d(' + _this.translate + ')';
      _this.inner.style.webkitTransition = "all .2s ease-out";
      _this.inner.style.transition = "all .2s ease-out";
      _this.inner.style.zIndex = _this.opts.zIndex + 1;

      //遮罩处理
      _this.mask.style.width = '100%';
      _this.mask.style.height = '100%';
      _this.mask.style.opacity = '0';
      _this.mask.style.backgroundColor = 'black';
      _this.mask.style.zIndex = _this.opts.zIndex - 1;
      _this.mask.style.webkitTransition = "all .2s ease-out";
      _this.mask.style.transition = "all .2s ease-out";
      _this.mask.style.webkitBackfaceVisibility = 'hidden';
      // 绑定事件
      _this.events();
    },

    /*
     * 打开弹窗
     */
    open: function () {
      var _this = this;
      _this.wrap.style.display = 'block';
      setTimeout(function () {
        _this.inner.style.transform = 'translate3d(0,0,0)';
        _this.inner.style.webkitTransform = 'translate3d(0,0,0)';
        _this.mask.style.opacity = 0.5;
        _this.opts.onOpen && _this.opts.onOpen();
      }, 30)

      if (_this.opts.time) {
        _this.timer = setTimeout(function () {
          _this.close()
        }, _this.opts.time);
      }
    },

    /*
     * 关闭弹窗
     */
    close: function () {
      var _this = this;
      _this.timer && clearTimeout(_this.timer);
      _this.inner.style.webkitTransform = 'translate3d(' + _this.translate + ')';
      _this.inner.style.transform = 'translate3d(' + _this.translate + ')';
      _this.mask.style.opacity = 0;
      setTimeout(function () {
        _this.wrap.style.display = 'none';
        _this.timer = null;
        _this.opts.onClose && _this.opts.onClose();
      }, 300);
    },
    // 事件
    events: function () {
      var _this = this;
      _this.addEvent(_this.mask, "touchmove", function (e) {
        e.preventDefault();
      })
      _this.addEvent(_this.mask, (_this.isMobile() ? 'touchend' : 'click'), function (e) {
        if (_this.opts.maskClose) {
          _this.close();
        }
      })
    }
  }
  window.mSlider = mSlider;
})(window)
