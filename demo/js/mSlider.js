/**
 * @denghao.me
 * @2016-08-22
 * v1.0
 */
function mSlider(options) {
  this.defaults = {
    'direction': 'left', //弹层方向:left|right|top|bottom
    'distance': '60%', //弹层宽度:%|auto
    'dom': {}, //容器节点: jquery节点
    'time': "" //自动关闭时间，单位毫秒
  };
  this.opts = $.extend({}, this.defaults, options);
  this.rnd = parseInt(Math.random() * 10000);
  this.init();
}

mSlider.prototype = {
  init: function() {
    var _this = this;
    $('body').append("<div class='mSlider-mask" + _this.rnd + "'></div>");
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
        _this.top = _this.minusPer('100%', _this.opts.distance);
        _this.left = '0';
        _this.width = '100%';
        _this.height = _this.opts.distance;
        _this.translate = '0,100%,0';
        break;
      case 'right':
        _this.top = '0';
        _this.left = _this.minusPer('100%', _this.opts.distance);
        _this.width = _this.opts.distance;
        _this.height = '100%';
        _this.translate = '100%,0,0';
        break;
      default:
        //默认 left
        _this.top = '0';
        _this.left = '0';
        _this.width = _this.opts.distance;
        _this.height = '100%';
        _this.translate = '-100%,0,0';
    }

    //容器样式
    _this.opts.dom.css({
      'position': 'fixed',
      'top': _this.top,
      'left': _this.left,
      'width': _this.width,
      'height': _this.height,
      'overflow-y': 'auto',
      'background-color': '#fff',
      'z-index': '99',
      'transition': 'all .3s ease-out',
      '-webkit-transition': 'all .3s ease-out',
      '-webkit-backface-visibility': 'hidden',
      'transform': 'translate3d(' + _this.translate + ')',
      '-webkit-transform': 'translate3d(' + _this.translate + ')'
    });

    //遮罩处理
    $('.mSlider-mask' + _this.rnd).css({
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'width': '100%',
      'height': '100%',
      'background-color': 'black',
      'opacity': '0',
      'z-index': '98',
      'pointer-events': 'none',
      'transition': 'all .3s ease-out',
      '-webkit-transition': 'all .3s ease-out',
      '-webkit-backface-visibility': 'hidden'
    })

    $('.mSlider-mask' + _this.rnd).on('touchmove', function(event) {
      event.preventDefault();
    });
    $('.mSlider-mask' + _this.rnd).on('touchend click', function(event) {
      event.preventDefault();
      _this.close();
    })

  },

  // 百分比%相减
  minusPer: function(a, b) {
    var n1 = parseInt(a),
      n2 = parseInt(b),
      r = n1 - n2;
    return (isNaN(r) || r <= 0) ? '0%' : (r + '%')
  },

  open: function() {
    var _this = this;
    setTimeout(function() {
      _this.opts.dom.css({
        'opacity': '1',
        '-webkit-transform': 'translate3d(0,0,0)',
        'transform': 'translate3d(0,0,0)',
      });

      $('.mSlider-mask' + _this.rnd).css({
        'opacity': '0.6',
        'pointer-events': 'auto'
      })
    })

    if (_this.opts.time) {
      _this.timer = setTimeout(function() {
        _this.close()
      }, _this.opts.time);
    }
  },

  close: function() {
    var _this = this;
    _this.timer && clearTimeout(_this.timer);
    _this.opts.dom.css({
      '-webkit-transform': 'translate3d(' + _this.translate + ')',
      'transform': 'translate3d(' + _this.translate + ')'
    });
    $('.mSlider-mask' + _this.rnd).css({
      'opacity': '0',
      'pointer-events': 'none'
    })
  }

}