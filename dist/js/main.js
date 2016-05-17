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
  duration: 175, // the scene should last for a scroll distance of 100px
  offset: 220 // start this scene after scrolling for 50px
}).setPin(".header") // pins the element for the the scene's duration
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxLQUFsQyxDQUF3QyxZQUFXO0FBQ2pELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBTCxFQUFlO0FBQ2hILFVBQUksU0FBUyxFQUFFLEtBQUssSUFBTCxDQUFYLENBRDRHO0FBRWhILGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBL0IsQ0FBM0IsQ0FGdUc7QUFHaEgsVUFBSSxPQUFPLE1BQVAsRUFBZTtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCLEdBQWhCO1NBRGIsRUFFRyxJQUZILEVBRGlCO0FBSWpCLGVBQU8sS0FBUCxDQUppQjtPQUFuQjtLQUhGO0dBRHNDLENBQXhDLENBRFc7Q0FBWCxDQUFGOzs7O0FBc0JBLENBQUMsWUFBVztBQUNKLE1BQUksVUFBVSxFQUFFLE1BQUYsRUFBVSxNQUFWLEVBQVY7TUFDRixVQUFVLEVBQUUsWUFBRixDQUFWO01BQ0EsZ0JBQWdCLFFBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsTUFBbkIsRUFBaEIsQ0FIRTtBQUlKLFVBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsQ0FBQyxVQUFVLGFBQVYsQ0FBRCxHQUEwQixDQUExQixHQUE4QixNQUE5QixDQUF2QixDQUpJO0FB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aUlKLG1CQWpJSTs7QUFtSUosTUFBSSxVQUFKLEVBQWlCO0FBQ2YsaUJBQWEsSUFBYixDQURlO0FBRWYsWUFBUSxHQUFSLENBQWEsU0FBYixFQUF3QixTQUF4QixFQUZlO0FBR2YsWUFBUSxHQUFSLENBQWEsU0FBYixFQUF3QixRQUF4QixFQUhlO0dBQWpCOztBQU1BLFNBQU8sZ0JBQVAsQ0FBeUIsUUFBekIsRUFBbUMsVUFBbkMsRUF6SUk7QUEwSUosVUFBUSxnQkFBUixDQUEwQixPQUExQixFQUFtQyxZQUFXO0FBQUUsV0FBUSxRQUFSLEVBQUY7R0FBWCxDQUFuQyxDQTFJSTtDQUFYLENBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoganNoaW50IGRldmVsOnRydWUgKi9cbmNvbnNvbGUubG9nKCdMb29rIGF0IGFwcC9qcy9tYWluLmpzJyk7XG5cblxuJChmdW5jdGlvbigpIHtcbiAgJCgnYVtocmVmKj1cIiNcIl06bm90KFtocmVmPVwiI1wiXSknKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpICYmIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWUpIHtcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArJ10nKTtcbiAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG5cblxuXG5cblxuLy8gSW50cm8gRnVsbCBTY3JlZW4gcGFnZSBTZWN0aW9uXG5cblxuKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgd2luZG93SCA9ICQod2luZG93KS5oZWlnaHQoKSxcbiAgICAgICAgICBpbnRyb0VsID0gJCgnZGl2Lm9wZW5lcicpLFxuICAgICAgICAgIGludHJvSGVhZGluZ0ggPSBpbnRyb0VsLmZpbmQoJ2gxJykuaGVpZ2h0KCk7XG4gICAgICAgIGludHJvRWwuY3NzKCdwYWRkaW5nJywgKHdpbmRvd0ggLSBpbnRyb0hlYWRpbmdIKS8yICsgJ3B4IDAnKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGludHJvRWwuc2xpZGVVcCgxMDAwLCBmdW5jdGlvbigpIHsgJChkb2N1bWVudCkub2ZmKCdzY3JvbGwnKTsgfSk7XG4gICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcCgwKTtcblxuICAgICAgICB9KTtcbiAgICAgIH0pKCk7XG5cblxuXG5cblxuXG5cbi8vIEV4YW1wbGUgMTogRnJvbSBhbiBlbGVtZW50IGluIERPTVxuJCgnLm9wZW4tcG9wdXAtbGluaycpLm1hZ25pZmljUG9wdXAoe1xuICB0eXBlOidpbmxpbmUnLFxuICByZW1vdmFsRGVsYXk6IDUwMCwgLy9kZWxheSByZW1vdmFsIGJ5IFggdG8gYWxsb3cgb3V0LWFuaW1hdGlvblxuICBjYWxsYmFja3M6IHtcbiAgICBiZWZvcmVPcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICB0aGlzLnN0Lm1haW5DbGFzcyA9IHRoaXMuc3QuZWwuYXR0cignZGF0YS1lZmZlY3QnKTtcbiAgICB9XG4gIH0sXG4gIG1pZENsaWNrOiB0cnVlIC8vIGFsbG93IG9wZW5pbmcgcG9wdXAgb24gbWlkZGxlIG1vdXNlIGNsaWNrLiBBbHdheXMgc2V0IGl0IHRvIHRydWUgaWYgeW91IGRvbid0IHByb3ZpZGUgYWx0ZXJuYXRpdmUgc291cmNlLlxufSk7XG5cblxuXG5cbi8vIHJlc3BvbnNpdmUgbmF2aWdhdGlvblxuXG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAkKFwiLmJ1dHRvbiBhXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cblxuICAgICAgIFxuICAgICAgICAkKFwiLm92ZXJsYXlcIikuZmFkZVRvZ2dsZSgyMDApO1xuICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJykudG9nZ2xlQ2xhc3MoJ2J0bi1jbG9zZScpO1xuXG4gICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJidG4tY2xvc2VcIikpIHtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJidG4tb3BlblwiKSkge1xuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICB9XG59KTtcbiAgIFxufSk7XG4kKCcub3ZlcmxheScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAkKFwiLmJ1dHRvbiBhXCIpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcbiAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnYXV0bycpO1xuICAgIG9wZW4gPSBmYWxzZTtcbiAgICBcbn0pO1xuXG5cblxuXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCl7XG4gIC8vb3BlbiB0aGUgbGF0ZXJhbCBwYW5lbFxuICAkKCcuY2QtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCgnLmNkLXBhbmVsJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcImlubGluZS1ibG9ja1wiLCBcbiAgICAgICAgXCJ0cmFuc2l0aW9uXCI6IFwiYWxsIGVhc2UtaW4gNXNcIiwgXG4gICAgICAgIFwidHJhbnNpdGlvbi1kZWxheVwiIDogXCIuNXNcIlxuICAgICAgfSk7XG5cbiAgfSk7XG4gIC8vY2xvc2UgdGhlIGxhdGVyYWwgcGFuZWxcbiAgJCgnLmNkLXBhbmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGlmKCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wYW5lbCcpIHx8ICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXBhbmVsLWNsb3NlJykgKSB7IFxuICAgICAgJCgnLmNkLXBhbmVsJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnYXV0bycpO1xuICAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcbiAgICB9XG4gIH0pO1xufSk7XG5cblxuXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCl7XG4gIC8vY2FjaGUgRE9NIGVsZW1lbnRzXG4gIHZhciBwcm9qZWN0c0NvbnRhaW5lciA9ICQoJy5jZC1wcm9qZWN0cy1jb250YWluZXInKSxcbiAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyID0gcHJvamVjdHNDb250YWluZXIuZmluZCgnLmNkLXByb2plY3RzLXByZXZpZXdzJyksXG4gICAgcHJvamVjdFByZXZpZXdzID0gcHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSxcbiAgICBwcm9qZWN0cyA9IHByb2plY3RzQ29udGFpbmVyLmZpbmQoJy5jZC1wcm9qZWN0cycpLFxuICAgIG5hdmlnYXRpb25UcmlnZ2VyID0gJCgnLmNkLW5hdi10cmlnZ2VyJyksXG4gICAgbmF2aWdhdGlvbiA9ICQoJy5jZC1wcmltYXJ5LW5hdicpLFxuICAgIC8vaWYgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgQ1NTIHRyYW5zaXRpb25zLi4uXG4gICAgdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgPSAoICQoJy5uby1jc3N0cmFuc2l0aW9ucycpLmxlbmd0aCA+IDApO1xuXG4gIHZhciBhbmltYXRpbmcgPSBmYWxzZSxcbiAgICAvL3dpbGwgYmUgdXNlZCB0byBleHRyYWN0IHJhbmRvbSBudW1iZXJzIGZvciBwcm9qZWN0cyBzbGlkZSB1cC9zbGlkZSBkb3duIGVmZmVjdFxuICAgIG51bVJhbmRvbXMgPSBwcm9qZWN0cy5maW5kKCdsaScpLmxlbmd0aCwgXG4gICAgdW5pcXVlUmFuZG9tcyA9IFtdO1xuXG4gIC8vb3BlbiBwcm9qZWN0XG4gIHByb2plY3RzUHJldmlld1dyYXBwZXIub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiggYW5pbWF0aW5nID09IGZhbHNlICkge1xuICAgICAgYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZChwcm9qZWN0c0NvbnRhaW5lcikuYWRkQ2xhc3MoJ3Byb2plY3Qtb3BlbicpO1xuICAgICAgb3BlblByb2plY3QoJCh0aGlzKS5wYXJlbnQoJ2xpJykpO1xuICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xuICAgIH1cbiAgfSk7XG5cbiAgbmF2aWdhdGlvblRyaWdnZXIub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgaWYoIGFuaW1hdGluZyA9PSBmYWxzZSApIHtcbiAgICAgIGFuaW1hdGluZyA9IHRydWU7XG4gICAgICBpZiggbmF2aWdhdGlvblRyaWdnZXIuaGFzQ2xhc3MoJ3Byb2plY3Qtb3BlbicpICkge1xuXG4gICAgICAgIC8vY2xvc2UgdmlzaWJsZSBwcm9qZWN0XG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZChwcm9qZWN0c0NvbnRhaW5lcikucmVtb3ZlQ2xhc3MoJ3Byb2plY3Qtb3BlbicpO1xuICAgICAgICBjbG9zZVByb2plY3QoKTtcbiAgICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcImlubGluZS1ibG9ja1wifSk7XG4gICAgICB9IGVsc2UgaWYoIG5hdmlnYXRpb25UcmlnZ2VyLmhhc0NsYXNzKCduYXYtdmlzaWJsZScpICkge1xuICAgICAgICAvL2Nsb3NlIG1haW4gbmF2aWdhdGlvblxuICAgICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5yZW1vdmVDbGFzcygnbmF2LXZpc2libGUnKTtcbiAgICAgICAgbmF2aWdhdGlvbi5yZW1vdmVDbGFzcygnbmF2LWNsaWNrYWJsZSBuYXYtdmlzaWJsZScpO1xuICAgICAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgcHJvamVjdFByZXZpZXdzLnJlbW92ZUNsYXNzKCdzbGlkZS1vdXQnKTtcbiAgICAgICAgZWxzZSBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL29wZW4gbWFpbiBuYXZpZ2F0aW9uXG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZENsYXNzKCduYXYtdmlzaWJsZScpO1xuICAgICAgICBuYXZpZ2F0aW9uLmFkZENsYXNzKCduYXYtdmlzaWJsZScpO1xuICAgICAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgcHJvamVjdFByZXZpZXdzLmFkZENsYXNzKCdzbGlkZS1vdXQnKTtcbiAgICAgICAgZWxzZSBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IFxuXG4gICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIGFuaW1hdGluZyA9IGZhbHNlO1xuICB9KTtcblxuXG5cblxuICAvL3Njcm9sbCBkb3duIHRvIHByb2plY3QgaW5mb1xuICBwcm9qZWN0c0NvbnRhaW5lci5vbignY2xpY2snLCAnLnNjcm9sbCcsIGZ1bmN0aW9uKCl7XG4gICAgcHJvamVjdHNDb250YWluZXIuYW5pbWF0ZSh7J3Njcm9sbFRvcCc6JCh3aW5kb3cpLmhlaWdodCgpfSwgNTAwKTsgXG4gIH0pO1xuXG4gIC8vY2hlY2sgaWYgYmFja2dyb3VuZC1pbWFnZXMgaGF2ZSBiZWVuIGxvYWRlZCBhbmQgc2hvdyBwcm9qZWN0IHByZXZpZXdzXG4gIHByb2plY3RQcmV2aWV3cy5jaGlsZHJlbignYScpLmJnTG9hZGVkKHtcbiAgICAgIGFmdGVyTG9hZGVkIDogZnVuY3Rpb24oKXtcbiAgICAgICAgc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXdzLmVxKDApKTtcbiAgICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXcpIHtcbiAgICBpZihwcm9qZWN0UHJldmlldy5sZW5ndGggPiAwICkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBwcm9qZWN0UHJldmlldy5hZGRDbGFzcygnYmctbG9hZGVkJyk7XG4gICAgICAgIHNob3dQcmV2aWV3KHByb2plY3RQcmV2aWV3Lm5leHQoKSk7XG4gICAgICB9LCAxNTApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9wZW5Qcm9qZWN0KHByb2plY3RQcmV2aWV3KSB7XG4gICAgdmFyIHByb2plY3RJbmRleCA9IHByb2plY3RQcmV2aWV3LmluZGV4KCk7XG4gICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpJykuZXEocHJvamVjdEluZGV4KS5hZGQocHJvamVjdFByZXZpZXcpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgIFxuICAgIGlmKCB0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCApIHtcbiAgICAgIHByb2plY3RQcmV2aWV3cy5hZGRDbGFzcygnc2xpZGUtb3V0JykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICBwcm9qZWN0cy5jaGlsZHJlbignbGknKS5lcShwcm9qZWN0SW5kZXgpLmFkZENsYXNzKCdjb250ZW50LXZpc2libGUnKTtcbiAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7IFxuICAgICAgc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0UHJldmlld3MsIHByb2plY3RJbmRleCwgMCwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VQcm9qZWN0KCkge1xuICAgIHByb2plY3RzLmZpbmQoJy5zZWxlY3RlZCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpLm9uKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpLm9mZignd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcpO1xuICAgICAgc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLCAtMSwgMCwgZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgLy9pZiBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBDU1MgdHJhbnNpdGlvbnMuLi5cbiAgICBpZiggdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgKSB7XG4gICAgICBwcm9qZWN0UHJldmlld3MucmVtb3ZlQ2xhc3MoJ3NsaWRlLW91dCcpO1xuICAgICAgcHJvamVjdHMuZmluZCgnLmNvbnRlbnQtdmlzaWJsZScpLnJlbW92ZUNsYXNzKCdjb250ZW50LXZpc2libGUnKTtcbiAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlciwgcHJvamVjdEluZGV4LCBpbmRleCwgYm9vbCkge1xuICAgIGlmKGluZGV4ID09IDAgKSBjcmVhdGVBcnJheVJhbmRvbSgpO1xuICAgIGlmKCBwcm9qZWN0SW5kZXggIT0gLTEgJiYgaW5kZXggPT0gMCApIGluZGV4ID0gMTtcblxuICAgIHZhciByYW5kb21Qcm9qZWN0SW5kZXggPSBtYWtlVW5pcXVlUmFuZG9tKCk7XG4gICAgaWYoIHJhbmRvbVByb2plY3RJbmRleCA9PSBwcm9qZWN0SW5kZXggKSByYW5kb21Qcm9qZWN0SW5kZXggPSBtYWtlVW5pcXVlUmFuZG9tKCk7XG4gICAgXG4gICAgaWYoIGluZGV4IDwgbnVtUmFuZG9tcyAtIDEgKSB7XG4gICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkudG9nZ2xlQ2xhc3MoJ3NsaWRlLW91dCcsIGJvb2wpO1xuICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgLy9hbmltYXRlIG5leHQgcHJldmlldyBwcm9qZWN0XG4gICAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlciwgcHJvamVjdEluZGV4LCBpbmRleCArIDEsIGJvb2wpO1xuICAgICAgfSwgMTUwKTtcbiAgICB9IGVsc2UgaWYgKCBpbmRleCA9PSBudW1SYW5kb21zIC0gMSApIHtcbiAgICAgIC8vdGhpcyBpcyB0aGUgbGFzdCBwcm9qZWN0IHByZXZpZXcgdG8gYmUgYW5pbWF0ZWQgXG4gICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkudG9nZ2xlQ2xhc3MoJ3NsaWRlLW91dCcsIGJvb2wpLm9uZSgnd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKCBwcm9qZWN0SW5kZXggIT0gLTEpIHtcbiAgICAgICAgICBwcm9qZWN0cy5jaGlsZHJlbignbGkuc2VsZWN0ZWQnKS5hZGRDbGFzcygnY29udGVudC12aXNpYmxlJyk7XG4gICAgICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShwcm9qZWN0SW5kZXgpLmFkZENsYXNzKCdzbGlkZS1vdXQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgfSBlbHNlIGlmKCBuYXZpZ2F0aW9uLmhhc0NsYXNzKCduYXYtdmlzaWJsZScpICYmIGJvb2wgKSB7XG4gICAgICAgICAgbmF2aWdhdGlvbi5hZGRDbGFzcygnbmF2LWNsaWNrYWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocmFuZG9tUHJvamVjdEluZGV4KS5vZmYoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnKTtcbiAgICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTkzNTE3NTkvamF2YXNjcmlwdC1yYW5kb20tbnVtYmVyLW91dC1vZi01LW5vLXJlcGVhdC11bnRpbC1hbGwtaGF2ZS1iZWVuLXVzZWRcbiAgZnVuY3Rpb24gbWFrZVVuaXF1ZVJhbmRvbSgpIHtcbiAgICAgIHZhciBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHVuaXF1ZVJhbmRvbXMubGVuZ3RoKTtcbiAgICAgIHZhciB2YWwgPSB1bmlxdWVSYW5kb21zW2luZGV4XTtcbiAgICAgIC8vIG5vdyByZW1vdmUgdGhhdCB2YWx1ZSBmcm9tIHRoZSBhcnJheVxuICAgICAgdW5pcXVlUmFuZG9tcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5UmFuZG9tKCkge1xuICAgIC8vcmVzZXQgYXJyYXlcbiAgICB1bmlxdWVSYW5kb21zLmxlbmd0aCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1SYW5kb21zOyBpKyspIHtcbiAgICAgICAgICAgIHVuaXF1ZVJhbmRvbXMucHVzaChpKTtcbiAgICAgICAgfVxuICB9XG59KTtcblxuIC8qXG4gKiBCRyBMb2FkZWRcbiAqIENvcHlyaWdodCAoYykgMjAxNCBKb25hdGhhbiBDYXRtdWxsXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cbiAoZnVuY3Rpb24oJCl7XG4gICQuZm4uYmdMb2FkZWQgPSBmdW5jdGlvbihjdXN0b20pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBEZWZhdWx0IHBsdWdpbiBzZXR0aW5nc1xuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgIGFmdGVyTG9hZGVkIDogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnYmctbG9hZGVkJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIE1lcmdlIGRlZmF1bHQgYW5kIHVzZXIgc2V0dGluZ3NcbiAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIGN1c3RvbSk7XG5cbiAgICAvLyBMb29wIHRocm91Z2ggZWxlbWVudFxuICAgIHNlbGYuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgYmdJbWdzID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykuc3BsaXQoJywgJyk7XG4gICAgICAkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnLDApO1xuICAgICAgJC5lYWNoKCBiZ0ltZ3MsIGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgICB2YXIgaW1nID0gdmFsdWUucmVwbGFjZSgvXnVybFxcKFtcIiddPy8sICcnKS5yZXBsYWNlKC9bXCInXT9cXCkkLywgJycpO1xuICAgICAgICAkKCc8aW1nLz4nKS5hdHRyKCdzcmMnLCBpbWcpLmxvYWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTsgLy8gcHJldmVudCBtZW1vcnkgbGVha3NcbiAgICAgICAgICAkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnLCR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcpKzEpO1xuICAgICAgICAgIGlmICgkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnKSA+PSBiZ0ltZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZXR0aW5ncy5hZnRlckxvYWRlZC5jYWxsKCR0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfTtcbn0pKGpRdWVyeSk7XG5cblxuXG4vLyBpbml0IGNvbnRyb2xsZXJcbnZhciBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuLy8gY3JlYXRlIGEgc2NlbmVcbm5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XG4gICAgICAgIGR1cmF0aW9uOiAxNzUsICAvLyB0aGUgc2NlbmUgc2hvdWxkIGxhc3QgZm9yIGEgc2Nyb2xsIGRpc3RhbmNlIG9mIDEwMHB4XG4gICAgICAgIG9mZnNldDogMjIwICAgICAgLy8gc3RhcnQgdGhpcyBzY2VuZSBhZnRlciBzY3JvbGxpbmcgZm9yIDUwcHhcbiAgICB9KVxuICAgIC5zZXRQaW4oXCIuaGVhZGVyXCIpIC8vIHBpbnMgdGhlIGVsZW1lbnQgZm9yIHRoZSB0aGUgc2NlbmUncyBkdXJhdGlvblxuICAgIC5hZGRUbyhjb250cm9sbGVyKTsgLy8gYXNzaWduIHRoZSBzY2VuZSB0byB0aGUgY29udHJvbGxlclxuXG5cbiBcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIC8vIGRldGVjdCBpZiBJRSA6IGZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY2NTc5NDYgICAgXG4gICAgICAgIHZhciBpZSA9IChmdW5jdGlvbigpe1xuICAgICAgICAgIHZhciB1bmRlZixydiA9IC0xOyAvLyBSZXR1cm4gdmFsdWUgYXNzdW1lcyBmYWlsdXJlLlxuICAgICAgICAgIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICAgIHZhciBtc2llID0gdWEuaW5kZXhPZignTVNJRSAnKTtcbiAgICAgICAgICB2YXIgdHJpZGVudCA9IHVhLmluZGV4T2YoJ1RyaWRlbnQvJyk7XG5cbiAgICAgICAgICBpZiAobXNpZSA+IDApIHtcbiAgICAgICAgICAgIC8vIElFIDEwIG9yIG9sZGVyID0+IHJldHVybiB2ZXJzaW9uIG51bWJlclxuICAgICAgICAgICAgcnYgPSBwYXJzZUludCh1YS5zdWJzdHJpbmcobXNpZSArIDUsIHVhLmluZGV4T2YoJy4nLCBtc2llKSksIDEwKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRyaWRlbnQgPiAwKSB7XG4gICAgICAgICAgICAvLyBJRSAxMSAob3IgbmV3ZXIpID0+IHJldHVybiB2ZXJzaW9uIG51bWJlclxuICAgICAgICAgICAgdmFyIHJ2TnVtID0gdWEuaW5kZXhPZigncnY6Jyk7XG4gICAgICAgICAgICBydiA9IHBhcnNlSW50KHVhLnN1YnN0cmluZyhydk51bSArIDMsIHVhLmluZGV4T2YoJy4nLCBydk51bSkpLCAxMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICgocnYgPiAtMSkgPyBydiA6IHVuZGVmKTtcbiAgICAgICAgfSgpKTtcblxuXG4gICAgICAgIC8vIGRpc2FibGUvZW5hYmxlIHNjcm9sbCAobW91c2V3aGVlbCBhbmQga2V5cykgZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80NzcwMTc5ICAgICAgICAgIFxuICAgICAgICAvLyBsZWZ0OiAzNywgdXA6IDM4LCByaWdodDogMzksIGRvd246IDQwLFxuICAgICAgICAvLyBzcGFjZWJhcjogMzIsIHBhZ2V1cDogMzMsIHBhZ2Vkb3duOiAzNCwgZW5kOiAzNSwgaG9tZTogMzZcbiAgICAgICAgdmFyIGtleXMgPSBbMzIsIDM3LCAzOCwgMzksIDQwXSwgd2hlZWxJdGVyID0gMDtcblxuICAgICAgICBmdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChlKSB7XG4gICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KVxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7ICBcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGtleWRvd24oZSkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSBrZXlzLmxlbmd0aDsgaS0tOykge1xuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0ga2V5c1tpXSkge1xuICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRvdWNobW92ZShlKSB7XG4gICAgICAgICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB3aGVlbChlKSB7XG4gICAgICAgICAgLy8gZm9yIElFIFxuICAgICAgICAgIC8vaWYoIGllICkge1xuICAgICAgICAgICAgLy9wcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgICAvL31cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRpc2FibGVfc2Nyb2xsKCkge1xuICAgICAgICAgIHdpbmRvdy5vbm1vdXNld2hlZWwgPSBkb2N1bWVudC5vbm1vdXNld2hlZWwgPSB3aGVlbDtcbiAgICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSBrZXlkb3duO1xuICAgICAgICAgIGRvY3VtZW50LmJvZHkub250b3VjaG1vdmUgPSB0b3VjaG1vdmU7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBlbmFibGVfc2Nyb2xsKCkge1xuICAgICAgICAgIHdpbmRvdy5vbm1vdXNld2hlZWwgPSBkb2N1bWVudC5vbm1vdXNld2hlZWwgPSBkb2N1bWVudC5vbmtleWRvd24gPSBkb2N1bWVudC5ib2R5Lm9udG91Y2htb3ZlID0gbnVsbDsgIFxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRvY0VsZW0gPSB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICAgIHNjcm9sbFZhbCxcbiAgICAgICAgICBpc1JldmVhbGVkLCBcbiAgICAgICAgICBub3Njcm9sbCwgXG4gICAgICAgICAgaXNBbmltYXRpbmcsXG4gICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdjb250YWluZXInICksXG4gICAgICAgICAgdHJpZ2dlciA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCAnYnV0dG9uLnRyaWdnZXInICk7XG5cbiAgICAgICAgZnVuY3Rpb24gc2Nyb2xsWSgpIHtcbiAgICAgICAgICByZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsVG9wO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBzY3JvbGxQYWdlKCkge1xuICAgICAgICAgIHNjcm9sbFZhbCA9IHNjcm9sbFkoKTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiggbm9zY3JvbGwgJiYgIWllICkge1xuICAgICAgICAgICAgaWYoIHNjcm9sbFZhbCA8IDAgKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAvLyBrZWVwIGl0IHRoYXQgd2F5XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oIDAsIDAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiggY2xhc3NpZS5oYXMoIGNvbnRhaW5lciwgJ25vdHJhbnMnICkgKSB7XG4gICAgICAgICAgICBjbGFzc2llLnJlbW92ZSggY29udGFpbmVyLCAnbm90cmFucycgKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiggaXNBbmltYXRpbmcgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIGlmKCBzY3JvbGxWYWwgPD0gMCAmJiBpc1JldmVhbGVkICkge1xuICAgICAgICAgICAgdG9nZ2xlKDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmKCBzY3JvbGxWYWwgPiAwICYmICFpc1JldmVhbGVkICl7XG4gICAgICAgICAgICB0b2dnbGUoMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlKCByZXZlYWwgKSB7XG4gICAgICAgICAgaXNBbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmKCByZXZlYWwgKSB7XG4gICAgICAgICAgICBjbGFzc2llLmFkZCggY29udGFpbmVyLCAnbW9kaWZ5JyApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vc2Nyb2xsID0gdHJ1ZTtcbiAgICAgICAgICAgIGRpc2FibGVfc2Nyb2xsKCk7XG4gICAgICAgICAgICBjbGFzc2llLnJlbW92ZSggY29udGFpbmVyLCAnbW9kaWZ5JyApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHNpbXVsYXRpbmcgdGhlIGVuZCBvZiB0aGUgdHJhbnNpdGlvbjpcbiAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlzUmV2ZWFsZWQgPSAhaXNSZXZlYWxlZDtcbiAgICAgICAgICAgIGlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpZiggcmV2ZWFsICkge1xuICAgICAgICAgICAgICBub3Njcm9sbCA9IGZhbHNlO1xuICAgICAgICAgICAgICBlbmFibGVfc2Nyb2xsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgMTIwMCApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVmcmVzaGluZyB0aGUgcGFnZS4uLlxuICAgICAgICB2YXIgcGFnZVNjcm9sbCA9IHNjcm9sbFkoKTtcbiAgICAgICAgbm9zY3JvbGwgPSBwYWdlU2Nyb2xsID09PSAwO1xuICAgICAgICBcbiAgICAgICAgZGlzYWJsZV9zY3JvbGwoKTtcbiAgICAgICAgXG4gICAgICAgIGlmKCBwYWdlU2Nyb2xsICkge1xuICAgICAgICAgIGlzUmV2ZWFsZWQgPSB0cnVlO1xuICAgICAgICAgIGNsYXNzaWUuYWRkKCBjb250YWluZXIsICdub3RyYW5zJyApO1xuICAgICAgICAgIGNsYXNzaWUuYWRkKCBjb250YWluZXIsICdtb2RpZnknICk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnc2Nyb2xsJywgc2Nyb2xsUGFnZSApO1xuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIGZ1bmN0aW9uKCkgeyB0b2dnbGUoICdyZXZlYWwnICk7IH0gKTtcbiAgICAgIH0pKCk7Il19
