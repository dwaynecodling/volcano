(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* jshint devel:true */
console.log('Look at app/js/main.js');

$(function () {
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// Intro Full Screen page Section

(function () {
  var windowH = $(window).height(),
      introEl = $('div.opener'),
      introHeadingH = introEl.find('h1').height();
  introEl.css('padding', (windowH - introHeadingH) / 2 + 'px 0');
  $(document).on('scroll', function () {
    introEl.slideUp(1000, function () {
      $(document).off('scroll');
    });
    $(window).scrollTop(0);
  });
})();

// Example 1: From an element in DOM
$('.open-popup-link').magnificPopup({
  type: 'inline',
  removalDelay: 500, //delay removal by X to allow out-animation
  callbacks: {
    beforeOpen: function beforeOpen() {
      this.st.mainClass = this.st.el.attr('data-effect');
    }
  },
  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});

// responsive navigation

$(document).ready(function () {
  $(".button a").click(function () {
    $(".overlay").fadeToggle(200);
    $(this).toggleClass('btn-open').toggleClass('btn-close');
  });
});
$('.overlay').on('click', function () {
  $(".overlay").fadeToggle(200);
  $(".button a").toggleClass('btn-open').toggleClass('btn-close');
  open = false;
});

jQuery(document).ready(function ($) {
  //open the lateral panel
  $('.cd-btn').on('click', function (event) {
    event.preventDefault();
    $('.cd-panel').addClass('is-visible');
  });
  //clode the lateral panel
  $('.cd-panel').on('click', function (event) {
    if ($(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close')) {
      $('.cd-panel').removeClass('is-visible');
      event.preventDefault();
    }
  });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxLQUFsQyxDQUF3QyxZQUFXO0FBQ2pELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBTCxFQUFlO0FBQ2hILFVBQUksU0FBUyxFQUFFLEtBQUssSUFBTCxDQUFYLENBRDRHO0FBRWhILGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBL0IsQ0FBM0IsQ0FGdUc7QUFHaEgsVUFBSSxPQUFPLE1BQVAsRUFBZTtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCLEdBQWhCO1NBRGIsRUFFRyxJQUZILEVBRGlCO0FBSWpCLGVBQU8sS0FBUCxDQUppQjtPQUFuQjtLQUhGO0dBRHNDLENBQXhDLENBRFc7Q0FBWCxDQUFGOzs7O0FBc0JBLENBQUMsWUFBVztBQUNKLE1BQUksVUFBVSxFQUFFLE1BQUYsRUFBVSxNQUFWLEVBQVY7TUFDRixVQUFVLEVBQUUsWUFBRixDQUFWO01BQ0EsZ0JBQWdCLFFBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsTUFBbkIsRUFBaEIsQ0FIRTtBQUlKLFVBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsQ0FBQyxVQUFVLGFBQVYsQ0FBRCxHQUEwQixDQUExQixHQUE4QixNQUE5QixDQUF2QixDQUpJO0FBS0osSUFBRSxRQUFGLEVBQVksRUFBWixDQUFlLFFBQWYsRUFBeUIsWUFBVztBQUNsQyxZQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsRUFBc0IsWUFBVztBQUFFLFFBQUUsUUFBRixFQUFZLEdBQVosQ0FBZ0IsUUFBaEIsRUFBRjtLQUFYLENBQXRCLENBRGtDO0FBRWxDLE1BQUUsTUFBRixFQUFVLFNBQVYsQ0FBb0IsQ0FBcEIsRUFGa0M7R0FBWCxDQUF6QixDQUxJO0NBQVgsQ0FBRDs7O0FBbUJBLEVBQUUsa0JBQUYsRUFBc0IsYUFBdEIsQ0FBb0M7QUFDbEMsUUFBSyxRQUFMO0FBQ0EsZ0JBQWMsR0FBZDtBQUNBLGFBQVc7QUFDVCxnQkFBWSxzQkFBVztBQUNwQixXQUFLLEVBQUwsQ0FBUSxTQUFSLEdBQW9CLEtBQUssRUFBTCxDQUFRLEVBQVIsQ0FBVyxJQUFYLENBQWdCLGFBQWhCLENBQXBCLENBRG9CO0tBQVg7R0FEZDtBQUtBLFlBQVUsSUFBVjtBQVJrQyxDQUFwQzs7OztBQWtCQSxFQUFFLFFBQUYsRUFBWSxLQUFaLENBQWtCLFlBQVU7QUFDeEIsSUFBRSxXQUFGLEVBQWUsS0FBZixDQUFxQixZQUFVO0FBQzNCLE1BQUUsVUFBRixFQUFjLFVBQWQsQ0FBeUIsR0FBekIsRUFEMkI7QUFFNUIsTUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixVQUFwQixFQUFnQyxXQUFoQyxDQUE0QyxXQUE1QyxFQUY0QjtHQUFWLENBQXJCLENBRHdCO0NBQVYsQ0FBbEI7QUFNQSxFQUFFLFVBQUYsRUFBYyxFQUFkLENBQWlCLE9BQWpCLEVBQTBCLFlBQVU7QUFDaEMsSUFBRSxVQUFGLEVBQWMsVUFBZCxDQUF5QixHQUF6QixFQURnQztBQUVoQyxJQUFFLFdBQUYsRUFBZSxXQUFmLENBQTJCLFVBQTNCLEVBQXVDLFdBQXZDLENBQW1ELFdBQW5ELEVBRmdDO0FBR2hDLFNBQU8sS0FBUCxDQUhnQztDQUFWLENBQTFCOztBQU1BLE9BQU8sUUFBUCxFQUFpQixLQUFqQixDQUF1QixVQUFTLENBQVQsRUFBVzs7QUFFaEMsSUFBRSxTQUFGLEVBQWEsRUFBYixDQUFnQixPQUFoQixFQUF5QixVQUFTLEtBQVQsRUFBZTtBQUN0QyxVQUFNLGNBQU4sR0FEc0M7QUFFdEMsTUFBRSxXQUFGLEVBQWUsUUFBZixDQUF3QixZQUF4QixFQUZzQztHQUFmLENBQXpCOztBQUZnQyxHQU9oQyxDQUFFLFdBQUYsRUFBZSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFVBQVMsS0FBVCxFQUFlO0FBQ3hDLFFBQUksRUFBRSxNQUFNLE1BQU4sQ0FBRixDQUFnQixFQUFoQixDQUFtQixXQUFuQixLQUFtQyxFQUFFLE1BQU0sTUFBTixDQUFGLENBQWdCLEVBQWhCLENBQW1CLGlCQUFuQixDQUFuQyxFQUEyRTtBQUM3RSxRQUFFLFdBQUYsRUFBZSxXQUFmLENBQTJCLFlBQTNCLEVBRDZFO0FBRTdFLFlBQU0sY0FBTixHQUY2RTtLQUEvRTtHQUR5QixDQUEzQixDQVBnQztDQUFYLENBQXZCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGpzaGludCBkZXZlbDp0cnVlICovXG5jb25zb2xlLmxvZygnTG9vayBhdCBhcHAvanMvbWFpbi5qcycpO1xuXG5cbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XG4gICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG5cblxuXG5cbi8vIEludHJvIEZ1bGwgU2NyZWVuIHBhZ2UgU2VjdGlvblxuXG5cbihmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHdpbmRvd0ggPSAkKHdpbmRvdykuaGVpZ2h0KCksXG4gICAgICAgICAgaW50cm9FbCA9ICQoJ2Rpdi5vcGVuZXInKSxcbiAgICAgICAgICBpbnRyb0hlYWRpbmdIID0gaW50cm9FbC5maW5kKCdoMScpLmhlaWdodCgpO1xuICAgICAgICBpbnRyb0VsLmNzcygncGFkZGluZycsICh3aW5kb3dIIC0gaW50cm9IZWFkaW5nSCkvMiArICdweCAwJyk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpbnRyb0VsLnNsaWRlVXAoMTAwMCwgZnVuY3Rpb24oKSB7ICQoZG9jdW1lbnQpLm9mZignc2Nyb2xsJyk7IH0pO1xuICAgICAgICAgICQod2luZG93KS5zY3JvbGxUb3AoMCk7XG5cbiAgICAgICAgfSk7XG4gICAgICB9KSgpO1xuXG5cblxuXG5cblxuXG4vLyBFeGFtcGxlIDE6IEZyb20gYW4gZWxlbWVudCBpbiBET01cbiQoJy5vcGVuLXBvcHVwLWxpbmsnKS5tYWduaWZpY1BvcHVwKHtcbiAgdHlwZTonaW5saW5lJyxcbiAgcmVtb3ZhbERlbGF5OiA1MDAsIC8vZGVsYXkgcmVtb3ZhbCBieSBYIHRvIGFsbG93IG91dC1hbmltYXRpb25cbiAgY2FsbGJhY2tzOiB7XG4gICAgYmVmb3JlT3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgdGhpcy5zdC5tYWluQ2xhc3MgPSB0aGlzLnN0LmVsLmF0dHIoJ2RhdGEtZWZmZWN0Jyk7XG4gICAgfVxuICB9LFxuICBtaWRDbGljazogdHJ1ZSAvLyBhbGxvdyBvcGVuaW5nIHBvcHVwIG9uIG1pZGRsZSBtb3VzZSBjbGljay4gQWx3YXlzIHNldCBpdCB0byB0cnVlIGlmIHlvdSBkb24ndCBwcm92aWRlIGFsdGVybmF0aXZlIHNvdXJjZS5cbn0pO1xuXG5cblxuXG4vLyByZXNwb25zaXZlIG5hdmlnYXRpb25cblxuXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgJChcIi5idXR0b24gYVwiKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAkKFwiLm92ZXJsYXlcIikuZmFkZVRvZ2dsZSgyMDApO1xuICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJykudG9nZ2xlQ2xhc3MoJ2J0bi1jbG9zZScpO1xuICAgIH0pO1xufSk7XG4kKCcub3ZlcmxheScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAkKFwiLmJ1dHRvbiBhXCIpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcbiAgICBvcGVuID0gZmFsc2U7XG59KTtcblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKXtcbiAgLy9vcGVuIHRoZSBsYXRlcmFsIHBhbmVsXG4gICQoJy5jZC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkKCcuY2QtcGFuZWwnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICB9KTtcbiAgLy9jbG9kZSB0aGUgbGF0ZXJhbCBwYW5lbFxuICAkKCcuY2QtcGFuZWwnKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG4gICAgaWYoICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXBhbmVsJykgfHwgJChldmVudC50YXJnZXQpLmlzKCcuY2QtcGFuZWwtY2xvc2UnKSApIHsgXG4gICAgICAkKCcuY2QtcGFuZWwnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbiJdfQ==
