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

$(function () {
  $('nav a').click(function () {
    $('nav a').removeClass("active");
    $(this).addClass("active");
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

// init controller
var controller = new ScrollMagic.Controller();

// create a scene
new ScrollMagic.Scene({
  duration: 250, // the scene should last for a scroll distance of 100px
  offset: 200 // start this scene after scrolling for 50px
}).setPin(".header") // pins the element for the the scene's duration
.addTo(controller); // assign the scene to the controller

// init controller
var controller = new ScrollMagic.Controller();
// create a scene
new ScrollMagic.Scene({
  duration: 110, // the scene should last for a scroll distance of 100px
  offset: 1000 // start this scene after scrolling for 50px
}).setPin(".intro-footer") // pins the element for the the scene's duration
.addTo(controller); // assign the scene to the controller

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxLQUFsQyxDQUF3QyxZQUFXO0FBQ2pELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBTCxFQUFlO0FBQ2hILFVBQUksU0FBUyxFQUFFLEtBQUssSUFBTCxDQUFYLENBRDRHO0FBRWhILGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBL0IsQ0FBM0IsQ0FGdUc7QUFHaEgsVUFBSSxPQUFPLE1BQVAsRUFBZTtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCLEdBQWhCO1NBRGIsRUFFRyxJQUZILEVBRGlCO0FBSWpCLGVBQU8sS0FBUCxDQUppQjtPQUFuQjtLQUhGO0dBRHNDLENBQXhDLENBRFc7Q0FBWCxDQUFGOztBQWlCQSxFQUFFLFlBQVU7QUFDVixJQUFFLE9BQUYsRUFBVyxLQUFYLENBQWlCLFlBQVU7QUFDekIsTUFBRSxPQUFGLEVBQVcsV0FBWCxDQUF1QixRQUF2QixFQUR5QjtBQUV6QixNQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLFFBQWpCLEVBRnlCO0dBQVYsQ0FBakIsQ0FEVTtDQUFWLENBQUY7Ozs7QUFVQSxDQUFDLFlBQVc7QUFDSixNQUFJLFVBQVUsRUFBRSxNQUFGLEVBQVUsTUFBVixFQUFWO01BQ0YsVUFBVSxFQUFFLFlBQUYsQ0FBVjtNQUNBLGdCQUFnQixRQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLE1BQW5CLEVBQWhCLENBSEU7QUFJSixVQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLENBQUMsVUFBVSxhQUFWLENBQUQsR0FBMEIsQ0FBMUIsR0FBOEIsTUFBOUIsQ0FBdkIsQ0FKSTtBQUtKLElBQUUsUUFBRixFQUFZLEVBQVosQ0FBZSxRQUFmLEVBQXlCLFlBQVc7QUFDbEMsWUFBUSxPQUFSLENBQWdCLElBQWhCLEVBQXNCLFlBQVc7QUFBRSxRQUFFLFFBQUYsRUFBWSxHQUFaLENBQWdCLFFBQWhCLEVBQUY7S0FBWCxDQUF0QixDQURrQztHQUFYLENBQXpCLENBTEk7Q0FBWCxDQUFEOzs7QUFZQSxJQUFJLGFBQWEsSUFBSSxZQUFZLFVBQVosRUFBakI7OztBQUdKLElBQUksWUFBWSxLQUFaLENBQWtCO0FBQ2QsWUFBVSxHQUFWO0FBQ0EsVUFBUSxHQUFSO0FBRmMsQ0FBdEIsRUFJSyxNQUpMLENBSVksU0FKWjtDQUtLLEtBTEwsQ0FLVyxVQUxYOzs7QUFTQSxJQUFJLGFBQWEsSUFBSSxZQUFZLFVBQVosRUFBakI7O0FBRUosSUFBSSxZQUFZLEtBQVosQ0FBa0I7QUFDZCxZQUFVLEdBQVY7QUFDQSxVQUFRLElBQVI7QUFGYyxDQUF0QixFQUlLLE1BSkwsQ0FJWSxlQUpaO0NBS0ssS0FMTCxDQUtXLFVBTFgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoganNoaW50IGRldmVsOnRydWUgKi9cbmNvbnNvbGUubG9nKCdMb29rIGF0IGFwcC9qcy9tYWluLmpzJyk7XG5cblxuJChmdW5jdGlvbigpIHtcbiAgJCgnYVtocmVmKj1cIiNcIl06bm90KFtocmVmPVwiI1wiXSknKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpICYmIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWUpIHtcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArJ10nKTtcbiAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG5cblxuXG4kKGZ1bmN0aW9uKCl7XG4gICQoJ25hdiBhJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAkKCduYXYgYScpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQodGhpcykuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG59KTtcbn0pO1xuXG4vLyBJbnRybyBGdWxsIFNjcmVlbiBwYWdlIFNlY3Rpb24gIFxuXG5cbihmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHdpbmRvd0ggPSAkKHdpbmRvdykuaGVpZ2h0KCksXG4gICAgICAgICAgaW50cm9FbCA9ICQoJ2Rpdi5vcGVuZXInKSxcbiAgICAgICAgICBpbnRyb0hlYWRpbmdIID0gaW50cm9FbC5maW5kKCdoMScpLmhlaWdodCgpO1xuICAgICAgICBpbnRyb0VsLmNzcygncGFkZGluZycsICh3aW5kb3dIIC0gaW50cm9IZWFkaW5nSCkvMiArICdweCAwJyk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpbnRyb0VsLnNsaWRlVXAoMTAwMCwgZnVuY3Rpb24oKSB7ICQoZG9jdW1lbnQpLm9mZignc2Nyb2xsJyk7IH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pKCk7XG5cblxuLy8gaW5pdCBjb250cm9sbGVyXG52YXIgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cbi8vIGNyZWF0ZSBhIHNjZW5lXG5uZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xuICAgICAgICBkdXJhdGlvbjogMjUwLCAgLy8gdGhlIHNjZW5lIHNob3VsZCBsYXN0IGZvciBhIHNjcm9sbCBkaXN0YW5jZSBvZiAxMDBweFxuICAgICAgICBvZmZzZXQ6IDIwMCAgICAgIC8vIHN0YXJ0IHRoaXMgc2NlbmUgYWZ0ZXIgc2Nyb2xsaW5nIGZvciA1MHB4XG4gICAgfSlcbiAgICAuc2V0UGluKFwiLmhlYWRlclwiKSAvLyBwaW5zIHRoZSBlbGVtZW50IGZvciB0aGUgdGhlIHNjZW5lJ3MgZHVyYXRpb25cbiAgICAuYWRkVG8oY29udHJvbGxlcik7IC8vIGFzc2lnbiB0aGUgc2NlbmUgdG8gdGhlIGNvbnRyb2xsZXJcblxuXG4vLyBpbml0IGNvbnRyb2xsZXJcbnZhciBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcbi8vIGNyZWF0ZSBhIHNjZW5lXG5uZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xuICAgICAgICBkdXJhdGlvbjogMTEwLCAgLy8gdGhlIHNjZW5lIHNob3VsZCBsYXN0IGZvciBhIHNjcm9sbCBkaXN0YW5jZSBvZiAxMDBweFxuICAgICAgICBvZmZzZXQ6IDEwMDAgICAgICAvLyBzdGFydCB0aGlzIHNjZW5lIGFmdGVyIHNjcm9sbGluZyBmb3IgNTBweFxuICAgIH0pXG4gICAgLnNldFBpbihcIi5pbnRyby1mb290ZXJcIikgLy8gcGlucyB0aGUgZWxlbWVudCBmb3IgdGhlIHRoZSBzY2VuZSdzIGR1cmF0aW9uXG4gICAgLmFkZFRvKGNvbnRyb2xsZXIpOyAvLyBhc3NpZ24gdGhlIHNjZW5lIHRvIHRoZSBjb250cm9sbGVyXG5cblxuXG5cblxuXG5cblxuIl19
