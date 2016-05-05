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

    if ($(this).hasClass("btn-close")) {
      $("body").css('overflow', 'hidden');
    } else if ($(this).hasClass("btn-open")) {
      $("body").css('overflow', 'auto');
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxLQUFsQyxDQUF3QyxZQUFXO0FBQ2pELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBTCxFQUFlO0FBQ2hILFVBQUksU0FBUyxFQUFFLEtBQUssSUFBTCxDQUFYLENBRDRHO0FBRWhILGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBL0IsQ0FBM0IsQ0FGdUc7QUFHaEgsVUFBSSxPQUFPLE1BQVAsRUFBZTtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCLEdBQWhCO1NBRGIsRUFFRyxJQUZILEVBRGlCO0FBSWpCLGVBQU8sS0FBUCxDQUppQjtPQUFuQjtLQUhGO0dBRHNDLENBQXhDLENBRFc7Q0FBWCxDQUFGOzs7O0FBc0JBLENBQUMsWUFBVztBQUNKLE1BQUksVUFBVSxFQUFFLE1BQUYsRUFBVSxNQUFWLEVBQVY7TUFDRixVQUFVLEVBQUUsWUFBRixDQUFWO01BQ0EsZ0JBQWdCLFFBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsTUFBbkIsRUFBaEIsQ0FIRTtBQUlKLFVBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsQ0FBQyxVQUFVLGFBQVYsQ0FBRCxHQUEwQixDQUExQixHQUE4QixNQUE5QixDQUF2QixDQUpJO0FBS0osSUFBRSxRQUFGLEVBQVksRUFBWixDQUFlLFFBQWYsRUFBeUIsWUFBVztBQUNsQyxZQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsRUFBc0IsWUFBVztBQUFFLFFBQUUsUUFBRixFQUFZLEdBQVosQ0FBZ0IsUUFBaEIsRUFBRjtLQUFYLENBQXRCLENBRGtDO0FBRWxDLE1BQUUsTUFBRixFQUFVLFNBQVYsQ0FBb0IsQ0FBcEIsRUFGa0M7R0FBWCxDQUF6QixDQUxJO0NBQVgsQ0FBRDs7O0FBbUJBLEVBQUUsa0JBQUYsRUFBc0IsYUFBdEIsQ0FBb0M7QUFDbEMsUUFBSyxRQUFMO0FBQ0EsZ0JBQWMsR0FBZDtBQUNBLGFBQVc7QUFDVCxnQkFBWSxzQkFBVztBQUNwQixXQUFLLEVBQUwsQ0FBUSxTQUFSLEdBQW9CLEtBQUssRUFBTCxDQUFRLEVBQVIsQ0FBVyxJQUFYLENBQWdCLGFBQWhCLENBQXBCLENBRG9CO0tBQVg7R0FEZDtBQUtBLFlBQVUsSUFBVjtBQVJrQyxDQUFwQzs7OztBQWtCQSxFQUFFLFFBQUYsRUFBWSxLQUFaLENBQWtCLFlBQVU7QUFDeEIsSUFBRSxXQUFGLEVBQWUsS0FBZixDQUFxQixZQUFVOztBQUkzQixNQUFFLFVBQUYsRUFBYyxVQUFkLENBQXlCLEdBQXpCLEVBSjJCO0FBSzVCLE1BQUUsSUFBRixFQUFRLFdBQVIsQ0FBb0IsVUFBcEIsRUFBZ0MsV0FBaEMsQ0FBNEMsV0FBNUMsRUFMNEI7O0FBTzVCLFFBQUksRUFBRSxJQUFGLEVBQVEsUUFBUixDQUFpQixXQUFqQixDQUFKLEVBQW1DO0FBQ2xDLFFBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxVQUFkLEVBQTBCLFFBQTFCLEVBRGtDO0tBQW5DLE1BRUksSUFBSSxFQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLFVBQWpCLENBQUosRUFBa0M7QUFDckMsUUFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFVBQWQsRUFBMEIsTUFBMUIsRUFEcUM7S0FBbEM7R0FUYyxDQUFyQixDQUR3QjtDQUFWLENBQWxCO0FBZ0JBLEVBQUUsVUFBRixFQUFjLEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsWUFBVTtBQUNoQyxJQUFFLFVBQUYsRUFBYyxVQUFkLENBQXlCLEdBQXpCLEVBRGdDO0FBRWhDLElBQUUsV0FBRixFQUFlLFdBQWYsQ0FBMkIsVUFBM0IsRUFBdUMsV0FBdkMsQ0FBbUQsV0FBbkQsRUFGZ0M7QUFHakMsSUFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFVBQWQsRUFBMEIsTUFBMUIsRUFIaUM7QUFJaEMsU0FBTyxLQUFQLENBSmdDO0NBQVYsQ0FBMUI7O0FBV0EsT0FBTyxRQUFQLEVBQWlCLEtBQWpCLENBQXVCLFVBQVMsQ0FBVCxFQUFXOztBQUVoQyxJQUFFLFNBQUYsRUFBYSxFQUFiLENBQWdCLE9BQWhCLEVBQXlCLFVBQVMsS0FBVCxFQUFlO0FBQ3RDLFVBQU0sY0FBTixHQURzQztBQUV0QyxNQUFFLFdBQUYsRUFBZSxRQUFmLENBQXdCLFlBQXhCLEVBRnNDO0FBR3JDLE1BQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxVQUFkLEVBQTBCLFFBQTFCLEVBSHFDO0dBQWYsQ0FBekI7O0FBRmdDLEdBUWhDLENBQUUsV0FBRixFQUFlLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsVUFBUyxLQUFULEVBQWU7QUFDeEMsUUFBSSxFQUFFLE1BQU0sTUFBTixDQUFGLENBQWdCLEVBQWhCLENBQW1CLFdBQW5CLEtBQW1DLEVBQUUsTUFBTSxNQUFOLENBQUYsQ0FBZ0IsRUFBaEIsQ0FBbUIsaUJBQW5CLENBQW5DLEVBQTJFO0FBQzdFLFFBQUUsV0FBRixFQUFlLFdBQWYsQ0FBMkIsWUFBM0IsRUFENkU7QUFFN0UsWUFBTSxjQUFOLEdBRjZFO0FBRzdFLFFBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxVQUFkLEVBQTBCLE1BQTFCLEVBSDZFO0tBQS9FO0dBRHlCLENBQTNCLENBUmdDO0NBQVgsQ0FBdkIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoganNoaW50IGRldmVsOnRydWUgKi9cbmNvbnNvbGUubG9nKCdMb29rIGF0IGFwcC9qcy9tYWluLmpzJyk7XG5cblxuJChmdW5jdGlvbigpIHtcbiAgJCgnYVtocmVmKj1cIiNcIl06bm90KFtocmVmPVwiI1wiXSknKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpICYmIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWUpIHtcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArJ10nKTtcbiAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG5cblxuXG5cblxuLy8gSW50cm8gRnVsbCBTY3JlZW4gcGFnZSBTZWN0aW9uXG5cblxuKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgd2luZG93SCA9ICQod2luZG93KS5oZWlnaHQoKSxcbiAgICAgICAgICBpbnRyb0VsID0gJCgnZGl2Lm9wZW5lcicpLFxuICAgICAgICAgIGludHJvSGVhZGluZ0ggPSBpbnRyb0VsLmZpbmQoJ2gxJykuaGVpZ2h0KCk7XG4gICAgICAgIGludHJvRWwuY3NzKCdwYWRkaW5nJywgKHdpbmRvd0ggLSBpbnRyb0hlYWRpbmdIKS8yICsgJ3B4IDAnKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGludHJvRWwuc2xpZGVVcCgxMDAwLCBmdW5jdGlvbigpIHsgJChkb2N1bWVudCkub2ZmKCdzY3JvbGwnKTsgfSk7XG4gICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcCgwKTtcblxuICAgICAgICB9KTtcbiAgICAgIH0pKCk7XG5cblxuXG5cblxuXG5cbi8vIEV4YW1wbGUgMTogRnJvbSBhbiBlbGVtZW50IGluIERPTVxuJCgnLm9wZW4tcG9wdXAtbGluaycpLm1hZ25pZmljUG9wdXAoe1xuICB0eXBlOidpbmxpbmUnLFxuICByZW1vdmFsRGVsYXk6IDUwMCwgLy9kZWxheSByZW1vdmFsIGJ5IFggdG8gYWxsb3cgb3V0LWFuaW1hdGlvblxuICBjYWxsYmFja3M6IHtcbiAgICBiZWZvcmVPcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICB0aGlzLnN0Lm1haW5DbGFzcyA9IHRoaXMuc3QuZWwuYXR0cignZGF0YS1lZmZlY3QnKTtcbiAgICB9XG4gIH0sXG4gIG1pZENsaWNrOiB0cnVlIC8vIGFsbG93IG9wZW5pbmcgcG9wdXAgb24gbWlkZGxlIG1vdXNlIGNsaWNrLiBBbHdheXMgc2V0IGl0IHRvIHRydWUgaWYgeW91IGRvbid0IHByb3ZpZGUgYWx0ZXJuYXRpdmUgc291cmNlLlxufSk7XG5cblxuXG5cbi8vIHJlc3BvbnNpdmUgbmF2aWdhdGlvblxuXG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAkKFwiLmJ1dHRvbiBhXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cblxuICAgICAgIFxuICAgICAgICAkKFwiLm92ZXJsYXlcIikuZmFkZVRvZ2dsZSgyMDApO1xuICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJykudG9nZ2xlQ2xhc3MoJ2J0bi1jbG9zZScpO1xuXG4gICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJidG4tY2xvc2VcIikpIHtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJidG4tb3BlblwiKSkge1xuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICB9XG59KTtcbiAgIFxufSk7XG4kKCcub3ZlcmxheScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAkKFwiLmJ1dHRvbiBhXCIpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcbiAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnYXV0bycpO1xuICAgIG9wZW4gPSBmYWxzZTtcbiAgICBcbn0pO1xuXG4gIFxuXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCl7XG4gIC8vb3BlbiB0aGUgbGF0ZXJhbCBwYW5lbFxuICAkKCcuY2QtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCgnLmNkLXBhbmVsJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgfSk7XG4gIC8vY2xvZGUgdGhlIGxhdGVyYWwgcGFuZWxcbiAgJCgnLmNkLXBhbmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGlmKCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wYW5lbCcpIHx8ICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXBhbmVsLWNsb3NlJykgKSB7IFxuICAgICAgJCgnLmNkLXBhbmVsJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbiJdfQ==
