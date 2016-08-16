(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* jshint devel:true */
console.log('Look at app/js/main.js');

$(function () {
  $('a[href*="#"]:not([href="#"])').on('click', function (event) {
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

// responsive navigation


$(".wrap-nav a").on('click', function (event) {
  $(".overlay").fadeToggle(200);
  $(".button a").toggleClass('btn-close').toggleClass('btn-open');
  $("body").css('overflow-x', 'hidden');
  $("body").css('overflow-y', 'visible');
});

$(document).ready(function () {
  $(".button a").on('click', function (event) {

    $(".overlay").fadeToggle(200);
    $(this).toggleClass('btn-open').toggleClass('btn-close');

    if ($(this).hasClass("btn-close")) {
      $("body").css('overflow', 'hidden');
    } else if ($(this).hasClass("btn-open")) {
      $("body").css('overflow-x', 'hidden');
      $("body").css('overflow-y', 'visible');
    }
  });
});
$('.overlay').on('click', function (event) {
  $(".overlay").fadeToggle(200);
  $(".button a").toggleClass('btn-open').toggleClass('btn-close');
  $("body").css('overflow-x', 'hidden');
  $("body").css('overflow-y', 'visible');
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

      $("body").css('overflow-x', 'hidden');
      $("body").css('overflow-y', 'visible');
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

function myStopFunction() {
  clearTimeout(slideToggleProjects);
}

function myStopFunction() {
  clearTimeout(projectPreview);
}

$(function () {
  $('.dwayne-meet-the-team').hover(function () {
    $('.dwayne-meet-the-team').css('cursor', 'pointer');
    $('.dwayne-profile-image').css('opacity', '.1');
    $('.dwayne-profile-text').css('opacity', '1');
    $('.dwayne-profile-text').css('top', '10px');
  }, function () {
    // on mouseout, reset the background colour
    $('.dwayne-meet-the-team').css('cursor', '');
    $('.dwayne-profile-image').css('opacity', '');
    $('.dwayne-profile-text').css('opacity', '');
    $('.dwayne-profile-text').css('top', '');
    $('.profile').show();
  });
});

$(function () {
  $('.rudy-meet-the-team').hover(function () {
    $('.rudy-meet-the-team').css('cursor', 'pointer');
    $('.rudy-profile-image').css('opacity', '.1');
    $('.rudy-profile-text').css('opacity', '1');
    $('.rudy-profile-text').css('top', '10px');
  }, function () {
    // on mouseout, reset the background colour
    $('.rudy-meet-the-team').css('cursor', '');
    $('.rudy-profile-image').css('opacity', '');
    $('.rudy-profile-text').css('opacity', '');
    $('.rudy-profile-text').css('top', '');
    $('.profile').show();
  });
});

$(function () {
  $('.liam-meet-the-team').hover(function () {
    $('.liam-meet-the-team').css('cursor', 'pointer');
    $('.liam-profile-image').css('opacity', '.1');
    $('.liam-profile-text').css('opacity', '1');
    $('.liam-profile-text').css('top', '10px');
  }, function () {
    // on mouseout, reset the background colour
    $('.liam-meet-the-team').css('cursor', '');
    $('.liam-profile-image').css('opacity', '');
    $('.liam-profile-text').css('opacity', '');
    $('.liam-profile-text').css('top', '');
    $('.profile').show();
  });
});

$(".team-button a").click(function () {

  $('.profile').hide();
});

$('.fading-slider-1, .fading-slider-2, .fading-slider-3').unslider({
  animation: 'fade', autoplay: true, speed: 8000, delay: 9000, arrows: false, nav: false
});

jQuery(document).ready(function () {
  jQuery('.services-header').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated fadeInUp',
    offset: 250
  });
});

$(document).ready(function () {
  $('#myform').submit(function () {
    window.open('', 'formpopup', 'width=400,height=400,resizeable,scrollbars');
    this.target = 'formpopup';
  });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7QUFDQSxRQUFRLEdBQVIsQ0FBWSx3QkFBWjs7QUFHQSxFQUFFLFlBQVc7QUFDWCxJQUFFLDhCQUFGLEVBQWtDLEVBQWxDLENBQXFDLE9BQXJDLEVBQThDLFVBQVMsS0FBVCxFQUFlO0FBQzNELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBeEcsRUFBa0g7QUFDaEgsVUFBSSxTQUFTLEVBQUUsS0FBSyxJQUFQLENBQWI7QUFDQSxlQUFTLE9BQU8sTUFBUCxHQUFnQixNQUFoQixHQUF5QixFQUFFLFdBQVcsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixDQUFoQixDQUFYLEdBQStCLEdBQWpDLENBQWxDO0FBQ0EsVUFBSSxPQUFPLE1BQVgsRUFBbUI7QUFDakIsVUFBRSxZQUFGLEVBQWdCLE9BQWhCLENBQXdCO0FBQ3RCLHFCQUFXLE9BQU8sTUFBUCxHQUFnQjtBQURMLFNBQXhCLEVBRUcsSUFGSDtBQUdBLGVBQU8sS0FBUDtBQUNEO0FBQ0Y7QUFDRixHQVhEO0FBWUQsQ0FiRDs7QUFzQkE7OztBQUdBLEVBQUUsYUFBRixFQUFpQixFQUFqQixDQUFvQixPQUFwQixFQUE2QixVQUFTLEtBQVQsRUFBZTtBQUN4QyxJQUFFLFVBQUYsRUFBYyxVQUFkLENBQXlCLEdBQXpCO0FBQ0EsSUFBRSxXQUFGLEVBQWUsV0FBZixDQUEyQixXQUEzQixFQUF3QyxXQUF4QyxDQUFvRCxVQUFwRDtBQUNBLElBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxZQUFkLEVBQTRCLFFBQTVCO0FBQ0ksSUFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFlBQWQsRUFBNEIsU0FBNUI7QUFFUCxDQU5EOztBQWFBLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBVTtBQUN4QixJQUFFLFdBQUYsRUFBZSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFVBQVMsS0FBVCxFQUFlOztBQUl0QyxNQUFFLFVBQUYsRUFBYyxVQUFkLENBQXlCLEdBQXpCO0FBQ0QsTUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixVQUFwQixFQUFnQyxXQUFoQyxDQUE0QyxXQUE1Qzs7QUFFQSxRQUFJLEVBQUUsSUFBRixFQUFRLFFBQVIsQ0FBaUIsV0FBakIsQ0FBSixFQUFtQztBQUNsQyxRQUFFLE1BQUYsRUFBVSxHQUFWLENBQWMsVUFBZCxFQUEwQixRQUExQjtBQUNILEtBRkUsTUFFSSxJQUFJLEVBQUUsSUFBRixFQUFRLFFBQVIsQ0FBaUIsVUFBakIsQ0FBSixFQUFrQztBQUM3QixRQUFFLE1BQUYsRUFBVSxHQUFWLENBQWMsWUFBZCxFQUE0QixRQUE1QjtBQUNSLFFBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxZQUFkLEVBQTRCLFNBQTVCO0FBQ0g7QUFDSixHQWJHO0FBZUgsQ0FoQkQ7QUFpQkEsRUFBRSxVQUFGLEVBQWMsRUFBZCxDQUFpQixPQUFqQixFQUEwQixVQUFTLEtBQVQsRUFBZTtBQUNyQyxJQUFFLFVBQUYsRUFBYyxVQUFkLENBQXlCLEdBQXpCO0FBQ0EsSUFBRSxXQUFGLEVBQWUsV0FBZixDQUEyQixVQUEzQixFQUF1QyxXQUF2QyxDQUFtRCxXQUFuRDtBQUNPLElBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxZQUFkLEVBQTRCLFFBQTVCO0FBQ0gsSUFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFlBQWQsRUFBNEIsU0FBNUI7QUFDSixTQUFPLEtBQVA7QUFFSCxDQVBEOztBQWFBLE9BQU8sUUFBUCxFQUFpQixLQUFqQixDQUF1QixVQUFTLENBQVQsRUFBVztBQUNoQztBQUNBLElBQUUsU0FBRixFQUFhLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsVUFBUyxLQUFULEVBQWU7QUFDdEMsVUFBTSxjQUFOO0FBQ0EsTUFBRSxXQUFGLEVBQWUsUUFBZixDQUF3QixZQUF4QjtBQUNDLE1BQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxVQUFkLEVBQTBCLFFBQTFCO0FBQ0MsTUFBRSxpQkFBRixFQUFxQixHQUFyQixDQUF5QjtBQUN2QixpQkFBVyxjQURZO0FBRXZCLG9CQUFjLGdCQUZTO0FBR3ZCLDBCQUFxQjtBQUhFLEtBQXpCO0FBTUgsR0FWRDtBQVdBO0FBQ0EsSUFBRSxXQUFGLEVBQWUsRUFBZixDQUFrQixPQUFsQixFQUEyQixVQUFTLEtBQVQsRUFBZTtBQUN4QyxRQUFJLEVBQUUsTUFBTSxNQUFSLEVBQWdCLEVBQWhCLENBQW1CLFdBQW5CLEtBQW1DLEVBQUUsTUFBTSxNQUFSLEVBQWdCLEVBQWhCLENBQW1CLGlCQUFuQixDQUF2QyxFQUErRTtBQUM3RSxRQUFFLFdBQUYsRUFBZSxXQUFmLENBQTJCLFlBQTNCO0FBQ0EsWUFBTSxjQUFOOztBQUVFLFFBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxZQUFkLEVBQTRCLFFBQTVCO0FBQ0EsUUFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFlBQWQsRUFBNEIsU0FBNUI7QUFDRCxRQUFFLGlCQUFGLEVBQXFCLEdBQXJCLENBQXlCLEVBQUMsU0FBUyxNQUFWLEVBQXpCO0FBQ0Y7QUFDRixHQVREO0FBVUQsQ0F4QkQ7O0FBNkJBLE9BQU8sUUFBUCxFQUFpQixLQUFqQixDQUF1QixVQUFTLENBQVQsRUFBVztBQUNoQztBQUNBLE1BQUksb0JBQW9CLEVBQUUsd0JBQUYsQ0FBeEI7QUFBQSxNQUNFLHlCQUF5QixrQkFBa0IsSUFBbEIsQ0FBdUIsdUJBQXZCLENBRDNCO0FBQUEsTUFFRSxrQkFBa0IsdUJBQXVCLFFBQXZCLENBQWdDLElBQWhDLENBRnBCO0FBQUEsTUFHRSxXQUFXLGtCQUFrQixJQUFsQixDQUF1QixjQUF2QixDQUhiO0FBQUEsTUFJRSxvQkFBb0IsRUFBRSxpQkFBRixDQUp0QjtBQUFBLE1BS0UsYUFBYSxFQUFFLGlCQUFGLENBTGY7O0FBTUU7QUFDQSw0QkFBNEIsRUFBRSxvQkFBRixFQUF3QixNQUF4QixHQUFpQyxDQVAvRDs7QUFTQSxNQUFJLFlBQVksS0FBaEI7O0FBQ0U7QUFDQSxlQUFhLFNBQVMsSUFBVCxDQUFjLElBQWQsRUFBb0IsTUFGbkM7QUFBQSxNQUdFLGdCQUFnQixFQUhsQjs7QUFLQTtBQUNBLHlCQUF1QixFQUF2QixDQUEwQixPQUExQixFQUFtQyxHQUFuQyxFQUF3QyxVQUFTLEtBQVQsRUFBZTtBQUNyRCxVQUFNLGNBQU47QUFDQSxRQUFJLGFBQWEsS0FBakIsRUFBeUI7QUFDdkIsa0JBQVksSUFBWjtBQUNBLHdCQUFrQixHQUFsQixDQUFzQixpQkFBdEIsRUFBeUMsUUFBekMsQ0FBa0QsY0FBbEQ7QUFDQSxrQkFBWSxFQUFFLElBQUYsRUFBUSxNQUFSLENBQWUsSUFBZixDQUFaO0FBQ0EsUUFBRSxpQkFBRixFQUFxQixHQUFyQixDQUF5QixFQUFDLFNBQVMsTUFBVixFQUF6QjtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxvQkFBa0IsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBUyxLQUFULEVBQWU7QUFDM0MsVUFBTSxjQUFOOztBQUVBLFFBQUksYUFBYSxLQUFqQixFQUF5QjtBQUN2QixrQkFBWSxJQUFaO0FBQ0EsVUFBSSxrQkFBa0IsUUFBbEIsQ0FBMkIsY0FBM0IsQ0FBSixFQUFpRDs7QUFFL0M7QUFDQSwwQkFBa0IsR0FBbEIsQ0FBc0IsaUJBQXRCLEVBQXlDLFdBQXpDLENBQXFELGNBQXJEO0FBQ0E7QUFDQSxVQUFFLGlCQUFGLEVBQXFCLEdBQXJCLENBQXlCLEVBQUMsU0FBUyxjQUFWLEVBQXpCO0FBQ0QsT0FORCxNQU1PLElBQUksa0JBQWtCLFFBQWxCLENBQTJCLGFBQTNCLENBQUosRUFBZ0Q7QUFDckQ7QUFDQSwwQkFBa0IsV0FBbEIsQ0FBOEIsYUFBOUI7QUFDQSxtQkFBVyxXQUFYLENBQXVCLDJCQUF2QjtBQUNBLFlBQUcsdUJBQUgsRUFBNEIsZ0JBQWdCLFdBQWhCLENBQTRCLFdBQTVCLEVBQTVCLEtBQ0ssb0JBQW9CLHVCQUF1QixRQUF2QixDQUFnQyxJQUFoQyxDQUFwQixFQUEyRCxDQUFDLENBQTVELEVBQStELENBQS9ELEVBQWtFLEtBQWxFO0FBQ04sT0FOTSxNQU1BO0FBQ0w7QUFDQSwwQkFBa0IsUUFBbEIsQ0FBMkIsYUFBM0I7QUFDQSxtQkFBVyxRQUFYLENBQW9CLGFBQXBCO0FBQ0EsWUFBRyx1QkFBSCxFQUE0QixnQkFBZ0IsUUFBaEIsQ0FBeUIsV0FBekIsRUFBNUIsS0FDSyxvQkFBb0IsdUJBQXVCLFFBQXZCLENBQWdDLElBQWhDLENBQXBCLEVBQTJELENBQUMsQ0FBNUQsRUFBK0QsQ0FBL0QsRUFBa0UsSUFBbEU7QUFDTjtBQUNGOztBQUVELFFBQUcsdUJBQUgsRUFBNEIsWUFBWSxLQUFaO0FBQzdCLEdBM0JEOztBQWdDQTtBQUNBLG9CQUFrQixFQUFsQixDQUFxQixPQUFyQixFQUE4QixTQUE5QixFQUF5QyxZQUFVO0FBQ2pELHNCQUFrQixPQUFsQixDQUEwQixFQUFDLGFBQVksRUFBRSxNQUFGLEVBQVUsTUFBVixFQUFiLEVBQTFCLEVBQTRELEdBQTVEO0FBQ0QsR0FGRDs7QUFJQTtBQUNBLGtCQUFnQixRQUFoQixDQUF5QixHQUF6QixFQUE4QixRQUE5QixDQUF1QztBQUNuQyxpQkFBYyx1QkFBVTtBQUN0QixrQkFBWSxnQkFBZ0IsRUFBaEIsQ0FBbUIsQ0FBbkIsQ0FBWjtBQUNEO0FBSGtDLEdBQXZDOztBQU1BLFdBQVMsV0FBVCxDQUFxQixjQUFyQixFQUFxQztBQUNuQyxRQUFHLGVBQWUsTUFBZixHQUF3QixDQUEzQixFQUErQjtBQUM3QixpQkFBVyxZQUFVO0FBQ25CLHVCQUFlLFFBQWYsQ0FBd0IsV0FBeEI7QUFDQSxvQkFBWSxlQUFlLElBQWYsRUFBWjtBQUNELE9BSEQsRUFHRyxHQUhIO0FBSUQ7QUFDRjs7QUFFRCxXQUFTLFdBQVQsQ0FBcUIsY0FBckIsRUFBcUM7QUFDbkMsUUFBSSxlQUFlLGVBQWUsS0FBZixFQUFuQjtBQUNBLGFBQVMsUUFBVCxDQUFrQixJQUFsQixFQUF3QixFQUF4QixDQUEyQixZQUEzQixFQUF5QyxHQUF6QyxDQUE2QyxjQUE3QyxFQUE2RCxRQUE3RCxDQUFzRSxVQUF0RTs7QUFFQSxRQUFJLHVCQUFKLEVBQThCO0FBQzVCLHNCQUFnQixRQUFoQixDQUF5QixXQUF6QixFQUFzQyxXQUF0QyxDQUFrRCxVQUFsRDtBQUNBLGVBQVMsUUFBVCxDQUFrQixJQUFsQixFQUF3QixFQUF4QixDQUEyQixZQUEzQixFQUF5QyxRQUF6QyxDQUFrRCxpQkFBbEQ7QUFDQSxrQkFBWSxLQUFaO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsMEJBQW9CLGVBQXBCLEVBQXFDLFlBQXJDLEVBQW1ELENBQW5ELEVBQXNELElBQXREO0FBQ0Q7QUFDRjs7QUFFRCxXQUFTLFlBQVQsR0FBd0I7QUFDdEIsYUFBUyxJQUFULENBQWMsV0FBZCxFQUEyQixXQUEzQixDQUF1QyxVQUF2QyxFQUFtRCxFQUFuRCxDQUFzRCxpRkFBdEQsRUFBeUksWUFBVTtBQUNqSixRQUFFLElBQUYsRUFBUSxXQUFSLENBQW9CLGlCQUFwQixFQUF1QyxHQUF2QyxDQUEyQyxpRkFBM0M7QUFDQSwwQkFBb0IsdUJBQXVCLFFBQXZCLENBQWdDLElBQWhDLENBQXBCLEVBQTJELENBQUMsQ0FBNUQsRUFBK0QsQ0FBL0QsRUFBa0UsS0FBbEU7QUFDRCxLQUhEOztBQUtBO0FBQ0EsUUFBSSx1QkFBSixFQUE4QjtBQUM1QixzQkFBZ0IsV0FBaEIsQ0FBNEIsV0FBNUI7QUFDQSxlQUFTLElBQVQsQ0FBYyxrQkFBZCxFQUFrQyxXQUFsQyxDQUE4QyxpQkFBOUM7QUFDQSxrQkFBWSxLQUFaO0FBQ0Q7QUFDRjs7QUFFRCxXQUFTLG1CQUFULENBQTZCLHNCQUE3QixFQUFxRCxZQUFyRCxFQUFtRSxLQUFuRSxFQUEwRSxJQUExRSxFQUFnRjtBQUM5RSxRQUFHLFNBQVMsQ0FBWixFQUFnQjtBQUNoQixRQUFJLGdCQUFnQixDQUFDLENBQWpCLElBQXNCLFNBQVMsQ0FBbkMsRUFBdUMsUUFBUSxDQUFSOztBQUV2QyxRQUFJLHFCQUFxQixrQkFBekI7QUFDQSxRQUFJLHNCQUFzQixZQUExQixFQUF5QyxxQkFBcUIsa0JBQXJCOztBQUV6QyxRQUFJLFFBQVEsYUFBYSxDQUF6QixFQUE2QjtBQUMzQiw2QkFBdUIsRUFBdkIsQ0FBMEIsa0JBQTFCLEVBQThDLFdBQTlDLENBQTBELFdBQTFELEVBQXVFLElBQXZFO0FBQ0EsaUJBQVksWUFBVTtBQUNwQjtBQUNBLDRCQUFvQixzQkFBcEIsRUFBNEMsWUFBNUMsRUFBMEQsUUFBUSxDQUFsRSxFQUFxRSxJQUFyRTtBQUNELE9BSEQsRUFHRyxHQUhIO0FBSUQsS0FORCxNQU1PLElBQUssU0FBUyxhQUFhLENBQTNCLEVBQStCO0FBQ3BDO0FBQ0EsNkJBQXVCLEVBQXZCLENBQTBCLGtCQUExQixFQUE4QyxXQUE5QyxDQUEwRCxXQUExRCxFQUF1RSxJQUF2RSxFQUE2RSxHQUE3RSxDQUFpRixpRkFBakYsRUFBb0ssWUFBVTtBQUM1SyxZQUFJLGdCQUFnQixDQUFDLENBQXJCLEVBQXdCO0FBQ3RCLG1CQUFTLFFBQVQsQ0FBa0IsYUFBbEIsRUFBaUMsUUFBakMsQ0FBMEMsaUJBQTFDO0FBQ0EsaUNBQXVCLEVBQXZCLENBQTBCLFlBQTFCLEVBQXdDLFFBQXhDLENBQWlELFdBQWpELEVBQThELFdBQTlELENBQTBFLFVBQTFFO0FBQ0QsU0FIRCxNQUdPLElBQUksV0FBVyxRQUFYLENBQW9CLGFBQXBCLEtBQXNDLElBQTFDLEVBQWlEO0FBQ3RELHFCQUFXLFFBQVgsQ0FBb0IsZUFBcEI7QUFDRDtBQUNELCtCQUF1QixFQUF2QixDQUEwQixrQkFBMUIsRUFBOEMsR0FBOUMsQ0FBa0QsaUZBQWxEO0FBQ0Esb0JBQVksS0FBWjtBQUNELE9BVEQ7QUFVRDtBQUNGOztBQUVEO0FBQ0EsV0FBUyxnQkFBVCxHQUE0QjtBQUN4QixRQUFJLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLGNBQWMsTUFBekMsQ0FBWjtBQUNBLFFBQUksTUFBTSxjQUFjLEtBQWQsQ0FBVjtBQUNBO0FBQ0Esa0JBQWMsTUFBZCxDQUFxQixLQUFyQixFQUE0QixDQUE1QjtBQUNBLFdBQU8sR0FBUDtBQUNIOztBQUVELFdBQVMsaUJBQVQsR0FBNkI7QUFDM0I7QUFDQSxrQkFBYyxNQUFkLEdBQXVCLENBQXZCO0FBQ0EsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFVBQXBCLEVBQWdDLEdBQWhDLEVBQXFDO0FBQzdCLG9CQUFjLElBQWQsQ0FBbUIsQ0FBbkI7QUFDSDtBQUNOO0FBQ0YsQ0F2SkQ7O0FBeUpDOzs7OztBQUtBLENBQUMsVUFBUyxDQUFULEVBQVc7QUFDWCxJQUFFLEVBQUYsQ0FBSyxRQUFMLEdBQWdCLFVBQVMsTUFBVCxFQUFpQjtBQUMvQixRQUFJLE9BQU8sSUFBWDs7QUFFQTtBQUNBLFFBQUksV0FBVztBQUNiLG1CQUFjLHVCQUFVO0FBQ3RCLGFBQUssUUFBTCxDQUFjLFdBQWQ7QUFDRDtBQUhZLEtBQWY7O0FBTUE7QUFDQSxRQUFJLFdBQVcsRUFBRSxNQUFGLENBQVMsRUFBVCxFQUFhLFFBQWIsRUFBdUIsTUFBdkIsQ0FBZjs7QUFFQTtBQUNBLFNBQUssSUFBTCxDQUFVLFlBQVU7QUFDbEIsVUFBSSxRQUFRLEVBQUUsSUFBRixDQUFaO0FBQUEsVUFDRSxTQUFTLE1BQU0sR0FBTixDQUFVLGtCQUFWLEVBQThCLEtBQTlCLENBQW9DLElBQXBDLENBRFg7QUFFQSxZQUFNLElBQU4sQ0FBVyxjQUFYLEVBQTBCLENBQTFCO0FBQ0EsUUFBRSxJQUFGLENBQVEsTUFBUixFQUFnQixVQUFTLEdBQVQsRUFBYyxLQUFkLEVBQW9CO0FBQ2xDLFlBQUksTUFBTSxNQUFNLE9BQU4sQ0FBYyxhQUFkLEVBQTZCLEVBQTdCLEVBQWlDLE9BQWpDLENBQXlDLFVBQXpDLEVBQXFELEVBQXJELENBQVY7QUFDQSxVQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLEtBQWpCLEVBQXdCLEdBQXhCLEVBQTZCLElBQTdCLENBQWtDLFlBQVc7QUFDM0MsWUFBRSxJQUFGLEVBQVEsTUFBUixHQUQyQyxDQUN6QjtBQUNsQixnQkFBTSxJQUFOLENBQVcsY0FBWCxFQUEwQixNQUFNLElBQU4sQ0FBVyxjQUFYLElBQTJCLENBQXJEO0FBQ0EsY0FBSSxNQUFNLElBQU4sQ0FBVyxjQUFYLEtBQThCLE9BQU8sTUFBekMsRUFBaUQ7QUFDL0MscUJBQVMsV0FBVCxDQUFxQixJQUFyQixDQUEwQixLQUExQjtBQUNEO0FBQ0YsU0FORDtBQU9ELE9BVEQ7QUFXRCxLQWZEO0FBZ0JELEdBOUJEO0FBK0JELENBaENBLEVBZ0NFLE1BaENGOztBQW1DRCxTQUFTLGNBQVQsR0FBMEI7QUFDdEIsZUFBYSxtQkFBYjtBQUNIOztBQUVELFNBQVMsY0FBVCxHQUEwQjtBQUN0QixlQUFhLGNBQWI7QUFDSDs7QUFLSSxFQUFFLFlBQVc7QUFDaEIsSUFBRSx1QkFBRixFQUEyQixLQUEzQixDQUFpQyxZQUFXO0FBQzFDLE1BQUUsdUJBQUYsRUFBMkIsR0FBM0IsQ0FBK0IsUUFBL0IsRUFBeUMsU0FBekM7QUFDQSxNQUFFLHVCQUFGLEVBQTJCLEdBQTNCLENBQStCLFNBQS9CLEVBQTBDLElBQTFDO0FBQ0EsTUFBRSxzQkFBRixFQUEwQixHQUExQixDQUE4QixTQUE5QixFQUF5QyxHQUF6QztBQUNBLE1BQUUsc0JBQUYsRUFBMEIsR0FBMUIsQ0FBOEIsS0FBOUIsRUFBcUMsTUFBckM7QUFFRCxHQU5ELEVBTUcsWUFBVztBQUNaO0FBQ0EsTUFBRSx1QkFBRixFQUEyQixHQUEzQixDQUErQixRQUEvQixFQUF5QyxFQUF6QztBQUNBLE1BQUUsdUJBQUYsRUFBMkIsR0FBM0IsQ0FBK0IsU0FBL0IsRUFBMEMsRUFBMUM7QUFDQyxNQUFFLHNCQUFGLEVBQTBCLEdBQTFCLENBQThCLFNBQTlCLEVBQXlDLEVBQXpDO0FBQ0EsTUFBRSxzQkFBRixFQUEwQixHQUExQixDQUE4QixLQUE5QixFQUFxQyxFQUFyQztBQUNBLE1BQUUsVUFBRixFQUFjLElBQWQ7QUFDRixHQWJEO0FBY0QsQ0FmSTs7QUFrQkEsRUFBRSxZQUFXO0FBQ2hCLElBQUUscUJBQUYsRUFBeUIsS0FBekIsQ0FBK0IsWUFBVztBQUN4QyxNQUFFLHFCQUFGLEVBQXlCLEdBQXpCLENBQTZCLFFBQTdCLEVBQXVDLFNBQXZDO0FBQ0EsTUFBRSxxQkFBRixFQUF5QixHQUF6QixDQUE2QixTQUE3QixFQUF3QyxJQUF4QztBQUNBLE1BQUUsb0JBQUYsRUFBd0IsR0FBeEIsQ0FBNEIsU0FBNUIsRUFBdUMsR0FBdkM7QUFDQSxNQUFFLG9CQUFGLEVBQXdCLEdBQXhCLENBQTRCLEtBQTVCLEVBQW1DLE1BQW5DO0FBRUQsR0FORCxFQU1HLFlBQVc7QUFDWjtBQUNBLE1BQUUscUJBQUYsRUFBeUIsR0FBekIsQ0FBNkIsUUFBN0IsRUFBdUMsRUFBdkM7QUFDQSxNQUFFLHFCQUFGLEVBQXlCLEdBQXpCLENBQTZCLFNBQTdCLEVBQXdDLEVBQXhDO0FBQ0MsTUFBRSxvQkFBRixFQUF3QixHQUF4QixDQUE0QixTQUE1QixFQUF1QyxFQUF2QztBQUNBLE1BQUUsb0JBQUYsRUFBd0IsR0FBeEIsQ0FBNEIsS0FBNUIsRUFBbUMsRUFBbkM7QUFDQSxNQUFFLFVBQUYsRUFBYyxJQUFkO0FBQ0YsR0FiRDtBQWNELENBZkk7O0FBa0JBLEVBQUUsWUFBVztBQUNoQixJQUFFLHFCQUFGLEVBQXlCLEtBQXpCLENBQStCLFlBQVc7QUFDeEMsTUFBRSxxQkFBRixFQUF5QixHQUF6QixDQUE2QixRQUE3QixFQUF1QyxTQUF2QztBQUNBLE1BQUUscUJBQUYsRUFBeUIsR0FBekIsQ0FBNkIsU0FBN0IsRUFBd0MsSUFBeEM7QUFDQSxNQUFFLG9CQUFGLEVBQXdCLEdBQXhCLENBQTRCLFNBQTVCLEVBQXVDLEdBQXZDO0FBQ0EsTUFBRSxvQkFBRixFQUF3QixHQUF4QixDQUE0QixLQUE1QixFQUFtQyxNQUFuQztBQUVELEdBTkQsRUFNRyxZQUFXO0FBQ1o7QUFDQSxNQUFFLHFCQUFGLEVBQXlCLEdBQXpCLENBQTZCLFFBQTdCLEVBQXVDLEVBQXZDO0FBQ0EsTUFBRSxxQkFBRixFQUF5QixHQUF6QixDQUE2QixTQUE3QixFQUF3QyxFQUF4QztBQUNDLE1BQUUsb0JBQUYsRUFBd0IsR0FBeEIsQ0FBNEIsU0FBNUIsRUFBdUMsRUFBdkM7QUFDQSxNQUFFLG9CQUFGLEVBQXdCLEdBQXhCLENBQTRCLEtBQTVCLEVBQW1DLEVBQW5DO0FBQ0EsTUFBRSxVQUFGLEVBQWMsSUFBZDtBQUNGLEdBYkQ7QUFjRCxDQWZJOztBQWtCTCxFQUFFLGdCQUFGLEVBQW9CLEtBQXBCLENBQTBCLFlBQVU7O0FBRWxDLElBQUUsVUFBRixFQUFjLElBQWQ7QUFFRCxDQUpEOztBQU9BLEVBQUUsc0RBQUYsRUFBMEQsUUFBMUQsQ0FBbUU7QUFDbkUsYUFBVyxNQUR3RCxFQUNoRCxVQUFVLElBRHNDLEVBQ2hDLE9BQU8sSUFEeUIsRUFDbkIsT0FBTyxJQURZLEVBQ04sUUFBUSxLQURGLEVBQ1MsS0FBSztBQURkLENBQW5FOztBQUtBLE9BQU8sUUFBUCxFQUFpQixLQUFqQixDQUF1QixZQUFXO0FBQzlCLFNBQU8sa0JBQVAsRUFBMkIsUUFBM0IsQ0FBb0MsUUFBcEMsRUFBOEMsZUFBOUMsQ0FBOEQ7QUFDMUQsZ0JBQVksMkJBRDhDO0FBRTFELFlBQVE7QUFGa0QsR0FBOUQ7QUFJSCxDQUxEOztBQVlBLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBVztBQUN6QixJQUFFLFNBQUYsRUFBYSxNQUFiLENBQW9CLFlBQVc7QUFDM0IsV0FBTyxJQUFQLENBQVksRUFBWixFQUFnQixXQUFoQixFQUE2Qiw0Q0FBN0I7QUFDQSxTQUFLLE1BQUwsR0FBYyxXQUFkO0FBQ0gsR0FIRDtBQUlILENBTEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoganNoaW50IGRldmVsOnRydWUgKi9cbmNvbnNvbGUubG9nKCdMb29rIGF0IGFwcC9qcy9tYWluLmpzJyk7XG5cblxuJChmdW5jdGlvbigpIHtcbiAgJCgnYVtocmVmKj1cIiNcIl06bm90KFtocmVmPVwiI1wiXSknKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XG4gICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG5cblxuXG5cblxuXG5cbi8vIHJlc3BvbnNpdmUgbmF2aWdhdGlvblxuXG5cbiQoXCIud3JhcC1uYXYgYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG4gICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAkKFwiLmJ1dHRvbiBhXCIpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKS50b2dnbGVDbGFzcygnYnRuLW9wZW4nKTtcbiAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteScsICd2aXNpYmxlJyk7XG5cbn0pO1xuXG5cblxuXG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAkKFwiLmJ1dHRvbiBhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcblxuXG5cbiAgICAgICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcblxuICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLWNsb3NlXCIpKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgfSBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLW9wZW5cIikpIHtcbiAgICAgICAgICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteScsICd2aXNpYmxlJyk7XG4gICAgfVxufSk7XG5cbn0pO1xuJCgnLm92ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG4gICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAkKFwiLmJ1dHRvbiBhXCIpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcbiAgICAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy14JywgJ2hpZGRlbicpO1xuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXknLCAndmlzaWJsZScpO1xuICAgIG9wZW4gPSBmYWxzZTtcblxufSk7XG5cblxuXG5cblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKXtcbiAgLy9vcGVuIHRoZSBsYXRlcmFsIHBhbmVsXG4gICQoJy5jZC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkKCcuY2QtcGFuZWwnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiaW5saW5lLWJsb2NrXCIsXG4gICAgICAgIFwidHJhbnNpdGlvblwiOiBcImFsbCBlYXNlLWluIDVzXCIsXG4gICAgICAgIFwidHJhbnNpdGlvbi1kZWxheVwiIDogXCIuNXNcIlxuICAgICAgfSk7XG5cbiAgfSk7XG4gIC8vY2xvc2UgdGhlIGxhdGVyYWwgcGFuZWxcbiAgJCgnLmNkLXBhbmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGlmKCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wYW5lbCcpIHx8ICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXBhbmVsLWNsb3NlJykgKSB7XG4gICAgICAkKCcuY2QtcGFuZWwnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteScsICd2aXNpYmxlJyk7XG4gICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xuICAgIH1cbiAgfSk7XG59KTtcblxuXG5cblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKXtcbiAgLy9jYWNoZSBET00gZWxlbWVudHNcbiAgdmFyIHByb2plY3RzQ29udGFpbmVyID0gJCgnLmNkLXByb2plY3RzLWNvbnRhaW5lcicpLFxuICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIgPSBwcm9qZWN0c0NvbnRhaW5lci5maW5kKCcuY2QtcHJvamVjdHMtcHJldmlld3MnKSxcbiAgICBwcm9qZWN0UHJldmlld3MgPSBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLFxuICAgIHByb2plY3RzID0gcHJvamVjdHNDb250YWluZXIuZmluZCgnLmNkLXByb2plY3RzJyksXG4gICAgbmF2aWdhdGlvblRyaWdnZXIgPSAkKCcuY2QtbmF2LXRyaWdnZXInKSxcbiAgICBuYXZpZ2F0aW9uID0gJCgnLmNkLXByaW1hcnktbmF2JyksXG4gICAgLy9pZiBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBDU1MgdHJhbnNpdGlvbnMuLi5cbiAgICB0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCA9ICggJCgnLm5vLWNzc3RyYW5zaXRpb25zJykubGVuZ3RoID4gMCk7XG5cbiAgdmFyIGFuaW1hdGluZyA9IGZhbHNlLFxuICAgIC8vd2lsbCBiZSB1c2VkIHRvIGV4dHJhY3QgcmFuZG9tIG51bWJlcnMgZm9yIHByb2plY3RzIHNsaWRlIHVwL3NsaWRlIGRvd24gZWZmZWN0XG4gICAgbnVtUmFuZG9tcyA9IHByb2plY3RzLmZpbmQoJ2xpJykubGVuZ3RoLFxuICAgIHVuaXF1ZVJhbmRvbXMgPSBbXTtcblxuICAvL29wZW4gcHJvamVjdFxuICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLm9uKCdjbGljaycsICdhJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYoIGFuaW1hdGluZyA9PSBmYWxzZSApIHtcbiAgICAgIGFuaW1hdGluZyA9IHRydWU7XG4gICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5hZGQocHJvamVjdHNDb250YWluZXIpLmFkZENsYXNzKCdwcm9qZWN0LW9wZW4nKTtcbiAgICAgIG9wZW5Qcm9qZWN0KCQodGhpcykucGFyZW50KCdsaScpKTtcbiAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcbiAgICB9XG4gIH0pO1xuXG4gIG5hdmlnYXRpb25UcmlnZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYoIGFuaW1hdGluZyA9PSBmYWxzZSApIHtcbiAgICAgIGFuaW1hdGluZyA9IHRydWU7XG4gICAgICBpZiggbmF2aWdhdGlvblRyaWdnZXIuaGFzQ2xhc3MoJ3Byb2plY3Qtb3BlbicpICkge1xuXG4gICAgICAgIC8vY2xvc2UgdmlzaWJsZSBwcm9qZWN0XG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZChwcm9qZWN0c0NvbnRhaW5lcikucmVtb3ZlQ2xhc3MoJ3Byb2plY3Qtb3BlbicpO1xuICAgICAgICBjbG9zZVByb2plY3QoKTtcbiAgICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcImlubGluZS1ibG9ja1wifSk7XG4gICAgICB9IGVsc2UgaWYoIG5hdmlnYXRpb25UcmlnZ2VyLmhhc0NsYXNzKCduYXYtdmlzaWJsZScpICkge1xuICAgICAgICAvL2Nsb3NlIG1haW4gbmF2aWdhdGlvblxuICAgICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5yZW1vdmVDbGFzcygnbmF2LXZpc2libGUnKTtcbiAgICAgICAgbmF2aWdhdGlvbi5yZW1vdmVDbGFzcygnbmF2LWNsaWNrYWJsZSBuYXYtdmlzaWJsZScpO1xuICAgICAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgcHJvamVjdFByZXZpZXdzLnJlbW92ZUNsYXNzKCdzbGlkZS1vdXQnKTtcbiAgICAgICAgZWxzZSBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL29wZW4gbWFpbiBuYXZpZ2F0aW9uXG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZENsYXNzKCduYXYtdmlzaWJsZScpO1xuICAgICAgICBuYXZpZ2F0aW9uLmFkZENsYXNzKCduYXYtdmlzaWJsZScpO1xuICAgICAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgcHJvamVjdFByZXZpZXdzLmFkZENsYXNzKCdzbGlkZS1vdXQnKTtcbiAgICAgICAgZWxzZSBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgYW5pbWF0aW5nID0gZmFsc2U7XG4gIH0pO1xuXG5cblxuXG4gIC8vc2Nyb2xsIGRvd24gdG8gcHJvamVjdCBpbmZvXG4gIHByb2plY3RzQ29udGFpbmVyLm9uKCdjbGljaycsICcuc2Nyb2xsJywgZnVuY3Rpb24oKXtcbiAgICBwcm9qZWN0c0NvbnRhaW5lci5hbmltYXRlKHsnc2Nyb2xsVG9wJzokKHdpbmRvdykuaGVpZ2h0KCl9LCA1MDApO1xuICB9KTtcblxuICAvL2NoZWNrIGlmIGJhY2tncm91bmQtaW1hZ2VzIGhhdmUgYmVlbiBsb2FkZWQgYW5kIHNob3cgcHJvamVjdCBwcmV2aWV3c1xuICBwcm9qZWN0UHJldmlld3MuY2hpbGRyZW4oJ2EnKS5iZ0xvYWRlZCh7XG4gICAgICBhZnRlckxvYWRlZCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHNob3dQcmV2aWV3KHByb2plY3RQcmV2aWV3cy5lcSgwKSk7XG4gICAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNob3dQcmV2aWV3KHByb2plY3RQcmV2aWV3KSB7XG4gICAgaWYocHJvamVjdFByZXZpZXcubGVuZ3RoID4gMCApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgcHJvamVjdFByZXZpZXcuYWRkQ2xhc3MoJ2JnLWxvYWRlZCcpO1xuICAgICAgICBzaG93UHJldmlldyhwcm9qZWN0UHJldmlldy5uZXh0KCkpO1xuICAgICAgfSwgMTUwKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvcGVuUHJvamVjdChwcm9qZWN0UHJldmlldykge1xuICAgIHZhciBwcm9qZWN0SW5kZXggPSBwcm9qZWN0UHJldmlldy5pbmRleCgpO1xuICAgIHByb2plY3RzLmNoaWxkcmVuKCdsaScpLmVxKHByb2plY3RJbmRleCkuYWRkKHByb2plY3RQcmV2aWV3KS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcblxuICAgIGlmKCB0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCApIHtcbiAgICAgIHByb2plY3RQcmV2aWV3cy5hZGRDbGFzcygnc2xpZGUtb3V0JykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICBwcm9qZWN0cy5jaGlsZHJlbignbGknKS5lcShwcm9qZWN0SW5kZXgpLmFkZENsYXNzKCdjb250ZW50LXZpc2libGUnKTtcbiAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RQcmV2aWV3cywgcHJvamVjdEluZGV4LCAwLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZVByb2plY3QoKSB7XG4gICAgcHJvamVjdHMuZmluZCgnLnNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJykub24oJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpe1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnY29udGVudC12aXNpYmxlJykub2ZmKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyk7XG4gICAgICBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICAvL2lmIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IENTUyB0cmFuc2l0aW9ucy4uLlxuICAgIGlmKCB0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCApIHtcbiAgICAgIHByb2plY3RQcmV2aWV3cy5yZW1vdmVDbGFzcygnc2xpZGUtb3V0Jyk7XG4gICAgICBwcm9qZWN0cy5maW5kKCcuY29udGVudC12aXNpYmxlJykucmVtb3ZlQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpO1xuICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLCBwcm9qZWN0SW5kZXgsIGluZGV4LCBib29sKSB7XG4gICAgaWYoaW5kZXggPT0gMCApIGNyZWF0ZUFycmF5UmFuZG9tKCk7XG4gICAgaWYoIHByb2plY3RJbmRleCAhPSAtMSAmJiBpbmRleCA9PSAwICkgaW5kZXggPSAxO1xuXG4gICAgdmFyIHJhbmRvbVByb2plY3RJbmRleCA9IG1ha2VVbmlxdWVSYW5kb20oKTtcbiAgICBpZiggcmFuZG9tUHJvamVjdEluZGV4ID09IHByb2plY3RJbmRleCApIHJhbmRvbVByb2plY3RJbmRleCA9IG1ha2VVbmlxdWVSYW5kb20oKTtcblxuICAgIGlmKCBpbmRleCA8IG51bVJhbmRvbXMgLSAxICkge1xuICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShyYW5kb21Qcm9qZWN0SW5kZXgpLnRvZ2dsZUNsYXNzKCdzbGlkZS1vdXQnLCBib29sKTtcbiAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vYW5pbWF0ZSBuZXh0IHByZXZpZXcgcHJvamVjdFxuICAgICAgICBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIsIHByb2plY3RJbmRleCwgaW5kZXggKyAxLCBib29sKTtcbiAgICAgIH0sIDE1MCk7XG4gICAgfSBlbHNlIGlmICggaW5kZXggPT0gbnVtUmFuZG9tcyAtIDEgKSB7XG4gICAgICAvL3RoaXMgaXMgdGhlIGxhc3QgcHJvamVjdCBwcmV2aWV3IHRvIGJlIGFuaW1hdGVkXG4gICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkudG9nZ2xlQ2xhc3MoJ3NsaWRlLW91dCcsIGJvb2wpLm9uZSgnd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKCBwcm9qZWN0SW5kZXggIT0gLTEpIHtcbiAgICAgICAgICBwcm9qZWN0cy5jaGlsZHJlbignbGkuc2VsZWN0ZWQnKS5hZGRDbGFzcygnY29udGVudC12aXNpYmxlJyk7XG4gICAgICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShwcm9qZWN0SW5kZXgpLmFkZENsYXNzKCdzbGlkZS1vdXQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgfSBlbHNlIGlmKCBuYXZpZ2F0aW9uLmhhc0NsYXNzKCduYXYtdmlzaWJsZScpICYmIGJvb2wgKSB7XG4gICAgICAgICAgbmF2aWdhdGlvbi5hZGRDbGFzcygnbmF2LWNsaWNrYWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocmFuZG9tUHJvamVjdEluZGV4KS5vZmYoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnKTtcbiAgICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTkzNTE3NTkvamF2YXNjcmlwdC1yYW5kb20tbnVtYmVyLW91dC1vZi01LW5vLXJlcGVhdC11bnRpbC1hbGwtaGF2ZS1iZWVuLXVzZWRcbiAgZnVuY3Rpb24gbWFrZVVuaXF1ZVJhbmRvbSgpIHtcbiAgICAgIHZhciBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHVuaXF1ZVJhbmRvbXMubGVuZ3RoKTtcbiAgICAgIHZhciB2YWwgPSB1bmlxdWVSYW5kb21zW2luZGV4XTtcbiAgICAgIC8vIG5vdyByZW1vdmUgdGhhdCB2YWx1ZSBmcm9tIHRoZSBhcnJheVxuICAgICAgdW5pcXVlUmFuZG9tcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5UmFuZG9tKCkge1xuICAgIC8vcmVzZXQgYXJyYXlcbiAgICB1bmlxdWVSYW5kb21zLmxlbmd0aCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1SYW5kb21zOyBpKyspIHtcbiAgICAgICAgICAgIHVuaXF1ZVJhbmRvbXMucHVzaChpKTtcbiAgICAgICAgfVxuICB9XG59KTtcblxuIC8qXG4gKiBCRyBMb2FkZWRcbiAqIENvcHlyaWdodCAoYykgMjAxNCBKb25hdGhhbiBDYXRtdWxsXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cbiAoZnVuY3Rpb24oJCl7XG4gICQuZm4uYmdMb2FkZWQgPSBmdW5jdGlvbihjdXN0b20pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBEZWZhdWx0IHBsdWdpbiBzZXR0aW5nc1xuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgIGFmdGVyTG9hZGVkIDogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnYmctbG9hZGVkJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIE1lcmdlIGRlZmF1bHQgYW5kIHVzZXIgc2V0dGluZ3NcbiAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIGN1c3RvbSk7XG5cbiAgICAvLyBMb29wIHRocm91Z2ggZWxlbWVudFxuICAgIHNlbGYuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgYmdJbWdzID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykuc3BsaXQoJywgJyk7XG4gICAgICAkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnLDApO1xuICAgICAgJC5lYWNoKCBiZ0ltZ3MsIGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgICB2YXIgaW1nID0gdmFsdWUucmVwbGFjZSgvXnVybFxcKFtcIiddPy8sICcnKS5yZXBsYWNlKC9bXCInXT9cXCkkLywgJycpO1xuICAgICAgICAkKCc8aW1nLz4nKS5hdHRyKCdzcmMnLCBpbWcpLmxvYWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTsgLy8gcHJldmVudCBtZW1vcnkgbGVha3NcbiAgICAgICAgICAkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnLCR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcpKzEpO1xuICAgICAgICAgIGlmICgkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnKSA+PSBiZ0ltZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZXR0aW5ncy5hZnRlckxvYWRlZC5jYWxsKCR0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfTtcbn0pKGpRdWVyeSk7XG5cblxuZnVuY3Rpb24gbXlTdG9wRnVuY3Rpb24oKSB7XG4gICAgY2xlYXJUaW1lb3V0KHNsaWRlVG9nZ2xlUHJvamVjdHMpO1xufVxuXG5mdW5jdGlvbiBteVN0b3BGdW5jdGlvbigpIHtcbiAgICBjbGVhclRpbWVvdXQocHJvamVjdFByZXZpZXcpO1xufVxuXG5cblxuXG4gICAgICQoZnVuY3Rpb24oKSB7XG4gICQoJy5kd2F5bmUtbWVldC10aGUtdGVhbScpLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgICQoJy5kd2F5bmUtbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAkKCcuZHdheW5lLXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnLjEnKTtcbiAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcxJyk7XG4gICAgJCgnLmR3YXluZS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcxMHB4Jyk7XG5cbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgLy8gb24gbW91c2VvdXQsIHJlc2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG91clxuICAgICQoJy5kd2F5bmUtbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJycpO1xuICAgICQoJy5kd2F5bmUtcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcnKTtcbiAgICAgJCgnLmR3YXluZS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnJyk7XG4gICAgICQoJy5kd2F5bmUtcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnJyk7XG4gICAgICQoJy5wcm9maWxlJykuc2hvdygpO1xuICB9KTtcbn0pO1xuXG5cbiAgICAgJChmdW5jdGlvbigpIHtcbiAgJCgnLnJ1ZHktbWVldC10aGUtdGVhbScpLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgICQoJy5ydWR5LW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgJCgnLnJ1ZHktcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcuMScpO1xuICAgICQoJy5ydWR5LXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcxJyk7XG4gICAgJCgnLnJ1ZHktcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnMTBweCcpO1xuXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIC8vIG9uIG1vdXNlb3V0LCByZXNldCB0aGUgYmFja2dyb3VuZCBjb2xvdXJcbiAgICAkKCcucnVkeS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAnJyk7XG4gICAgJCgnLnJ1ZHktcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcnKTtcbiAgICAgJCgnLnJ1ZHktcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJycpO1xuICAgICAkKCcucnVkeS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcnKTtcbiAgICAgJCgnLnByb2ZpbGUnKS5zaG93KCk7XG4gIH0pO1xufSk7XG5cblxuICAgICAkKGZ1bmN0aW9uKCkge1xuICAkKCcubGlhbS1tZWV0LXRoZS10ZWFtJykuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgJCgnLmxpYW0tbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAkKCcubGlhbS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJy4xJyk7XG4gICAgJCgnLmxpYW0tcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgICAkKCcubGlhbS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcxMHB4Jyk7XG5cbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgLy8gb24gbW91c2VvdXQsIHJlc2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG91clxuICAgICQoJy5saWFtLW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICcnKTtcbiAgICAkKCcubGlhbS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJycpO1xuICAgICAkKCcubGlhbS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnJyk7XG4gICAgICQoJy5saWFtLXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJycpO1xuICAgICAkKCcucHJvZmlsZScpLnNob3coKTtcbiAgfSk7XG59KTtcblxuXG4kKFwiLnRlYW0tYnV0dG9uIGFcIikuY2xpY2soZnVuY3Rpb24oKXtcblxuICAkKCcucHJvZmlsZScpLmhpZGUoKTtcblxufSk7XG5cblxuJCgnLmZhZGluZy1zbGlkZXItMSwgLmZhZGluZy1zbGlkZXItMiwgLmZhZGluZy1zbGlkZXItMycpLnVuc2xpZGVyKHtcbmFuaW1hdGlvbjogJ2ZhZGUnLCBhdXRvcGxheTogdHJ1ZSwgc3BlZWQ6IDgwMDAsIGRlbGF5OiA5MDAwLCBhcnJvd3M6IGZhbHNlLCBuYXY6IGZhbHNlXG59KTtcblxuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIGpRdWVyeSgnLnNlcnZpY2VzLWhlYWRlcicpLmFkZENsYXNzKFwiaGlkZGVuXCIpLnZpZXdwb3J0Q2hlY2tlcih7XG4gICAgICAgIGNsYXNzVG9BZGQ6ICd2aXNpYmxlIGFuaW1hdGVkIGZhZGVJblVwJyxcbiAgICAgICAgb2Zmc2V0OiAyNTBcbiAgICAgICB9KTtcbn0pO1xuXG5cblxuXG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJCgnI215Zm9ybScpLnN1Ym1pdChmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93Lm9wZW4oJycsICdmb3JtcG9wdXAnLCAnd2lkdGg9NDAwLGhlaWdodD00MDAscmVzaXplYWJsZSxzY3JvbGxiYXJzJyk7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gJ2Zvcm1wb3B1cCc7XG4gICAgfSk7XG59KTtcblxuXG5cbiJdfQ==
