"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

document.addEventListener('DOMContentLoaded', function () {
  // Функция throttle будет принимать 2 аргумента:
  // - callee, функция, которую надо вызывать;
  // - timeout, интервал в мс, с которым следует пропускать вызовы.
  function throttle(callee, timeout) {
    // Таймер будет определять,
    // надо ли нам пропускать текущий вызов.
    var timer = null; // Как результат возвращаем другую функцию.
    // Это нужно, чтобы мы могли не менять другие части кода,
    // чуть позже мы увидим, как это помогает.

    return function perform() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // Если таймер есть, то функция уже была вызвана,
      // и значит новый вызов следует пропустить.
      if (timer) return; // Если таймера нет, значит мы можем вызвать функцию:

      console.log(timer);
      timer = setTimeout(function () {
        // Аргументы передаём неизменными в функцию-аргумент:
        callee.apply(void 0, args); // По окончании очищаем таймер:

        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  }

  var Animation = /*#__PURE__*/function () {
    function Animation(_ref) {
      var _ref$trigger = _ref.trigger,
          trigger = _ref$trigger === void 0 ? null : _ref$trigger,
          _ref$elements = _ref.elements,
          elements = _ref$elements === void 0 ? null : _ref$elements,
          _ref$animationName = _ref.animationName,
          animationName = _ref$animationName === void 0 ? 'default' : _ref$animationName;

      _classCallCheck(this, Animation);

      this.trigger = trigger;
      this.elements = document.querySelectorAll(elements);
      this.animationName = animationName;
    }

    _createClass(Animation, [{
      key: "animate",
      value: function animate() {
        var _this = this;

        this.elements.forEach(function (item) {
          item.addEventListener(_this.trigger, function () {
            item.classList.add('animate_start');
            setTimeout(function () {
              item.classList.remove('animate_start');
            }, 500);
          });
        });
      }
    }]);

    return Animation;
  }();

  var defaultAnimate = new Animation({
    trigger: 'mouseenter',
    elements: '.default_animate'
  });
  defaultAnimate.animate();
  var optimizeAnimateMenu = throttle(animateMenu, 100);
  var mainMenu = document.querySelector('.main_menu');
  var listMenuItem = mainMenu.querySelectorAll('li');
  var isAnimate = true;

  function animateMenu(item) {
    if (isAnimate) {
      // for(let i = 0; i < listMenuItem.length; i++){
      //     listMenuItem[i].classList.remove('show_sub_menu')
      // }
      if (item.querySelector('.nav-sub')) {
        item.classList.add('show_sub_menu');
        mainMenu.classList.add('open_sub_menu');
      } else {
        return false;
      }
    } else {
      item.classList.remove('show_sub_menu');
      mainMenu.classList.remove('open_sub_menu');
    }
  }

  listMenuItem.forEach(function (item) {
    item.addEventListener('mouseover', function (e) {
      optimizeAnimateMenu(item);
      isAnimate = true;
    });
    item.addEventListener('mouseout', function () {
      isAnimate = false;
      optimizeAnimateMenu(item);
    });
  });
  var dotsInMap = document.querySelectorAll('.dot');
  dotsInMap.forEach(function (item) {
    var hoverItem = item.querySelector('.hover_img');
    var image = document.createElement('img');
    image.src = hoverItem.dataset.img;
    hoverItem.appendChild(image);
  });
});
//# sourceMappingURL=script.js.map
