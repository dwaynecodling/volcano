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
  duration: 400, // the scene should last for a scroll distance of 100px
  offset: 230 // start this scene after scrolling for 50px
}).setPin(".welcome-div") // pins the element for the the scene's duration
.addTo(controller); // assign the scene to the controller

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxLQUFsQyxDQUF3QyxZQUFXO0FBQ2pELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBTCxFQUFlO0FBQ2hILFVBQUksU0FBUyxFQUFFLEtBQUssSUFBTCxDQUFYLENBRDRHO0FBRWhILGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBL0IsQ0FBM0IsQ0FGdUc7QUFHaEgsVUFBSSxPQUFPLE1BQVAsRUFBZTtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCLEdBQWhCO1NBRGIsRUFFRyxJQUZILEVBRGlCO0FBSWpCLGVBQU8sS0FBUCxDQUppQjtPQUFuQjtLQUhGO0dBRHNDLENBQXhDLENBRFc7Q0FBWCxDQUFGOzs7QUFrQkEsRUFBRSxrQkFBRixFQUFzQixhQUF0QixDQUFvQztBQUNsQyxRQUFLLFFBQUw7QUFDQSxnQkFBYyxHQUFkO0FBQ0EsYUFBVztBQUNULGdCQUFZLHNCQUFXO0FBQ3BCLFdBQUssRUFBTCxDQUFRLFNBQVIsR0FBb0IsS0FBSyxFQUFMLENBQVEsRUFBUixDQUFXLElBQVgsQ0FBZ0IsYUFBaEIsQ0FBcEIsQ0FEb0I7S0FBWDtHQURkO0FBS0EsWUFBVSxJQUFWO0FBUmtDLENBQXBDOzs7O0FBa0JBLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBVTtBQUN4QixJQUFFLFdBQUYsRUFBZSxLQUFmLENBQXFCLFlBQVU7O0FBSTNCLE1BQUUsVUFBRixFQUFjLFVBQWQsQ0FBeUIsR0FBekIsRUFKMkI7QUFLNUIsTUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixVQUFwQixFQUFnQyxXQUFoQyxDQUE0QyxXQUE1QyxFQUw0Qjs7QUFPNUIsUUFBSSxFQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLFdBQWpCLENBQUosRUFBbUM7QUFDbEMsUUFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFVBQWQsRUFBMEIsUUFBMUIsRUFEa0M7S0FBbkMsTUFFSSxJQUFJLEVBQUUsSUFBRixFQUFRLFFBQVIsQ0FBaUIsVUFBakIsQ0FBSixFQUFrQztBQUNyQyxRQUFFLE1BQUYsRUFBVSxHQUFWLENBQWMsVUFBZCxFQUEwQixNQUExQixFQURxQztLQUFsQztHQVRjLENBQXJCLENBRHdCO0NBQVYsQ0FBbEI7QUFnQkEsRUFBRSxVQUFGLEVBQWMsRUFBZCxDQUFpQixPQUFqQixFQUEwQixZQUFVO0FBQ2hDLElBQUUsVUFBRixFQUFjLFVBQWQsQ0FBeUIsR0FBekIsRUFEZ0M7QUFFaEMsSUFBRSxXQUFGLEVBQWUsV0FBZixDQUEyQixVQUEzQixFQUF1QyxXQUF2QyxDQUFtRCxXQUFuRCxFQUZnQztBQUdqQyxJQUFFLE1BQUYsRUFBVSxHQUFWLENBQWMsVUFBZCxFQUEwQixNQUExQixFQUhpQztBQUloQyxTQUFPLEtBQVAsQ0FKZ0M7Q0FBVixDQUExQjs7QUFZQSxPQUFPLFFBQVAsRUFBaUIsS0FBakIsQ0FBdUIsVUFBUyxDQUFULEVBQVc7O0FBRWhDLElBQUUsU0FBRixFQUFhLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsVUFBUyxLQUFULEVBQWU7QUFDdEMsVUFBTSxjQUFOLEdBRHNDO0FBRXRDLE1BQUUsV0FBRixFQUFlLFFBQWYsQ0FBd0IsWUFBeEIsRUFGc0M7QUFHckMsTUFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFVBQWQsRUFBMEIsUUFBMUIsRUFIcUM7QUFJcEMsTUFBRSxpQkFBRixFQUFxQixHQUFyQixDQUF5QjtBQUN2QixpQkFBVyxjQUFYO0FBQ0Esb0JBQWMsZ0JBQWQ7QUFDQSwwQkFBcUIsS0FBckI7S0FIRixFQUpvQztHQUFmLENBQXpCOztBQUZnQyxHQWNoQyxDQUFFLFdBQUYsRUFBZSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFVBQVMsS0FBVCxFQUFlO0FBQ3hDLFFBQUksRUFBRSxNQUFNLE1BQU4sQ0FBRixDQUFnQixFQUFoQixDQUFtQixXQUFuQixLQUFtQyxFQUFFLE1BQU0sTUFBTixDQUFGLENBQWdCLEVBQWhCLENBQW1CLGlCQUFuQixDQUFuQyxFQUEyRTtBQUM3RSxRQUFFLFdBQUYsRUFBZSxXQUFmLENBQTJCLFlBQTNCLEVBRDZFO0FBRTdFLFlBQU0sY0FBTixHQUY2RTs7QUFJN0UsUUFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFVBQWQsRUFBMEIsTUFBMUIsRUFKNkU7QUFLNUUsUUFBRSxpQkFBRixFQUFxQixHQUFyQixDQUF5QixFQUFDLFNBQVMsTUFBVCxFQUExQixFQUw0RTtLQUEvRTtHQUR5QixDQUEzQixDQWRnQztDQUFYLENBQXZCOztBQTRCQSxPQUFPLFFBQVAsRUFBaUIsS0FBakIsQ0FBdUIsVUFBUyxDQUFULEVBQVc7O0FBRWhDLE1BQUksb0JBQW9CLEVBQUUsd0JBQUYsQ0FBcEI7TUFDRix5QkFBeUIsa0JBQWtCLElBQWxCLENBQXVCLHVCQUF2QixDQUF6QjtNQUNBLGtCQUFrQix1QkFBdUIsUUFBdkIsQ0FBZ0MsSUFBaEMsQ0FBbEI7TUFDQSxXQUFXLGtCQUFrQixJQUFsQixDQUF1QixjQUF2QixDQUFYO01BQ0Esb0JBQW9CLEVBQUUsaUJBQUYsQ0FBcEI7TUFDQSxhQUFhLEVBQUUsaUJBQUYsQ0FBYjs7O0FBRUEsNEJBQTRCLEVBQUUsb0JBQUYsRUFBd0IsTUFBeEIsR0FBaUMsQ0FBakMsQ0FURTs7QUFXaEMsTUFBSSxZQUFZLEtBQVo7OztBQUVGLGVBQWEsU0FBUyxJQUFULENBQWMsSUFBZCxFQUFvQixNQUFwQjtNQUNiLGdCQUFnQixFQUFoQjs7O0FBZDhCLHdCQWlCaEMsQ0FBdUIsRUFBdkIsQ0FBMEIsT0FBMUIsRUFBbUMsR0FBbkMsRUFBd0MsVUFBUyxLQUFULEVBQWU7QUFDckQsVUFBTSxjQUFOLEdBRHFEO0FBRXJELFFBQUksYUFBYSxLQUFiLEVBQXFCO0FBQ3ZCLGtCQUFZLElBQVosQ0FEdUI7QUFFdkIsd0JBQWtCLEdBQWxCLENBQXNCLGlCQUF0QixFQUF5QyxRQUF6QyxDQUFrRCxjQUFsRCxFQUZ1QjtBQUd2QixrQkFBWSxFQUFFLElBQUYsRUFBUSxNQUFSLENBQWUsSUFBZixDQUFaLEVBSHVCO0FBSXZCLFFBQUUsaUJBQUYsRUFBcUIsR0FBckIsQ0FBeUIsRUFBQyxTQUFTLE1BQVQsRUFBMUIsRUFKdUI7S0FBekI7R0FGc0MsQ0FBeEMsQ0FqQmdDOztBQTJCaEMsb0JBQWtCLEVBQWxCLENBQXFCLE9BQXJCLEVBQThCLFVBQVMsS0FBVCxFQUFlO0FBQzNDLFVBQU0sY0FBTixHQUQyQzs7QUFHM0MsUUFBSSxhQUFhLEtBQWIsRUFBcUI7QUFDdkIsa0JBQVksSUFBWixDQUR1QjtBQUV2QixVQUFJLGtCQUFrQixRQUFsQixDQUEyQixjQUEzQixDQUFKLEVBQWlEOzs7QUFHL0MsMEJBQWtCLEdBQWxCLENBQXNCLGlCQUF0QixFQUF5QyxXQUF6QyxDQUFxRCxjQUFyRCxFQUgrQztBQUkvQyx1QkFKK0M7QUFLL0MsVUFBRSxpQkFBRixFQUFxQixHQUFyQixDQUF5QixFQUFDLFNBQVMsY0FBVCxFQUExQixFQUwrQztPQUFqRCxNQU1PLElBQUksa0JBQWtCLFFBQWxCLENBQTJCLGFBQTNCLENBQUosRUFBZ0Q7O0FBRXJELDBCQUFrQixXQUFsQixDQUE4QixhQUE5QixFQUZxRDtBQUdyRCxtQkFBVyxXQUFYLENBQXVCLDJCQUF2QixFQUhxRDtBQUlyRCxZQUFHLHVCQUFILEVBQTRCLGdCQUFnQixXQUFoQixDQUE0QixXQUE1QixFQUE1QixLQUNLLG9CQUFvQix1QkFBdUIsUUFBdkIsQ0FBZ0MsSUFBaEMsQ0FBcEIsRUFBMkQsQ0FBQyxDQUFELEVBQUksQ0FBL0QsRUFBa0UsS0FBbEUsRUFETDtPQUpLLE1BTUE7O0FBRUwsMEJBQWtCLFFBQWxCLENBQTJCLGFBQTNCLEVBRks7QUFHTCxtQkFBVyxRQUFYLENBQW9CLGFBQXBCLEVBSEs7QUFJTCxZQUFHLHVCQUFILEVBQTRCLGdCQUFnQixRQUFoQixDQUF5QixXQUF6QixFQUE1QixLQUNLLG9CQUFvQix1QkFBdUIsUUFBdkIsQ0FBZ0MsSUFBaEMsQ0FBcEIsRUFBMkQsQ0FBQyxDQUFELEVBQUksQ0FBL0QsRUFBa0UsSUFBbEUsRUFETDtPQVZLO0tBUlQ7O0FBdUJBLFFBQUcsdUJBQUgsRUFBNEIsWUFBWSxLQUFaLENBQTVCO0dBMUI0QixDQUE5Qjs7O0FBM0JnQyxtQkE0RGhDLENBQWtCLEVBQWxCLENBQXFCLE9BQXJCLEVBQThCLFNBQTlCLEVBQXlDLFlBQVU7QUFDakQsc0JBQWtCLE9BQWxCLENBQTBCLEVBQUMsYUFBWSxFQUFFLE1BQUYsRUFBVSxNQUFWLEVBQVosRUFBM0IsRUFBNEQsR0FBNUQsRUFEaUQ7R0FBVixDQUF6Qzs7O0FBNURnQyxpQkFpRWhDLENBQWdCLFFBQWhCLENBQXlCLEdBQXpCLEVBQThCLFFBQTlCLENBQXVDO0FBQ25DLGlCQUFjLHVCQUFVO0FBQ3RCLGtCQUFZLGdCQUFnQixFQUFoQixDQUFtQixDQUFuQixDQUFaLEVBRHNCO0tBQVY7R0FEbEIsRUFqRWdDOztBQXVFaEMsV0FBUyxXQUFULENBQXFCLGNBQXJCLEVBQXFDO0FBQ25DLFFBQUcsZUFBZSxNQUFmLEdBQXdCLENBQXhCLEVBQTRCO0FBQzdCLGlCQUFXLFlBQVU7QUFDbkIsdUJBQWUsUUFBZixDQUF3QixXQUF4QixFQURtQjtBQUVuQixvQkFBWSxlQUFlLElBQWYsRUFBWixFQUZtQjtPQUFWLEVBR1IsR0FISCxFQUQ2QjtLQUEvQjtHQURGOztBQVNBLFdBQVMsV0FBVCxDQUFxQixjQUFyQixFQUFxQztBQUNuQyxRQUFJLGVBQWUsZUFBZSxLQUFmLEVBQWYsQ0FEK0I7QUFFbkMsYUFBUyxRQUFULENBQWtCLElBQWxCLEVBQXdCLEVBQXhCLENBQTJCLFlBQTNCLEVBQXlDLEdBQXpDLENBQTZDLGNBQTdDLEVBQTZELFFBQTdELENBQXNFLFVBQXRFLEVBRm1DOztBQUluQyxRQUFJLHVCQUFKLEVBQThCO0FBQzVCLHNCQUFnQixRQUFoQixDQUF5QixXQUF6QixFQUFzQyxXQUF0QyxDQUFrRCxVQUFsRCxFQUQ0QjtBQUU1QixlQUFTLFFBQVQsQ0FBa0IsSUFBbEIsRUFBd0IsRUFBeEIsQ0FBMkIsWUFBM0IsRUFBeUMsUUFBekMsQ0FBa0QsaUJBQWxELEVBRjRCO0FBRzVCLGtCQUFZLEtBQVosQ0FINEI7S0FBOUIsTUFJTztBQUNMLDBCQUFvQixlQUFwQixFQUFxQyxZQUFyQyxFQUFtRCxDQUFuRCxFQUFzRCxJQUF0RCxFQURLO0tBSlA7R0FKRjs7QUFhQSxXQUFTLFlBQVQsR0FBd0I7QUFDdEIsYUFBUyxJQUFULENBQWMsV0FBZCxFQUEyQixXQUEzQixDQUF1QyxVQUF2QyxFQUFtRCxFQUFuRCxDQUFzRCxpRkFBdEQsRUFBeUksWUFBVTtBQUNqSixRQUFFLElBQUYsRUFBUSxXQUFSLENBQW9CLGlCQUFwQixFQUF1QyxHQUF2QyxDQUEyQyxpRkFBM0MsRUFEaUo7QUFFakosMEJBQW9CLHVCQUF1QixRQUF2QixDQUFnQyxJQUFoQyxDQUFwQixFQUEyRCxDQUFDLENBQUQsRUFBSSxDQUEvRCxFQUFrRSxLQUFsRSxFQUZpSjtLQUFWLENBQXpJOzs7QUFEc0IsUUFPbEIsdUJBQUosRUFBOEI7QUFDNUIsc0JBQWdCLFdBQWhCLENBQTRCLFdBQTVCLEVBRDRCO0FBRTVCLGVBQVMsSUFBVCxDQUFjLGtCQUFkLEVBQWtDLFdBQWxDLENBQThDLGlCQUE5QyxFQUY0QjtBQUc1QixrQkFBWSxLQUFaLENBSDRCO0tBQTlCO0dBUEY7O0FBY0EsV0FBUyxtQkFBVCxDQUE2QixzQkFBN0IsRUFBcUQsWUFBckQsRUFBbUUsS0FBbkUsRUFBMEUsSUFBMUUsRUFBZ0Y7QUFDOUUsUUFBRyxTQUFTLENBQVQsRUFBYSxvQkFBaEI7QUFDQSxRQUFJLGdCQUFnQixDQUFDLENBQUQsSUFBTSxTQUFTLENBQVQsRUFBYSxRQUFRLENBQVIsQ0FBdkM7O0FBRUEsUUFBSSxxQkFBcUIsa0JBQXJCLENBSjBFO0FBSzlFLFFBQUksc0JBQXNCLFlBQXRCLEVBQXFDLHFCQUFxQixrQkFBckIsQ0FBekM7O0FBRUEsUUFBSSxRQUFRLGFBQWEsQ0FBYixFQUFpQjtBQUMzQiw2QkFBdUIsRUFBdkIsQ0FBMEIsa0JBQTFCLEVBQThDLFdBQTlDLENBQTBELFdBQTFELEVBQXVFLElBQXZFLEVBRDJCO0FBRTNCLGlCQUFZLFlBQVU7O0FBRXBCLDRCQUFvQixzQkFBcEIsRUFBNEMsWUFBNUMsRUFBMEQsUUFBUSxDQUFSLEVBQVcsSUFBckUsRUFGb0I7T0FBVixFQUdULEdBSEgsRUFGMkI7S0FBN0IsTUFNTyxJQUFLLFNBQVMsYUFBYSxDQUFiLEVBQWlCOztBQUVwQyw2QkFBdUIsRUFBdkIsQ0FBMEIsa0JBQTFCLEVBQThDLFdBQTlDLENBQTBELFdBQTFELEVBQXVFLElBQXZFLEVBQTZFLEdBQTdFLENBQWlGLGlGQUFqRixFQUFvSyxZQUFVO0FBQzVLLFlBQUksZ0JBQWdCLENBQUMsQ0FBRCxFQUFJO0FBQ3RCLG1CQUFTLFFBQVQsQ0FBa0IsYUFBbEIsRUFBaUMsUUFBakMsQ0FBMEMsaUJBQTFDLEVBRHNCO0FBRXRCLGlDQUF1QixFQUF2QixDQUEwQixZQUExQixFQUF3QyxRQUF4QyxDQUFpRCxXQUFqRCxFQUE4RCxXQUE5RCxDQUEwRSxVQUExRSxFQUZzQjtTQUF4QixNQUdPLElBQUksV0FBVyxRQUFYLENBQW9CLGFBQXBCLEtBQXNDLElBQXRDLEVBQTZDO0FBQ3RELHFCQUFXLFFBQVgsQ0FBb0IsZUFBcEIsRUFEc0Q7U0FBakQ7QUFHUCwrQkFBdUIsRUFBdkIsQ0FBMEIsa0JBQTFCLEVBQThDLEdBQTlDLENBQWtELGlGQUFsRCxFQVA0SztBQVE1SyxvQkFBWSxLQUFaLENBUjRLO09BQVYsQ0FBcEssQ0FGb0M7S0FBL0I7R0FiVDs7O0FBM0dnQyxXQXdJdkIsZ0JBQVQsR0FBNEI7QUFDeEIsUUFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixjQUFjLE1BQWQsQ0FBbkMsQ0FEb0I7QUFFeEIsUUFBSSxNQUFNLGNBQWMsS0FBZCxDQUFOOztBQUZvQixpQkFJeEIsQ0FBYyxNQUFkLENBQXFCLEtBQXJCLEVBQTRCLENBQTVCLEVBSndCO0FBS3hCLFdBQU8sR0FBUCxDQUx3QjtHQUE1Qjs7QUFRQSxXQUFTLGlCQUFULEdBQTZCOztBQUUzQixrQkFBYyxNQUFkLEdBQXVCLENBQXZCLENBRjJCO0FBRzNCLFNBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLFVBQUosRUFBZ0IsR0FBaEMsRUFBcUM7QUFDN0Isb0JBQWMsSUFBZCxDQUFtQixDQUFuQixFQUQ2QjtLQUFyQztHQUhGO0NBaEpxQixDQUF2Qjs7Ozs7OztBQThKQyxDQUFDLFVBQVMsQ0FBVCxFQUFXO0FBQ1gsSUFBRSxFQUFGLENBQUssUUFBTCxHQUFnQixVQUFTLE1BQVQsRUFBaUI7QUFDL0IsUUFBSSxPQUFPLElBQVA7OztBQUQyQixRQUkzQixXQUFXO0FBQ2IsbUJBQWMsdUJBQVU7QUFDdEIsYUFBSyxRQUFMLENBQWMsV0FBZCxFQURzQjtPQUFWO0tBRFo7OztBQUoyQixRQVczQixXQUFXLEVBQUUsTUFBRixDQUFTLEVBQVQsRUFBYSxRQUFiLEVBQXVCLE1BQXZCLENBQVg7OztBQVgyQixRQWMvQixDQUFLLElBQUwsQ0FBVSxZQUFVO0FBQ2xCLFVBQUksUUFBUSxFQUFFLElBQUYsQ0FBUjtVQUNGLFNBQVMsTUFBTSxHQUFOLENBQVUsa0JBQVYsRUFBOEIsS0FBOUIsQ0FBb0MsSUFBcEMsQ0FBVCxDQUZnQjtBQUdsQixZQUFNLElBQU4sQ0FBVyxjQUFYLEVBQTBCLENBQTFCLEVBSGtCO0FBSWxCLFFBQUUsSUFBRixDQUFRLE1BQVIsRUFBZ0IsVUFBUyxHQUFULEVBQWMsS0FBZCxFQUFvQjtBQUNsQyxZQUFJLE1BQU0sTUFBTSxPQUFOLENBQWMsYUFBZCxFQUE2QixFQUE3QixFQUFpQyxPQUFqQyxDQUF5QyxVQUF6QyxFQUFxRCxFQUFyRCxDQUFOLENBRDhCO0FBRWxDLFVBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsS0FBakIsRUFBd0IsR0FBeEIsRUFBNkIsSUFBN0IsQ0FBa0MsWUFBVztBQUMzQyxZQUFFLElBQUYsRUFBUSxNQUFSO0FBRDJDLGVBRTNDLENBQU0sSUFBTixDQUFXLGNBQVgsRUFBMEIsTUFBTSxJQUFOLENBQVcsY0FBWCxJQUEyQixDQUEzQixDQUExQixDQUYyQztBQUczQyxjQUFJLE1BQU0sSUFBTixDQUFXLGNBQVgsS0FBOEIsT0FBTyxNQUFQLEVBQWU7QUFDL0MscUJBQVMsV0FBVCxDQUFxQixJQUFyQixDQUEwQixLQUExQixFQUQrQztXQUFqRDtTQUhnQyxDQUFsQyxDQUZrQztPQUFwQixDQUFoQixDQUprQjtLQUFWLENBQVYsQ0FkK0I7R0FBakIsQ0FETDtDQUFYLENBQUQsQ0FnQ0UsTUFoQ0Y7OztBQXFDRCxJQUFJLGFBQWEsSUFBSSxZQUFZLFVBQVosRUFBakI7OztBQUdKLElBQUksWUFBWSxLQUFaLENBQWtCO0FBQ2QsWUFBVSxHQUFWO0FBQ0EsVUFBUSxHQUFSO0FBRmMsQ0FBdEIsRUFJSyxNQUpMLENBSVksY0FKWjtDQUtLLEtBTEwsQ0FLVyxVQUxYOztBQVVBLENBQUMsWUFBVzs7O0FBR0osTUFBSSxLQUFNLFlBQVU7QUFDbEIsUUFBSSxLQUFKO1FBQVUsS0FBSyxDQUFDLENBQUQ7QUFERyxRQUVkLEtBQUssT0FBTyxTQUFQLENBQWlCLFNBQWpCLENBRlM7QUFHbEIsUUFBSSxPQUFPLEdBQUcsT0FBSCxDQUFXLE9BQVgsQ0FBUCxDQUhjO0FBSWxCLFFBQUksVUFBVSxHQUFHLE9BQUgsQ0FBVyxVQUFYLENBQVYsQ0FKYzs7QUFNbEIsUUFBSSxPQUFPLENBQVAsRUFBVTs7QUFFWixXQUFLLFNBQVMsR0FBRyxTQUFILENBQWEsT0FBTyxDQUFQLEVBQVUsR0FBRyxPQUFILENBQVcsR0FBWCxFQUFnQixJQUFoQixDQUF2QixDQUFULEVBQXdELEVBQXhELENBQUwsQ0FGWTtLQUFkLE1BR08sSUFBSSxVQUFVLENBQVYsRUFBYTs7QUFFdEIsVUFBSSxRQUFRLEdBQUcsT0FBSCxDQUFXLEtBQVgsQ0FBUixDQUZrQjtBQUd0QixXQUFLLFNBQVMsR0FBRyxTQUFILENBQWEsUUFBUSxDQUFSLEVBQVcsR0FBRyxPQUFILENBQVcsR0FBWCxFQUFnQixLQUFoQixDQUF4QixDQUFULEVBQTBELEVBQTFELENBQUwsQ0FIc0I7S0FBakI7O0FBTVAsV0FBUSxFQUFDLEdBQUssQ0FBQyxDQUFELEdBQU0sRUFBWixHQUFpQixLQUFqQixDQWZVO0dBQVYsRUFBTjs7Ozs7QUFIQSxNQXlCQSxPQUFPLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixDQUFQO01BQTZCLFlBQVksQ0FBWixDQXpCN0I7O0FBMkJKLFdBQVMsY0FBVCxDQUF3QixDQUF4QixFQUEyQjtBQUN6QixRQUFJLEtBQUssT0FBTyxLQUFQLENBRGdCO0FBRXpCLFFBQUksRUFBRSxjQUFGLEVBQ0osRUFBRSxjQUFGLEdBREE7QUFFQSxNQUFFLFdBQUYsR0FBZ0IsS0FBaEIsQ0FKeUI7R0FBM0I7O0FBT0EsV0FBUyxPQUFULENBQWlCLENBQWpCLEVBQW9CO0FBQ2xCLFNBQUssSUFBSSxJQUFJLEtBQUssTUFBTCxFQUFhLEdBQTFCLEdBQWdDO0FBQzlCLFVBQUksRUFBRSxPQUFGLEtBQWMsS0FBSyxDQUFMLENBQWQsRUFBdUI7QUFDekIsdUJBQWUsQ0FBZixFQUR5QjtBQUV6QixlQUZ5QjtPQUEzQjtLQURGO0dBREY7O0FBU0EsV0FBUyxTQUFULENBQW1CLENBQW5CLEVBQXNCO0FBQ3BCLG1CQUFlLENBQWYsRUFEb0I7R0FBdEI7O0FBSUEsV0FBUyxLQUFULENBQWUsQ0FBZixFQUFrQjs7Ozs7R0FBbEI7O0FBT0EsV0FBUyxjQUFULEdBQTBCO0FBQ3hCLFdBQU8sWUFBUCxHQUFzQixTQUFTLFlBQVQsR0FBd0IsS0FBeEIsQ0FERTtBQUV4QixhQUFTLFNBQVQsR0FBcUIsT0FBckIsQ0FGd0I7QUFHeEIsYUFBUyxJQUFULENBQWMsV0FBZCxHQUE0QixTQUE1QixDQUh3QjtHQUExQjs7QUFNQSxXQUFTLGFBQVQsR0FBeUI7QUFDdkIsV0FBTyxZQUFQLEdBQXNCLFNBQVMsWUFBVCxHQUF3QixTQUFTLFNBQVQsR0FBcUIsU0FBUyxJQUFULENBQWMsV0FBZCxHQUE0QixJQUE1QixDQUQ1QztHQUF6Qjs7QUFJQSxNQUFJLFVBQVUsT0FBTyxRQUFQLENBQWdCLGVBQWhCO01BQ1osU0FERjtNQUVFLFVBRkY7TUFHRSxRQUhGO01BSUUsV0FKRjtNQUtFLFlBQVksU0FBUyxjQUFULENBQXlCLFdBQXpCLENBQVo7TUFDQSxVQUFVLFVBQVUsYUFBVixDQUF5QixnQkFBekIsQ0FBVixDQXRFRTs7QUF3RUosV0FBUyxPQUFULEdBQW1CO0FBQ2pCLFdBQU8sT0FBTyxXQUFQLElBQXNCLFFBQVEsU0FBUixDQURaO0dBQW5COztBQUlBLFdBQVMsVUFBVCxHQUFzQjtBQUNwQixnQkFBWSxTQUFaLENBRG9COztBQUdwQixRQUFJLFlBQVksQ0FBQyxFQUFELEVBQU07QUFDcEIsVUFBSSxZQUFZLENBQVosRUFBZ0IsT0FBTyxLQUFQLENBQXBCOztBQURvQixZQUdwQixDQUFPLFFBQVAsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFIb0I7S0FBdEI7O0FBTUEsUUFBSSxRQUFRLEdBQVIsQ0FBYSxTQUFiLEVBQXdCLFNBQXhCLENBQUosRUFBMEM7QUFDeEMsY0FBUSxNQUFSLENBQWdCLFNBQWhCLEVBQTJCLFNBQTNCLEVBRHdDO0FBRXhDLGFBQU8sS0FBUCxDQUZ3QztLQUExQzs7QUFLQSxRQUFJLFdBQUosRUFBa0I7QUFDaEIsYUFBTyxLQUFQLENBRGdCO0tBQWxCOztBQUlBLFFBQUksYUFBYSxDQUFiLElBQWtCLFVBQWxCLEVBQStCO0FBQ2pDLGFBQU8sQ0FBUCxFQURpQztLQUFuQyxNQUdLLElBQUksWUFBWSxDQUFaLElBQWlCLENBQUMsVUFBRCxFQUFhO0FBQ3JDLGFBQU8sQ0FBUCxFQURxQztLQUFsQztHQXJCUDs7QUEwQkEsV0FBUyxNQUFULENBQWlCLE1BQWpCLEVBQTBCO0FBQ3hCLGtCQUFjLElBQWQsQ0FEd0I7O0FBR3hCLFFBQUksTUFBSixFQUFhO0FBQ1gsY0FBUSxHQUFSLENBQWEsU0FBYixFQUF3QixRQUF4QixFQURXO0tBQWIsTUFHSztBQUNILGlCQUFXLElBQVgsQ0FERztBQUVILHVCQUZHO0FBR0gsY0FBUSxNQUFSLENBQWdCLFNBQWhCLEVBQTJCLFFBQTNCLEVBSEc7S0FITDs7O0FBSHdCLGNBYXhCLENBQVksWUFBVztBQUNyQixtQkFBYSxDQUFDLFVBQUQsQ0FEUTtBQUVyQixvQkFBYyxLQUFkLENBRnFCO0FBR3JCLFVBQUksTUFBSixFQUFhO0FBQ1gsbUJBQVcsS0FBWCxDQURXO0FBRVgsd0JBRlc7T0FBYjtLQUhVLEVBT1QsSUFQSCxFQWJ3QjtHQUExQjs7O0FBdEdJLE1BOEhBLGFBQWEsU0FBYixDQTlIQTtBQStISixhQUFXLGVBQWUsQ0FBZixDQS9IUDs7QUFpSUosbUJBaklJOztBQW1JSixNQUFJLFVBQUosRUFBaUI7QUFDZixpQkFBYSxJQUFiLENBRGU7QUFFZixZQUFRLEdBQVIsQ0FBYSxTQUFiLEVBQXdCLFNBQXhCLEVBRmU7QUFHZixZQUFRLEdBQVIsQ0FBYSxTQUFiLEVBQXdCLFFBQXhCLEVBSGU7R0FBakI7O0FBTUEsU0FBTyxnQkFBUCxDQUF5QixRQUF6QixFQUFtQyxVQUFuQyxFQXpJSTtBQTBJSixVQUFRLGdCQUFSLENBQTBCLE9BQTFCLEVBQW1DLFlBQVc7QUFBRSxXQUFRLFFBQVIsRUFBRjtHQUFYLENBQW5DLENBMUlJO0NBQVgsQ0FBRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBqc2hpbnQgZGV2ZWw6dHJ1ZSAqL1xuY29uc29sZS5sb2coJ0xvb2sgYXQgYXBwL2pzL21haW4uanMnKTtcblxuXG4kKGZ1bmN0aW9uKCkge1xuICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xuICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsnXScpO1xuICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxuICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcblxuXG5cbi8vIEV4YW1wbGUgMTogRnJvbSBhbiBlbGVtZW50IGluIERPTVxuJCgnLm9wZW4tcG9wdXAtbGluaycpLm1hZ25pZmljUG9wdXAoe1xuICB0eXBlOidpbmxpbmUnLFxuICByZW1vdmFsRGVsYXk6IDUwMCwgLy9kZWxheSByZW1vdmFsIGJ5IFggdG8gYWxsb3cgb3V0LWFuaW1hdGlvblxuICBjYWxsYmFja3M6IHtcbiAgICBiZWZvcmVPcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICB0aGlzLnN0Lm1haW5DbGFzcyA9IHRoaXMuc3QuZWwuYXR0cignZGF0YS1lZmZlY3QnKTtcbiAgICB9XG4gIH0sXG4gIG1pZENsaWNrOiB0cnVlIC8vIGFsbG93IG9wZW5pbmcgcG9wdXAgb24gbWlkZGxlIG1vdXNlIGNsaWNrLiBBbHdheXMgc2V0IGl0IHRvIHRydWUgaWYgeW91IGRvbid0IHByb3ZpZGUgYWx0ZXJuYXRpdmUgc291cmNlLlxufSk7XG5cblxuXG5cbi8vIHJlc3BvbnNpdmUgbmF2aWdhdGlvblxuXG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAkKFwiLmJ1dHRvbiBhXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cblxuICAgICAgIFxuICAgICAgICAkKFwiLm92ZXJsYXlcIikuZmFkZVRvZ2dsZSgyMDApO1xuICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJykudG9nZ2xlQ2xhc3MoJ2J0bi1jbG9zZScpO1xuXG4gICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJidG4tY2xvc2VcIikpIHtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJidG4tb3BlblwiKSkge1xuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICB9XG59KTtcbiAgIFxufSk7XG4kKCcub3ZlcmxheScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAkKFwiLmJ1dHRvbiBhXCIpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcbiAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnYXV0bycpO1xuICAgIG9wZW4gPSBmYWxzZTtcbiAgICBcbn0pO1xuXG5cblxuXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCl7XG4gIC8vb3BlbiB0aGUgbGF0ZXJhbCBwYW5lbFxuICAkKCcuY2QtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCgnLmNkLXBhbmVsJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcImlubGluZS1ibG9ja1wiLCBcbiAgICAgICAgXCJ0cmFuc2l0aW9uXCI6IFwiYWxsIGVhc2UtaW4gNXNcIiwgXG4gICAgICAgIFwidHJhbnNpdGlvbi1kZWxheVwiIDogXCIuNXNcIlxuICAgICAgfSk7XG5cbiAgfSk7XG4gIC8vY2xvc2UgdGhlIGxhdGVyYWwgcGFuZWxcbiAgJCgnLmNkLXBhbmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGlmKCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wYW5lbCcpIHx8ICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXBhbmVsLWNsb3NlJykgKSB7IFxuICAgICAgJCgnLmNkLXBhbmVsJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnYXV0bycpO1xuICAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcbiAgICB9XG4gIH0pO1xufSk7XG5cblxuXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCl7XG4gIC8vY2FjaGUgRE9NIGVsZW1lbnRzXG4gIHZhciBwcm9qZWN0c0NvbnRhaW5lciA9ICQoJy5jZC1wcm9qZWN0cy1jb250YWluZXInKSxcbiAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyID0gcHJvamVjdHNDb250YWluZXIuZmluZCgnLmNkLXByb2plY3RzLXByZXZpZXdzJyksXG4gICAgcHJvamVjdFByZXZpZXdzID0gcHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSxcbiAgICBwcm9qZWN0cyA9IHByb2plY3RzQ29udGFpbmVyLmZpbmQoJy5jZC1wcm9qZWN0cycpLFxuICAgIG5hdmlnYXRpb25UcmlnZ2VyID0gJCgnLmNkLW5hdi10cmlnZ2VyJyksXG4gICAgbmF2aWdhdGlvbiA9ICQoJy5jZC1wcmltYXJ5LW5hdicpLFxuICAgIC8vaWYgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgQ1NTIHRyYW5zaXRpb25zLi4uXG4gICAgdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgPSAoICQoJy5uby1jc3N0cmFuc2l0aW9ucycpLmxlbmd0aCA+IDApO1xuXG4gIHZhciBhbmltYXRpbmcgPSBmYWxzZSxcbiAgICAvL3dpbGwgYmUgdXNlZCB0byBleHRyYWN0IHJhbmRvbSBudW1iZXJzIGZvciBwcm9qZWN0cyBzbGlkZSB1cC9zbGlkZSBkb3duIGVmZmVjdFxuICAgIG51bVJhbmRvbXMgPSBwcm9qZWN0cy5maW5kKCdsaScpLmxlbmd0aCwgXG4gICAgdW5pcXVlUmFuZG9tcyA9IFtdO1xuXG4gIC8vb3BlbiBwcm9qZWN0XG4gIHByb2plY3RzUHJldmlld1dyYXBwZXIub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiggYW5pbWF0aW5nID09IGZhbHNlICkge1xuICAgICAgYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZChwcm9qZWN0c0NvbnRhaW5lcikuYWRkQ2xhc3MoJ3Byb2plY3Qtb3BlbicpO1xuICAgICAgb3BlblByb2plY3QoJCh0aGlzKS5wYXJlbnQoJ2xpJykpO1xuICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xuICAgIH1cbiAgfSk7XG5cbiAgbmF2aWdhdGlvblRyaWdnZXIub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgaWYoIGFuaW1hdGluZyA9PSBmYWxzZSApIHtcbiAgICAgIGFuaW1hdGluZyA9IHRydWU7XG4gICAgICBpZiggbmF2aWdhdGlvblRyaWdnZXIuaGFzQ2xhc3MoJ3Byb2plY3Qtb3BlbicpICkge1xuXG4gICAgICAgIC8vY2xvc2UgdmlzaWJsZSBwcm9qZWN0XG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZChwcm9qZWN0c0NvbnRhaW5lcikucmVtb3ZlQ2xhc3MoJ3Byb2plY3Qtb3BlbicpO1xuICAgICAgICBjbG9zZVByb2plY3QoKTtcbiAgICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcImlubGluZS1ibG9ja1wifSk7XG4gICAgICB9IGVsc2UgaWYoIG5hdmlnYXRpb25UcmlnZ2VyLmhhc0NsYXNzKCduYXYtdmlzaWJsZScpICkge1xuICAgICAgICAvL2Nsb3NlIG1haW4gbmF2aWdhdGlvblxuICAgICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5yZW1vdmVDbGFzcygnbmF2LXZpc2libGUnKTtcbiAgICAgICAgbmF2aWdhdGlvbi5yZW1vdmVDbGFzcygnbmF2LWNsaWNrYWJsZSBuYXYtdmlzaWJsZScpO1xuICAgICAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgcHJvamVjdFByZXZpZXdzLnJlbW92ZUNsYXNzKCdzbGlkZS1vdXQnKTtcbiAgICAgICAgZWxzZSBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL29wZW4gbWFpbiBuYXZpZ2F0aW9uXG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZENsYXNzKCduYXYtdmlzaWJsZScpO1xuICAgICAgICBuYXZpZ2F0aW9uLmFkZENsYXNzKCduYXYtdmlzaWJsZScpO1xuICAgICAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgcHJvamVjdFByZXZpZXdzLmFkZENsYXNzKCdzbGlkZS1vdXQnKTtcbiAgICAgICAgZWxzZSBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IFxuXG4gICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIGFuaW1hdGluZyA9IGZhbHNlO1xuICB9KTtcblxuXG5cblxuICAvL3Njcm9sbCBkb3duIHRvIHByb2plY3QgaW5mb1xuICBwcm9qZWN0c0NvbnRhaW5lci5vbignY2xpY2snLCAnLnNjcm9sbCcsIGZ1bmN0aW9uKCl7XG4gICAgcHJvamVjdHNDb250YWluZXIuYW5pbWF0ZSh7J3Njcm9sbFRvcCc6JCh3aW5kb3cpLmhlaWdodCgpfSwgNTAwKTsgXG4gIH0pO1xuXG4gIC8vY2hlY2sgaWYgYmFja2dyb3VuZC1pbWFnZXMgaGF2ZSBiZWVuIGxvYWRlZCBhbmQgc2hvdyBwcm9qZWN0IHByZXZpZXdzXG4gIHByb2plY3RQcmV2aWV3cy5jaGlsZHJlbignYScpLmJnTG9hZGVkKHtcbiAgICAgIGFmdGVyTG9hZGVkIDogZnVuY3Rpb24oKXtcbiAgICAgICAgc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXdzLmVxKDApKTtcbiAgICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXcpIHtcbiAgICBpZihwcm9qZWN0UHJldmlldy5sZW5ndGggPiAwICkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBwcm9qZWN0UHJldmlldy5hZGRDbGFzcygnYmctbG9hZGVkJyk7XG4gICAgICAgIHNob3dQcmV2aWV3KHByb2plY3RQcmV2aWV3Lm5leHQoKSk7XG4gICAgICB9LCAxNTApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9wZW5Qcm9qZWN0KHByb2plY3RQcmV2aWV3KSB7XG4gICAgdmFyIHByb2plY3RJbmRleCA9IHByb2plY3RQcmV2aWV3LmluZGV4KCk7XG4gICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpJykuZXEocHJvamVjdEluZGV4KS5hZGQocHJvamVjdFByZXZpZXcpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgIFxuICAgIGlmKCB0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCApIHtcbiAgICAgIHByb2plY3RQcmV2aWV3cy5hZGRDbGFzcygnc2xpZGUtb3V0JykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICBwcm9qZWN0cy5jaGlsZHJlbignbGknKS5lcShwcm9qZWN0SW5kZXgpLmFkZENsYXNzKCdjb250ZW50LXZpc2libGUnKTtcbiAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7IFxuICAgICAgc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0UHJldmlld3MsIHByb2plY3RJbmRleCwgMCwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VQcm9qZWN0KCkge1xuICAgIHByb2plY3RzLmZpbmQoJy5zZWxlY3RlZCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpLm9uKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpLm9mZignd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcpO1xuICAgICAgc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLCAtMSwgMCwgZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgLy9pZiBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBDU1MgdHJhbnNpdGlvbnMuLi5cbiAgICBpZiggdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgKSB7XG4gICAgICBwcm9qZWN0UHJldmlld3MucmVtb3ZlQ2xhc3MoJ3NsaWRlLW91dCcpO1xuICAgICAgcHJvamVjdHMuZmluZCgnLmNvbnRlbnQtdmlzaWJsZScpLnJlbW92ZUNsYXNzKCdjb250ZW50LXZpc2libGUnKTtcbiAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlciwgcHJvamVjdEluZGV4LCBpbmRleCwgYm9vbCkge1xuICAgIGlmKGluZGV4ID09IDAgKSBjcmVhdGVBcnJheVJhbmRvbSgpO1xuICAgIGlmKCBwcm9qZWN0SW5kZXggIT0gLTEgJiYgaW5kZXggPT0gMCApIGluZGV4ID0gMTtcblxuICAgIHZhciByYW5kb21Qcm9qZWN0SW5kZXggPSBtYWtlVW5pcXVlUmFuZG9tKCk7XG4gICAgaWYoIHJhbmRvbVByb2plY3RJbmRleCA9PSBwcm9qZWN0SW5kZXggKSByYW5kb21Qcm9qZWN0SW5kZXggPSBtYWtlVW5pcXVlUmFuZG9tKCk7XG4gICAgXG4gICAgaWYoIGluZGV4IDwgbnVtUmFuZG9tcyAtIDEgKSB7XG4gICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkudG9nZ2xlQ2xhc3MoJ3NsaWRlLW91dCcsIGJvb2wpO1xuICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgLy9hbmltYXRlIG5leHQgcHJldmlldyBwcm9qZWN0XG4gICAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlciwgcHJvamVjdEluZGV4LCBpbmRleCArIDEsIGJvb2wpO1xuICAgICAgfSwgMTUwKTtcbiAgICB9IGVsc2UgaWYgKCBpbmRleCA9PSBudW1SYW5kb21zIC0gMSApIHtcbiAgICAgIC8vdGhpcyBpcyB0aGUgbGFzdCBwcm9qZWN0IHByZXZpZXcgdG8gYmUgYW5pbWF0ZWQgXG4gICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkudG9nZ2xlQ2xhc3MoJ3NsaWRlLW91dCcsIGJvb2wpLm9uZSgnd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKCBwcm9qZWN0SW5kZXggIT0gLTEpIHtcbiAgICAgICAgICBwcm9qZWN0cy5jaGlsZHJlbignbGkuc2VsZWN0ZWQnKS5hZGRDbGFzcygnY29udGVudC12aXNpYmxlJyk7XG4gICAgICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShwcm9qZWN0SW5kZXgpLmFkZENsYXNzKCdzbGlkZS1vdXQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgfSBlbHNlIGlmKCBuYXZpZ2F0aW9uLmhhc0NsYXNzKCduYXYtdmlzaWJsZScpICYmIGJvb2wgKSB7XG4gICAgICAgICAgbmF2aWdhdGlvbi5hZGRDbGFzcygnbmF2LWNsaWNrYWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocmFuZG9tUHJvamVjdEluZGV4KS5vZmYoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnKTtcbiAgICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTkzNTE3NTkvamF2YXNjcmlwdC1yYW5kb20tbnVtYmVyLW91dC1vZi01LW5vLXJlcGVhdC11bnRpbC1hbGwtaGF2ZS1iZWVuLXVzZWRcbiAgZnVuY3Rpb24gbWFrZVVuaXF1ZVJhbmRvbSgpIHtcbiAgICAgIHZhciBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHVuaXF1ZVJhbmRvbXMubGVuZ3RoKTtcbiAgICAgIHZhciB2YWwgPSB1bmlxdWVSYW5kb21zW2luZGV4XTtcbiAgICAgIC8vIG5vdyByZW1vdmUgdGhhdCB2YWx1ZSBmcm9tIHRoZSBhcnJheVxuICAgICAgdW5pcXVlUmFuZG9tcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5UmFuZG9tKCkge1xuICAgIC8vcmVzZXQgYXJyYXlcbiAgICB1bmlxdWVSYW5kb21zLmxlbmd0aCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1SYW5kb21zOyBpKyspIHtcbiAgICAgICAgICAgIHVuaXF1ZVJhbmRvbXMucHVzaChpKTtcbiAgICAgICAgfVxuICB9XG59KTtcblxuIC8qXG4gKiBCRyBMb2FkZWRcbiAqIENvcHlyaWdodCAoYykgMjAxNCBKb25hdGhhbiBDYXRtdWxsXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cbiAoZnVuY3Rpb24oJCl7XG4gICQuZm4uYmdMb2FkZWQgPSBmdW5jdGlvbihjdXN0b20pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBEZWZhdWx0IHBsdWdpbiBzZXR0aW5nc1xuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgIGFmdGVyTG9hZGVkIDogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnYmctbG9hZGVkJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIE1lcmdlIGRlZmF1bHQgYW5kIHVzZXIgc2V0dGluZ3NcbiAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIGN1c3RvbSk7XG5cbiAgICAvLyBMb29wIHRocm91Z2ggZWxlbWVudFxuICAgIHNlbGYuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgYmdJbWdzID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykuc3BsaXQoJywgJyk7XG4gICAgICAkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnLDApO1xuICAgICAgJC5lYWNoKCBiZ0ltZ3MsIGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgICB2YXIgaW1nID0gdmFsdWUucmVwbGFjZSgvXnVybFxcKFtcIiddPy8sICcnKS5yZXBsYWNlKC9bXCInXT9cXCkkLywgJycpO1xuICAgICAgICAkKCc8aW1nLz4nKS5hdHRyKCdzcmMnLCBpbWcpLmxvYWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTsgLy8gcHJldmVudCBtZW1vcnkgbGVha3NcbiAgICAgICAgICAkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnLCR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcpKzEpO1xuICAgICAgICAgIGlmICgkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnKSA+PSBiZ0ltZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZXR0aW5ncy5hZnRlckxvYWRlZC5jYWxsKCR0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfTtcbn0pKGpRdWVyeSk7XG5cblxuXG4vLyBpbml0IGNvbnRyb2xsZXJcbnZhciBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuLy8gY3JlYXRlIGEgc2NlbmVcbm5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XG4gICAgICAgIGR1cmF0aW9uOiA0MDAsICAvLyB0aGUgc2NlbmUgc2hvdWxkIGxhc3QgZm9yIGEgc2Nyb2xsIGRpc3RhbmNlIG9mIDEwMHB4XG4gICAgICAgIG9mZnNldDogMjMwICAgICAgLy8gc3RhcnQgdGhpcyBzY2VuZSBhZnRlciBzY3JvbGxpbmcgZm9yIDUwcHhcbiAgICB9KVxuICAgIC5zZXRQaW4oXCIud2VsY29tZS1kaXZcIikgLy8gcGlucyB0aGUgZWxlbWVudCBmb3IgdGhlIHRoZSBzY2VuZSdzIGR1cmF0aW9uXG4gICAgLmFkZFRvKGNvbnRyb2xsZXIpOyAvLyBhc3NpZ24gdGhlIHNjZW5lIHRvIHRoZSBjb250cm9sbGVyXG5cblxuIFxuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLy8gZGV0ZWN0IGlmIElFIDogZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjY1Nzk0NiAgICBcbiAgICAgICAgdmFyIGllID0gKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyIHVuZGVmLHJ2ID0gLTE7IC8vIFJldHVybiB2YWx1ZSBhc3N1bWVzIGZhaWx1cmUuXG4gICAgICAgICAgdmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgICAgdmFyIG1zaWUgPSB1YS5pbmRleE9mKCdNU0lFICcpO1xuICAgICAgICAgIHZhciB0cmlkZW50ID0gdWEuaW5kZXhPZignVHJpZGVudC8nKTtcblxuICAgICAgICAgIGlmIChtc2llID4gMCkge1xuICAgICAgICAgICAgLy8gSUUgMTAgb3Igb2xkZXIgPT4gcmV0dXJuIHZlcnNpb24gbnVtYmVyXG4gICAgICAgICAgICBydiA9IHBhcnNlSW50KHVhLnN1YnN0cmluZyhtc2llICsgNSwgdWEuaW5kZXhPZignLicsIG1zaWUpKSwgMTApO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHJpZGVudCA+IDApIHtcbiAgICAgICAgICAgIC8vIElFIDExIChvciBuZXdlcikgPT4gcmV0dXJuIHZlcnNpb24gbnVtYmVyXG4gICAgICAgICAgICB2YXIgcnZOdW0gPSB1YS5pbmRleE9mKCdydjonKTtcbiAgICAgICAgICAgIHJ2ID0gcGFyc2VJbnQodWEuc3Vic3RyaW5nKHJ2TnVtICsgMywgdWEuaW5kZXhPZignLicsIHJ2TnVtKSksIDEwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gKChydiA+IC0xKSA/IHJ2IDogdW5kZWYpO1xuICAgICAgICB9KCkpO1xuXG5cbiAgICAgICAgLy8gZGlzYWJsZS9lbmFibGUgc2Nyb2xsIChtb3VzZXdoZWVsIGFuZCBrZXlzKSBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ3NzAxNzkgICAgICAgICAgXG4gICAgICAgIC8vIGxlZnQ6IDM3LCB1cDogMzgsIHJpZ2h0OiAzOSwgZG93bjogNDAsXG4gICAgICAgIC8vIHNwYWNlYmFyOiAzMiwgcGFnZXVwOiAzMywgcGFnZWRvd246IDM0LCBlbmQ6IDM1LCBob21lOiAzNlxuICAgICAgICB2YXIga2V5cyA9IFszMiwgMzcsIDM4LCAzOSwgNDBdLCB3aGVlbEl0ZXIgPSAwO1xuXG4gICAgICAgIGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGUpIHtcbiAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTsgIFxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24ga2V5ZG93bihlKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IGtleXMubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBrZXlzW2ldKSB7XG4gICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdG91Y2htb3ZlKGUpIHtcbiAgICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHdoZWVsKGUpIHtcbiAgICAgICAgICAvLyBmb3IgSUUgXG4gICAgICAgICAgLy9pZiggaWUgKSB7XG4gICAgICAgICAgICAvL3ByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgIC8vfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZGlzYWJsZV9zY3JvbGwoKSB7XG4gICAgICAgICAgd2luZG93Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCA9IHdoZWVsO1xuICAgICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGtleWRvd247XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5vbnRvdWNobW92ZSA9IHRvdWNobW92ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGVuYWJsZV9zY3JvbGwoKSB7XG4gICAgICAgICAgd2luZG93Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ua2V5ZG93biA9IGRvY3VtZW50LmJvZHkub250b3VjaG1vdmUgPSBudWxsOyAgXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZG9jRWxlbSA9IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgICAgc2Nyb2xsVmFsLFxuICAgICAgICAgIGlzUmV2ZWFsZWQsIFxuICAgICAgICAgIG5vc2Nyb2xsLCBcbiAgICAgICAgICBpc0FuaW1hdGluZyxcbiAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2NvbnRhaW5lcicgKSxcbiAgICAgICAgICB0cmlnZ2VyID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoICdidXR0b24udHJpZ2dlcicgKTtcblxuICAgICAgICBmdW5jdGlvbiBzY3JvbGxZKCkge1xuICAgICAgICAgIHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxUb3A7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIHNjcm9sbFBhZ2UoKSB7XG4gICAgICAgICAgc2Nyb2xsVmFsID0gc2Nyb2xsWSgpO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmKCBub3Njcm9sbCAmJiAhaWUgKSB7XG4gICAgICAgICAgICBpZiggc2Nyb2xsVmFsIDwgMCApIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIC8vIGtlZXAgaXQgdGhhdCB3YXlcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyggMCwgMCApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCBjbGFzc2llLmhhcyggY29udGFpbmVyLCAnbm90cmFucycgKSApIHtcbiAgICAgICAgICAgIGNsYXNzaWUucmVtb3ZlKCBjb250YWluZXIsICdub3RyYW5zJyApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCBpc0FuaW1hdGluZyApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgaWYoIHNjcm9sbFZhbCA8PSAwICYmIGlzUmV2ZWFsZWQgKSB7XG4gICAgICAgICAgICB0b2dnbGUoMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYoIHNjcm9sbFZhbCA+IDAgJiYgIWlzUmV2ZWFsZWQgKXtcbiAgICAgICAgICAgIHRvZ2dsZSgxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB0b2dnbGUoIHJldmVhbCApIHtcbiAgICAgICAgICBpc0FuaW1hdGluZyA9IHRydWU7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYoIHJldmVhbCApIHtcbiAgICAgICAgICAgIGNsYXNzaWUuYWRkKCBjb250YWluZXIsICdtb2RpZnknICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9zY3JvbGwgPSB0cnVlO1xuICAgICAgICAgICAgZGlzYWJsZV9zY3JvbGwoKTtcbiAgICAgICAgICAgIGNsYXNzaWUucmVtb3ZlKCBjb250YWluZXIsICdtb2RpZnknICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2ltdWxhdGluZyB0aGUgZW5kIG9mIHRoZSB0cmFuc2l0aW9uOlxuICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXNSZXZlYWxlZCA9ICFpc1JldmVhbGVkO1xuICAgICAgICAgICAgaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmKCByZXZlYWwgKSB7XG4gICAgICAgICAgICAgIG5vc2Nyb2xsID0gZmFsc2U7XG4gICAgICAgICAgICAgIGVuYWJsZV9zY3JvbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAxMjAwICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZWZyZXNoaW5nIHRoZSBwYWdlLi4uXG4gICAgICAgIHZhciBwYWdlU2Nyb2xsID0gc2Nyb2xsWSgpO1xuICAgICAgICBub3Njcm9sbCA9IHBhZ2VTY3JvbGwgPT09IDA7XG4gICAgICAgIFxuICAgICAgICBkaXNhYmxlX3Njcm9sbCgpO1xuICAgICAgICBcbiAgICAgICAgaWYoIHBhZ2VTY3JvbGwgKSB7XG4gICAgICAgICAgaXNSZXZlYWxlZCA9IHRydWU7XG4gICAgICAgICAgY2xhc3NpZS5hZGQoIGNvbnRhaW5lciwgJ25vdHJhbnMnICk7XG4gICAgICAgICAgY2xhc3NpZS5hZGQoIGNvbnRhaW5lciwgJ21vZGlmeScgKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCBzY3JvbGxQYWdlICk7XG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgZnVuY3Rpb24oKSB7IHRvZ2dsZSggJ3JldmVhbCcgKTsgfSApO1xuICAgICAgfSkoKTsiXX0=
