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

// responsive navigation


$(".wrap-nav a").click(function () {
  $(".overlay").fadeToggle(200);
  $(".button a").toggleClass('btn-close').toggleClass('btn-open');
  $("body").css('overflow-x', 'hidden');
  $("body").css('overflow-y', 'visible');
});

$(document).ready(function () {
  $(".button a").click(function () {

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
$('.overlay').on('click', function () {
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
  animation: 'fade', autoplay: true, speed: 4000, delay: 9000, arrows: false, nav: false
});

$(window).on('load', function () {
  $('.services-header').animateCSS('fadeInUp', { delay: 1200 });

  $('.impact-text').animateCSS('fadeInUp', { delay: 3600 });

  $('.services-text').animateCSS('fadeInUp', { delay: 5600 });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7QUFDQSxRQUFRLEdBQVIsQ0FBWSx3QkFBWjs7QUFHQSxFQUFFLFlBQVc7QUFDWCxJQUFFLDhCQUFGLEVBQWtDLEtBQWxDLENBQXdDLFlBQVc7QUFDakQsUUFBSSxTQUFTLFFBQVQsQ0FBa0IsT0FBbEIsQ0FBMEIsS0FBMUIsRUFBZ0MsRUFBaEMsS0FBdUMsS0FBSyxRQUFMLENBQWMsT0FBZCxDQUFzQixLQUF0QixFQUE0QixFQUE1QixDQUF2QyxJQUEwRSxTQUFTLFFBQVQsSUFBcUIsS0FBSyxRQUF4RyxFQUFrSDtBQUNoSCxVQUFJLFNBQVMsRUFBRSxLQUFLLElBQVAsQ0FBYjtBQUNBLGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBakMsQ0FBbEM7QUFDQSxVQUFJLE9BQU8sTUFBWCxFQUFtQjtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCO0FBREwsU0FBeEIsRUFFRyxJQUZIO0FBR0EsZUFBTyxLQUFQO0FBQ0Q7QUFDRjtBQUNGLEdBWEQ7QUFZRCxDQWJEOztBQXNCQTs7O0FBR0EsRUFBRSxhQUFGLEVBQWlCLEtBQWpCLENBQXVCLFlBQVU7QUFDN0IsSUFBRSxVQUFGLEVBQWMsVUFBZCxDQUF5QixHQUF6QjtBQUNBLElBQUUsV0FBRixFQUFlLFdBQWYsQ0FBMkIsV0FBM0IsRUFBd0MsV0FBeEMsQ0FBb0QsVUFBcEQ7QUFDQSxJQUFFLE1BQUYsRUFBVSxHQUFWLENBQWMsWUFBZCxFQUE0QixRQUE1QjtBQUNJLElBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxZQUFkLEVBQTRC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LENBZkk7O0FBa0JMLEVBQUUsZ0JBQUYsRUFBb0IsS0FBcEIsQ0FBMEIsWUFBVTs7QUFFbEMsSUFBRSxVQUFGLEVBQWMsSUFBZDtBQUVELENBSkQ7O0FBT0EsRUFBRSxzREFBRixFQUEwRCxRQUExRCxDQUFtRTtBQUNuRSxhQUFXLE1BRHdELEVBQ2hELFVBQVUsSUFEc0MsRUFDaEMsT0FBTyxJQUR5QixFQUNuQixPQUFPLElBRFksRUFDTixRQUFRLEtBREYsRUFDUyxLQUFLO0FBRGQsQ0FBbkU7O0FBT0EsRUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBVztBQUM5QixJQUFFLGtCQUFGLEVBQXNCLFVBQXRCLENBQWlDLFVBQWpDLEVBQThDLEVBQUMsT0FBTSxJQUFQLEVBQTlDOztBQUVJLElBQUUsY0FBRixFQUFrQixVQUFsQixDQUE2QixVQUE3QixFQUF5QyxFQUFDLE9BQU0sSUFBUCxFQUF6Qzs7QUFFQSxJQUFFLGdCQUFGLEVBQW9CLFVBQXBCLENBQStCLFVBQS9CLEVBQTJDLEVBQUMsT0FBTSxJQUFQLEVBQTNDO0FBS0wsQ0FWRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBqc2hpbnQgZGV2ZWw6dHJ1ZSAqL1xuY29uc29sZS5sb2coJ0xvb2sgYXQgYXBwL2pzL21haW4uanMnKTtcblxuXG4kKGZ1bmN0aW9uKCkge1xuICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xuICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsnXScpO1xuICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxuICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcblxuXG5cblxuXG5cblxuXG4vLyByZXNwb25zaXZlIG5hdmlnYXRpb25cblxuXG4kKFwiLndyYXAtbmF2IGFcIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAkKFwiLm92ZXJsYXlcIikuZmFkZVRvZ2dsZSgyMDApO1xuICAgICQoXCIuYnV0dG9uIGFcIikudG9nZ2xlQ2xhc3MoJ2J0bi1jbG9zZScpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpO1xuICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy15JywgJ3Zpc2libGUnKTtcbiAgIFxufSk7XG5cblxuXG5cblxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgICQoXCIuYnV0dG9uIGFcIikuY2xpY2soZnVuY3Rpb24oKXtcblxuXG4gICAgICAgXG4gICAgICAgICQoXCIub3ZlcmxheVwiKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYnRuLW9wZW4nKS50b2dnbGVDbGFzcygnYnRuLWNsb3NlJyk7XG5cbiAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImJ0bi1jbG9zZVwiKSkge1xuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImJ0bi1vcGVuXCIpKSB7XG4gICAgICAgICAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy14JywgJ2hpZGRlbicpO1xuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXknLCAndmlzaWJsZScpO1xuICAgIH1cbn0pO1xuICAgXG59KTtcbiQoJy5vdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKFwiLm92ZXJsYXlcIikuZmFkZVRvZ2dsZSgyMDApO1xuICAgICQoXCIuYnV0dG9uIGFcIikudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJykudG9nZ2xlQ2xhc3MoJ2J0bi1jbG9zZScpO1xuICAgICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteScsICd2aXNpYmxlJyk7XG4gICAgb3BlbiA9IGZhbHNlO1xuICAgIFxufSk7XG5cblxuXG5cblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKXtcbiAgLy9vcGVuIHRoZSBsYXRlcmFsIHBhbmVsXG4gICQoJy5jZC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkKCcuY2QtcGFuZWwnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiaW5saW5lLWJsb2NrXCIsIFxuICAgICAgICBcInRyYW5zaXRpb25cIjogXCJhbGwgZWFzZS1pbiA1c1wiLCBcbiAgICAgICAgXCJ0cmFuc2l0aW9uLWRlbGF5XCIgOiBcIi41c1wiXG4gICAgICB9KTtcblxuICB9KTtcbiAgLy9jbG9zZSB0aGUgbGF0ZXJhbCBwYW5lbFxuICAkKCcuY2QtcGFuZWwnKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG4gICAgaWYoICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXBhbmVsJykgfHwgJChldmVudC50YXJnZXQpLmlzKCcuY2QtcGFuZWwtY2xvc2UnKSApIHsgXG4gICAgICAkKCcuY2QtcGFuZWwnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteScsICd2aXNpYmxlJyk7XG4gICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xuICAgIH1cbiAgfSk7XG59KTtcblxuXG5cblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKXtcbiAgLy9jYWNoZSBET00gZWxlbWVudHNcbiAgdmFyIHByb2plY3RzQ29udGFpbmVyID0gJCgnLmNkLXByb2plY3RzLWNvbnRhaW5lcicpLFxuICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIgPSBwcm9qZWN0c0NvbnRhaW5lci5maW5kKCcuY2QtcHJvamVjdHMtcHJldmlld3MnKSxcbiAgICBwcm9qZWN0UHJldmlld3MgPSBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLFxuICAgIHByb2plY3RzID0gcHJvamVjdHNDb250YWluZXIuZmluZCgnLmNkLXByb2plY3RzJyksXG4gICAgbmF2aWdhdGlvblRyaWdnZXIgPSAkKCcuY2QtbmF2LXRyaWdnZXInKSxcbiAgICBuYXZpZ2F0aW9uID0gJCgnLmNkLXByaW1hcnktbmF2JyksXG4gICAgLy9pZiBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBDU1MgdHJhbnNpdGlvbnMuLi5cbiAgICB0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCA9ICggJCgnLm5vLWNzc3RyYW5zaXRpb25zJykubGVuZ3RoID4gMCk7XG5cbiAgdmFyIGFuaW1hdGluZyA9IGZhbHNlLFxuICAgIC8vd2lsbCBiZSB1c2VkIHRvIGV4dHJhY3QgcmFuZG9tIG51bWJlcnMgZm9yIHByb2plY3RzIHNsaWRlIHVwL3NsaWRlIGRvd24gZWZmZWN0XG4gICAgbnVtUmFuZG9tcyA9IHByb2plY3RzLmZpbmQoJ2xpJykubGVuZ3RoLCBcbiAgICB1bmlxdWVSYW5kb21zID0gW107XG5cbiAgLy9vcGVuIHByb2plY3RcbiAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5vbignY2xpY2snLCAnYScsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmKCBhbmltYXRpbmcgPT0gZmFsc2UgKSB7XG4gICAgICBhbmltYXRpbmcgPSB0cnVlO1xuICAgICAgbmF2aWdhdGlvblRyaWdnZXIuYWRkKHByb2plY3RzQ29udGFpbmVyKS5hZGRDbGFzcygncHJvamVjdC1vcGVuJyk7XG4gICAgICBvcGVuUHJvamVjdCgkKHRoaXMpLnBhcmVudCgnbGknKSk7XG4gICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe2Rpc3BsYXk6IFwibm9uZVwifSk7XG4gICAgfVxuICB9KTtcblxuICBuYXZpZ2F0aW9uVHJpZ2dlci5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICBpZiggYW5pbWF0aW5nID09IGZhbHNlICkge1xuICAgICAgYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgIGlmKCBuYXZpZ2F0aW9uVHJpZ2dlci5oYXNDbGFzcygncHJvamVjdC1vcGVuJykgKSB7XG5cbiAgICAgICAgLy9jbG9zZSB2aXNpYmxlIHByb2plY3RcbiAgICAgICAgbmF2aWdhdGlvblRyaWdnZXIuYWRkKHByb2plY3RzQ29udGFpbmVyKS5yZW1vdmVDbGFzcygncHJvamVjdC1vcGVuJyk7XG4gICAgICAgIGNsb3NlUHJvamVjdCgpO1xuICAgICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe2Rpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCJ9KTtcbiAgICAgIH0gZWxzZSBpZiggbmF2aWdhdGlvblRyaWdnZXIuaGFzQ2xhc3MoJ25hdi12aXNpYmxlJykgKSB7XG4gICAgICAgIC8vY2xvc2UgbWFpbiBuYXZpZ2F0aW9uXG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLnJlbW92ZUNsYXNzKCduYXYtdmlzaWJsZScpO1xuICAgICAgICBuYXZpZ2F0aW9uLnJlbW92ZUNsYXNzKCduYXYtY2xpY2thYmxlIG5hdi12aXNpYmxlJyk7XG4gICAgICAgIGlmKHRyYW5zaXRpb25zTm90U3VwcG9ydGVkKSBwcm9qZWN0UHJldmlld3MucmVtb3ZlQ2xhc3MoJ3NsaWRlLW91dCcpO1xuICAgICAgICBlbHNlIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSwgLTEsIDAsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vb3BlbiBtYWluIG5hdmlnYXRpb25cbiAgICAgICAgbmF2aWdhdGlvblRyaWdnZXIuYWRkQ2xhc3MoJ25hdi12aXNpYmxlJyk7XG4gICAgICAgIG5hdmlnYXRpb24uYWRkQ2xhc3MoJ25hdi12aXNpYmxlJyk7XG4gICAgICAgIGlmKHRyYW5zaXRpb25zTm90U3VwcG9ydGVkKSBwcm9qZWN0UHJldmlld3MuYWRkQ2xhc3MoJ3NsaWRlLW91dCcpO1xuICAgICAgICBlbHNlIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSwgLTEsIDAsIHRydWUpO1xuICAgICAgfVxuICAgIH0gXG5cbiAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgYW5pbWF0aW5nID0gZmFsc2U7XG4gIH0pO1xuXG5cblxuXG4gIC8vc2Nyb2xsIGRvd24gdG8gcHJvamVjdCBpbmZvXG4gIHByb2plY3RzQ29udGFpbmVyLm9uKCdjbGljaycsICcuc2Nyb2xsJywgZnVuY3Rpb24oKXtcbiAgICBwcm9qZWN0c0NvbnRhaW5lci5hbmltYXRlKHsnc2Nyb2xsVG9wJzokKHdpbmRvdykuaGVpZ2h0KCl9LCA1MDApOyBcbiAgfSk7XG5cbiAgLy9jaGVjayBpZiBiYWNrZ3JvdW5kLWltYWdlcyBoYXZlIGJlZW4gbG9hZGVkIGFuZCBzaG93IHByb2plY3QgcHJldmlld3NcbiAgcHJvamVjdFByZXZpZXdzLmNoaWxkcmVuKCdhJykuYmdMb2FkZWQoe1xuICAgICAgYWZ0ZXJMb2FkZWQgOiBmdW5jdGlvbigpe1xuICAgICAgICBzaG93UHJldmlldyhwcm9qZWN0UHJldmlld3MuZXEoMCkpO1xuICAgICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBzaG93UHJldmlldyhwcm9qZWN0UHJldmlldykge1xuICAgIGlmKHByb2plY3RQcmV2aWV3Lmxlbmd0aCA+IDAgKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIHByb2plY3RQcmV2aWV3LmFkZENsYXNzKCdiZy1sb2FkZWQnKTtcbiAgICAgICAgc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXcubmV4dCgpKTtcbiAgICAgIH0sIDE1MCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb3BlblByb2plY3QocHJvamVjdFByZXZpZXcpIHtcbiAgICB2YXIgcHJvamVjdEluZGV4ID0gcHJvamVjdFByZXZpZXcuaW5kZXgoKTtcbiAgICBwcm9qZWN0cy5jaGlsZHJlbignbGknKS5lcShwcm9qZWN0SW5kZXgpLmFkZChwcm9qZWN0UHJldmlldykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgXG4gICAgaWYoIHRyYW5zaXRpb25zTm90U3VwcG9ydGVkICkge1xuICAgICAgcHJvamVjdFByZXZpZXdzLmFkZENsYXNzKCdzbGlkZS1vdXQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgIHByb2plY3RzLmNoaWxkcmVuKCdsaScpLmVxKHByb2plY3RJbmRleCkuYWRkQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpO1xuICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfSBlbHNlIHsgXG4gICAgICBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RQcmV2aWV3cywgcHJvamVjdEluZGV4LCAwLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZVByb2plY3QoKSB7XG4gICAgcHJvamVjdHMuZmluZCgnLnNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJykub24oJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpe1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnY29udGVudC12aXNpYmxlJykub2ZmKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyk7XG4gICAgICBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICAvL2lmIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IENTUyB0cmFuc2l0aW9ucy4uLlxuICAgIGlmKCB0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCApIHtcbiAgICAgIHByb2plY3RQcmV2aWV3cy5yZW1vdmVDbGFzcygnc2xpZGUtb3V0Jyk7XG4gICAgICBwcm9qZWN0cy5maW5kKCcuY29udGVudC12aXNpYmxlJykucmVtb3ZlQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpO1xuICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLCBwcm9qZWN0SW5kZXgsIGluZGV4LCBib29sKSB7XG4gICAgaWYoaW5kZXggPT0gMCApIGNyZWF0ZUFycmF5UmFuZG9tKCk7XG4gICAgaWYoIHByb2plY3RJbmRleCAhPSAtMSAmJiBpbmRleCA9PSAwICkgaW5kZXggPSAxO1xuXG4gICAgdmFyIHJhbmRvbVByb2plY3RJbmRleCA9IG1ha2VVbmlxdWVSYW5kb20oKTtcbiAgICBpZiggcmFuZG9tUHJvamVjdEluZGV4ID09IHByb2plY3RJbmRleCApIHJhbmRvbVByb2plY3RJbmRleCA9IG1ha2VVbmlxdWVSYW5kb20oKTtcbiAgICBcbiAgICBpZiggaW5kZXggPCBudW1SYW5kb21zIC0gMSApIHtcbiAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocmFuZG9tUHJvamVjdEluZGV4KS50b2dnbGVDbGFzcygnc2xpZGUtb3V0JywgYm9vbCk7XG4gICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xuICAgICAgICAvL2FuaW1hdGUgbmV4dCBwcmV2aWV3IHByb2plY3RcbiAgICAgICAgc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLCBwcm9qZWN0SW5kZXgsIGluZGV4ICsgMSwgYm9vbCk7XG4gICAgICB9LCAxNTApO1xuICAgIH0gZWxzZSBpZiAoIGluZGV4ID09IG51bVJhbmRvbXMgLSAxICkge1xuICAgICAgLy90aGlzIGlzIHRoZSBsYXN0IHByb2plY3QgcHJldmlldyB0byBiZSBhbmltYXRlZCBcbiAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocmFuZG9tUHJvamVjdEluZGV4KS50b2dnbGVDbGFzcygnc2xpZGUtb3V0JywgYm9vbCkub25lKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoIHByb2plY3RJbmRleCAhPSAtMSkge1xuICAgICAgICAgIHByb2plY3RzLmNoaWxkcmVuKCdsaS5zZWxlY3RlZCcpLmFkZENsYXNzKCdjb250ZW50LXZpc2libGUnKTtcbiAgICAgICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHByb2plY3RJbmRleCkuYWRkQ2xhc3MoJ3NsaWRlLW91dCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICB9IGVsc2UgaWYoIG5hdmlnYXRpb24uaGFzQ2xhc3MoJ25hdi12aXNpYmxlJykgJiYgYm9vbCApIHtcbiAgICAgICAgICBuYXZpZ2F0aW9uLmFkZENsYXNzKCduYXYtY2xpY2thYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShyYW5kb21Qcm9qZWN0SW5kZXgpLm9mZignd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcpO1xuICAgICAgICBhbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xOTM1MTc1OS9qYXZhc2NyaXB0LXJhbmRvbS1udW1iZXItb3V0LW9mLTUtbm8tcmVwZWF0LXVudGlsLWFsbC1oYXZlLWJlZW4tdXNlZFxuICBmdW5jdGlvbiBtYWtlVW5pcXVlUmFuZG9tKCkge1xuICAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdW5pcXVlUmFuZG9tcy5sZW5ndGgpO1xuICAgICAgdmFyIHZhbCA9IHVuaXF1ZVJhbmRvbXNbaW5kZXhdO1xuICAgICAgLy8gbm93IHJlbW92ZSB0aGF0IHZhbHVlIGZyb20gdGhlIGFycmF5XG4gICAgICB1bmlxdWVSYW5kb21zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlSYW5kb20oKSB7XG4gICAgLy9yZXNldCBhcnJheVxuICAgIHVuaXF1ZVJhbmRvbXMubGVuZ3RoID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVJhbmRvbXM7IGkrKykge1xuICAgICAgICAgICAgdW5pcXVlUmFuZG9tcy5wdXNoKGkpO1xuICAgICAgICB9XG4gIH1cbn0pO1xuXG4gLypcbiAqIEJHIExvYWRlZFxuICogQ29weXJpZ2h0IChjKSAyMDE0IEpvbmF0aGFuIENhdG11bGxcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuIChmdW5jdGlvbigkKXtcbiAgJC5mbi5iZ0xvYWRlZCA9IGZ1bmN0aW9uKGN1c3RvbSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIERlZmF1bHQgcGx1Z2luIHNldHRpbmdzXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgYWZ0ZXJMb2FkZWQgOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmFkZENsYXNzKCdiZy1sb2FkZWQnKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gTWVyZ2UgZGVmYXVsdCBhbmQgdXNlciBzZXR0aW5nc1xuICAgIHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgY3VzdG9tKTtcblxuICAgIC8vIExvb3AgdGhyb3VnaCBlbGVtZW50XG4gICAgc2VsZi5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICBiZ0ltZ3MgPSAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKS5zcGxpdCgnLCAnKTtcbiAgICAgICR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcsMCk7XG4gICAgICAkLmVhY2goIGJnSW1ncywgZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICAgIHZhciBpbWcgPSB2YWx1ZS5yZXBsYWNlKC9edXJsXFwoW1wiJ10/LywgJycpLnJlcGxhY2UoL1tcIiddP1xcKSQvLCAnJyk7XG4gICAgICAgICQoJzxpbWcvPicpLmF0dHIoJ3NyYycsIGltZykubG9hZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpOyAvLyBwcmV2ZW50IG1lbW9yeSBsZWFrc1xuICAgICAgICAgICR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcsJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JykrMSk7XG4gICAgICAgICAgaWYgKCR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcpID49IGJnSW1ncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNldHRpbmdzLmFmdGVyTG9hZGVkLmNhbGwoJHRoaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuICB9O1xufSkoalF1ZXJ5KTtcblxuXG5cblxuXG5cblxuXG4gICAgICQoZnVuY3Rpb24oKSB7XG4gICQoJy5kd2F5bmUtbWVldC10aGUtdGVhbScpLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgICQoJy5kd2F5bmUtbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAkKCcuZHdheW5lLXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnLjEnKTtcbiAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcxJyk7XG4gICAgJCgnLmR3YXluZS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcxMHB4Jyk7XG5cbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgLy8gb24gbW91c2VvdXQsIHJlc2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG91clxuICAgICQoJy5kd2F5bmUtbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJycpO1xuICAgICQoJy5kd2F5bmUtcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcnKTtcbiAgICAgJCgnLmR3YXluZS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnJyk7XG4gICAgICQoJy5kd2F5bmUtcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnJyk7XG4gICAgICQoJy5wcm9maWxlJykuc2hvdygpO1xuICB9KTtcbn0pO1xuXG5cbiAgICAgJChmdW5jdGlvbigpIHtcbiAgJCgnLnJ1ZHktbWVldC10aGUtdGVhbScpLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgICQoJy5ydWR5LW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgJCgnLnJ1ZHktcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcuMScpO1xuICAgICQoJy5ydWR5LXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcxJyk7XG4gICAgJCgnLnJ1ZHktcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnMTBweCcpO1xuXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIC8vIG9uIG1vdXNlb3V0LCByZXNldCB0aGUgYmFja2dyb3VuZCBjb2xvdXJcbiAgICAkKCcucnVkeS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAnJyk7XG4gICAgJCgnLnJ1ZHktcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcnKTtcbiAgICAgJCgnLnJ1ZHktcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJycpO1xuICAgICAkKCcucnVkeS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcnKTtcbiAgICAgJCgnLnByb2ZpbGUnKS5zaG93KCk7XG4gIH0pO1xufSk7ICAgICBcblxuXG4gICAgICQoZnVuY3Rpb24oKSB7XG4gICQoJy5saWFtLW1lZXQtdGhlLXRlYW0nKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAkKCcubGlhbS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgICQoJy5saWFtLXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnLjEnKTtcbiAgICAkKCcubGlhbS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgICQoJy5saWFtLXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJzEwcHgnKTtcblxuICB9LCBmdW5jdGlvbigpIHtcbiAgICAvLyBvbiBtb3VzZW91dCwgcmVzZXQgdGhlIGJhY2tncm91bmQgY29sb3VyXG4gICAgJCgnLmxpYW0tbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJycpO1xuICAgICQoJy5saWFtLXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnJyk7XG4gICAgICQoJy5saWFtLXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcnKTtcbiAgICAgJCgnLmxpYW0tcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnJyk7XG4gICAgICQoJy5wcm9maWxlJykuc2hvdygpO1xuICB9KTtcbn0pOyAgICAgXG5cblxuJChcIi50ZWFtLWJ1dHRvbiBhXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cbiAgJCgnLnByb2ZpbGUnKS5oaWRlKCk7XG4gICBcbn0pO1xuXG5cbiQoJy5mYWRpbmctc2xpZGVyLTEsIC5mYWRpbmctc2xpZGVyLTIsIC5mYWRpbmctc2xpZGVyLTMnKS51bnNsaWRlcih7XG5hbmltYXRpb246ICdmYWRlJywgYXV0b3BsYXk6IHRydWUsIHNwZWVkOiA0MDAwLCBkZWxheTogOTAwMCwgYXJyb3dzOiBmYWxzZSwgbmF2OiBmYWxzZVxufSk7XG5cblxuXG5cbiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAkKCcuc2VydmljZXMtaGVhZGVyJykuYW5pbWF0ZUNTUygnZmFkZUluVXAnICwge2RlbGF5OjEyMDB9KTtcblxuICAgICAgJCgnLmltcGFjdC10ZXh0JykuYW5pbWF0ZUNTUygnZmFkZUluVXAnLCB7ZGVsYXk6MzYwMH0pO1xuXG4gICAgICAkKCcuc2VydmljZXMtdGV4dCcpLmFuaW1hdGVDU1MoJ2ZhZGVJblVwJywge2RlbGF5OjU2MDB9KTtcblxuXG4gICAgIFxuXG59KTtcblxuIl19
