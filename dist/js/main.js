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

// init controller
var controller = new ScrollMagic.Controller();

// build scene
var scene = new ScrollMagic.Scene({ triggerElement: ".diamond-text" })

// trigger a velocity opaticy animation
.setVelocity(".diamond h2", { opacity: 1 }, { duration: 400 }).addIndicators() // add indicators (requires plugin)
.addTo(controller);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxLQUFsQyxDQUF3QyxZQUFXO0FBQ2pELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBTCxFQUFlO0FBQ2hILFVBQUksU0FBUyxFQUFFLEtBQUssSUFBTCxDQUFYLENBRDRHO0FBRWhILGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBL0IsQ0FBM0IsQ0FGdUc7QUFHaEgsVUFBSSxPQUFPLE1BQVAsRUFBZTtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCLEdBQWhCO1NBRGIsRUFFRyxJQUZILEVBRGlCO0FBSWpCLGVBQU8sS0FBUCxDQUppQjtPQUFuQjtLQUhGO0dBRHNDLENBQXhDLENBRFc7Q0FBWCxDQUFGOztBQWlCQSxFQUFFLFlBQVU7QUFDVixJQUFFLE9BQUYsRUFBVyxLQUFYLENBQWlCLFlBQVU7QUFDekIsTUFBRSxPQUFGLEVBQVcsV0FBWCxDQUF1QixRQUF2QixFQUR5QjtBQUV6QixNQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLFFBQWpCLEVBRnlCO0dBQVYsQ0FBakIsQ0FEVTtDQUFWLENBQUY7Ozs7QUFVQSxDQUFDLFlBQVc7QUFDSixNQUFJLFVBQVUsRUFBRSxNQUFGLEVBQVUsTUFBVixFQUFWO01BQ0YsVUFBVSxFQUFFLFlBQUYsQ0FBVjtNQUNBLGdCQUFnQixRQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLE1BQW5CLEVBQWhCLENBSEU7QUFJSixVQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLENBQUMsVUFBVSxhQUFWLENBQUQsR0FBMEIsQ0FBMUIsR0FBOEIsTUFBOUIsQ0FBdkIsQ0FKSTtBQUtKLElBQUUsUUFBRixFQUFZLEVBQVosQ0FBZSxRQUFmLEVBQXlCLFlBQVc7QUFDbEMsWUFBUSxPQUFSLENBQWdCLElBQWhCLEVBQXNCLFlBQVc7QUFBRSxRQUFFLFFBQUYsRUFBWSxHQUFaLENBQWdCLFFBQWhCLEVBQUY7S0FBWCxDQUF0QixDQURrQztHQUFYLENBQXpCLENBTEk7Q0FBWCxDQUFEOzs7QUFZQSxJQUFJLGFBQWEsSUFBSSxZQUFZLFVBQVosRUFBakI7OztBQUdKLElBQUksWUFBWSxLQUFaLENBQWtCO0FBQ2QsWUFBVSxHQUFWO0FBQ0EsVUFBUSxHQUFSO0FBRmMsQ0FBdEIsRUFJSyxNQUpMLENBSVksU0FKWjtDQUtLLEtBTEwsQ0FLVyxVQUxYOzs7QUFTQSxJQUFJLGFBQWEsSUFBSSxZQUFZLFVBQVosRUFBakI7O0FBRUosSUFBSSxZQUFZLEtBQVosQ0FBa0I7QUFDZCxZQUFVLEdBQVY7QUFDQSxVQUFRLElBQVI7QUFGYyxDQUF0QixFQUlLLE1BSkwsQ0FJWSxlQUpaO0NBS0ssS0FMTCxDQUtXLFVBTFg7OztBQVVBLElBQUksYUFBYSxJQUFJLFlBQVksVUFBWixFQUFqQjs7O0FBR0osSUFBSSxRQUFRLElBQUksWUFBWSxLQUFaLENBQWtCLEVBQUMsZ0JBQWdCLGVBQWhCLEVBQXZCOzs7Q0FHUCxXQUhPLENBR0ssYUFITCxFQUdvQixFQUFDLFNBQVMsQ0FBVCxFQUhyQixFQUdrQyxFQUFDLFVBQVUsR0FBVixFQUhuQyxFQUtWLGFBTFU7Q0FNVixLQU5VLENBTUosVUFOSSxDQUFSIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGpzaGludCBkZXZlbDp0cnVlICovXG5jb25zb2xlLmxvZygnTG9vayBhdCBhcHAvanMvbWFpbi5qcycpO1xuXG5cbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XG4gICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG5cblxuJChmdW5jdGlvbigpe1xuICAkKCduYXYgYScpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgJCgnbmF2IGEnKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKHRoaXMpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xufSk7XG59KTtcblxuLy8gSW50cm8gRnVsbCBTY3JlZW4gcGFnZSBTZWN0aW9uICBcblxuXG4oZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB3aW5kb3dIID0gJCh3aW5kb3cpLmhlaWdodCgpLFxuICAgICAgICAgIGludHJvRWwgPSAkKCdkaXYub3BlbmVyJyksXG4gICAgICAgICAgaW50cm9IZWFkaW5nSCA9IGludHJvRWwuZmluZCgnaDEnKS5oZWlnaHQoKTtcbiAgICAgICAgaW50cm9FbC5jc3MoJ3BhZGRpbmcnLCAod2luZG93SCAtIGludHJvSGVhZGluZ0gpLzIgKyAncHggMCcpO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaW50cm9FbC5zbGlkZVVwKDEwMDAsIGZ1bmN0aW9uKCkgeyAkKGRvY3VtZW50KS5vZmYoJ3Njcm9sbCcpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KSgpO1xuXG5cbi8vIGluaXQgY29udHJvbGxlclxudmFyIGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG4vLyBjcmVhdGUgYSBzY2VuZVxubmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcbiAgICAgICAgZHVyYXRpb246IDI1MCwgIC8vIHRoZSBzY2VuZSBzaG91bGQgbGFzdCBmb3IgYSBzY3JvbGwgZGlzdGFuY2Ugb2YgMTAwcHhcbiAgICAgICAgb2Zmc2V0OiAyMDAgICAgICAvLyBzdGFydCB0aGlzIHNjZW5lIGFmdGVyIHNjcm9sbGluZyBmb3IgNTBweFxuICAgIH0pXG4gICAgLnNldFBpbihcIi5oZWFkZXJcIikgLy8gcGlucyB0aGUgZWxlbWVudCBmb3IgdGhlIHRoZSBzY2VuZSdzIGR1cmF0aW9uXG4gICAgLmFkZFRvKGNvbnRyb2xsZXIpOyAvLyBhc3NpZ24gdGhlIHNjZW5lIHRvIHRoZSBjb250cm9sbGVyXG5cblxuLy8gaW5pdCBjb250cm9sbGVyXG52YXIgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG4vLyBjcmVhdGUgYSBzY2VuZVxubmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcbiAgICAgICAgZHVyYXRpb246IDExMCwgIC8vIHRoZSBzY2VuZSBzaG91bGQgbGFzdCBmb3IgYSBzY3JvbGwgZGlzdGFuY2Ugb2YgMTAwcHhcbiAgICAgICAgb2Zmc2V0OiAxMDAwICAgICAgLy8gc3RhcnQgdGhpcyBzY2VuZSBhZnRlciBzY3JvbGxpbmcgZm9yIDUwcHhcbiAgICB9KVxuICAgIC5zZXRQaW4oXCIuaW50cm8tZm9vdGVyXCIpIC8vIHBpbnMgdGhlIGVsZW1lbnQgZm9yIHRoZSB0aGUgc2NlbmUncyBkdXJhdGlvblxuICAgIC5hZGRUbyhjb250cm9sbGVyKTsgLy8gYXNzaWduIHRoZSBzY2VuZSB0byB0aGUgY29udHJvbGxlclxuXG5cblxuLy8gaW5pdCBjb250cm9sbGVyXG52YXIgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cbi8vIGJ1aWxkIHNjZW5lXG52YXIgc2NlbmUgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe3RyaWdnZXJFbGVtZW50OiBcIi5kaWFtb25kLXRleHRcIn0pXG5cbi8vIHRyaWdnZXIgYSB2ZWxvY2l0eSBvcGF0aWN5IGFuaW1hdGlvblxuICAgIC5zZXRWZWxvY2l0eShcIi5kaWFtb25kIGgyXCIsIHtvcGFjaXR5OiAxfSwge2R1cmF0aW9uOiA0MDB9KVxuXG5cdC5hZGRJbmRpY2F0b3JzKCkgLy8gYWRkIGluZGljYXRvcnMgKHJlcXVpcmVzIHBsdWdpbilcblx0LmFkZFRvKGNvbnRyb2xsZXIpO1xuXG5cblxuXG5cbiJdfQ==
