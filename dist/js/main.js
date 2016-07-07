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

  $('.services-list').animateCSS('fadeInUp', { delay: 1600 });

  $('.impact-text').animateCSS('fadeInUp', { delay: 4600 });

  $('.services-text').animateCSS('fadeInUp', { delay: 7600 });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxLQUFsQyxDQUF3QyxZQUFXO0FBQ2pELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBTCxFQUFlO0FBQ2hILFVBQUksU0FBUyxFQUFFLEtBQUssSUFBTCxDQUFYLENBRDRHO0FBRWhILGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBL0IsQ0FBM0IsQ0FGdUc7QUFHaEgsVUFBSSxPQUFPLE1BQVAsRUFBZTtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCLEdBQWhCO1NBRGIsRUFFRyxJQUZILEVBRGlCO0FBSWpCLGVBQU8sS0FBUCxDQUppQjtPQUFuQjtLQUhGO0dBRHNDLENBQXhDLENBRFc7Q0FBWCxDQUFGOzs7O0FBMEJBLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBVTtBQUN4QixJQUFFLFdBQUYsRUFBZSxLQUFmLENBQXFCLFlBQVU7O0FBSTNCLE1BQUUsVUFBRixFQUFjLFVBQWQsQ0FBeUIsR0FBekIsRUFKMkI7QUFLNUIsTUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixVQUFwQixFQUFnQyxXQUFoQyxDQUE0QyxXQUE1QyxFQUw0Qjs7QUFPNUIsUUFBSSxFQUFFLElBQUYsRUFBUSxRQUFSLENBQWlC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QUE2QixTQUE3QixFQUF3QyxFQUF4QyxFQUhZO0FBSVgsTUFBRSxvQkFBRixFQUF3QixHQUF4QixDQUE0QixTQUE1QixFQUF1QyxFQUF2QyxFQUpXO0FBS1gsTUFBRSxvQkFBRixFQUF3QixHQUF4QixDQUE0QixLQUE1QixFQUFtQyxFQUFuQyxFQUxXO0FBTVgsTUFBRSxVQUFGLEVBQWMsSUFBZCxHQU5XO0dBQVgsQ0FOSCxDQURnQjtDQUFYLENBQUY7O0FBa0JMLEVBQUUsZ0JBQUYsRUFBb0IsS0FBcEIsQ0FBMEIsWUFBVTs7QUFFbEMsSUFBRSxVQUFGLEVBQWMsSUFBZCxHQUZrQztDQUFWLENBQTFCOztBQU9BLEVBQUUsc0RBQUYsRUFBMEQsUUFBMUQsQ0FBbUU7QUFDbkUsYUFBVyxNQUFYLEVBQW1CLFVBQVUsSUFBVixFQUFnQixPQUFPLElBQVAsRUFBYSxPQUFPLElBQVAsRUFBYSxRQUFRLEtBQVIsRUFBZSxLQUFLLEtBQUw7Q0FENUU7O0FBU0EsRUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBVztBQUM5QixJQUFFLGtCQUFGLEVBQXNCLFVBQXRCLENBQWlDLFVBQWpDLEVBQThDLEVBQUMsT0FBTSxJQUFOLEVBQS9DLEVBRDhCOztBQUc1QixJQUFFLGdCQUFGLEVBQW9CLFVBQXBCLENBQStCLFVBQS9CLEVBQTJDLEVBQUMsT0FBTSxJQUFOLEVBQTVDLEVBSDRCOztBQU0zQixJQUFFLGNBQUYsRUFBa0IsVUFBbEIsQ0FBNkIsVUFBN0IsRUFBeUMsRUFBQyxPQUFNLElBQU4sRUFBMUMsRUFOMkI7O0FBUTFCLElBQUUsZ0JBQUYsRUFBb0IsVUFBcEIsQ0FBK0IsVUFBL0IsRUFBMkMsRUFBQyxPQUFNLElBQU4sRUFBNUMsRUFSMEI7Q0FBWCxDQUFyQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBqc2hpbnQgZGV2ZWw6dHJ1ZSAqL1xuY29uc29sZS5sb2coJ0xvb2sgYXQgYXBwL2pzL21haW4uanMnKTtcblxuXG4kKGZ1bmN0aW9uKCkge1xuICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xuICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsnXScpO1xuICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxuICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcblxuXG5cblxuXG5cblxuXG4vLyByZXNwb25zaXZlIG5hdmlnYXRpb25cblxuXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgJChcIi5idXR0b24gYVwiKS5jbGljayhmdW5jdGlvbigpe1xuXG5cbiAgICAgICBcbiAgICAgICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcblxuICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLWNsb3NlXCIpKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgfSBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLW9wZW5cIikpIHtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdhdXRvJyk7XG4gICAgfVxufSk7XG4gICBcbn0pO1xuJCgnLm92ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQoXCIub3ZlcmxheVwiKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgJChcIi5idXR0b24gYVwiKS50b2dnbGVDbGFzcygnYnRuLW9wZW4nKS50b2dnbGVDbGFzcygnYnRuLWNsb3NlJyk7XG4gICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICBvcGVuID0gZmFsc2U7XG4gICAgXG59KTtcblxuXG5cblxuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpe1xuICAvL29wZW4gdGhlIGxhdGVyYWwgcGFuZWxcbiAgJCgnLmNkLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoJy5jZC1wYW5lbCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe1xuICAgICAgICBcImRpc3BsYXlcIjogXCJpbmxpbmUtYmxvY2tcIiwgXG4gICAgICAgIFwidHJhbnNpdGlvblwiOiBcImFsbCBlYXNlLWluIDVzXCIsIFxuICAgICAgICBcInRyYW5zaXRpb24tZGVsYXlcIiA6IFwiLjVzXCJcbiAgICAgIH0pO1xuXG4gIH0pO1xuICAvL2Nsb3NlIHRoZSBsYXRlcmFsIHBhbmVsXG4gICQoJy5jZC1wYW5lbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBpZiggJChldmVudC50YXJnZXQpLmlzKCcuY2QtcGFuZWwnKSB8fCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wYW5lbC1jbG9zZScpICkgeyBcbiAgICAgICQoJy5jZC1wYW5lbCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnYXV0bycpO1xuICAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcbiAgICB9XG4gIH0pO1xufSk7XG5cblxuXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCl7XG4gIC8vY2FjaGUgRE9NIGVsZW1lbnRzXG4gIHZhciBwcm9qZWN0c0NvbnRhaW5lciA9ICQoJy5jZC1wcm9qZWN0cy1jb250YWluZXInKSxcbiAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyID0gcHJvamVjdHNDb250YWluZXIuZmluZCgnLmNkLXByb2plY3RzLXByZXZpZXdzJyksXG4gICAgcHJvamVjdFByZXZpZXdzID0gcHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSxcbiAgICBwcm9qZWN0cyA9IHByb2plY3RzQ29udGFpbmVyLmZpbmQoJy5jZC1wcm9qZWN0cycpLFxuICAgIG5hdmlnYXRpb25UcmlnZ2VyID0gJCgnLmNkLW5hdi10cmlnZ2VyJyksXG4gICAgbmF2aWdhdGlvbiA9ICQoJy5jZC1wcmltYXJ5LW5hdicpLFxuICAgIC8vaWYgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgQ1NTIHRyYW5zaXRpb25zLi4uXG4gICAgdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgPSAoICQoJy5uby1jc3N0cmFuc2l0aW9ucycpLmxlbmd0aCA+IDApO1xuXG4gIHZhciBhbmltYXRpbmcgPSBmYWxzZSxcbiAgICAvL3dpbGwgYmUgdXNlZCB0byBleHRyYWN0IHJhbmRvbSBudW1iZXJzIGZvciBwcm9qZWN0cyBzbGlkZSB1cC9zbGlkZSBkb3duIGVmZmVjdFxuICAgIG51bVJhbmRvbXMgPSBwcm9qZWN0cy5maW5kKCdsaScpLmxlbmd0aCwgXG4gICAgdW5pcXVlUmFuZG9tcyA9IFtdO1xuXG4gIC8vb3BlbiBwcm9qZWN0XG4gIHByb2plY3RzUHJldmlld1dyYXBwZXIub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiggYW5pbWF0aW5nID09IGZhbHNlICkge1xuICAgICAgYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZChwcm9qZWN0c0NvbnRhaW5lcikuYWRkQ2xhc3MoJ3Byb2plY3Qtb3BlbicpO1xuICAgICAgb3BlblByb2plY3QoJCh0aGlzKS5wYXJlbnQoJ2xpJykpO1xuICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xuICAgIH1cbiAgfSk7XG5cbiAgbmF2aWdhdGlvblRyaWdnZXIub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgaWYoIGFuaW1hdGluZyA9PSBmYWxzZSApIHtcbiAgICAgIGFuaW1hdGluZyA9IHRydWU7XG4gICAgICBpZiggbmF2aWdhdGlvblRyaWdnZXIuaGFzQ2xhc3MoJ3Byb2plY3Qtb3BlbicpICkge1xuXG4gICAgICAgIC8vY2xvc2UgdmlzaWJsZSBwcm9qZWN0XG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZChwcm9qZWN0c0NvbnRhaW5lcikucmVtb3ZlQ2xhc3MoJ3Byb2plY3Qtb3BlbicpO1xuICAgICAgICBjbG9zZVByb2plY3QoKTtcbiAgICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcImlubGluZS1ibG9ja1wifSk7XG4gICAgICB9IGVsc2UgaWYoIG5hdmlnYXRpb25UcmlnZ2VyLmhhc0NsYXNzKCduYXYtdmlzaWJsZScpICkge1xuICAgICAgICAvL2Nsb3NlIG1haW4gbmF2aWdhdGlvblxuICAgICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5yZW1vdmVDbGFzcygnbmF2LXZpc2libGUnKTtcbiAgICAgICAgbmF2aWdhdGlvbi5yZW1vdmVDbGFzcygnbmF2LWNsaWNrYWJsZSBuYXYtdmlzaWJsZScpO1xuICAgICAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgcHJvamVjdFByZXZpZXdzLnJlbW92ZUNsYXNzKCdzbGlkZS1vdXQnKTtcbiAgICAgICAgZWxzZSBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL29wZW4gbWFpbiBuYXZpZ2F0aW9uXG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZENsYXNzKCduYXYtdmlzaWJsZScpO1xuICAgICAgICBuYXZpZ2F0aW9uLmFkZENsYXNzKCduYXYtdmlzaWJsZScpO1xuICAgICAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgcHJvamVjdFByZXZpZXdzLmFkZENsYXNzKCdzbGlkZS1vdXQnKTtcbiAgICAgICAgZWxzZSBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IFxuXG4gICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIGFuaW1hdGluZyA9IGZhbHNlO1xuICB9KTtcblxuXG5cblxuICAvL3Njcm9sbCBkb3duIHRvIHByb2plY3QgaW5mb1xuICBwcm9qZWN0c0NvbnRhaW5lci5vbignY2xpY2snLCAnLnNjcm9sbCcsIGZ1bmN0aW9uKCl7XG4gICAgcHJvamVjdHNDb250YWluZXIuYW5pbWF0ZSh7J3Njcm9sbFRvcCc6JCh3aW5kb3cpLmhlaWdodCgpfSwgNTAwKTsgXG4gIH0pO1xuXG4gIC8vY2hlY2sgaWYgYmFja2dyb3VuZC1pbWFnZXMgaGF2ZSBiZWVuIGxvYWRlZCBhbmQgc2hvdyBwcm9qZWN0IHByZXZpZXdzXG4gIHByb2plY3RQcmV2aWV3cy5jaGlsZHJlbignYScpLmJnTG9hZGVkKHtcbiAgICAgIGFmdGVyTG9hZGVkIDogZnVuY3Rpb24oKXtcbiAgICAgICAgc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXdzLmVxKDApKTtcbiAgICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXcpIHtcbiAgICBpZihwcm9qZWN0UHJldmlldy5sZW5ndGggPiAwICkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBwcm9qZWN0UHJldmlldy5hZGRDbGFzcygnYmctbG9hZGVkJyk7XG4gICAgICAgIHNob3dQcmV2aWV3KHByb2plY3RQcmV2aWV3Lm5leHQoKSk7XG4gICAgICB9LCAxNTApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9wZW5Qcm9qZWN0KHByb2plY3RQcmV2aWV3KSB7XG4gICAgdmFyIHByb2plY3RJbmRleCA9IHByb2plY3RQcmV2aWV3LmluZGV4KCk7XG4gICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpJykuZXEocHJvamVjdEluZGV4KS5hZGQocHJvamVjdFByZXZpZXcpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgIFxuICAgIGlmKCB0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCApIHtcbiAgICAgIHByb2plY3RQcmV2aWV3cy5hZGRDbGFzcygnc2xpZGUtb3V0JykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICBwcm9qZWN0cy5jaGlsZHJlbignbGknKS5lcShwcm9qZWN0SW5kZXgpLmFkZENsYXNzKCdjb250ZW50LXZpc2libGUnKTtcbiAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7IFxuICAgICAgc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0UHJldmlld3MsIHByb2plY3RJbmRleCwgMCwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VQcm9qZWN0KCkge1xuICAgIHByb2plY3RzLmZpbmQoJy5zZWxlY3RlZCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpLm9uKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpLm9mZignd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcpO1xuICAgICAgc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLCAtMSwgMCwgZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgLy9pZiBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBDU1MgdHJhbnNpdGlvbnMuLi5cbiAgICBpZiggdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgKSB7XG4gICAgICBwcm9qZWN0UHJldmlld3MucmVtb3ZlQ2xhc3MoJ3NsaWRlLW91dCcpO1xuICAgICAgcHJvamVjdHMuZmluZCgnLmNvbnRlbnQtdmlzaWJsZScpLnJlbW92ZUNsYXNzKCdjb250ZW50LXZpc2libGUnKTtcbiAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlciwgcHJvamVjdEluZGV4LCBpbmRleCwgYm9vbCkge1xuICAgIGlmKGluZGV4ID09IDAgKSBjcmVhdGVBcnJheVJhbmRvbSgpO1xuICAgIGlmKCBwcm9qZWN0SW5kZXggIT0gLTEgJiYgaW5kZXggPT0gMCApIGluZGV4ID0gMTtcblxuICAgIHZhciByYW5kb21Qcm9qZWN0SW5kZXggPSBtYWtlVW5pcXVlUmFuZG9tKCk7XG4gICAgaWYoIHJhbmRvbVByb2plY3RJbmRleCA9PSBwcm9qZWN0SW5kZXggKSByYW5kb21Qcm9qZWN0SW5kZXggPSBtYWtlVW5pcXVlUmFuZG9tKCk7XG4gICAgXG4gICAgaWYoIGluZGV4IDwgbnVtUmFuZG9tcyAtIDEgKSB7XG4gICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkudG9nZ2xlQ2xhc3MoJ3NsaWRlLW91dCcsIGJvb2wpO1xuICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgLy9hbmltYXRlIG5leHQgcHJldmlldyBwcm9qZWN0XG4gICAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlciwgcHJvamVjdEluZGV4LCBpbmRleCArIDEsIGJvb2wpO1xuICAgICAgfSwgMTUwKTtcbiAgICB9IGVsc2UgaWYgKCBpbmRleCA9PSBudW1SYW5kb21zIC0gMSApIHtcbiAgICAgIC8vdGhpcyBpcyB0aGUgbGFzdCBwcm9qZWN0IHByZXZpZXcgdG8gYmUgYW5pbWF0ZWQgXG4gICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkudG9nZ2xlQ2xhc3MoJ3NsaWRlLW91dCcsIGJvb2wpLm9uZSgnd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKCBwcm9qZWN0SW5kZXggIT0gLTEpIHtcbiAgICAgICAgICBwcm9qZWN0cy5jaGlsZHJlbignbGkuc2VsZWN0ZWQnKS5hZGRDbGFzcygnY29udGVudC12aXNpYmxlJyk7XG4gICAgICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShwcm9qZWN0SW5kZXgpLmFkZENsYXNzKCdzbGlkZS1vdXQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgfSBlbHNlIGlmKCBuYXZpZ2F0aW9uLmhhc0NsYXNzKCduYXYtdmlzaWJsZScpICYmIGJvb2wgKSB7XG4gICAgICAgICAgbmF2aWdhdGlvbi5hZGRDbGFzcygnbmF2LWNsaWNrYWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocmFuZG9tUHJvamVjdEluZGV4KS5vZmYoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnKTtcbiAgICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTkzNTE3NTkvamF2YXNjcmlwdC1yYW5kb20tbnVtYmVyLW91dC1vZi01LW5vLXJlcGVhdC11bnRpbC1hbGwtaGF2ZS1iZWVuLXVzZWRcbiAgZnVuY3Rpb24gbWFrZVVuaXF1ZVJhbmRvbSgpIHtcbiAgICAgIHZhciBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHVuaXF1ZVJhbmRvbXMubGVuZ3RoKTtcbiAgICAgIHZhciB2YWwgPSB1bmlxdWVSYW5kb21zW2luZGV4XTtcbiAgICAgIC8vIG5vdyByZW1vdmUgdGhhdCB2YWx1ZSBmcm9tIHRoZSBhcnJheVxuICAgICAgdW5pcXVlUmFuZG9tcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5UmFuZG9tKCkge1xuICAgIC8vcmVzZXQgYXJyYXlcbiAgICB1bmlxdWVSYW5kb21zLmxlbmd0aCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1SYW5kb21zOyBpKyspIHtcbiAgICAgICAgICAgIHVuaXF1ZVJhbmRvbXMucHVzaChpKTtcbiAgICAgICAgfVxuICB9XG59KTtcblxuIC8qXG4gKiBCRyBMb2FkZWRcbiAqIENvcHlyaWdodCAoYykgMjAxNCBKb25hdGhhbiBDYXRtdWxsXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cbiAoZnVuY3Rpb24oJCl7XG4gICQuZm4uYmdMb2FkZWQgPSBmdW5jdGlvbihjdXN0b20pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBEZWZhdWx0IHBsdWdpbiBzZXR0aW5nc1xuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgIGFmdGVyTG9hZGVkIDogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnYmctbG9hZGVkJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIE1lcmdlIGRlZmF1bHQgYW5kIHVzZXIgc2V0dGluZ3NcbiAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIGN1c3RvbSk7XG5cbiAgICAvLyBMb29wIHRocm91Z2ggZWxlbWVudFxuICAgIHNlbGYuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgYmdJbWdzID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykuc3BsaXQoJywgJyk7XG4gICAgICAkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnLDApO1xuICAgICAgJC5lYWNoKCBiZ0ltZ3MsIGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgICB2YXIgaW1nID0gdmFsdWUucmVwbGFjZSgvXnVybFxcKFtcIiddPy8sICcnKS5yZXBsYWNlKC9bXCInXT9cXCkkLywgJycpO1xuICAgICAgICAkKCc8aW1nLz4nKS5hdHRyKCdzcmMnLCBpbWcpLmxvYWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTsgLy8gcHJldmVudCBtZW1vcnkgbGVha3NcbiAgICAgICAgICAkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnLCR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcpKzEpO1xuICAgICAgICAgIGlmICgkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnKSA+PSBiZ0ltZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZXR0aW5ncy5hZnRlckxvYWRlZC5jYWxsKCR0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfTtcbn0pKGpRdWVyeSk7XG5cblxuXG5cblxuXG5cblxuICAgICAkKGZ1bmN0aW9uKCkge1xuICAkKCcuZHdheW5lLW1lZXQtdGhlLXRlYW0nKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAkKCcuZHdheW5lLW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgJCgnLmR3YXluZS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJy4xJyk7XG4gICAgJCgnLmR3YXluZS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgICQoJy5kd2F5bmUtcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnMTBweCcpO1xuXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIC8vIG9uIG1vdXNlb3V0LCByZXNldCB0aGUgYmFja2dyb3VuZCBjb2xvdXJcbiAgICAkKCcuZHdheW5lLW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICcnKTtcbiAgICAkKCcuZHdheW5lLXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnJyk7XG4gICAgICQoJy5kd2F5bmUtcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJycpO1xuICAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJycpO1xuICAgICAkKCcucHJvZmlsZScpLnNob3coKTtcbiAgfSk7XG59KTtcblxuXG4gICAgICQoZnVuY3Rpb24oKSB7XG4gICQoJy5ydWR5LW1lZXQtdGhlLXRlYW0nKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAkKCcucnVkeS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgICQoJy5ydWR5LXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnLjEnKTtcbiAgICAkKCcucnVkeS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgICQoJy5ydWR5LXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJzEwcHgnKTtcblxuICB9LCBmdW5jdGlvbigpIHtcbiAgICAvLyBvbiBtb3VzZW91dCwgcmVzZXQgdGhlIGJhY2tncm91bmQgY29sb3VyXG4gICAgJCgnLnJ1ZHktbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJycpO1xuICAgICQoJy5ydWR5LXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnJyk7XG4gICAgICQoJy5ydWR5LXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcnKTtcbiAgICAgJCgnLnJ1ZHktcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnJyk7XG4gICAgICQoJy5wcm9maWxlJykuc2hvdygpO1xuICB9KTtcbn0pOyAgICAgXG5cblxuICAgICAkKGZ1bmN0aW9uKCkge1xuICAkKCcubGlhbS1tZWV0LXRoZS10ZWFtJykuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgJCgnLmxpYW0tbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAkKCcubGlhbS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJy4xJyk7XG4gICAgJCgnLmxpYW0tcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgICAkKCcubGlhbS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcxMHB4Jyk7XG5cbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgLy8gb24gbW91c2VvdXQsIHJlc2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG91clxuICAgICQoJy5saWFtLW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICcnKTtcbiAgICAkKCcubGlhbS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJycpO1xuICAgICAkKCcubGlhbS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnJyk7XG4gICAgICQoJy5saWFtLXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJycpO1xuICAgICAkKCcucHJvZmlsZScpLnNob3coKTtcbiAgfSk7XG59KTsgICAgIFxuXG5cbiQoXCIudGVhbS1idXR0b24gYVwiKS5jbGljayhmdW5jdGlvbigpe1xuXG4gICQoJy5wcm9maWxlJykuaGlkZSgpO1xuICAgXG59KTtcblxuXG4kKCcuZmFkaW5nLXNsaWRlci0xLCAuZmFkaW5nLXNsaWRlci0yLCAuZmFkaW5nLXNsaWRlci0zJykudW5zbGlkZXIoe1xuYW5pbWF0aW9uOiAnZmFkZScsIGF1dG9wbGF5OiB0cnVlLCBzcGVlZDogNDAwMCwgZGVsYXk6IDkwMDAsIGFycm93czogZmFsc2UsIG5hdjogZmFsc2Vcbn0pO1xuXG5cblxuXG5cblxuJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICQoJy5zZXJ2aWNlcy1oZWFkZXInKS5hbmltYXRlQ1NTKCdmYWRlSW5VcCcgLCB7ZGVsYXk6MTIwMH0pO1xuXG4gICAgJCgnLnNlcnZpY2VzLWxpc3QnKS5hbmltYXRlQ1NTKCdmYWRlSW5VcCcsIHtkZWxheToxNjAwfSk7XG5cblxuICAgICAkKCcuaW1wYWN0LXRleHQnKS5hbmltYXRlQ1NTKCdmYWRlSW5VcCcsIHtkZWxheTo0NjAwfSk7XG5cbiAgICAgICQoJy5zZXJ2aWNlcy10ZXh0JykuYW5pbWF0ZUNTUygnZmFkZUluVXAnLCB7ZGVsYXk6NzYwMH0pO1xuXG5cbiAgICAgXG5cbn0pO1xuXG4iXX0=
