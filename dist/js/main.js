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
  });
})();

// Example 1: From an element in DOM
$('.open-popup-link').magnificPopup({
  type: 'inline',
  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});

// responsive navigation

$(function () {
  var pull = $('#pull');
  var menu = $('nav ul');
  var menuHeight = menu.height();

  $(pull).on('click', function (e) {
    e.preventDefault();
    menu.slideToggle();
  });
});

$(window).resize(function () {
  var w = $(window).width();
  if (w > 320 && menu.is(':hidden')) {
    menu.removeAttr('style');
  }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxLQUFsQyxDQUF3QyxZQUFXO0FBQ2pELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBTCxFQUFlO0FBQ2hILFVBQUksU0FBUyxFQUFFLEtBQUssSUFBTCxDQUFYLENBRDRHO0FBRWhILGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBL0IsQ0FBM0IsQ0FGdUc7QUFHaEgsVUFBSSxPQUFPLE1BQVAsRUFBZTtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCLEdBQWhCO1NBRGIsRUFFRyxJQUZILEVBRGlCO0FBSWpCLGVBQU8sS0FBUCxDQUppQjtPQUFuQjtLQUhGO0dBRHNDLENBQXhDLENBRFc7Q0FBWCxDQUFGOzs7O0FBc0JBLENBQUMsWUFBVztBQUNKLE1BQUksVUFBVSxFQUFFLE1BQUYsRUFBVSxNQUFWLEVBQVY7TUFDRixVQUFVLEVBQUUsWUFBRixDQUFWO01BQ0EsZ0JBQWdCLFFBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsTUFBbkIsRUFBaEIsQ0FIRTtBQUlKLFVBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsQ0FBQyxVQUFVLGFBQVYsQ0FBRCxHQUEwQixDQUExQixHQUE4QixNQUE5QixDQUF2QixDQUpJO0FBS0osSUFBRSxRQUFGLEVBQVksRUFBWixDQUFlLFFBQWYsRUFBeUIsWUFBVztBQUNsQyxZQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsRUFBc0IsWUFBVztBQUFFLFFBQUUsUUFBRixFQUFZLEdBQVosQ0FBZ0IsUUFBaEIsRUFBRjtLQUFYLENBQXRCLENBRGtDO0dBQVgsQ0FBekIsQ0FMSTtDQUFYLENBQUQ7OztBQWFBLEVBQUUsa0JBQUYsRUFBc0IsYUFBdEIsQ0FBb0M7QUFDbEMsUUFBSyxRQUFMO0FBQ0EsWUFBVSxJQUFWO0FBRmtDLENBQXBDOzs7O0FBU0EsRUFBRSxZQUFXO0FBQ1QsTUFBSSxPQUFjLEVBQUUsT0FBRixDQUFkLENBREs7QUFFVCxNQUFJLE9BQWMsRUFBRSxRQUFGLENBQWQsQ0FGSztBQUdULE1BQUksYUFBYyxLQUFLLE1BQUwsRUFBZCxDQUhLOztBQUtULElBQUUsSUFBRixFQUFRLEVBQVIsQ0FBVyxPQUFYLEVBQW9CLFVBQVMsQ0FBVCxFQUFZO0FBQzVCLE1BQUUsY0FBRixHQUQ0QjtBQUU1QixTQUFLLFdBQUwsR0FGNEI7R0FBWixDQUFwQixDQUxTO0NBQVgsQ0FBRjs7QUFXQSxFQUFFLE1BQUYsRUFBVSxNQUFWLENBQWlCLFlBQVU7QUFDdkIsTUFBSSxJQUFJLEVBQUUsTUFBRixFQUFVLEtBQVYsRUFBSixDQURtQjtBQUV2QixNQUFHLElBQUksR0FBSixJQUFXLEtBQUssRUFBTCxDQUFRLFNBQVIsQ0FBWCxFQUErQjtBQUM5QixTQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsRUFEOEI7R0FBbEM7Q0FGYSxDQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBqc2hpbnQgZGV2ZWw6dHJ1ZSAqL1xuY29uc29sZS5sb2coJ0xvb2sgYXQgYXBwL2pzL21haW4uanMnKTtcblxuXG4kKGZ1bmN0aW9uKCkge1xuICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xuICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsnXScpO1xuICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxuICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcblxuXG5cblxuXG4vLyBJbnRybyBGdWxsIFNjcmVlbiBwYWdlIFNlY3Rpb24gIFxuXG5cbihmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHdpbmRvd0ggPSAkKHdpbmRvdykuaGVpZ2h0KCksXG4gICAgICAgICAgaW50cm9FbCA9ICQoJ2Rpdi5vcGVuZXInKSxcbiAgICAgICAgICBpbnRyb0hlYWRpbmdIID0gaW50cm9FbC5maW5kKCdoMScpLmhlaWdodCgpO1xuICAgICAgICBpbnRyb0VsLmNzcygncGFkZGluZycsICh3aW5kb3dIIC0gaW50cm9IZWFkaW5nSCkvMiArICdweCAwJyk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpbnRyb0VsLnNsaWRlVXAoMTAwMCwgZnVuY3Rpb24oKSB7ICQoZG9jdW1lbnQpLm9mZignc2Nyb2xsJyk7IH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pKCk7XG5cblxuXG4vLyBFeGFtcGxlIDE6IEZyb20gYW4gZWxlbWVudCBpbiBET01cbiQoJy5vcGVuLXBvcHVwLWxpbmsnKS5tYWduaWZpY1BvcHVwKHtcbiAgdHlwZTonaW5saW5lJyxcbiAgbWlkQ2xpY2s6IHRydWUgLy8gYWxsb3cgb3BlbmluZyBwb3B1cCBvbiBtaWRkbGUgbW91c2UgY2xpY2suIEFsd2F5cyBzZXQgaXQgdG8gdHJ1ZSBpZiB5b3UgZG9uJ3QgcHJvdmlkZSBhbHRlcm5hdGl2ZSBzb3VyY2UuXG59KTtcblxuLy8gcmVzcG9uc2l2ZSBuYXZpZ2F0aW9uXG5cblxuXG4kKGZ1bmN0aW9uKCkge1xuICAgIHZhciBwdWxsICAgICAgICA9ICQoJyNwdWxsJyk7XG4gICAgdmFyIG1lbnUgICAgICAgID0gJCgnbmF2IHVsJyk7XG4gICAgdmFyIG1lbnVIZWlnaHQgID0gbWVudS5oZWlnaHQoKTtcbiBcbiAgICAkKHB1bGwpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBtZW51LnNsaWRlVG9nZ2xlKCk7XG4gICAgfSk7XG59KTtcblxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xuICAgIHZhciB3ID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgaWYodyA+IDMyMCAmJiBtZW51LmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgbWVudS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgIH1cbn0pOyAiXX0=
