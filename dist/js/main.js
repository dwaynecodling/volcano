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
    $("body").css('overflow', 'hidden');
  });
});
$('.overlay').on('click', function () {
  $(".overlay").fadeToggle(200);
  $(".button a").toggleClass('btn-open').toggleClass('btn-close');
  $("body").css('overflow', 'auto');
  open = false;
});

jQuery(document).ready(function ($) {
  //open the lateral panel
  $('.cd-btn').on('click', function (event) {
    event.preventDefault();
    $('.cd-panel').addClass('is-visible');
    $("body").css('overflow', 'hidden');
  });
  //clode the lateral panel
  $('.cd-panel').on('click', function (event) {
    if ($(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close')) {
      $('.cd-panel').removeClass('is-visible');
      event.preventDefault();
      $("body").css('overflow', 'auto');
    }
  });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxLQUFsQyxDQUF3QyxZQUFXO0FBQ2pELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBTCxFQUFlO0FBQ2hILFVBQUksU0FBUyxFQUFFLEtBQUssSUFBTCxDQUFYLENBRDRHO0FBRWhILGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBL0IsQ0FBM0IsQ0FGdUc7QUFHaEgsVUFBSSxPQUFPLE1BQVAsRUFBZTtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCLEdBQWhCO1NBRGIsRUFFRyxJQUZILEVBRGlCO0FBSWpCLGVBQU8sS0FBUCxDQUppQjtPQUFuQjtLQUhGO0dBRHNDLENBQXhDLENBRFc7Q0FBWCxDQUFGOzs7O0FBd0JBLENBQUMsWUFBVztBQUNKLE1BQUksVUFBVSxFQUFFLE1BQUYsRUFBVSxNQUFWLEVBQVY7TUFDRixVQUFVLEVBQUUsWUFBRixDQUFWO01BQ0EsZ0JBQWdCLFFBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsTUFBbkIsRUFBaEIsQ0FIRTtBQUlKLFVBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsQ0FBQyxVQUFVLGFBQVYsQ0FBRCxHQUEwQixDQUExQixHQUE4QixNQUE5QixDQUF2QixDQUpJO0FBS0osSUFBRSxRQUFGLEVBQVksRUFBWixDQUFlLFFBQWYsRUFBeUIsWUFBVztBQUNsQyxZQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsRUFBc0IsWUFBVztBQUFFLFFBQUUsUUFBRixFQUFZLEdBQVosQ0FBZ0IsUUFBaEIsRUFBRjtLQUFYLENBQXRCLENBRGtDO0FBRWxDLE1BQUUsTUFBRixFQUFVLFNBQVYsQ0FBb0IsQ0FBcEIsRUFGa0M7R0FBWCxDQUF6QixDQUxJO0NBQVgsQ0FBRDs7O0FBbUJBLEVBQUUsa0JBQUYsRUFBc0IsYUFBdEIsQ0FBb0M7QUFDbEMsUUFBSyxRQUFMO0FBQ0EsZ0JBQWMsR0FBZDtBQUNBLGFBQVc7QUFDVCxnQkFBWSxzQkFBVztBQUNwQixXQUFLLEVBQUwsQ0FBUSxTQUFSLEdBQW9CLEtBQUssRUFBTCxDQUFRLEVBQVIsQ0FBVyxJQUFYLENBQWdCLGFBQWhCLENBQXBCLENBRG9CO0tBQVg7R0FEZDtBQUtBLFlBQVUsSUFBVjtBQVJrQyxDQUFwQzs7OztBQWtCQSxFQUFFLFFBQUYsRUFBWSxLQUFaLENBQWtCLFlBQVU7QUFDeEIsSUFBRSxXQUFGLEVBQWUsS0FBZixDQUFxQixZQUFVO0FBQzNCLE1BQUUsVUFBRixFQUFjLFVBQWQsQ0FBeUIsR0FBekIsRUFEMkI7QUFFNUIsTUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixVQUFwQixFQUFnQyxXQUFoQyxDQUE0QyxXQUE1QyxFQUY0QjtBQUc1QixNQUFFLE1BQUYsRUFBVSxHQUFWLENBQWMsVUFBZCxFQUEwQixRQUExQixFQUg0QjtHQUFWLENBQXJCLENBRHdCO0NBQVYsQ0FBbEI7QUFPQSxFQUFFLFVBQUYsRUFBYyxFQUFkLENBQWlCLE9BQWpCLEVBQTBCLFlBQVU7QUFDaEMsSUFBRSxVQUFGLEVBQWMsVUFBZCxDQUF5QixHQUF6QixFQURnQztBQUVoQyxJQUFFLFdBQUYsRUFBZSxXQUFmLENBQTJCLFVBQTNCLEVBQXVDLFdBQXZDLENBQW1ELFdBQW5ELEVBRmdDO0FBRy9CLElBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxVQUFkLEVBQTBCLE1BQTFCLEVBSCtCO0FBSWhDLFNBQU8sS0FBUCxDQUpnQztDQUFWLENBQTFCOztBQU9BLE9BQU8sUUFBUCxFQUFpQixLQUFqQixDQUF1QixVQUFTLENBQVQsRUFBVzs7QUFFaEMsSUFBRSxTQUFGLEVBQWEsRUFBYixDQUFnQixPQUFoQixFQUF5QixVQUFTLEtBQVQsRUFBZTtBQUN0QyxVQUFNLGNBQU4sR0FEc0M7QUFFdEMsTUFBRSxXQUFGLEVBQWUsUUFBZixDQUF3QixZQUF4QixFQUZzQztBQUdyQyxNQUFFLE1BQUYsRUFBVSxHQUFWLENBQWMsVUFBZCxFQUEwQixRQUExQixFQUhxQztHQUFmLENBQXpCOztBQUZnQyxHQVFoQyxDQUFFLFdBQUYsRUFBZSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFVBQVMsS0FBVCxFQUFlO0FBQ3hDLFFBQUksRUFBRSxNQUFNLE1BQU4sQ0FBRixDQUFnQixFQUFoQixDQUFtQixXQUFuQixLQUFtQyxFQUFFLE1BQU0sTUFBTixDQUFGLENBQWdCLEVBQWhCLENBQW1CLGlCQUFuQixDQUFuQyxFQUEyRTtBQUM3RSxRQUFFLFdBQUYsRUFBZSxXQUFmLENBQTJCLFlBQTNCLEVBRDZFO0FBRTdFLFlBQU0sY0FBTixHQUY2RTtBQUc3RSxRQUFFLE1BQUYsRUFBVSxHQUFWLENBQWMsVUFBZCxFQUEwQixNQUExQixFQUg2RTtLQUEvRTtHQUR5QixDQUEzQixDQVJnQztDQUFYLENBQXZCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGpzaGludCBkZXZlbDp0cnVlICovXG5jb25zb2xlLmxvZygnTG9vayBhdCBhcHAvanMvbWFpbi5qcycpO1xuXG5cbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XG4gICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG5cblxuXG5cbi8vIEludHJvIEZ1bGwgU2NyZWVuIHBhZ2UgU2VjdGlvblxuXG5cblxuXG4oZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB3aW5kb3dIID0gJCh3aW5kb3cpLmhlaWdodCgpLFxuICAgICAgICAgIGludHJvRWwgPSAkKCdkaXYub3BlbmVyJyksXG4gICAgICAgICAgaW50cm9IZWFkaW5nSCA9IGludHJvRWwuZmluZCgnaDEnKS5oZWlnaHQoKTtcbiAgICAgICAgaW50cm9FbC5jc3MoJ3BhZGRpbmcnLCAod2luZG93SCAtIGludHJvSGVhZGluZ0gpLzIgKyAncHggMCcpO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaW50cm9FbC5zbGlkZVVwKDEwMDAsIGZ1bmN0aW9uKCkgeyAkKGRvY3VtZW50KS5vZmYoJ3Njcm9sbCcpOyB9KTtcbiAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKDApO1xuXG4gICAgICAgIH0pO1xuICAgICAgfSkoKTtcblxuXG5cblxuXG5cblxuLy8gRXhhbXBsZSAxOiBGcm9tIGFuIGVsZW1lbnQgaW4gRE9NXG4kKCcub3Blbi1wb3B1cC1saW5rJykubWFnbmlmaWNQb3B1cCh7XG4gIHR5cGU6J2lubGluZScsXG4gIHJlbW92YWxEZWxheTogNTAwLCAvL2RlbGF5IHJlbW92YWwgYnkgWCB0byBhbGxvdyBvdXQtYW5pbWF0aW9uXG4gIGNhbGxiYWNrczoge1xuICAgIGJlZm9yZU9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgIHRoaXMuc3QubWFpbkNsYXNzID0gdGhpcy5zdC5lbC5hdHRyKCdkYXRhLWVmZmVjdCcpO1xuICAgIH1cbiAgfSxcbiAgbWlkQ2xpY2s6IHRydWUgLy8gYWxsb3cgb3BlbmluZyBwb3B1cCBvbiBtaWRkbGUgbW91c2UgY2xpY2suIEFsd2F5cyBzZXQgaXQgdG8gdHJ1ZSBpZiB5b3UgZG9uJ3QgcHJvdmlkZSBhbHRlcm5hdGl2ZSBzb3VyY2UuXG59KTtcblxuXG5cblxuLy8gcmVzcG9uc2l2ZSBuYXZpZ2F0aW9uXG5cblxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgICQoXCIuYnV0dG9uIGFcIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcbiAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgIH0pO1xufSk7XG4kKCcub3ZlcmxheScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAkKFwiLmJ1dHRvbiBhXCIpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcbiAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdhdXRvJyk7XG4gICAgb3BlbiA9IGZhbHNlO1xufSk7XG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCl7XG4gIC8vb3BlbiB0aGUgbGF0ZXJhbCBwYW5lbFxuICAkKCcuY2QtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCgnLmNkLXBhbmVsJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgfSk7XG4gIC8vY2xvZGUgdGhlIGxhdGVyYWwgcGFuZWxcbiAgJCgnLmNkLXBhbmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGlmKCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wYW5lbCcpIHx8ICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXBhbmVsLWNsb3NlJykgKSB7IFxuICAgICAgJCgnLmNkLXBhbmVsJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbiJdfQ==
