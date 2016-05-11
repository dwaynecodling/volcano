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
    $('.cd-panel-close').css({ display: "inline-block" });
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxLQUFsQyxDQUF3QyxZQUFXO0FBQ2pELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBTCxFQUFlO0FBQ2hILFVBQUksU0FBUyxFQUFFLEtBQUssSUFBTCxDQUFYLENBRDRHO0FBRWhILGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBL0IsQ0FBM0IsQ0FGdUc7QUFHaEgsVUFBSSxPQUFPLE1BQVAsRUFBZTtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCLEdBQWhCO1NBRGIsRUFFRyxJQUZILEVBRGlCO0FBSWpCLGVBQU8sS0FBUCxDQUppQjtPQUFuQjtLQUhGO0dBRHNDLENBQXhDLENBRFc7Q0FBWCxDQUFGOzs7O0FBc0JBLENBQUMsWUFBVztBQUNKLE1BQUksVUFBVSxFQUFFLE1BQUYsRUFBVSxNQUFWLEVBQVY7TUFDRixVQUFVLEVBQUUsWUFBRixDQUFWO01BQ0EsZ0JBQWdCLFFBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsTUFBbkIsRUFBaEIsQ0FIRTtBQUlKLFVBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsQ0FBQyxVQUFVLGFBQVYsQ0FBRCxHQUEwQixDQUExQixHQUE4QixNQUE5QixDQUF2QixDQUpJO0FBS0osSUFBRSxRQUFGLEVBQVksRUFBWixDQUFlLFFBQWYsRUFBeUIsWUFBVztBQUNsQyxZQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsRUFBc0IsWUFBVztBQUFFLFFBQUUsUUFBRixFQUFZLEdBQVosQ0FBZ0IsUUFBaEIsRUFBRjtLQUFYLENBQXRCLENBRGtDO0FBRWxDLE1BQUUsTUFBRixFQUFVLFNBQVYsQ0FBb0IsQ0FBcEIsRUFGa0M7R0FBWCxDQUF6QixDQUxJO0NBQVgsQ0FBRDs7O0FBbUJBLEVBQUUsa0JBQUYsRUFBc0IsYUFBdEIsQ0FBb0M7QUFDbEMsUUFBSyxRQUFMO0FBQ0EsZ0JBQWMsR0FBZDtBQUNBLGFBQVc7QUFDVCxnQkFBWSxzQkFBVztBQUNwQixXQUFLLEVBQUwsQ0FBUSxTQUFSLEdBQW9CLEtBQUssRUFBTCxDQUFRLEVBQVIsQ0FBVyxJQUFYLENBQWdCLGFBQWhCLENBQXBCLENBRG9CO0tBQVg7R0FEZDtBQUtBLFlBQVUsSUFBVjtBQVJrQyxDQUFwQzs7OztBQWtCQSxFQUFFLFFBQUYsRUFBWSxLQUFaLENBQWtCLFlBQVU7QUFDeEIsSUFBRSxXQUFGLEVBQWUsS0FBZixDQUFxQixZQUFVOztBQUkzQixNQUFFLFVBQUYsRUFBYyxVQUFkLENBQXlCLEdBQXpCLEVBSjJCO0FBSzVCLE1BQUUsSUFBRixFQUFRLFdBQVIsQ0FBb0IsVUFBcEIsRUFBZ0MsV0FBaEMsQ0FBNEMsV0FBNUMsRUFMNEI7O0FBTzVCLFFBQUksRUFBRSxJQUFGLEVBQVEsUUFBUixDQUFpQixXQUFqQixDQUFKLEVBQW1DO0FBQ2xDLFFBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxVQUFkLEVBQTBCLFFBQTFCLEVBRGtDO0tBQW5DLE1BRUksSUFBSSxFQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLFVBQWpCLENBQUosRUFBa0M7QUFDckMsUUFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFVBQWQsRUFBMEIsTUFBMUIsRUFEcUM7S0FBbEM7R0FUYyxDQUFyQixDQUR3QjtDQUFWLENBQWxCO0FBZ0JBLEVBQUUsVUFBRixFQUFjLEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsWUFBVTtBQUNoQyxJQUFFLFVBQUYsRUFBYyxVQUFkLENBQXlCLEdBQXpCLEVBRGdDO0FBRWhDLElBQUUsV0FBRixFQUFlLFdBQWYsQ0FBMkIsVUFBM0IsRUFBdUMsV0FBdkMsQ0FBbUQsV0FBbkQsRUFGZ0M7QUFHakMsSUFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFVBQWQsRUFBMEIsTUFBMUIsRUFIaUM7QUFJaEMsU0FBTyxLQUFQLENBSmdDO0NBQVYsQ0FBMUI7O0FBWUEsT0FBTyxRQUFQLEVBQWlCLEtBQWpCLENBQXVCLFVBQVMsQ0FBVCxFQUFXOztBQUVoQyxJQUFFLFNBQUYsRUFBYSxFQUFiLENBQWdCLE9BQWhCLEVBQXlCLFVBQVMsS0FBVCxFQUFlO0FBQ3RDLFVBQU0sY0FBTixHQURzQztBQUV0QyxNQUFFLFdBQUYsRUFBZSxRQUFmLENBQXdCLFlBQXhCLEVBRnNDO0FBR3JDLE1BQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxVQUFkLEVBQTBCLFFBQTFCLEVBSHFDO0FBSXBDLE1BQUUsaUJBQUYsRUFBcUIsR0FBckIsQ0FBeUIsRUFBQyxTQUFTLGNBQVQsRUFBMUIsRUFKb0M7R0FBZixDQUF6Qjs7QUFGZ0MsR0FTaEMsQ0FBRSxXQUFGLEVBQWUsRUFBZixDQUFrQixPQUFsQixFQUEyQixVQUFTLEtBQVQsRUFBZTtBQUN4QyxRQUFJLEVBQUUsTUFBTSxNQUFOLENBQUYsQ0FBZ0IsRUFBaEIsQ0FBbUIsV0FBbkIsS0FBbUMsRUFBRSxNQUFNLE1BQU4sQ0FBRixDQUFnQixFQUFoQixDQUFtQixpQkFBbkIsQ0FBbkMsRUFBMkU7QUFDN0UsUUFBRSxXQUFGLEVBQWUsV0FBZixDQUEyQixZQUEzQixFQUQ2RTtBQUU3RSxZQUFNLGNBQU4sR0FGNkU7O0FBSTdFLFFBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxVQUFkLEVBQTBCLE1BQTFCLEVBSjZFO0FBSzVFLFFBQUUsaUJBQUYsRUFBcUIsR0FBckIsQ0FBeUIsRUFBQyxTQUFTLE1BQVQsRUFBMUIsRUFMNEU7S0FBL0U7R0FEeUIsQ0FBM0IsQ0FUZ0M7Q0FBWCxDQUF2Qjs7QUF1QkEsT0FBTyxRQUFQLEVBQWlCLEtBQWpCLENBQXVCLFVBQVMsQ0FBVCxFQUFXOztBQUVoQyxNQUFJLG9CQUFvQixFQUFFLHdCQUFGLENBQXBCO01BQ0YseUJBQXlCLGtCQUFrQixJQUFsQixDQUF1Qix1QkFBdkIsQ0FBekI7TUFDQSxrQkFBa0IsdUJBQXVCLFFBQXZCLENBQWdDLElBQWhDLENBQWxCO01BQ0EsV0FBVyxrQkFBa0IsSUFBbEIsQ0FBdUIsY0FBdkIsQ0FBWDtNQUNBLG9CQUFvQixFQUFFLGlCQUFGLENBQXBCO01BQ0EsYUFBYSxFQUFFLGlCQUFGLENBQWI7OztBQUVBLDRCQUE0QixFQUFFLG9CQUFGLEVBQXdCLE1BQXhCLEdBQWlDLENBQWpDLENBVEU7O0FBV2hDLE1BQUksWUFBWSxLQUFaOzs7QUFFRixlQUFhLFNBQVMsSUFBVCxDQUFjLElBQWQsRUFBb0IsTUFBcEI7TUFDYixnQkFBZ0IsRUFBaEI7OztBQWQ4Qix3QkFpQmhDLENBQXVCLEVBQXZCLENBQTBCLE9BQTFCLEVBQW1DLEdBQW5DLEVBQXdDLFVBQVMsS0FBVCxFQUFlO0FBQ3JELFVBQU0sY0FBTixHQURxRDtBQUVyRCxRQUFJLGFBQWEsS0FBYixFQUFxQjtBQUN2QixrQkFBWSxJQUFaLENBRHVCO0FBRXZCLHdCQUFrQixHQUFsQixDQUFzQixpQkFBdEIsRUFBeUMsUUFBekMsQ0FBa0QsY0FBbEQsRUFGdUI7QUFHdkIsa0JBQVksRUFBRSxJQUFGLEVBQVEsTUFBUixDQUFlLElBQWYsQ0FBWixFQUh1QjtBQUl2QixRQUFFLGlCQUFGLEVBQXFCLEdBQXJCLENBQXlCLEVBQUMsU0FBUyxNQUFULEVBQTFCLEVBSnVCO0tBQXpCO0dBRnNDLENBQXhDLENBakJnQzs7QUEyQmhDLG9CQUFrQixFQUFsQixDQUFxQixPQUFyQixFQUE4QixVQUFTLEtBQVQsRUFBZTtBQUMzQyxVQUFNLGNBQU4sR0FEMkM7O0FBRzNDLFFBQUksYUFBYSxLQUFiLEVBQXFCO0FBQ3ZCLGtCQUFZLElBQVosQ0FEdUI7QUFFdkIsVUFBSSxrQkFBa0IsUUFBbEIsQ0FBMkIsY0FBM0IsQ0FBSixFQUFpRDs7O0FBRy9DLDBCQUFrQixHQUFsQixDQUFzQixpQkFBdEIsRUFBeUMsV0FBekMsQ0FBcUQsY0FBckQsRUFIK0M7QUFJL0MsdUJBSitDO0FBSy9DLFVBQUUsaUJBQUYsRUFBcUIsR0FBckIsQ0FBeUIsRUFBQyxTQUFTLGNBQVQsRUFBMUIsRUFMK0M7T0FBakQsTUFNTyxJQUFJLGtCQUFrQixRQUFsQixDQUEyQixhQUEzQixDQUFKLEVBQWdEOztBQUVyRCwwQkFBa0IsV0FBbEIsQ0FBOEIsYUFBOUIsRUFGcUQ7QUFHckQsbUJBQVcsV0FBWCxDQUF1QiwyQkFBdkIsRUFIcUQ7QUFJckQsWUFBRyx1QkFBSCxFQUE0QixnQkFBZ0IsV0FBaEIsQ0FBNEIsV0FBNUIsRUFBNUIsS0FDSyxvQkFBb0IsdUJBQXVCLFFBQXZCLENBQWdDLElBQWhDLENBQXBCLEVBQTJELENBQUMsQ0FBRCxFQUFJLENBQS9ELEVBQWtFLEtBQWxFLEVBREw7T0FKSyxNQU1BOztBQUVMLDBCQUFrQixRQUFsQixDQUEyQixhQUEzQixFQUZLO0FBR0wsbUJBQVcsUUFBWCxDQUFvQixhQUFwQixFQUhLO0FBSUwsWUFBRyx1QkFBSCxFQUE0QixnQkFBZ0IsUUFBaEIsQ0FBeUIsV0FBekIsRUFBNUIsS0FDSyxvQkFBb0IsdUJBQXVCLFFBQXZCLENBQWdDLElBQWhDLENBQXBCLEVBQTJELENBQUMsQ0FBRCxFQUFJLENBQS9ELEVBQWtFLElBQWxFLEVBREw7T0FWSztLQVJUOztBQXVCQSxRQUFHLHVCQUFILEVBQTRCLFlBQVksS0FBWixDQUE1QjtHQTFCNEIsQ0FBOUI7OztBQTNCZ0MsbUJBNERoQyxDQUFrQixFQUFsQixDQUFxQixPQUFyQixFQUE4QixTQUE5QixFQUF5QyxZQUFVO0FBQ2pELHNCQUFrQixPQUFsQixDQUEwQixFQUFDLGFBQVksRUFBRSxNQUFGLEVBQVUsTUFBVixFQUFaLEVBQTNCLEVBQTRELEdBQTVELEVBRGlEO0dBQVYsQ0FBekM7OztBQTVEZ0MsaUJBaUVoQyxDQUFnQixRQUFoQixDQUF5QixHQUF6QixFQUE4QixRQUE5QixDQUF1QztBQUNuQyxpQkFBYyx1QkFBVTtBQUN0QixrQkFBWSxnQkFBZ0IsRUFBaEIsQ0FBbUIsQ0FBbkIsQ0FBWixFQURzQjtLQUFWO0dBRGxCLEVBakVnQzs7QUF1RWhDLFdBQVMsV0FBVCxDQUFxQixjQUFyQixFQUFxQztBQUNuQyxRQUFHLGVBQWUsTUFBZixHQUF3QixDQUF4QixFQUE0QjtBQUM3QixpQkFBVyxZQUFVO0FBQ25CLHVCQUFlLFFBQWYsQ0FBd0IsV0FBeEIsRUFEbUI7QUFFbkIsb0JBQVksZUFBZSxJQUFmLEVBQVosRUFGbUI7T0FBVixFQUdSLEdBSEgsRUFENkI7S0FBL0I7R0FERjs7QUFTQSxXQUFTLFdBQVQsQ0FBcUIsY0FBckIsRUFBcUM7QUFDbkMsUUFBSSxlQUFlLGVBQWUsS0FBZixFQUFmLENBRCtCO0FBRW5DLGFBQVMsUUFBVCxDQUFrQixJQUFsQixFQUF3QixFQUF4QixDQUEyQixZQUEzQixFQUF5QyxHQUF6QyxDQUE2QyxjQUE3QyxFQUE2RCxRQUE3RCxDQUFzRSxVQUF0RSxFQUZtQzs7QUFJbkMsUUFBSSx1QkFBSixFQUE4QjtBQUM1QixzQkFBZ0IsUUFBaEIsQ0FBeUIsV0FBekIsRUFBc0MsV0FBdEMsQ0FBa0QsVUFBbEQsRUFENEI7QUFFNUIsZUFBUyxRQUFULENBQWtCLElBQWxCLEVBQXdCLEVBQXhCLENBQTJCLFlBQTNCLEVBQXlDLFFBQXpDLENBQWtELGlCQUFsRCxFQUY0QjtBQUc1QixrQkFBWSxLQUFaLENBSDRCO0tBQTlCLE1BSU87QUFDTCwwQkFBb0IsZUFBcEIsRUFBcUMsWUFBckMsRUFBbUQsQ0FBbkQsRUFBc0QsSUFBdEQsRUFESztLQUpQO0dBSkY7O0FBYUEsV0FBUyxZQUFULEdBQXdCO0FBQ3RCLGFBQVMsSUFBVCxDQUFjLFdBQWQsRUFBMkIsV0FBM0IsQ0FBdUMsVUFBdkMsRUFBbUQsRUFBbkQsQ0FBc0QsaUZBQXRELEVBQXlJLFlBQVU7QUFDakosUUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixpQkFBcEIsRUFBdUMsR0FBdkMsQ0FBMkMsaUZBQTNDLEVBRGlKO0FBRWpKLDBCQUFvQix1QkFBdUIsUUFBdkIsQ0FBZ0MsSUFBaEMsQ0FBcEIsRUFBMkQsQ0FBQyxDQUFELEVBQUksQ0FBL0QsRUFBa0UsS0FBbEUsRUFGaUo7S0FBVixDQUF6STs7O0FBRHNCLFFBT2xCLHVCQUFKLEVBQThCO0FBQzVCLHNCQUFnQixXQUFoQixDQUE0QixXQUE1QixFQUQ0QjtBQUU1QixlQUFTLElBQVQsQ0FBYyxrQkFBZCxFQUFrQyxXQUFsQyxDQUE4QyxpQkFBOUMsRUFGNEI7QUFHNUIsa0JBQVksS0FBWixDQUg0QjtLQUE5QjtHQVBGOztBQWNBLFdBQVMsbUJBQVQsQ0FBNkIsc0JBQTdCLEVBQXFELFlBQXJELEVBQW1FLEtBQW5FLEVBQTBFLElBQTFFLEVBQWdGO0FBQzlFLFFBQUcsU0FBUyxDQUFULEVBQWEsb0JBQWhCO0FBQ0EsUUFBSSxnQkFBZ0IsQ0FBQyxDQUFELElBQU0sU0FBUyxDQUFULEVBQWEsUUFBUSxDQUFSLENBQXZDOztBQUVBLFFBQUkscUJBQXFCLGtCQUFyQixDQUowRTtBQUs5RSxRQUFJLHNCQUFzQixZQUF0QixFQUFxQyxxQkFBcUIsa0JBQXJCLENBQXpDOztBQUVBLFFBQUksUUFBUSxhQUFhLENBQWIsRUFBaUI7QUFDM0IsNkJBQXVCLEVBQXZCLENBQTBCLGtCQUExQixFQUE4QyxXQUE5QyxDQUEwRCxXQUExRCxFQUF1RSxJQUF2RSxFQUQyQjtBQUUzQixpQkFBWSxZQUFVOztBQUVwQiw0QkFBb0Isc0JBQXBCLEVBQTRDLFlBQTVDLEVBQTBELFFBQVEsQ0FBUixFQUFXLElBQXJFLEVBRm9CO09BQVYsRUFHVCxHQUhILEVBRjJCO0tBQTdCLE1BTU8sSUFBSyxTQUFTLGFBQWEsQ0FBYixFQUFpQjs7QUFFcEMsNkJBQXVCLEVBQXZCLENBQTBCLGtCQUExQixFQUE4QyxXQUE5QyxDQUEwRCxXQUExRCxFQUF1RSxJQUF2RSxFQUE2RSxHQUE3RSxDQUFpRixpRkFBakYsRUFBb0ssWUFBVTtBQUM1SyxZQUFJLGdCQUFnQixDQUFDLENBQUQsRUFBSTtBQUN0QixtQkFBUyxRQUFULENBQWtCLGFBQWxCLEVBQWlDLFFBQWpDLENBQTBDLGlCQUExQyxFQURzQjtBQUV0QixpQ0FBdUIsRUFBdkIsQ0FBMEIsWUFBMUIsRUFBd0MsUUFBeEMsQ0FBaUQsV0FBakQsRUFBOEQsV0FBOUQsQ0FBMEUsVUFBMUUsRUFGc0I7U0FBeEIsTUFHTyxJQUFJLFdBQVcsUUFBWCxDQUFvQixhQUFwQixLQUFzQyxJQUF0QyxFQUE2QztBQUN0RCxxQkFBVyxRQUFYLENBQW9CLGVBQXBCLEVBRHNEO1NBQWpEO0FBR1AsK0JBQXVCLEVBQXZCLENBQTBCLGtCQUExQixFQUE4QyxHQUE5QyxDQUFrRCxpRkFBbEQsRUFQNEs7QUFRNUssb0JBQVksS0FBWixDQVI0SztPQUFWLENBQXBLLENBRm9DO0tBQS9CO0dBYlQ7OztBQTNHZ0MsV0F3SXZCLGdCQUFULEdBQTRCO0FBQ3hCLFFBQUksUUFBUSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsY0FBYyxNQUFkLENBQW5DLENBRG9CO0FBRXhCLFFBQUksTUFBTSxjQUFjLEtBQWQsQ0FBTjs7QUFGb0IsaUJBSXhCLENBQWMsTUFBZCxDQUFxQixLQUFyQixFQUE0QixDQUE1QixFQUp3QjtBQUt4QixXQUFPLEdBQVAsQ0FMd0I7R0FBNUI7O0FBUUEsV0FBUyxpQkFBVCxHQUE2Qjs7QUFFM0Isa0JBQWMsTUFBZCxHQUF1QixDQUF2QixDQUYyQjtBQUczQixTQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxVQUFKLEVBQWdCLEdBQWhDLEVBQXFDO0FBQzdCLG9CQUFjLElBQWQsQ0FBbUIsQ0FBbkIsRUFENkI7S0FBckM7R0FIRjtDQWhKcUIsQ0FBdkI7Ozs7Ozs7QUE4SkMsQ0FBQyxVQUFTLENBQVQsRUFBVztBQUNYLElBQUUsRUFBRixDQUFLLFFBQUwsR0FBZ0IsVUFBUyxNQUFULEVBQWlCO0FBQy9CLFFBQUksT0FBTyxJQUFQOzs7QUFEMkIsUUFJM0IsV0FBVztBQUNiLG1CQUFjLHVCQUFVO0FBQ3RCLGFBQUssUUFBTCxDQUFjLFdBQWQsRUFEc0I7T0FBVjtLQURaOzs7QUFKMkIsUUFXM0IsV0FBVyxFQUFFLE1BQUYsQ0FBUyxFQUFULEVBQWEsUUFBYixFQUF1QixNQUF2QixDQUFYOzs7QUFYMkIsUUFjL0IsQ0FBSyxJQUFMLENBQVUsWUFBVTtBQUNsQixVQUFJLFFBQVEsRUFBRSxJQUFGLENBQVI7VUFDRixTQUFTLE1BQU0sR0FBTixDQUFVLGtCQUFWLEVBQThCLEtBQTlCLENBQW9DLElBQXBDLENBQVQsQ0FGZ0I7QUFHbEIsWUFBTSxJQUFOLENBQVcsY0FBWCxFQUEwQixDQUExQixFQUhrQjtBQUlsQixRQUFFLElBQUYsQ0FBUSxNQUFSLEVBQWdCLFVBQVMsR0FBVCxFQUFjLEtBQWQsRUFBb0I7QUFDbEMsWUFBSSxNQUFNLE1BQU0sT0FBTixDQUFjLGFBQWQsRUFBNkIsRUFBN0IsRUFBaUMsT0FBakMsQ0FBeUMsVUFBekMsRUFBcUQsRUFBckQsQ0FBTixDQUQ4QjtBQUVsQyxVQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLEtBQWpCLEVBQXdCLEdBQXhCLEVBQTZCLElBQTdCLENBQWtDLFlBQVc7QUFDM0MsWUFBRSxJQUFGLEVBQVEsTUFBUjtBQUQyQyxlQUUzQyxDQUFNLElBQU4sQ0FBVyxjQUFYLEVBQTBCLE1BQU0sSUFBTixDQUFXLGNBQVgsSUFBMkIsQ0FBM0IsQ0FBMUIsQ0FGMkM7QUFHM0MsY0FBSSxNQUFNLElBQU4sQ0FBVyxjQUFYLEtBQThCLE9BQU8sTUFBUCxFQUFlO0FBQy9DLHFCQUFTLFdBQVQsQ0FBcUIsSUFBckIsQ0FBMEIsS0FBMUIsRUFEK0M7V0FBakQ7U0FIZ0MsQ0FBbEMsQ0FGa0M7T0FBcEIsQ0FBaEIsQ0FKa0I7S0FBVixDQUFWLENBZCtCO0dBQWpCLENBREw7Q0FBWCxDQUFELENBZ0NFLE1BaENGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGpzaGludCBkZXZlbDp0cnVlICovXG5jb25zb2xlLmxvZygnTG9vayBhdCBhcHAvanMvbWFpbi5qcycpO1xuXG5cbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XG4gICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG5cblxuXG5cbi8vIEludHJvIEZ1bGwgU2NyZWVuIHBhZ2UgU2VjdGlvblxuXG5cbihmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHdpbmRvd0ggPSAkKHdpbmRvdykuaGVpZ2h0KCksXG4gICAgICAgICAgaW50cm9FbCA9ICQoJ2Rpdi5vcGVuZXInKSxcbiAgICAgICAgICBpbnRyb0hlYWRpbmdIID0gaW50cm9FbC5maW5kKCdoMScpLmhlaWdodCgpO1xuICAgICAgICBpbnRyb0VsLmNzcygncGFkZGluZycsICh3aW5kb3dIIC0gaW50cm9IZWFkaW5nSCkvMiArICdweCAwJyk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpbnRyb0VsLnNsaWRlVXAoMTAwMCwgZnVuY3Rpb24oKSB7ICQoZG9jdW1lbnQpLm9mZignc2Nyb2xsJyk7IH0pO1xuICAgICAgICAgICQod2luZG93KS5zY3JvbGxUb3AoMCk7XG5cbiAgICAgICAgfSk7XG4gICAgICB9KSgpO1xuXG5cblxuXG5cblxuXG4vLyBFeGFtcGxlIDE6IEZyb20gYW4gZWxlbWVudCBpbiBET01cbiQoJy5vcGVuLXBvcHVwLWxpbmsnKS5tYWduaWZpY1BvcHVwKHtcbiAgdHlwZTonaW5saW5lJyxcbiAgcmVtb3ZhbERlbGF5OiA1MDAsIC8vZGVsYXkgcmVtb3ZhbCBieSBYIHRvIGFsbG93IG91dC1hbmltYXRpb25cbiAgY2FsbGJhY2tzOiB7XG4gICAgYmVmb3JlT3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgdGhpcy5zdC5tYWluQ2xhc3MgPSB0aGlzLnN0LmVsLmF0dHIoJ2RhdGEtZWZmZWN0Jyk7XG4gICAgfVxuICB9LFxuICBtaWRDbGljazogdHJ1ZSAvLyBhbGxvdyBvcGVuaW5nIHBvcHVwIG9uIG1pZGRsZSBtb3VzZSBjbGljay4gQWx3YXlzIHNldCBpdCB0byB0cnVlIGlmIHlvdSBkb24ndCBwcm92aWRlIGFsdGVybmF0aXZlIHNvdXJjZS5cbn0pO1xuXG5cblxuXG4vLyByZXNwb25zaXZlIG5hdmlnYXRpb25cblxuXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgJChcIi5idXR0b24gYVwiKS5jbGljayhmdW5jdGlvbigpe1xuXG5cbiAgICAgICBcbiAgICAgICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcblxuICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLWNsb3NlXCIpKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgfSBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLW9wZW5cIikpIHtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdhdXRvJyk7XG4gICAgfVxufSk7XG4gICBcbn0pO1xuJCgnLm92ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQoXCIub3ZlcmxheVwiKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgJChcIi5idXR0b24gYVwiKS50b2dnbGVDbGFzcygnYnRuLW9wZW4nKS50b2dnbGVDbGFzcygnYnRuLWNsb3NlJyk7XG4gICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICBvcGVuID0gZmFsc2U7XG4gICAgXG59KTtcblxuXG5cblxuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpe1xuICAvL29wZW4gdGhlIGxhdGVyYWwgcGFuZWxcbiAgJCgnLmNkLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoJy5jZC1wYW5lbCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe2Rpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCJ9KTtcbiAgfSk7XG4gIC8vY2xvc2UgdGhlIGxhdGVyYWwgcGFuZWxcbiAgJCgnLmNkLXBhbmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGlmKCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wYW5lbCcpIHx8ICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXBhbmVsLWNsb3NlJykgKSB7IFxuICAgICAgJCgnLmNkLXBhbmVsJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnYXV0bycpO1xuICAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcbiAgICB9XG4gIH0pO1xufSk7XG5cblxuXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCl7XG4gIC8vY2FjaGUgRE9NIGVsZW1lbnRzXG4gIHZhciBwcm9qZWN0c0NvbnRhaW5lciA9ICQoJy5jZC1wcm9qZWN0cy1jb250YWluZXInKSxcbiAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyID0gcHJvamVjdHNDb250YWluZXIuZmluZCgnLmNkLXByb2plY3RzLXByZXZpZXdzJyksXG4gICAgcHJvamVjdFByZXZpZXdzID0gcHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSxcbiAgICBwcm9qZWN0cyA9IHByb2plY3RzQ29udGFpbmVyLmZpbmQoJy5jZC1wcm9qZWN0cycpLFxuICAgIG5hdmlnYXRpb25UcmlnZ2VyID0gJCgnLmNkLW5hdi10cmlnZ2VyJyksXG4gICAgbmF2aWdhdGlvbiA9ICQoJy5jZC1wcmltYXJ5LW5hdicpLFxuICAgIC8vaWYgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgQ1NTIHRyYW5zaXRpb25zLi4uXG4gICAgdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgPSAoICQoJy5uby1jc3N0cmFuc2l0aW9ucycpLmxlbmd0aCA+IDApO1xuXG4gIHZhciBhbmltYXRpbmcgPSBmYWxzZSxcbiAgICAvL3dpbGwgYmUgdXNlZCB0byBleHRyYWN0IHJhbmRvbSBudW1iZXJzIGZvciBwcm9qZWN0cyBzbGlkZSB1cC9zbGlkZSBkb3duIGVmZmVjdFxuICAgIG51bVJhbmRvbXMgPSBwcm9qZWN0cy5maW5kKCdsaScpLmxlbmd0aCwgXG4gICAgdW5pcXVlUmFuZG9tcyA9IFtdO1xuXG4gIC8vb3BlbiBwcm9qZWN0XG4gIHByb2plY3RzUHJldmlld1dyYXBwZXIub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiggYW5pbWF0aW5nID09IGZhbHNlICkge1xuICAgICAgYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZChwcm9qZWN0c0NvbnRhaW5lcikuYWRkQ2xhc3MoJ3Byb2plY3Qtb3BlbicpO1xuICAgICAgb3BlblByb2plY3QoJCh0aGlzKS5wYXJlbnQoJ2xpJykpO1xuICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xuICAgIH1cbiAgfSk7XG5cbiAgbmF2aWdhdGlvblRyaWdnZXIub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgaWYoIGFuaW1hdGluZyA9PSBmYWxzZSApIHtcbiAgICAgIGFuaW1hdGluZyA9IHRydWU7XG4gICAgICBpZiggbmF2aWdhdGlvblRyaWdnZXIuaGFzQ2xhc3MoJ3Byb2plY3Qtb3BlbicpICkge1xuXG4gICAgICAgIC8vY2xvc2UgdmlzaWJsZSBwcm9qZWN0XG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZChwcm9qZWN0c0NvbnRhaW5lcikucmVtb3ZlQ2xhc3MoJ3Byb2plY3Qtb3BlbicpO1xuICAgICAgICBjbG9zZVByb2plY3QoKTtcbiAgICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcImlubGluZS1ibG9ja1wifSk7XG4gICAgICB9IGVsc2UgaWYoIG5hdmlnYXRpb25UcmlnZ2VyLmhhc0NsYXNzKCduYXYtdmlzaWJsZScpICkge1xuICAgICAgICAvL2Nsb3NlIG1haW4gbmF2aWdhdGlvblxuICAgICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5yZW1vdmVDbGFzcygnbmF2LXZpc2libGUnKTtcbiAgICAgICAgbmF2aWdhdGlvbi5yZW1vdmVDbGFzcygnbmF2LWNsaWNrYWJsZSBuYXYtdmlzaWJsZScpO1xuICAgICAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgcHJvamVjdFByZXZpZXdzLnJlbW92ZUNsYXNzKCdzbGlkZS1vdXQnKTtcbiAgICAgICAgZWxzZSBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL29wZW4gbWFpbiBuYXZpZ2F0aW9uXG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZENsYXNzKCduYXYtdmlzaWJsZScpO1xuICAgICAgICBuYXZpZ2F0aW9uLmFkZENsYXNzKCduYXYtdmlzaWJsZScpO1xuICAgICAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgcHJvamVjdFByZXZpZXdzLmFkZENsYXNzKCdzbGlkZS1vdXQnKTtcbiAgICAgICAgZWxzZSBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IFxuXG4gICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIGFuaW1hdGluZyA9IGZhbHNlO1xuICB9KTtcblxuXG5cblxuICAvL3Njcm9sbCBkb3duIHRvIHByb2plY3QgaW5mb1xuICBwcm9qZWN0c0NvbnRhaW5lci5vbignY2xpY2snLCAnLnNjcm9sbCcsIGZ1bmN0aW9uKCl7XG4gICAgcHJvamVjdHNDb250YWluZXIuYW5pbWF0ZSh7J3Njcm9sbFRvcCc6JCh3aW5kb3cpLmhlaWdodCgpfSwgNTAwKTsgXG4gIH0pO1xuXG4gIC8vY2hlY2sgaWYgYmFja2dyb3VuZC1pbWFnZXMgaGF2ZSBiZWVuIGxvYWRlZCBhbmQgc2hvdyBwcm9qZWN0IHByZXZpZXdzXG4gIHByb2plY3RQcmV2aWV3cy5jaGlsZHJlbignYScpLmJnTG9hZGVkKHtcbiAgICAgIGFmdGVyTG9hZGVkIDogZnVuY3Rpb24oKXtcbiAgICAgICAgc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXdzLmVxKDApKTtcbiAgICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXcpIHtcbiAgICBpZihwcm9qZWN0UHJldmlldy5sZW5ndGggPiAwICkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBwcm9qZWN0UHJldmlldy5hZGRDbGFzcygnYmctbG9hZGVkJyk7XG4gICAgICAgIHNob3dQcmV2aWV3KHByb2plY3RQcmV2aWV3Lm5leHQoKSk7XG4gICAgICB9LCAxNTApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9wZW5Qcm9qZWN0KHByb2plY3RQcmV2aWV3KSB7XG4gICAgdmFyIHByb2plY3RJbmRleCA9IHByb2plY3RQcmV2aWV3LmluZGV4KCk7XG4gICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpJykuZXEocHJvamVjdEluZGV4KS5hZGQocHJvamVjdFByZXZpZXcpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgIFxuICAgIGlmKCB0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCApIHtcbiAgICAgIHByb2plY3RQcmV2aWV3cy5hZGRDbGFzcygnc2xpZGUtb3V0JykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICBwcm9qZWN0cy5jaGlsZHJlbignbGknKS5lcShwcm9qZWN0SW5kZXgpLmFkZENsYXNzKCdjb250ZW50LXZpc2libGUnKTtcbiAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7IFxuICAgICAgc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0UHJldmlld3MsIHByb2plY3RJbmRleCwgMCwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VQcm9qZWN0KCkge1xuICAgIHByb2plY3RzLmZpbmQoJy5zZWxlY3RlZCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpLm9uKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpLm9mZignd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcpO1xuICAgICAgc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLCAtMSwgMCwgZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgLy9pZiBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBDU1MgdHJhbnNpdGlvbnMuLi5cbiAgICBpZiggdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgKSB7XG4gICAgICBwcm9qZWN0UHJldmlld3MucmVtb3ZlQ2xhc3MoJ3NsaWRlLW91dCcpO1xuICAgICAgcHJvamVjdHMuZmluZCgnLmNvbnRlbnQtdmlzaWJsZScpLnJlbW92ZUNsYXNzKCdjb250ZW50LXZpc2libGUnKTtcbiAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlciwgcHJvamVjdEluZGV4LCBpbmRleCwgYm9vbCkge1xuICAgIGlmKGluZGV4ID09IDAgKSBjcmVhdGVBcnJheVJhbmRvbSgpO1xuICAgIGlmKCBwcm9qZWN0SW5kZXggIT0gLTEgJiYgaW5kZXggPT0gMCApIGluZGV4ID0gMTtcblxuICAgIHZhciByYW5kb21Qcm9qZWN0SW5kZXggPSBtYWtlVW5pcXVlUmFuZG9tKCk7XG4gICAgaWYoIHJhbmRvbVByb2plY3RJbmRleCA9PSBwcm9qZWN0SW5kZXggKSByYW5kb21Qcm9qZWN0SW5kZXggPSBtYWtlVW5pcXVlUmFuZG9tKCk7XG4gICAgXG4gICAgaWYoIGluZGV4IDwgbnVtUmFuZG9tcyAtIDEgKSB7XG4gICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkudG9nZ2xlQ2xhc3MoJ3NsaWRlLW91dCcsIGJvb2wpO1xuICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgLy9hbmltYXRlIG5leHQgcHJldmlldyBwcm9qZWN0XG4gICAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlciwgcHJvamVjdEluZGV4LCBpbmRleCArIDEsIGJvb2wpO1xuICAgICAgfSwgMTUwKTtcbiAgICB9IGVsc2UgaWYgKCBpbmRleCA9PSBudW1SYW5kb21zIC0gMSApIHtcbiAgICAgIC8vdGhpcyBpcyB0aGUgbGFzdCBwcm9qZWN0IHByZXZpZXcgdG8gYmUgYW5pbWF0ZWQgXG4gICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkudG9nZ2xlQ2xhc3MoJ3NsaWRlLW91dCcsIGJvb2wpLm9uZSgnd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKCBwcm9qZWN0SW5kZXggIT0gLTEpIHtcbiAgICAgICAgICBwcm9qZWN0cy5jaGlsZHJlbignbGkuc2VsZWN0ZWQnKS5hZGRDbGFzcygnY29udGVudC12aXNpYmxlJyk7XG4gICAgICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShwcm9qZWN0SW5kZXgpLmFkZENsYXNzKCdzbGlkZS1vdXQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgfSBlbHNlIGlmKCBuYXZpZ2F0aW9uLmhhc0NsYXNzKCduYXYtdmlzaWJsZScpICYmIGJvb2wgKSB7XG4gICAgICAgICAgbmF2aWdhdGlvbi5hZGRDbGFzcygnbmF2LWNsaWNrYWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocmFuZG9tUHJvamVjdEluZGV4KS5vZmYoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnKTtcbiAgICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTkzNTE3NTkvamF2YXNjcmlwdC1yYW5kb20tbnVtYmVyLW91dC1vZi01LW5vLXJlcGVhdC11bnRpbC1hbGwtaGF2ZS1iZWVuLXVzZWRcbiAgZnVuY3Rpb24gbWFrZVVuaXF1ZVJhbmRvbSgpIHtcbiAgICAgIHZhciBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHVuaXF1ZVJhbmRvbXMubGVuZ3RoKTtcbiAgICAgIHZhciB2YWwgPSB1bmlxdWVSYW5kb21zW2luZGV4XTtcbiAgICAgIC8vIG5vdyByZW1vdmUgdGhhdCB2YWx1ZSBmcm9tIHRoZSBhcnJheVxuICAgICAgdW5pcXVlUmFuZG9tcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5UmFuZG9tKCkge1xuICAgIC8vcmVzZXQgYXJyYXlcbiAgICB1bmlxdWVSYW5kb21zLmxlbmd0aCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1SYW5kb21zOyBpKyspIHtcbiAgICAgICAgICAgIHVuaXF1ZVJhbmRvbXMucHVzaChpKTtcbiAgICAgICAgfVxuICB9XG59KTtcblxuIC8qXG4gKiBCRyBMb2FkZWRcbiAqIENvcHlyaWdodCAoYykgMjAxNCBKb25hdGhhbiBDYXRtdWxsXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cbiAoZnVuY3Rpb24oJCl7XG4gICQuZm4uYmdMb2FkZWQgPSBmdW5jdGlvbihjdXN0b20pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBEZWZhdWx0IHBsdWdpbiBzZXR0aW5nc1xuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgIGFmdGVyTG9hZGVkIDogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnYmctbG9hZGVkJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIE1lcmdlIGRlZmF1bHQgYW5kIHVzZXIgc2V0dGluZ3NcbiAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIGN1c3RvbSk7XG5cbiAgICAvLyBMb29wIHRocm91Z2ggZWxlbWVudFxuICAgIHNlbGYuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgYmdJbWdzID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykuc3BsaXQoJywgJyk7XG4gICAgICAkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnLDApO1xuICAgICAgJC5lYWNoKCBiZ0ltZ3MsIGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgICB2YXIgaW1nID0gdmFsdWUucmVwbGFjZSgvXnVybFxcKFtcIiddPy8sICcnKS5yZXBsYWNlKC9bXCInXT9cXCkkLywgJycpO1xuICAgICAgICAkKCc8aW1nLz4nKS5hdHRyKCdzcmMnLCBpbWcpLmxvYWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTsgLy8gcHJldmVudCBtZW1vcnkgbGVha3NcbiAgICAgICAgICAkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnLCR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcpKzEpO1xuICAgICAgICAgIGlmICgkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnKSA+PSBiZ0ltZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZXR0aW5ncy5hZnRlckxvYWRlZC5jYWxsKCR0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfTtcbn0pKGpRdWVyeSk7XG5cblxuXG5cblxuICJdfQ==
