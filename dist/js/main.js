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

$("button").click(function () {
  $(".sf-drawer").toggleClass("out");
});

$('#loginPanel').click(function () {

  if ($('#userNav').is(':hidden')) {

    $('#userNav').show('slide', { direction: 'left' }, 1000);
  } else {

    $('#userNav').hide('slide', { direction: 'left' }, 1000);
  }
});

$('#loginPanel1').click(function () {

  if ($('#userNav').is(':hidden')) {

    $('#userNav').show('slide', { direction: 'right' }, 1000);
  } else {

    $('#userNav').hide('slide', { direction: 'right' }, 1000);
  }
});

$('#loginPanel2').click(function () {

  if ($('#userNav').is(':hidden')) {

    $('#userNav').show('slide', { direction: 'left' }, 1000);
  } else {

    $('#userNav').hide('slide', { direction: 'right' }, 1000);
  }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxLQUFsQyxDQUF3QyxZQUFXO0FBQ2pELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBTCxFQUFlO0FBQ2hILFVBQUksU0FBUyxFQUFFLEtBQUssSUFBTCxDQUFYLENBRDRHO0FBRWhILGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBL0IsQ0FBM0IsQ0FGdUc7QUFHaEgsVUFBSSxPQUFPLE1BQVAsRUFBZTtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCLEdBQWhCO1NBRGIsRUFFRyxJQUZILEVBRGlCO0FBSWpCLGVBQU8sS0FBUCxDQUppQjtPQUFuQjtLQUhGO0dBRHNDLENBQXhDLENBRFc7Q0FBWCxDQUFGOzs7O0FBc0JBLENBQUMsWUFBVztBQUNKLE1BQUksVUFBVSxFQUFFLE1BQUYsRUFBVSxNQUFWLEVBQVY7TUFDRixVQUFVLEVBQUUsWUFBRixDQUFWO01BQ0EsZ0JBQWdCLFFBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsTUFBbkIsRUFBaEIsQ0FIRTtBQUlKLFVBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsQ0FBQyxVQUFVLGFBQVYsQ0FBRCxHQUEwQixDQUExQixHQUE4QixNQUE5QixDQUF2QixDQUpJO0FB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bGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBqc2hpbnQgZGV2ZWw6dHJ1ZSAqL1xuY29uc29sZS5sb2coJ0xvb2sgYXQgYXBwL2pzL21haW4uanMnKTtcblxuXG4kKGZ1bmN0aW9uKCkge1xuICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xuICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsnXScpO1xuICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxuICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcblxuXG5cblxuXG4vLyBJbnRybyBGdWxsIFNjcmVlbiBwYWdlIFNlY3Rpb25cblxuXG4oZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB3aW5kb3dIID0gJCh3aW5kb3cpLmhlaWdodCgpLFxuICAgICAgICAgIGludHJvRWwgPSAkKCdkaXYub3BlbmVyJyksXG4gICAgICAgICAgaW50cm9IZWFkaW5nSCA9IGludHJvRWwuZmluZCgnaDEnKS5oZWlnaHQoKTtcbiAgICAgICAgaW50cm9FbC5jc3MoJ3BhZGRpbmcnLCAod2luZG93SCAtIGludHJvSGVhZGluZ0gpLzIgKyAncHggMCcpO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaW50cm9FbC5zbGlkZVVwKDEwMDAsIGZ1bmN0aW9uKCkgeyAkKGRvY3VtZW50KS5vZmYoJ3Njcm9sbCcpOyB9KTtcbiAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKDApO1xuXG4gICAgICAgIH0pO1xuICAgICAgfSkoKTtcblxuXG5cblxuXG5cblxuLy8gRXhhbXBsZSAxOiBGcm9tIGFuIGVsZW1lbnQgaW4gRE9NXG4kKCcub3Blbi1wb3B1cC1saW5rJykubWFnbmlmaWNQb3B1cCh7XG4gIHR5cGU6J2lubGluZScsXG4gIHJlbW92YWxEZWxheTogNTAwLCAvL2RlbGF5IHJlbW92YWwgYnkgWCB0byBhbGxvdyBvdXQtYW5pbWF0aW9uXG4gIGNhbGxiYWNrczoge1xuICAgIGJlZm9yZU9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgIHRoaXMuc3QubWFpbkNsYXNzID0gdGhpcy5zdC5lbC5hdHRyKCdkYXRhLWVmZmVjdCcpO1xuICAgIH1cbiAgfSxcbiAgbWlkQ2xpY2s6IHRydWUgLy8gYWxsb3cgb3BlbmluZyBwb3B1cCBvbiBtaWRkbGUgbW91c2UgY2xpY2suIEFsd2F5cyBzZXQgaXQgdG8gdHJ1ZSBpZiB5b3UgZG9uJ3QgcHJvdmlkZSBhbHRlcm5hdGl2ZSBzb3VyY2UuXG59KTtcblxuXG5cblxuLy8gcmVzcG9uc2l2ZSBuYXZpZ2F0aW9uXG5cblxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgICQoXCIuYnV0dG9uIGFcIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcbiAgICB9KTtcbn0pO1xuJCgnLm92ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQoXCIub3ZlcmxheVwiKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgJChcIi5idXR0b24gYVwiKS50b2dnbGVDbGFzcygnYnRuLW9wZW4nKS50b2dnbGVDbGFzcygnYnRuLWNsb3NlJyk7XG4gICAgb3BlbiA9IGZhbHNlO1xufSk7XG5cblxuJChcImJ1dHRvblwiKS5jbGljayhmdW5jdGlvbigpe1xuICAgICQoXCIuc2YtZHJhd2VyXCIpLnRvZ2dsZUNsYXNzKFwib3V0XCIpO1xufSk7XG5cblxuXG5cbiQoJyNsb2dpblBhbmVsJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICgkKCcjdXNlck5hdicpLmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAkKCcjdXNlck5hdicpLnNob3coJ3NsaWRlJyx7ZGlyZWN0aW9uOidsZWZ0J30sMTAwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAkKCcjdXNlck5hdicpLmhpZGUoJ3NsaWRlJyx7ZGlyZWN0aW9uOidsZWZ0J30sMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxufSk7XG5cbiQoJyNsb2dpblBhbmVsMScpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoJCgnI3VzZXJOYXYnKS5pcygnOmhpZGRlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgJCgnI3VzZXJOYXYnKS5zaG93KCdzbGlkZScse2RpcmVjdGlvbjoncmlnaHQnfSwxMDAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICQoJyN1c2VyTmF2JykuaGlkZSgnc2xpZGUnLHtkaXJlY3Rpb246J3JpZ2h0J30sMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxufSk7XG5cblxuJCgnI2xvZ2luUGFuZWwyJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICgkKCcjdXNlck5hdicpLmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAkKCcjdXNlck5hdicpLnNob3coJ3NsaWRlJyx7ZGlyZWN0aW9uOidsZWZ0J30sMTAwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAkKCcjdXNlck5hdicpLmhpZGUoJ3NsaWRlJyx7ZGlyZWN0aW9uOidyaWdodCd9LDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbn0pO1xuXG5cbiJdfQ==
