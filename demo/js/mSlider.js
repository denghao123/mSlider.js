/**
 * @denghao.me
 * @2016-08-17 18:02:35
 * v1.0
 */
function mSlider(options) {
  this.defaults = {
    'direction': 'left', //弹层方向
    'distance': '60%', //弹层宽度
    'dom': {} //容器节点
  };
  this.opts = $.extend({}, this.defaults, options);
  this.rnd = parseInt(Math.random() * 10000);
  this.init();
}

mSlider.prototype = {
  init: function() {
    var _this = this;
    $('body').append("<div class='mSlider-mask"+ _this.rnd +"'></div>");
    //弹层方向
    switch (_this.opts.direction) {
      case 'top':
        _this.top = '-100%';
        _this.bottom = 'no';
        _this.left = '0';
        _this.right = 'no';
        _this.width = '100%';
        _this.height = _this.opts.distance;
        break;
      case 'bottom':
        _this.top = 'no';
        _this.bottom = '-100%';
        _this.left = '0';
        _this.right = 'no';
        _this.width = '100%';
        _this.height = _this.opts.distance;
        break;
      case 'right':
        _this.top = '0';
        _this.bottom = 'no';
        _this.left = 'no';
        _this.right = '-100%';
        _this.width = _this.opts.distance;
        _this.height = '100%';
        break;
      default:
        //默认 left
        _this.top = '0';
        _this.bottom = 'no';
        _this.left = '-100%';
        _this.right = 'no';
        _this.width = _this.opts.distance;
        _this.height = '100%';
    }
    //容器样式
    _this.opts.dom.css({
      'position': 'fixed',
      'top': _this.top,
      'bottom': _this.bottom,
      'left': _this.left,
      'right': _this.right,
      'width': _this.width,
      'height': _this.height,
      'overflow-y': 'auto',
      'background-color': '#fff',
      'z-index': '99',
      '-webkit-transition': 'all .3s ease-out',
      'transition': 'all .3s ease-out',
      '-webkit-backface-visibility': 'hidden'
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
      '-webkit-transition': 'all .3s ease-out',
      'transition': 'all .3s ease-out',
      '-webkit-backface-visibility': 'hidden'
    })

    $('.mSlider-mask' + _this.rnd).on('touchmove', function(event) {
      event.preventDefault();
    });
    $('.mSlider-mask' + _this.rnd).on('touchmove touchend', function(event) {
      event.preventDefault();
      _this.close();
    });
  },

  open: function() {
    var _this = this;
    setTimeout(function() {
      _this.opts.dom.css(_this.opts.direction, 0);

      $('.mSlider-mask' + _this.rnd).css({
        'opacity': '0.6',
        'pointer-events': 'auto'
      });
    })
  },

  close: function() {
    var _this = this;
    _this.opts.dom.css(_this.opts.direction, '-100%');
    $('.mSlider-mask' + _this.rnd).css({
      'opacity': '0',
      'pointer-events': 'none'
    })
  }
}