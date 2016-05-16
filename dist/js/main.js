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
    $('.cd-panel-close').css({
      "display": "inline-block",
      "transition": "all ease-in 5s",
      "transition-delay": ".5s"
    });
  });
  //close the lateral panel
  $('.cd-panel').on('click', function (event) {
    if ($(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close')) {
      $('.cd-panel').removeClass('is-visible');
      event.preventDefault();

      $("body").css('overflow', 'auto');
      $('.cd-panel-close').css({ display: "none" });
    }
  });
});

jQuery(document).ready(function ($) {
  //cache DOM elements
  var projectsContainer = $('.cd-projects-container'),
      projectsPreviewWrapper = projectsContainer.find('.cd-projects-previews'),
      projectPreviews = projectsPreviewWrapper.children('li'),
      projects = projectsContainer.find('.cd-projects'),
      navigationTrigger = $('.cd-nav-trigger'),
      navigation = $('.cd-primary-nav'),

  //if browser doesn't support CSS transitions...
  transitionsNotSupported = $('.no-csstransitions').length > 0;

  var animating = false,

  //will be used to extract random numbers for projects slide up/slide down effect
  numRandoms = projects.find('li').length,
      uniqueRandoms = [];

  //open project
  projectsPreviewWrapper.on('click', 'a', function (event) {
    event.preventDefault();
    if (animating == false) {
      animating = true;
      navigationTrigger.add(projectsContainer).addClass('project-open');
      openProject($(this).parent('li'));
      $('.cd-panel-close').css({ display: "none" });
    }
  });

  navigationTrigger.on('click', function (event) {
    event.preventDefault();

    if (animating == false) {
      animating = true;
      if (navigationTrigger.hasClass('project-open')) {

        //close visible project
        navigationTrigger.add(projectsContainer).removeClass('project-open');
        closeProject();
        $('.cd-panel-close').css({ display: "inline-block" });
      } else if (navigationTrigger.hasClass('nav-visible')) {
        //close main navigation
        navigationTrigger.removeClass('nav-visible');
        navigation.removeClass('nav-clickable nav-visible');
        if (transitionsNotSupported) projectPreviews.removeClass('slide-out');else slideToggleProjects(projectsPreviewWrapper.children('li'), -1, 0, false);
      } else {
        //open main navigation
        navigationTrigger.addClass('nav-visible');
        navigation.addClass('nav-visible');
        if (transitionsNotSupported) projectPreviews.addClass('slide-out');else slideToggleProjects(projectsPreviewWrapper.children('li'), -1, 0, true);
      }
    }

    if (transitionsNotSupported) animating = false;
  });

  //scroll down to project info
  projectsContainer.on('click', '.scroll', function () {
    projectsContainer.animate({ 'scrollTop': $(window).height() }, 500);
  });

  //check if background-images have been loaded and show project previews
  projectPreviews.children('a').bgLoaded({
    afterLoaded: function afterLoaded() {
      showPreview(projectPreviews.eq(0));
    }
  });

  function showPreview(projectPreview) {
    if (projectPreview.length > 0) {
      setTimeout(function () {
        projectPreview.addClass('bg-loaded');
        showPreview(projectPreview.next());
      }, 150);
    }
  }

  function openProject(projectPreview) {
    var projectIndex = projectPreview.index();
    projects.children('li').eq(projectIndex).add(projectPreview).addClass('selected');

    if (transitionsNotSupported) {
      projectPreviews.addClass('slide-out').removeClass('selected');
      projects.children('li').eq(projectIndex).addClass('content-visible');
      animating = false;
    } else {
      slideToggleProjects(projectPreviews, projectIndex, 0, true);
    }
  }

  function closeProject() {
    projects.find('.selected').removeClass('selected').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
      $(this).removeClass('content-visible').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      slideToggleProjects(projectsPreviewWrapper.children('li'), -1, 0, false);
    });

    //if browser doesn't support CSS transitions...
    if (transitionsNotSupported) {
      projectPreviews.removeClass('slide-out');
      projects.find('.content-visible').removeClass('content-visible');
      animating = false;
    }
  }

  function slideToggleProjects(projectsPreviewWrapper, projectIndex, index, bool) {
    if (index == 0) createArrayRandom();
    if (projectIndex != -1 && index == 0) index = 1;

    var randomProjectIndex = makeUniqueRandom();
    if (randomProjectIndex == projectIndex) randomProjectIndex = makeUniqueRandom();

    if (index < numRandoms - 1) {
      projectsPreviewWrapper.eq(randomProjectIndex).toggleClass('slide-out', bool);
      setTimeout(function () {
        //animate next preview project
        slideToggleProjects(projectsPreviewWrapper, projectIndex, index + 1, bool);
      }, 150);
    } else if (index == numRandoms - 1) {
      //this is the last project preview to be animated
      projectsPreviewWrapper.eq(randomProjectIndex).toggleClass('slide-out', bool).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
        if (projectIndex != -1) {
          projects.children('li.selected').addClass('content-visible');
          projectsPreviewWrapper.eq(projectIndex).addClass('slide-out').removeClass('selected');
        } else if (navigation.hasClass('nav-visible') && bool) {
          navigation.addClass('nav-clickable');
        }
        projectsPreviewWrapper.eq(randomProjectIndex).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        animating = false;
      });
    }
  }

  //http://stackoverflow.com/questions/19351759/javascript-random-number-out-of-5-no-repeat-until-all-have-been-used
  function makeUniqueRandom() {
    var index = Math.floor(Math.random() * uniqueRandoms.length);
    var val = uniqueRandoms[index];
    // now remove that value from the array
    uniqueRandoms.splice(index, 1);
    return val;
  }

  function createArrayRandom() {
    //reset array
    uniqueRandoms.length = 0;
    for (var i = 0; i < numRandoms; i++) {
      uniqueRandoms.push(i);
    }
  }
});

/*
* BG Loaded
* Copyright (c) 2014 Jonathan Catmull
* Licensed under the MIT license.
*/
(function ($) {
  $.fn.bgLoaded = function (custom) {
    var self = this;

    // Default plugin settings
    var defaults = {
      afterLoaded: function afterLoaded() {
        this.addClass('bg-loaded');
      }
    };

    // Merge default and user settings
    var settings = $.extend({}, defaults, custom);

    // Loop through element
    self.each(function () {
      var $this = $(this),
          bgImgs = $this.css('background-image').split(', ');
      $this.data('loaded-count', 0);
      $.each(bgImgs, function (key, value) {
        var img = value.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        $('<img/>').attr('src', img).load(function () {
          $(this).remove(); // prevent memory leaks
          $this.data('loaded-count', $this.data('loaded-count') + 1);
          if ($this.data('loaded-count') >= bgImgs.length) {
            settings.afterLoaded.call($this);
          }
        });
      });
    });
  };
})(jQuery);

// init controller
var controller = new ScrollMagic.Controller();

// create a scene
new ScrollMagic.Scene({
  duration: 480, // the scene should last for a scroll distance of 100px
  offset: 300 // start this scene after scrolling for 50px
}).setPin(".welcome-div") // pins the element for the the scene's duration
.addTo(controller); // assign the scene to the controller

$('.content-bg').parallax({ imageSrc: 'images/content-bg.jpg' });

$(window).scroll(function () {
  $(window).trigger('resize');
});

(function () {

  // detect if IE : from http://stackoverflow.com/a/16657946   
  var ie = function () {
    var undef,
        rv = -1; // Return value assumes failure.
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
      // IE 10 or older => return version number
      rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    } else if (trident > 0) {
      // IE 11 (or newer) => return version number
      var rvNum = ua.indexOf('rv:');
      rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
    }

    return rv > -1 ? rv : undef;
  }();

  // disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179         
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = [32, 37, 38, 39, 40],
      wheelIter = 0;

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
  }

  function keydown(e) {
    for (var i = keys.length; i--;) {
      if (e.keyCode === keys[i]) {
        preventDefault(e);
        return;
      }
    }
  }

  function touchmove(e) {
    preventDefault(e);
  }

  function wheel(e) {
    // for IE
    //if( ie ) {
    //preventDefault(e);
    //}
  }

  function disable_scroll() {
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
    document.body.ontouchmove = touchmove;
  }

  function enable_scroll() {
    window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
  }

  var docElem = window.document.documentElement,
      scrollVal,
      isRevealed,
      noscroll,
      isAnimating,
      container = document.getElementById('container'),
      trigger = container.querySelector('button.trigger');

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  function scrollPage() {
    scrollVal = scrollY();

    if (noscroll && !ie) {
      if (scrollVal < 0) return false;
      // keep it that way
      window.scrollTo(0, 0);
    }

    if (classie.has(container, 'notrans')) {
      classie.remove(container, 'notrans');
      return false;
    }

    if (isAnimating) {
      return false;
    }

    if (scrollVal <= 0 && isRevealed) {
      toggle(0);
    } else if (scrollVal > 0 && !isRevealed) {
      toggle(1);
    }
  }

  function toggle(reveal) {
    isAnimating = true;

    if (reveal) {
      classie.add(container, 'modify');
    } else {
      noscroll = true;
      disable_scroll();
      classie.remove(container, 'modify');
    }

    // simulating the end of the transition:
    setTimeout(function () {
      isRevealed = !isRevealed;
      isAnimating = false;
      if (reveal) {
        noscroll = false;
        enable_scroll();
      }
    }, 1200);
  }

  // refreshing the page...
  var pageScroll = scrollY();
  noscroll = pageScroll === 0;

  disable_scroll();

  if (pageScroll) {
    isRevealed = true;
    classie.add(container, 'notrans');
    classie.add(container, 'modify');
  }

  window.addEventListener('scroll', scrollPage);
  trigger.addEventListener('click', function () {
    toggle('reveal');
  });
})();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxLQUFsQyxDQUF3QyxZQUFXO0FBQ2pELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBTCxFQUFlO0FBQ2hILFVBQUksU0FBUyxFQUFFLEtBQUssSUFBTCxDQUFYLENBRDRHO0FBRWhILGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBL0IsQ0FBM0IsQ0FGdUc7QUFHaEgsVUFBSSxPQUFPLE1BQVAsRUFBZTtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCLEdBQWhCO1NBRGIsRUFFRyxJQUZILEVBRGlCO0FBSWpCLGVBQU8sS0FBUCxDQUppQjtPQUFuQjtLQUhGO0dBRHNDLENBQXhDLENBRFc7Q0FBWCxDQUFGOzs7QUF3QkEsRUFBRSxrQkFBRixFQUFzQixhQUF0QixDQUFvQztBQUNsQyxRQUFLLFFBQUw7QUFDQSxnQkFBYyxHQUFkO0FBQ0EsYUFBVztBQUNULGdCQUFZLHNCQUFXO0FBQ3BCLFdBQUssRUFBTCxDQUFRLFNBQVIsR0FBb0IsS0FBSyxFQUFMLENBQVEsRUFBUixDQUFXLElBQVgsQ0FBZ0IsYUFBaEIsQ0FBcEIsQ0FEb0I7S0FBWDtHQURkO0FBS0EsWUFBVSxJQUFWO0FBUmtDLENBQXBDOzs7O0FBa0JB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YXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGpzaGludCBkZXZlbDp0cnVlICovXG5jb25zb2xlLmxvZygnTG9vayBhdCBhcHAvanMvbWFpbi5qcycpO1xuXG5cbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XG4gICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG5cblxuXG5cblxuXG5cblxuLy8gRXhhbXBsZSAxOiBGcm9tIGFuIGVsZW1lbnQgaW4gRE9NXG4kKCcub3Blbi1wb3B1cC1saW5rJykubWFnbmlmaWNQb3B1cCh7XG4gIHR5cGU6J2lubGluZScsXG4gIHJlbW92YWxEZWxheTogNTAwLCAvL2RlbGF5IHJlbW92YWwgYnkgWCB0byBhbGxvdyBvdXQtYW5pbWF0aW9uXG4gIGNhbGxiYWNrczoge1xuICAgIGJlZm9yZU9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgIHRoaXMuc3QubWFpbkNsYXNzID0gdGhpcy5zdC5lbC5hdHRyKCdkYXRhLWVmZmVjdCcpO1xuICAgIH1cbiAgfSxcbiAgbWlkQ2xpY2s6IHRydWUgLy8gYWxsb3cgb3BlbmluZyBwb3B1cCBvbiBtaWRkbGUgbW91c2UgY2xpY2suIEFsd2F5cyBzZXQgaXQgdG8gdHJ1ZSBpZiB5b3UgZG9uJ3QgcHJvdmlkZSBhbHRlcm5hdGl2ZSBzb3VyY2UuXG59KTtcblxuXG5cblxuLy8gcmVzcG9uc2l2ZSBuYXZpZ2F0aW9uXG5cblxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgICQoXCIuYnV0dG9uIGFcIikuY2xpY2soZnVuY3Rpb24oKXtcblxuXG4gICAgICAgXG4gICAgICAgICQoXCIub3ZlcmxheVwiKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYnRuLW9wZW4nKS50b2dnbGVDbGFzcygnYnRuLWNsb3NlJyk7XG5cbiAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImJ0bi1jbG9zZVwiKSkge1xuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImJ0bi1vcGVuXCIpKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnYXV0bycpO1xuICAgIH1cbn0pO1xuICAgXG59KTtcbiQoJy5vdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKFwiLm92ZXJsYXlcIikuZmFkZVRvZ2dsZSgyMDApO1xuICAgICQoXCIuYnV0dG9uIGFcIikudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJykudG9nZ2xlQ2xhc3MoJ2J0bi1jbG9zZScpO1xuICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdhdXRvJyk7XG4gICAgb3BlbiA9IGZhbHNlO1xuICAgIFxufSk7XG5cblxuXG5cblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKXtcbiAgLy9vcGVuIHRoZSBsYXRlcmFsIHBhbmVsXG4gICQoJy5jZC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkKCcuY2QtcGFuZWwnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiaW5saW5lLWJsb2NrXCIsIFxuICAgICAgICBcInRyYW5zaXRpb25cIjogXCJhbGwgZWFzZS1pbiA1c1wiLCBcbiAgICAgICAgXCJ0cmFuc2l0aW9uLWRlbGF5XCIgOiBcIi41c1wiXG4gICAgICB9KTtcblxuICB9KTtcbiAgLy9jbG9zZSB0aGUgbGF0ZXJhbCBwYW5lbFxuICAkKCcuY2QtcGFuZWwnKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG4gICAgaWYoICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXBhbmVsJykgfHwgJChldmVudC50YXJnZXQpLmlzKCcuY2QtcGFuZWwtY2xvc2UnKSApIHsgXG4gICAgICAkKCcuY2QtcGFuZWwnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdhdXRvJyk7XG4gICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xuICAgIH1cbiAgfSk7XG59KTtcblxuXG5cblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKXtcbiAgLy9jYWNoZSBET00gZWxlbWVudHNcbiAgdmFyIHByb2plY3RzQ29udGFpbmVyID0gJCgnLmNkLXByb2plY3RzLWNvbnRhaW5lcicpLFxuICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIgPSBwcm9qZWN0c0NvbnRhaW5lci5maW5kKCcuY2QtcHJvamVjdHMtcHJldmlld3MnKSxcbiAgICBwcm9qZWN0UHJldmlld3MgPSBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLFxuICAgIHByb2plY3RzID0gcHJvamVjdHNDb250YWluZXIuZmluZCgnLmNkLXByb2plY3RzJyksXG4gICAgbmF2aWdhdGlvblRyaWdnZXIgPSAkKCcuY2QtbmF2LXRyaWdnZXInKSxcbiAgICBuYXZpZ2F0aW9uID0gJCgnLmNkLXByaW1hcnktbmF2JyksXG4gICAgLy9pZiBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBDU1MgdHJhbnNpdGlvbnMuLi5cbiAgICB0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCA9ICggJCgnLm5vLWNzc3RyYW5zaXRpb25zJykubGVuZ3RoID4gMCk7XG5cbiAgdmFyIGFuaW1hdGluZyA9IGZhbHNlLFxuICAgIC8vd2lsbCBiZSB1c2VkIHRvIGV4dHJhY3QgcmFuZG9tIG51bWJlcnMgZm9yIHByb2plY3RzIHNsaWRlIHVwL3NsaWRlIGRvd24gZWZmZWN0XG4gICAgbnVtUmFuZG9tcyA9IHByb2plY3RzLmZpbmQoJ2xpJykubGVuZ3RoLCBcbiAgICB1bmlxdWVSYW5kb21zID0gW107XG5cbiAgLy9vcGVuIHByb2plY3RcbiAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5vbignY2xpY2snLCAnYScsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmKCBhbmltYXRpbmcgPT0gZmFsc2UgKSB7XG4gICAgICBhbmltYXRpbmcgPSB0cnVlO1xuICAgICAgbmF2aWdhdGlvblRyaWdnZXIuYWRkKHByb2plY3RzQ29udGFpbmVyKS5hZGRDbGFzcygncHJvamVjdC1vcGVuJyk7XG4gICAgICBvcGVuUHJvamVjdCgkKHRoaXMpLnBhcmVudCgnbGknKSk7XG4gICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe2Rpc3BsYXk6IFwibm9uZVwifSk7XG4gICAgfVxuICB9KTtcblxuICBuYXZpZ2F0aW9uVHJpZ2dlci5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICBpZiggYW5pbWF0aW5nID09IGZhbHNlICkge1xuICAgICAgYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgIGlmKCBuYXZpZ2F0aW9uVHJpZ2dlci5oYXNDbGFzcygncHJvamVjdC1vcGVuJykgKSB7XG5cbiAgICAgICAgLy9jbG9zZSB2aXNpYmxlIHByb2plY3RcbiAgICAgICAgbmF2aWdhdGlvblRyaWdnZXIuYWRkKHByb2plY3RzQ29udGFpbmVyKS5yZW1vdmVDbGFzcygncHJvamVjdC1vcGVuJyk7XG4gICAgICAgIGNsb3NlUHJvamVjdCgpO1xuICAgICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe2Rpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCJ9KTtcbiAgICAgIH0gZWxzZSBpZiggbmF2aWdhdGlvblRyaWdnZXIuaGFzQ2xhc3MoJ25hdi12aXNpYmxlJykgKSB7XG4gICAgICAgIC8vY2xvc2UgbWFpbiBuYXZpZ2F0aW9uXG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLnJlbW92ZUNsYXNzKCduYXYtdmlzaWJsZScpO1xuICAgICAgICBuYXZpZ2F0aW9uLnJlbW92ZUNsYXNzKCduYXYtY2xpY2thYmxlIG5hdi12aXNpYmxlJyk7XG4gICAgICAgIGlmKHRyYW5zaXRpb25zTm90U3VwcG9ydGVkKSBwcm9qZWN0UHJldmlld3MucmVtb3ZlQ2xhc3MoJ3NsaWRlLW91dCcpO1xuICAgICAgICBlbHNlIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSwgLTEsIDAsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vb3BlbiBtYWluIG5hdmlnYXRpb25cbiAgICAgICAgbmF2aWdhdGlvblRyaWdnZXIuYWRkQ2xhc3MoJ25hdi12aXNpYmxlJyk7XG4gICAgICAgIG5hdmlnYXRpb24uYWRkQ2xhc3MoJ25hdi12aXNpYmxlJyk7XG4gICAgICAgIGlmKHRyYW5zaXRpb25zTm90U3VwcG9ydGVkKSBwcm9qZWN0UHJldmlld3MuYWRkQ2xhc3MoJ3NsaWRlLW91dCcpO1xuICAgICAgICBlbHNlIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSwgLTEsIDAsIHRydWUpO1xuICAgICAgfVxuICAgIH0gXG5cbiAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgYW5pbWF0aW5nID0gZmFsc2U7XG4gIH0pO1xuXG5cblxuXG4gIC8vc2Nyb2xsIGRvd24gdG8gcHJvamVjdCBpbmZvXG4gIHByb2plY3RzQ29udGFpbmVyLm9uKCdjbGljaycsICcuc2Nyb2xsJywgZnVuY3Rpb24oKXtcbiAgICBwcm9qZWN0c0NvbnRhaW5lci5hbmltYXRlKHsnc2Nyb2xsVG9wJzokKHdpbmRvdykuaGVpZ2h0KCl9LCA1MDApOyBcbiAgfSk7XG5cbiAgLy9jaGVjayBpZiBiYWNrZ3JvdW5kLWltYWdlcyBoYXZlIGJlZW4gbG9hZGVkIGFuZCBzaG93IHByb2plY3QgcHJldmlld3NcbiAgcHJvamVjdFByZXZpZXdzLmNoaWxkcmVuKCdhJykuYmdMb2FkZWQoe1xuICAgICAgYWZ0ZXJMb2FkZWQgOiBmdW5jdGlvbigpe1xuICAgICAgICBzaG93UHJldmlldyhwcm9qZWN0UHJldmlld3MuZXEoMCkpO1xuICAgICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBzaG93UHJldmlldyhwcm9qZWN0UHJldmlldykge1xuICAgIGlmKHByb2plY3RQcmV2aWV3Lmxlbmd0aCA+IDAgKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIHByb2plY3RQcmV2aWV3LmFkZENsYXNzKCdiZy1sb2FkZWQnKTtcbiAgICAgICAgc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXcubmV4dCgpKTtcbiAgICAgIH0sIDE1MCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb3BlblByb2plY3QocHJvamVjdFByZXZpZXcpIHtcbiAgICB2YXIgcHJvamVjdEluZGV4ID0gcHJvamVjdFByZXZpZXcuaW5kZXgoKTtcbiAgICBwcm9qZWN0cy5jaGlsZHJlbignbGknKS5lcShwcm9qZWN0SW5kZXgpLmFkZChwcm9qZWN0UHJldmlldykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgXG4gICAgaWYoIHRyYW5zaXRpb25zTm90U3VwcG9ydGVkICkge1xuICAgICAgcHJvamVjdFByZXZpZXdzLmFkZENsYXNzKCdzbGlkZS1vdXQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgIHByb2plY3RzLmNoaWxkcmVuKCdsaScpLmVxKHByb2plY3RJbmRleCkuYWRkQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpO1xuICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfSBlbHNlIHsgXG4gICAgICBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RQcmV2aWV3cywgcHJvamVjdEluZGV4LCAwLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZVByb2plY3QoKSB7XG4gICAgcHJvamVjdHMuZmluZCgnLnNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJykub24oJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpe1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnY29udGVudC12aXNpYmxlJykub2ZmKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyk7XG4gICAgICBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICAvL2lmIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IENTUyB0cmFuc2l0aW9ucy4uLlxuICAgIGlmKCB0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCApIHtcbiAgICAgIHByb2plY3RQcmV2aWV3cy5yZW1vdmVDbGFzcygnc2xpZGUtb3V0Jyk7XG4gICAgICBwcm9qZWN0cy5maW5kKCcuY29udGVudC12aXNpYmxlJykucmVtb3ZlQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpO1xuICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLCBwcm9qZWN0SW5kZXgsIGluZGV4LCBib29sKSB7XG4gICAgaWYoaW5kZXggPT0gMCApIGNyZWF0ZUFycmF5UmFuZG9tKCk7XG4gICAgaWYoIHByb2plY3RJbmRleCAhPSAtMSAmJiBpbmRleCA9PSAwICkgaW5kZXggPSAxO1xuXG4gICAgdmFyIHJhbmRvbVByb2plY3RJbmRleCA9IG1ha2VVbmlxdWVSYW5kb20oKTtcbiAgICBpZiggcmFuZG9tUHJvamVjdEluZGV4ID09IHByb2plY3RJbmRleCApIHJhbmRvbVByb2plY3RJbmRleCA9IG1ha2VVbmlxdWVSYW5kb20oKTtcbiAgICBcbiAgICBpZiggaW5kZXggPCBudW1SYW5kb21zIC0gMSApIHtcbiAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocmFuZG9tUHJvamVjdEluZGV4KS50b2dnbGVDbGFzcygnc2xpZGUtb3V0JywgYm9vbCk7XG4gICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xuICAgICAgICAvL2FuaW1hdGUgbmV4dCBwcmV2aWV3IHByb2plY3RcbiAgICAgICAgc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLCBwcm9qZWN0SW5kZXgsIGluZGV4ICsgMSwgYm9vbCk7XG4gICAgICB9LCAxNTApO1xuICAgIH0gZWxzZSBpZiAoIGluZGV4ID09IG51bVJhbmRvbXMgLSAxICkge1xuICAgICAgLy90aGlzIGlzIHRoZSBsYXN0IHByb2plY3QgcHJldmlldyB0byBiZSBhbmltYXRlZCBcbiAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocmFuZG9tUHJvamVjdEluZGV4KS50b2dnbGVDbGFzcygnc2xpZGUtb3V0JywgYm9vbCkub25lKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoIHByb2plY3RJbmRleCAhPSAtMSkge1xuICAgICAgICAgIHByb2plY3RzLmNoaWxkcmVuKCdsaS5zZWxlY3RlZCcpLmFkZENsYXNzKCdjb250ZW50LXZpc2libGUnKTtcbiAgICAgICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHByb2plY3RJbmRleCkuYWRkQ2xhc3MoJ3NsaWRlLW91dCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICB9IGVsc2UgaWYoIG5hdmlnYXRpb24uaGFzQ2xhc3MoJ25hdi12aXNpYmxlJykgJiYgYm9vbCApIHtcbiAgICAgICAgICBuYXZpZ2F0aW9uLmFkZENsYXNzKCduYXYtY2xpY2thYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShyYW5kb21Qcm9qZWN0SW5kZXgpLm9mZignd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcpO1xuICAgICAgICBhbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xOTM1MTc1OS9qYXZhc2NyaXB0LXJhbmRvbS1udW1iZXItb3V0LW9mLTUtbm8tcmVwZWF0LXVudGlsLWFsbC1oYXZlLWJlZW4tdXNlZFxuICBmdW5jdGlvbiBtYWtlVW5pcXVlUmFuZG9tKCkge1xuICAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdW5pcXVlUmFuZG9tcy5sZW5ndGgpO1xuICAgICAgdmFyIHZhbCA9IHVuaXF1ZVJhbmRvbXNbaW5kZXhdO1xuICAgICAgLy8gbm93IHJlbW92ZSB0aGF0IHZhbHVlIGZyb20gdGhlIGFycmF5XG4gICAgICB1bmlxdWVSYW5kb21zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlSYW5kb20oKSB7XG4gICAgLy9yZXNldCBhcnJheVxuICAgIHVuaXF1ZVJhbmRvbXMubGVuZ3RoID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVJhbmRvbXM7IGkrKykge1xuICAgICAgICAgICAgdW5pcXVlUmFuZG9tcy5wdXNoKGkpO1xuICAgICAgICB9XG4gIH1cbn0pO1xuXG4gLypcbiAqIEJHIExvYWRlZFxuICogQ29weXJpZ2h0IChjKSAyMDE0IEpvbmF0aGFuIENhdG11bGxcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuIChmdW5jdGlvbigkKXtcbiAgJC5mbi5iZ0xvYWRlZCA9IGZ1bmN0aW9uKGN1c3RvbSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIERlZmF1bHQgcGx1Z2luIHNldHRpbmdzXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgYWZ0ZXJMb2FkZWQgOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmFkZENsYXNzKCdiZy1sb2FkZWQnKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gTWVyZ2UgZGVmYXVsdCBhbmQgdXNlciBzZXR0aW5nc1xuICAgIHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgY3VzdG9tKTtcblxuICAgIC8vIExvb3AgdGhyb3VnaCBlbGVtZW50XG4gICAgc2VsZi5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICBiZ0ltZ3MgPSAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKS5zcGxpdCgnLCAnKTtcbiAgICAgICR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcsMCk7XG4gICAgICAkLmVhY2goIGJnSW1ncywgZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICAgIHZhciBpbWcgPSB2YWx1ZS5yZXBsYWNlKC9edXJsXFwoW1wiJ10/LywgJycpLnJlcGxhY2UoL1tcIiddP1xcKSQvLCAnJyk7XG4gICAgICAgICQoJzxpbWcvPicpLmF0dHIoJ3NyYycsIGltZykubG9hZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpOyAvLyBwcmV2ZW50IG1lbW9yeSBsZWFrc1xuICAgICAgICAgICR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcsJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JykrMSk7XG4gICAgICAgICAgaWYgKCR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcpID49IGJnSW1ncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNldHRpbmdzLmFmdGVyTG9hZGVkLmNhbGwoJHRoaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuICB9O1xufSkoalF1ZXJ5KTtcblxuXG5cbi8vIGluaXQgY29udHJvbGxlclxudmFyIGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG4vLyBjcmVhdGUgYSBzY2VuZVxubmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcbiAgICAgICAgZHVyYXRpb246IDQ4MCwgIC8vIHRoZSBzY2VuZSBzaG91bGQgbGFzdCBmb3IgYSBzY3JvbGwgZGlzdGFuY2Ugb2YgMTAwcHhcbiAgICAgICAgb2Zmc2V0OiAzMDAgICAgICAvLyBzdGFydCB0aGlzIHNjZW5lIGFmdGVyIHNjcm9sbGluZyBmb3IgNTBweFxuICAgIH0pXG4gICAgLnNldFBpbihcIi53ZWxjb21lLWRpdlwiKSAvLyBwaW5zIHRoZSBlbGVtZW50IGZvciB0aGUgdGhlIHNjZW5lJ3MgZHVyYXRpb25cbiAgICAuYWRkVG8oY29udHJvbGxlcik7IC8vIGFzc2lnbiB0aGUgc2NlbmUgdG8gdGhlIGNvbnRyb2xsZXJcblxuXG4kKCcuY29udGVudC1iZycpLnBhcmFsbGF4KHtpbWFnZVNyYzogJ2ltYWdlcy9jb250ZW50LWJnLmpwZyd9KTtcblxuJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpeyAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7IH0pO1xuXG5cblxuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLy8gZGV0ZWN0IGlmIElFIDogZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjY1Nzk0NiAgICBcbiAgICAgICAgdmFyIGllID0gKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyIHVuZGVmLHJ2ID0gLTE7IC8vIFJldHVybiB2YWx1ZSBhc3N1bWVzIGZhaWx1cmUuXG4gICAgICAgICAgdmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgICAgdmFyIG1zaWUgPSB1YS5pbmRleE9mKCdNU0lFICcpO1xuICAgICAgICAgIHZhciB0cmlkZW50ID0gdWEuaW5kZXhPZignVHJpZGVudC8nKTtcblxuICAgICAgICAgIGlmIChtc2llID4gMCkge1xuICAgICAgICAgICAgLy8gSUUgMTAgb3Igb2xkZXIgPT4gcmV0dXJuIHZlcnNpb24gbnVtYmVyXG4gICAgICAgICAgICBydiA9IHBhcnNlSW50KHVhLnN1YnN0cmluZyhtc2llICsgNSwgdWEuaW5kZXhPZignLicsIG1zaWUpKSwgMTApO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHJpZGVudCA+IDApIHtcbiAgICAgICAgICAgIC8vIElFIDExIChvciBuZXdlcikgPT4gcmV0dXJuIHZlcnNpb24gbnVtYmVyXG4gICAgICAgICAgICB2YXIgcnZOdW0gPSB1YS5pbmRleE9mKCdydjonKTtcbiAgICAgICAgICAgIHJ2ID0gcGFyc2VJbnQodWEuc3Vic3RyaW5nKHJ2TnVtICsgMywgdWEuaW5kZXhPZignLicsIHJ2TnVtKSksIDEwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gKChydiA+IC0xKSA/IHJ2IDogdW5kZWYpO1xuICAgICAgICB9KCkpO1xuXG5cbiAgICAgICAgLy8gZGlzYWJsZS9lbmFibGUgc2Nyb2xsIChtb3VzZXdoZWVsIGFuZCBrZXlzKSBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ3NzAxNzkgICAgICAgICAgXG4gICAgICAgIC8vIGxlZnQ6IDM3LCB1cDogMzgsIHJpZ2h0OiAzOSwgZG93bjogNDAsXG4gICAgICAgIC8vIHNwYWNlYmFyOiAzMiwgcGFnZXVwOiAzMywgcGFnZWRvd246IDM0LCBlbmQ6IDM1LCBob21lOiAzNlxuICAgICAgICB2YXIga2V5cyA9IFszMiwgMzcsIDM4LCAzOSwgNDBdLCB3aGVlbEl0ZXIgPSAwO1xuXG4gICAgICAgIGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGUpIHtcbiAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTsgIFxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24ga2V5ZG93bihlKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IGtleXMubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBrZXlzW2ldKSB7XG4gICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdG91Y2htb3ZlKGUpIHtcbiAgICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHdoZWVsKGUpIHtcbiAgICAgICAgICAvLyBmb3IgSUUgXG4gICAgICAgICAgLy9pZiggaWUgKSB7XG4gICAgICAgICAgICAvL3ByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgIC8vfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZGlzYWJsZV9zY3JvbGwoKSB7XG4gICAgICAgICAgd2luZG93Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCA9IHdoZWVsO1xuICAgICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGtleWRvd247XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5vbnRvdWNobW92ZSA9IHRvdWNobW92ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGVuYWJsZV9zY3JvbGwoKSB7XG4gICAgICAgICAgd2luZG93Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ua2V5ZG93biA9IGRvY3VtZW50LmJvZHkub250b3VjaG1vdmUgPSBudWxsOyAgXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZG9jRWxlbSA9IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgICAgc2Nyb2xsVmFsLFxuICAgICAgICAgIGlzUmV2ZWFsZWQsIFxuICAgICAgICAgIG5vc2Nyb2xsLCBcbiAgICAgICAgICBpc0FuaW1hdGluZyxcbiAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2NvbnRhaW5lcicgKSxcbiAgICAgICAgICB0cmlnZ2VyID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoICdidXR0b24udHJpZ2dlcicgKTtcblxuICAgICAgICBmdW5jdGlvbiBzY3JvbGxZKCkge1xuICAgICAgICAgIHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxUb3A7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIHNjcm9sbFBhZ2UoKSB7XG4gICAgICAgICAgc2Nyb2xsVmFsID0gc2Nyb2xsWSgpO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmKCBub3Njcm9sbCAmJiAhaWUgKSB7XG4gICAgICAgICAgICBpZiggc2Nyb2xsVmFsIDwgMCApIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIC8vIGtlZXAgaXQgdGhhdCB3YXlcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyggMCwgMCApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCBjbGFzc2llLmhhcyggY29udGFpbmVyLCAnbm90cmFucycgKSApIHtcbiAgICAgICAgICAgIGNsYXNzaWUucmVtb3ZlKCBjb250YWluZXIsICdub3RyYW5zJyApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCBpc0FuaW1hdGluZyApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgaWYoIHNjcm9sbFZhbCA8PSAwICYmIGlzUmV2ZWFsZWQgKSB7XG4gICAgICAgICAgICB0b2dnbGUoMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYoIHNjcm9sbFZhbCA+IDAgJiYgIWlzUmV2ZWFsZWQgKXtcbiAgICAgICAgICAgIHRvZ2dsZSgxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB0b2dnbGUoIHJldmVhbCApIHtcbiAgICAgICAgICBpc0FuaW1hdGluZyA9IHRydWU7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYoIHJldmVhbCApIHtcbiAgICAgICAgICAgIGNsYXNzaWUuYWRkKCBjb250YWluZXIsICdtb2RpZnknICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9zY3JvbGwgPSB0cnVlO1xuICAgICAgICAgICAgZGlzYWJsZV9zY3JvbGwoKTtcbiAgICAgICAgICAgIGNsYXNzaWUucmVtb3ZlKCBjb250YWluZXIsICdtb2RpZnknICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2ltdWxhdGluZyB0aGUgZW5kIG9mIHRoZSB0cmFuc2l0aW9uOlxuICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXNSZXZlYWxlZCA9ICFpc1JldmVhbGVkO1xuICAgICAgICAgICAgaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmKCByZXZlYWwgKSB7XG4gICAgICAgICAgICAgIG5vc2Nyb2xsID0gZmFsc2U7XG4gICAgICAgICAgICAgIGVuYWJsZV9zY3JvbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAxMjAwICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZWZyZXNoaW5nIHRoZSBwYWdlLi4uXG4gICAgICAgIHZhciBwYWdlU2Nyb2xsID0gc2Nyb2xsWSgpO1xuICAgICAgICBub3Njcm9sbCA9IHBhZ2VTY3JvbGwgPT09IDA7XG4gICAgICAgIFxuICAgICAgICBkaXNhYmxlX3Njcm9sbCgpO1xuICAgICAgICBcbiAgICAgICAgaWYoIHBhZ2VTY3JvbGwgKSB7XG4gICAgICAgICAgaXNSZXZlYWxlZCA9IHRydWU7XG4gICAgICAgICAgY2xhc3NpZS5hZGQoIGNvbnRhaW5lciwgJ25vdHJhbnMnICk7XG4gICAgICAgICAgY2xhc3NpZS5hZGQoIGNvbnRhaW5lciwgJ21vZGlmeScgKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCBzY3JvbGxQYWdlICk7XG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgZnVuY3Rpb24oKSB7IHRvZ2dsZSggJ3JldmVhbCcgKTsgfSApO1xuICAgICAgfSkoKTsiXX0=
