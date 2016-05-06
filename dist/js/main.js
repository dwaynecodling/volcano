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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxLQUFsQyxDQUF3QyxZQUFXO0FBQ2pELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBTCxFQUFlO0FBQ2hILFVBQUksU0FBUyxFQUFFLEtBQUssSUFBTCxDQUFYLENBRDRHO0FBRWhILGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBL0IsQ0FBM0IsQ0FGdUc7QUFHaEgsVUFBSSxPQUFPLE1BQVAsRUFBZTtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCLEdBQWhCO1NBRGIsRUFFRyxJQUZILEVBRGlCO0FBSWpCLGVBQU8sS0FBUCxDQUppQjtPQUFuQjtLQUhGO0dBRHNDLENBQXhDLENBRFc7Q0FBWCxDQUFGOzs7O0FBc0JBLENBQUMsWUFBVztBQUNKLE1BQUksVUFBVSxFQUFFLE1BQUYsRUFBVSxNQUFWLEVBQVY7TUFDRixVQUFVLEVBQUUsWUFBRixDQUFWO01BQ0EsZ0JBQWdCLFFBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsTUFBbkIsRUFBaEIsQ0FIRTtBQUlKLFVBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsQ0FBQyxVQUFVLGFBQVYsQ0FBRCxHQUEwQixDQUExQixHQUE4QixNQUE5QixDQUF2QixDQUpJO0FB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b0MsSUFBcEMsQ0FBVCxDQUZnQjtBQUdsQixZQUFNLElBQU4sQ0FBVyxjQUFYLEVBQTBCLENBQTFCLEVBSGtCO0FBSWxCLFFBQUUsSUFBRixDQUFRLE1BQVIsRUFBZ0IsVUFBUyxHQUFULEVBQWMsS0FBZCxFQUFvQjtBQUNsQyxZQUFJLE1BQU0sTUFBTSxPQUFOLENBQWMsYUFBZCxFQUE2QixFQUE3QixFQUFpQyxPQUFqQyxDQUF5QyxVQUF6QyxFQUFxRCxFQUFyRCxDQUFOLENBRDhCO0FBRWxDLFVBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsS0FBakIsRUFBd0IsR0FBeEIsRUFBNkIsSUFBN0IsQ0FBa0MsWUFBVztBQUMzQyxZQUFFLElBQUYsRUFBUSxNQUFSO0FBRDJDLGVBRTNDLENBQU0sSUFBTixDQUFXLGNBQVgsRUFBMEIsTUFBTSxJQUFOLENBQVcsY0FBWCxJQUEyQixDQUEzQixDQUExQixDQUYyQztBQUczQyxjQUFJLE1BQU0sSUFBTixDQUFXLGNBQVgsS0FBOEIsT0FBTyxNQUFQLEVBQWU7QUFDL0MscUJBQVMsV0FBVCxDQUFxQixJQUFyQixDQUEwQixLQUExQixFQUQrQztXQUFqRDtTQUhnQyxDQUFsQyxDQUZrQztPQUFwQixDQUFoQixDQUprQjtLQUFWLENBQVYsQ0FkK0I7R0FBakIsQ0FETDtDQUFYLENBQUQsQ0FnQ0UsTUFoQ0YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoganNoaW50IGRldmVsOnRydWUgKi9cbmNvbnNvbGUubG9nKCdMb29rIGF0IGFwcC9qcy9tYWluLmpzJyk7XG5cblxuJChmdW5jdGlvbigpIHtcbiAgJCgnYVtocmVmKj1cIiNcIl06bm90KFtocmVmPVwiI1wiXSknKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpICYmIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWUpIHtcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArJ10nKTtcbiAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG5cblxuXG5cblxuLy8gSW50cm8gRnVsbCBTY3JlZW4gcGFnZSBTZWN0aW9uXG5cblxuKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgd2luZG93SCA9ICQod2luZG93KS5oZWlnaHQoKSxcbiAgICAgICAgICBpbnRyb0VsID0gJCgnZGl2Lm9wZW5lcicpLFxuICAgICAgICAgIGludHJvSGVhZGluZ0ggPSBpbnRyb0VsLmZpbmQoJ2gxJykuaGVpZ2h0KCk7XG4gICAgICAgIGludHJvRWwuY3NzKCdwYWRkaW5nJywgKHdpbmRvd0ggLSBpbnRyb0hlYWRpbmdIKS8yICsgJ3B4IDAnKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGludHJvRWwuc2xpZGVVcCgxMDAwLCBmdW5jdGlvbigpIHsgJChkb2N1bWVudCkub2ZmKCdzY3JvbGwnKTsgfSk7XG4gICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcCgwKTtcblxuICAgICAgICB9KTtcbiAgICAgIH0pKCk7XG5cblxuXG5cblxuXG5cbi8vIEV4YW1wbGUgMTogRnJvbSBhbiBlbGVtZW50IGluIERPTVxuJCgnLm9wZW4tcG9wdXAtbGluaycpLm1hZ25pZmljUG9wdXAoe1xuICB0eXBlOidpbmxpbmUnLFxuICByZW1vdmFsRGVsYXk6IDUwMCwgLy9kZWxheSByZW1vdmFsIGJ5IFggdG8gYWxsb3cgb3V0LWFuaW1hdGlvblxuICBjYWxsYmFja3M6IHtcbiAgICBiZWZvcmVPcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICB0aGlzLnN0Lm1haW5DbGFzcyA9IHRoaXMuc3QuZWwuYXR0cignZGF0YS1lZmZlY3QnKTtcbiAgICB9XG4gIH0sXG4gIG1pZENsaWNrOiB0cnVlIC8vIGFsbG93IG9wZW5pbmcgcG9wdXAgb24gbWlkZGxlIG1vdXNlIGNsaWNrLiBBbHdheXMgc2V0IGl0IHRvIHRydWUgaWYgeW91IGRvbid0IHByb3ZpZGUgYWx0ZXJuYXRpdmUgc291cmNlLlxufSk7XG5cblxuXG5cbi8vIHJlc3BvbnNpdmUgbmF2aWdhdGlvblxuXG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAkKFwiLmJ1dHRvbiBhXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cblxuICAgICAgIFxuICAgICAgICAkKFwiLm92ZXJsYXlcIikuZmFkZVRvZ2dsZSgyMDApO1xuICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJykudG9nZ2xlQ2xhc3MoJ2J0bi1jbG9zZScpO1xuXG4gICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJidG4tY2xvc2VcIikpIHtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJidG4tb3BlblwiKSkge1xuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICB9XG59KTtcbiAgIFxufSk7XG4kKCcub3ZlcmxheScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAkKFwiLmJ1dHRvbiBhXCIpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcbiAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnYXV0bycpO1xuICAgIG9wZW4gPSBmYWxzZTtcbiAgICBcbn0pO1xuXG4gIFxuXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCl7XG4gIC8vb3BlbiB0aGUgbGF0ZXJhbCBwYW5lbFxuICAkKCcuY2QtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCgnLmNkLXBhbmVsJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgfSk7XG4gIC8vY2xvZGUgdGhlIGxhdGVyYWwgcGFuZWxcbiAgJCgnLmNkLXBhbmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGlmKCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wYW5lbCcpIHx8ICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXBhbmVsLWNsb3NlJykgKSB7IFxuICAgICAgJCgnLmNkLXBhbmVsJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cblxuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpe1xuICAvL2NhY2hlIERPTSBlbGVtZW50c1xuICB2YXIgcHJvamVjdHNDb250YWluZXIgPSAkKCcuY2QtcHJvamVjdHMtY29udGFpbmVyJyksXG4gICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlciA9IHByb2plY3RzQ29udGFpbmVyLmZpbmQoJy5jZC1wcm9qZWN0cy1wcmV2aWV3cycpLFxuICAgIHByb2plY3RQcmV2aWV3cyA9IHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksXG4gICAgcHJvamVjdHMgPSBwcm9qZWN0c0NvbnRhaW5lci5maW5kKCcuY2QtcHJvamVjdHMnKSxcbiAgICBuYXZpZ2F0aW9uVHJpZ2dlciA9ICQoJy5jZC1uYXYtdHJpZ2dlcicpLFxuICAgIG5hdmlnYXRpb24gPSAkKCcuY2QtcHJpbWFyeS1uYXYnKSxcbiAgICAvL2lmIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IENTUyB0cmFuc2l0aW9ucy4uLlxuICAgIHRyYW5zaXRpb25zTm90U3VwcG9ydGVkID0gKCAkKCcubm8tY3NzdHJhbnNpdGlvbnMnKS5sZW5ndGggPiAwKTtcblxuICB2YXIgYW5pbWF0aW5nID0gZmFsc2UsXG4gICAgLy93aWxsIGJlIHVzZWQgdG8gZXh0cmFjdCByYW5kb20gbnVtYmVycyBmb3IgcHJvamVjdHMgc2xpZGUgdXAvc2xpZGUgZG93biBlZmZlY3RcbiAgICBudW1SYW5kb21zID0gcHJvamVjdHMuZmluZCgnbGknKS5sZW5ndGgsIFxuICAgIHVuaXF1ZVJhbmRvbXMgPSBbXTtcblxuICAvL29wZW4gcHJvamVjdFxuICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLm9uKCdjbGljaycsICdhJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYoIGFuaW1hdGluZyA9PSBmYWxzZSApIHtcbiAgICAgIGFuaW1hdGluZyA9IHRydWU7XG4gICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5hZGQocHJvamVjdHNDb250YWluZXIpLmFkZENsYXNzKCdwcm9qZWN0LW9wZW4nKTtcbiAgICAgIG9wZW5Qcm9qZWN0KCQodGhpcykucGFyZW50KCdsaScpKTtcbiAgICB9XG4gIH0pO1xuXG4gIG5hdmlnYXRpb25UcmlnZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIGlmKCBhbmltYXRpbmcgPT0gZmFsc2UgKSB7XG4gICAgICBhbmltYXRpbmcgPSB0cnVlO1xuICAgICAgaWYoIG5hdmlnYXRpb25UcmlnZ2VyLmhhc0NsYXNzKCdwcm9qZWN0LW9wZW4nKSApIHtcbiAgICAgICAgLy9jbG9zZSB2aXNpYmxlIHByb2plY3RcbiAgICAgICAgbmF2aWdhdGlvblRyaWdnZXIuYWRkKHByb2plY3RzQ29udGFpbmVyKS5yZW1vdmVDbGFzcygncHJvamVjdC1vcGVuJyk7XG4gICAgICAgIGNsb3NlUHJvamVjdCgpO1xuICAgICAgfSBlbHNlIGlmKCBuYXZpZ2F0aW9uVHJpZ2dlci5oYXNDbGFzcygnbmF2LXZpc2libGUnKSApIHtcbiAgICAgICAgLy9jbG9zZSBtYWluIG5hdmlnYXRpb25cbiAgICAgICAgbmF2aWdhdGlvblRyaWdnZXIucmVtb3ZlQ2xhc3MoJ25hdi12aXNpYmxlJyk7XG4gICAgICAgIG5hdmlnYXRpb24ucmVtb3ZlQ2xhc3MoJ25hdi1jbGlja2FibGUgbmF2LXZpc2libGUnKTtcbiAgICAgICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIHByb2plY3RQcmV2aWV3cy5yZW1vdmVDbGFzcygnc2xpZGUtb3V0Jyk7XG4gICAgICAgIGVsc2Ugc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLCAtMSwgMCwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9vcGVuIG1haW4gbmF2aWdhdGlvblxuICAgICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5hZGRDbGFzcygnbmF2LXZpc2libGUnKTtcbiAgICAgICAgbmF2aWdhdGlvbi5hZGRDbGFzcygnbmF2LXZpc2libGUnKTtcbiAgICAgICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIHByb2plY3RQcmV2aWV3cy5hZGRDbGFzcygnc2xpZGUtb3V0Jyk7XG4gICAgICAgIGVsc2Ugc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLCAtMSwgMCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBcblxuICAgIGlmKHRyYW5zaXRpb25zTm90U3VwcG9ydGVkKSBhbmltYXRpbmcgPSBmYWxzZTtcbiAgfSk7XG5cbiAgLy9zY3JvbGwgZG93biB0byBwcm9qZWN0IGluZm9cbiAgcHJvamVjdHNDb250YWluZXIub24oJ2NsaWNrJywgJy5zY3JvbGwnLCBmdW5jdGlvbigpe1xuICAgIHByb2plY3RzQ29udGFpbmVyLmFuaW1hdGUoeydzY3JvbGxUb3AnOiQod2luZG93KS5oZWlnaHQoKX0sIDUwMCk7IFxuICB9KTtcblxuICAvL2NoZWNrIGlmIGJhY2tncm91bmQtaW1hZ2VzIGhhdmUgYmVlbiBsb2FkZWQgYW5kIHNob3cgcHJvamVjdCBwcmV2aWV3c1xuICBwcm9qZWN0UHJldmlld3MuY2hpbGRyZW4oJ2EnKS5iZ0xvYWRlZCh7XG4gICAgICBhZnRlckxvYWRlZCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHNob3dQcmV2aWV3KHByb2plY3RQcmV2aWV3cy5lcSgwKSk7XG4gICAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNob3dQcmV2aWV3KHByb2plY3RQcmV2aWV3KSB7XG4gICAgaWYocHJvamVjdFByZXZpZXcubGVuZ3RoID4gMCApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgcHJvamVjdFByZXZpZXcuYWRkQ2xhc3MoJ2JnLWxvYWRlZCcpO1xuICAgICAgICBzaG93UHJldmlldyhwcm9qZWN0UHJldmlldy5uZXh0KCkpO1xuICAgICAgfSwgMTUwKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvcGVuUHJvamVjdChwcm9qZWN0UHJldmlldykge1xuICAgIHZhciBwcm9qZWN0SW5kZXggPSBwcm9qZWN0UHJldmlldy5pbmRleCgpO1xuICAgIHByb2plY3RzLmNoaWxkcmVuKCdsaScpLmVxKHByb2plY3RJbmRleCkuYWRkKHByb2plY3RQcmV2aWV3KS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICBcbiAgICBpZiggdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgKSB7XG4gICAgICBwcm9qZWN0UHJldmlld3MuYWRkQ2xhc3MoJ3NsaWRlLW91dCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpJykuZXEocHJvamVjdEluZGV4KS5hZGRDbGFzcygnY29udGVudC12aXNpYmxlJyk7XG4gICAgICBhbmltYXRpbmcgPSBmYWxzZTtcbiAgICB9IGVsc2UgeyBcbiAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdFByZXZpZXdzLCBwcm9qZWN0SW5kZXgsIDAsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlUHJvamVjdCgpIHtcbiAgICBwcm9qZWN0cy5maW5kKCcuc2VsZWN0ZWQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKS5vbignd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdjb250ZW50LXZpc2libGUnKS5vZmYoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnKTtcbiAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSwgLTEsIDAsIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIC8vaWYgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgQ1NTIHRyYW5zaXRpb25zLi4uXG4gICAgaWYoIHRyYW5zaXRpb25zTm90U3VwcG9ydGVkICkge1xuICAgICAgcHJvamVjdFByZXZpZXdzLnJlbW92ZUNsYXNzKCdzbGlkZS1vdXQnKTtcbiAgICAgIHByb2plY3RzLmZpbmQoJy5jb250ZW50LXZpc2libGUnKS5yZW1vdmVDbGFzcygnY29udGVudC12aXNpYmxlJyk7XG4gICAgICBhbmltYXRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIsIHByb2plY3RJbmRleCwgaW5kZXgsIGJvb2wpIHtcbiAgICBpZihpbmRleCA9PSAwICkgY3JlYXRlQXJyYXlSYW5kb20oKTtcbiAgICBpZiggcHJvamVjdEluZGV4ICE9IC0xICYmIGluZGV4ID09IDAgKSBpbmRleCA9IDE7XG5cbiAgICB2YXIgcmFuZG9tUHJvamVjdEluZGV4ID0gbWFrZVVuaXF1ZVJhbmRvbSgpO1xuICAgIGlmKCByYW5kb21Qcm9qZWN0SW5kZXggPT0gcHJvamVjdEluZGV4ICkgcmFuZG9tUHJvamVjdEluZGV4ID0gbWFrZVVuaXF1ZVJhbmRvbSgpO1xuICAgIFxuICAgIGlmKCBpbmRleCA8IG51bVJhbmRvbXMgLSAxICkge1xuICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShyYW5kb21Qcm9qZWN0SW5kZXgpLnRvZ2dsZUNsYXNzKCdzbGlkZS1vdXQnLCBib29sKTtcbiAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vYW5pbWF0ZSBuZXh0IHByZXZpZXcgcHJvamVjdFxuICAgICAgICBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIsIHByb2plY3RJbmRleCwgaW5kZXggKyAxLCBib29sKTtcbiAgICAgIH0sIDE1MCk7XG4gICAgfSBlbHNlIGlmICggaW5kZXggPT0gbnVtUmFuZG9tcyAtIDEgKSB7XG4gICAgICAvL3RoaXMgaXMgdGhlIGxhc3QgcHJvamVjdCBwcmV2aWV3IHRvIGJlIGFuaW1hdGVkIFxuICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShyYW5kb21Qcm9qZWN0SW5kZXgpLnRvZ2dsZUNsYXNzKCdzbGlkZS1vdXQnLCBib29sKS5vbmUoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpe1xuICAgICAgICBpZiggcHJvamVjdEluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpLnNlbGVjdGVkJykuYWRkQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpO1xuICAgICAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocHJvamVjdEluZGV4KS5hZGRDbGFzcygnc2xpZGUtb3V0JykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgIH0gZWxzZSBpZiggbmF2aWdhdGlvbi5oYXNDbGFzcygnbmF2LXZpc2libGUnKSAmJiBib29sICkge1xuICAgICAgICAgIG5hdmlnYXRpb24uYWRkQ2xhc3MoJ25hdi1jbGlja2FibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkub2ZmKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyk7XG4gICAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5MzUxNzU5L2phdmFzY3JpcHQtcmFuZG9tLW51bWJlci1vdXQtb2YtNS1uby1yZXBlYXQtdW50aWwtYWxsLWhhdmUtYmVlbi11c2VkXG4gIGZ1bmN0aW9uIG1ha2VVbmlxdWVSYW5kb20oKSB7XG4gICAgICB2YXIgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB1bmlxdWVSYW5kb21zLmxlbmd0aCk7XG4gICAgICB2YXIgdmFsID0gdW5pcXVlUmFuZG9tc1tpbmRleF07XG4gICAgICAvLyBub3cgcmVtb3ZlIHRoYXQgdmFsdWUgZnJvbSB0aGUgYXJyYXlcbiAgICAgIHVuaXF1ZVJhbmRvbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheVJhbmRvbSgpIHtcbiAgICAvL3Jlc2V0IGFycmF5XG4gICAgdW5pcXVlUmFuZG9tcy5sZW5ndGggPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtUmFuZG9tczsgaSsrKSB7XG4gICAgICAgICAgICB1bmlxdWVSYW5kb21zLnB1c2goaSk7XG4gICAgICAgIH1cbiAgfVxufSk7XG5cbiAvKlxuICogQkcgTG9hZGVkXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgSm9uYXRoYW4gQ2F0bXVsbFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG4gKGZ1bmN0aW9uKCQpe1xuICAkLmZuLmJnTG9hZGVkID0gZnVuY3Rpb24oY3VzdG9tKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gRGVmYXVsdCBwbHVnaW4gc2V0dGluZ3NcbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICBhZnRlckxvYWRlZCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2JnLWxvYWRlZCcpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBNZXJnZSBkZWZhdWx0IGFuZCB1c2VyIHNldHRpbmdzXG4gICAgdmFyIHNldHRpbmdzID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBjdXN0b20pO1xuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGVsZW1lbnRcbiAgICBzZWxmLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgIGJnSW1ncyA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLnNwbGl0KCcsICcpO1xuICAgICAgJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JywwKTtcbiAgICAgICQuZWFjaCggYmdJbWdzLCBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgICAgdmFyIGltZyA9IHZhbHVlLnJlcGxhY2UoL151cmxcXChbXCInXT8vLCAnJykucmVwbGFjZSgvW1wiJ10/XFwpJC8sICcnKTtcbiAgICAgICAgJCgnPGltZy8+JykuYXR0cignc3JjJywgaW1nKS5sb2FkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7IC8vIHByZXZlbnQgbWVtb3J5IGxlYWtzXG4gICAgICAgICAgJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JywkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnKSsxKTtcbiAgICAgICAgICBpZiAoJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JykgPj0gYmdJbWdzLmxlbmd0aCkge1xuICAgICAgICAgICAgc2V0dGluZ3MuYWZ0ZXJMb2FkZWQuY2FsbCgkdGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH07XG59KShqUXVlcnkpOyJdfQ==
