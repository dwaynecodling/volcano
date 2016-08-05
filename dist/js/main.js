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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7QUFDQSxRQUFRLEdBQVIsQ0FBWSx3QkFBWjs7QUFHQSxFQUFFLFlBQVc7QUFDWCxJQUFFLDhCQUFGLEVBQWtDLEVBQWxDLENBQXFDLE9BQXJDLEVBQThDLFVBQVMsS0FBVCxFQUFlO0FBQzNELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBeEcsRUFBa0g7QUFDaEgsVUFBSSxTQUFTLEVBQUUsS0FBSyxJQUFQLENBQWI7QUFDQSxlQUFTLE9BQU8sTUFBUCxHQUFnQixNQUFoQixHQUF5QixFQUFFLFdBQVcsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixDQUFoQixDQUFYLEdBQStCLEdBQWpDLENBQWxDO0FBQ0EsVUFBSSxPQUFPLE1BQVgsRUFBbUI7QUFDakIsVUFBRSxZQUFGLEVBQWdCLE9BQWhCLENBQXdCO0FBQ3RCLHFCQUFXLE9BQU8sTUFBUCxHQUFnQjtBQURMLFNBQXhCLEVBRUcsSUFGSDtBQUdBLGVBQU8sS0FBUDtBQUNEO0FBQ0Y7QUFDRixHQVhEO0FBWUQsQ0FiRDs7QUFzQkE7OztBQUdBLEVBQUUsYUFBRixFQUFpQixFQUFqQixDQUFvQixPQUFwQixFQUE2QixVQUFTLEtBQVQsRUFBZTtBQUN4QyxJQUFFLFVBQUYsRUFBYyxVQUFkLENBQXlCLEdBQXpCO0FBQ0EsSUFBRSxXQUFGLEVBQWUsV0FBZixDQUEyQixXQUEzQixFQUF3QyxXQUF4QyxDQUFvRCxVQUFwRDtBQUNBLElBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxZQUFkLEVBQTRCLFFB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QixTQUE3QixFQUF3QyxFQUF4QztBQUNDLE1BQUUsb0JBQUYsRUFBd0IsR0FBeEIsQ0FBNEIsU0FBNUIsRUFBdUMsRUFBdkM7QUFDQSxNQUFFLG9CQUFGLEVBQXdCLEdBQXhCLENBQTRCLEtBQTVCLEVBQW1DLEVBQW5DO0FBQ0EsTUFBRSxVQUFGLEVBQWMsSUFBZDtBQUNGLEdBYkQ7QUFjRCxDQWZJOztBQWtCTCxFQUFFLGdCQUFGLEVBQW9CLEtBQXBCLENBQTBCLFlBQVU7O0FBRWxDLElBQUUsVUFBRixFQUFjLElBQWQ7QUFFRCxDQUpEOztBQU9BLEVBQUUsc0RBQUYsRUFBMEQsUUFBMUQsQ0FBbUU7QUFDbkUsYUFBVyxNQUR3RCxFQUNoRCxVQUFVLElBRHNDLEVBQ2hDLE9BQU8sSUFEeUIsRUFDbkIsT0FBTyxJQURZLEVBQ04sUUFBUSxLQURGLEVBQ1MsS0FBSztBQURkLENBQW5FOztBQUtBLE9BQU8sUUFBUCxFQUFpQixLQUFqQixDQUF1QixZQUFXO0FBQzlCLFNBQU8sa0JBQVAsRUFBMkIsUUFBM0IsQ0FBb0MsUUFBcEMsRUFBOEMsZUFBOUMsQ0FBOEQ7QUFDMUQsZ0JBQVksMkJBRDhDO0FBRTFELFlBQVE7QUFGa0QsR0FBOUQ7QUFJSCxDQUxEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGpzaGludCBkZXZlbDp0cnVlICovXG5jb25zb2xlLmxvZygnTG9vayBhdCBhcHAvanMvbWFpbi5qcycpO1xuXG5cbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xuICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsnXScpO1xuICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxuICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcblxuXG5cblxuXG5cblxuXG4vLyByZXNwb25zaXZlIG5hdmlnYXRpb25cblxuXG4kKFwiLndyYXAtbmF2IGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgICQoXCIub3ZlcmxheVwiKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgJChcIi5idXR0b24gYVwiKS50b2dnbGVDbGFzcygnYnRuLWNsb3NlJykudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJyk7XG4gICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy14JywgJ2hpZGRlbicpO1xuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXknLCAndmlzaWJsZScpO1xuXG59KTtcblxuXG5cblxuXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgJChcIi5idXR0b24gYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG5cblxuXG4gICAgICAgICQoXCIub3ZlcmxheVwiKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYnRuLW9wZW4nKS50b2dnbGVDbGFzcygnYnRuLWNsb3NlJyk7XG5cbiAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImJ0bi1jbG9zZVwiKSkge1xuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImJ0bi1vcGVuXCIpKSB7XG4gICAgICAgICAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy14JywgJ2hpZGRlbicpO1xuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXknLCAndmlzaWJsZScpO1xuICAgIH1cbn0pO1xuXG59KTtcbiQoJy5vdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgICQoXCIub3ZlcmxheVwiKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgJChcIi5idXR0b24gYVwiKS50b2dnbGVDbGFzcygnYnRuLW9wZW4nKS50b2dnbGVDbGFzcygnYnRuLWNsb3NlJyk7XG4gICAgICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy15JywgJ3Zpc2libGUnKTtcbiAgICBvcGVuID0gZmFsc2U7XG5cbn0pO1xuXG5cblxuXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCl7XG4gIC8vb3BlbiB0aGUgbGF0ZXJhbCBwYW5lbFxuICAkKCcuY2QtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCgnLmNkLXBhbmVsJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7XG4gICAgICAgIFwiZGlzcGxheVwiOiBcImlubGluZS1ibG9ja1wiLFxuICAgICAgICBcInRyYW5zaXRpb25cIjogXCJhbGwgZWFzZS1pbiA1c1wiLFxuICAgICAgICBcInRyYW5zaXRpb24tZGVsYXlcIiA6IFwiLjVzXCJcbiAgICAgIH0pO1xuXG4gIH0pO1xuICAvL2Nsb3NlIHRoZSBsYXRlcmFsIHBhbmVsXG4gICQoJy5jZC1wYW5lbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBpZiggJChldmVudC50YXJnZXQpLmlzKCcuY2QtcGFuZWwnKSB8fCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wYW5lbC1jbG9zZScpICkge1xuICAgICAgJCgnLmNkLXBhbmVsJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy14JywgJ2hpZGRlbicpO1xuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXknLCAndmlzaWJsZScpO1xuICAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcbiAgICB9XG4gIH0pO1xufSk7XG5cblxuXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCl7XG4gIC8vY2FjaGUgRE9NIGVsZW1lbnRzXG4gIHZhciBwcm9qZWN0c0NvbnRhaW5lciA9ICQoJy5jZC1wcm9qZWN0cy1jb250YWluZXInKSxcbiAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyID0gcHJvamVjdHNDb250YWluZXIuZmluZCgnLmNkLXByb2plY3RzLXByZXZpZXdzJyksXG4gICAgcHJvamVjdFByZXZpZXdzID0gcHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSxcbiAgICBwcm9qZWN0cyA9IHByb2plY3RzQ29udGFpbmVyLmZpbmQoJy5jZC1wcm9qZWN0cycpLFxuICAgIG5hdmlnYXRpb25UcmlnZ2VyID0gJCgnLmNkLW5hdi10cmlnZ2VyJyksXG4gICAgbmF2aWdhdGlvbiA9ICQoJy5jZC1wcmltYXJ5LW5hdicpLFxuICAgIC8vaWYgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgQ1NTIHRyYW5zaXRpb25zLi4uXG4gICAgdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgPSAoICQoJy5uby1jc3N0cmFuc2l0aW9ucycpLmxlbmd0aCA+IDApO1xuXG4gIHZhciBhbmltYXRpbmcgPSBmYWxzZSxcbiAgICAvL3dpbGwgYmUgdXNlZCB0byBleHRyYWN0IHJhbmRvbSBudW1iZXJzIGZvciBwcm9qZWN0cyBzbGlkZSB1cC9zbGlkZSBkb3duIGVmZmVjdFxuICAgIG51bVJhbmRvbXMgPSBwcm9qZWN0cy5maW5kKCdsaScpLmxlbmd0aCxcbiAgICB1bmlxdWVSYW5kb21zID0gW107XG5cbiAgLy9vcGVuIHByb2plY3RcbiAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5vbignY2xpY2snLCAnYScsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmKCBhbmltYXRpbmcgPT0gZmFsc2UgKSB7XG4gICAgICBhbmltYXRpbmcgPSB0cnVlO1xuICAgICAgbmF2aWdhdGlvblRyaWdnZXIuYWRkKHByb2plY3RzQ29udGFpbmVyKS5hZGRDbGFzcygncHJvamVjdC1vcGVuJyk7XG4gICAgICBvcGVuUHJvamVjdCgkKHRoaXMpLnBhcmVudCgnbGknKSk7XG4gICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe2Rpc3BsYXk6IFwibm9uZVwifSk7XG4gICAgfVxuICB9KTtcblxuICBuYXZpZ2F0aW9uVHJpZ2dlci5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmKCBhbmltYXRpbmcgPT0gZmFsc2UgKSB7XG4gICAgICBhbmltYXRpbmcgPSB0cnVlO1xuICAgICAgaWYoIG5hdmlnYXRpb25UcmlnZ2VyLmhhc0NsYXNzKCdwcm9qZWN0LW9wZW4nKSApIHtcblxuICAgICAgICAvL2Nsb3NlIHZpc2libGUgcHJvamVjdFxuICAgICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5hZGQocHJvamVjdHNDb250YWluZXIpLnJlbW92ZUNsYXNzKCdwcm9qZWN0LW9wZW4nKTtcbiAgICAgICAgY2xvc2VQcm9qZWN0KCk7XG4gICAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7ZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIn0pO1xuICAgICAgfSBlbHNlIGlmKCBuYXZpZ2F0aW9uVHJpZ2dlci5oYXNDbGFzcygnbmF2LXZpc2libGUnKSApIHtcbiAgICAgICAgLy9jbG9zZSBtYWluIG5hdmlnYXRpb25cbiAgICAgICAgbmF2aWdhdGlvblRyaWdnZXIucmVtb3ZlQ2xhc3MoJ25hdi12aXNpYmxlJyk7XG4gICAgICAgIG5hdmlnYXRpb24ucmVtb3ZlQ2xhc3MoJ25hdi1jbGlja2FibGUgbmF2LXZpc2libGUnKTtcbiAgICAgICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIHByb2plY3RQcmV2aWV3cy5yZW1vdmVDbGFzcygnc2xpZGUtb3V0Jyk7XG4gICAgICAgIGVsc2Ugc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLCAtMSwgMCwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9vcGVuIG1haW4gbmF2aWdhdGlvblxuICAgICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5hZGRDbGFzcygnbmF2LXZpc2libGUnKTtcbiAgICAgICAgbmF2aWdhdGlvbi5hZGRDbGFzcygnbmF2LXZpc2libGUnKTtcbiAgICAgICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIHByb2plY3RQcmV2aWV3cy5hZGRDbGFzcygnc2xpZGUtb3V0Jyk7XG4gICAgICAgIGVsc2Ugc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLCAtMSwgMCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIGFuaW1hdGluZyA9IGZhbHNlO1xuICB9KTtcblxuXG5cblxuICAvL3Njcm9sbCBkb3duIHRvIHByb2plY3QgaW5mb1xuICBwcm9qZWN0c0NvbnRhaW5lci5vbignY2xpY2snLCAnLnNjcm9sbCcsIGZ1bmN0aW9uKCl7XG4gICAgcHJvamVjdHNDb250YWluZXIuYW5pbWF0ZSh7J3Njcm9sbFRvcCc6JCh3aW5kb3cpLmhlaWdodCgpfSwgNTAwKTtcbiAgfSk7XG5cbiAgLy9jaGVjayBpZiBiYWNrZ3JvdW5kLWltYWdlcyBoYXZlIGJlZW4gbG9hZGVkIGFuZCBzaG93IHByb2plY3QgcHJldmlld3NcbiAgcHJvamVjdFByZXZpZXdzLmNoaWxkcmVuKCdhJykuYmdMb2FkZWQoe1xuICAgICAgYWZ0ZXJMb2FkZWQgOiBmdW5jdGlvbigpe1xuICAgICAgICBzaG93UHJldmlldyhwcm9qZWN0UHJldmlld3MuZXEoMCkpO1xuICAgICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBzaG93UHJldmlldyhwcm9qZWN0UHJldmlldykge1xuICAgIGlmKHByb2plY3RQcmV2aWV3Lmxlbmd0aCA+IDAgKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIHByb2plY3RQcmV2aWV3LmFkZENsYXNzKCdiZy1sb2FkZWQnKTtcbiAgICAgICAgc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXcubmV4dCgpKTtcbiAgICAgIH0sIDE1MCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb3BlblByb2plY3QocHJvamVjdFByZXZpZXcpIHtcbiAgICB2YXIgcHJvamVjdEluZGV4ID0gcHJvamVjdFByZXZpZXcuaW5kZXgoKTtcbiAgICBwcm9qZWN0cy5jaGlsZHJlbignbGknKS5lcShwcm9qZWN0SW5kZXgpLmFkZChwcm9qZWN0UHJldmlldykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG5cbiAgICBpZiggdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgKSB7XG4gICAgICBwcm9qZWN0UHJldmlld3MuYWRkQ2xhc3MoJ3NsaWRlLW91dCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpJykuZXEocHJvamVjdEluZGV4KS5hZGRDbGFzcygnY29udGVudC12aXNpYmxlJyk7XG4gICAgICBhbmltYXRpbmcgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0UHJldmlld3MsIHByb2plY3RJbmRleCwgMCwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VQcm9qZWN0KCkge1xuICAgIHByb2plY3RzLmZpbmQoJy5zZWxlY3RlZCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpLm9uKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpLm9mZignd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcpO1xuICAgICAgc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLCAtMSwgMCwgZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgLy9pZiBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBDU1MgdHJhbnNpdGlvbnMuLi5cbiAgICBpZiggdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgKSB7XG4gICAgICBwcm9qZWN0UHJldmlld3MucmVtb3ZlQ2xhc3MoJ3NsaWRlLW91dCcpO1xuICAgICAgcHJvamVjdHMuZmluZCgnLmNvbnRlbnQtdmlzaWJsZScpLnJlbW92ZUNsYXNzKCdjb250ZW50LXZpc2libGUnKTtcbiAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlciwgcHJvamVjdEluZGV4LCBpbmRleCwgYm9vbCkge1xuICAgIGlmKGluZGV4ID09IDAgKSBjcmVhdGVBcnJheVJhbmRvbSgpO1xuICAgIGlmKCBwcm9qZWN0SW5kZXggIT0gLTEgJiYgaW5kZXggPT0gMCApIGluZGV4ID0gMTtcblxuICAgIHZhciByYW5kb21Qcm9qZWN0SW5kZXggPSBtYWtlVW5pcXVlUmFuZG9tKCk7XG4gICAgaWYoIHJhbmRvbVByb2plY3RJbmRleCA9PSBwcm9qZWN0SW5kZXggKSByYW5kb21Qcm9qZWN0SW5kZXggPSBtYWtlVW5pcXVlUmFuZG9tKCk7XG5cbiAgICBpZiggaW5kZXggPCBudW1SYW5kb21zIC0gMSApIHtcbiAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocmFuZG9tUHJvamVjdEluZGV4KS50b2dnbGVDbGFzcygnc2xpZGUtb3V0JywgYm9vbCk7XG4gICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xuICAgICAgICAvL2FuaW1hdGUgbmV4dCBwcmV2aWV3IHByb2plY3RcbiAgICAgICAgc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLCBwcm9qZWN0SW5kZXgsIGluZGV4ICsgMSwgYm9vbCk7XG4gICAgICB9LCAxNTApO1xuICAgIH0gZWxzZSBpZiAoIGluZGV4ID09IG51bVJhbmRvbXMgLSAxICkge1xuICAgICAgLy90aGlzIGlzIHRoZSBsYXN0IHByb2plY3QgcHJldmlldyB0byBiZSBhbmltYXRlZFxuICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShyYW5kb21Qcm9qZWN0SW5kZXgpLnRvZ2dsZUNsYXNzKCdzbGlkZS1vdXQnLCBib29sKS5vbmUoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpe1xuICAgICAgICBpZiggcHJvamVjdEluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpLnNlbGVjdGVkJykuYWRkQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpO1xuICAgICAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocHJvamVjdEluZGV4KS5hZGRDbGFzcygnc2xpZGUtb3V0JykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgIH0gZWxzZSBpZiggbmF2aWdhdGlvbi5oYXNDbGFzcygnbmF2LXZpc2libGUnKSAmJiBib29sICkge1xuICAgICAgICAgIG5hdmlnYXRpb24uYWRkQ2xhc3MoJ25hdi1jbGlja2FibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkub2ZmKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyk7XG4gICAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5MzUxNzU5L2phdmFzY3JpcHQtcmFuZG9tLW51bWJlci1vdXQtb2YtNS1uby1yZXBlYXQtdW50aWwtYWxsLWhhdmUtYmVlbi11c2VkXG4gIGZ1bmN0aW9uIG1ha2VVbmlxdWVSYW5kb20oKSB7XG4gICAgICB2YXIgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB1bmlxdWVSYW5kb21zLmxlbmd0aCk7XG4gICAgICB2YXIgdmFsID0gdW5pcXVlUmFuZG9tc1tpbmRleF07XG4gICAgICAvLyBub3cgcmVtb3ZlIHRoYXQgdmFsdWUgZnJvbSB0aGUgYXJyYXlcbiAgICAgIHVuaXF1ZVJhbmRvbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheVJhbmRvbSgpIHtcbiAgICAvL3Jlc2V0IGFycmF5XG4gICAgdW5pcXVlUmFuZG9tcy5sZW5ndGggPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtUmFuZG9tczsgaSsrKSB7XG4gICAgICAgICAgICB1bmlxdWVSYW5kb21zLnB1c2goaSk7XG4gICAgICAgIH1cbiAgfVxufSk7XG5cbiAvKlxuICogQkcgTG9hZGVkXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgSm9uYXRoYW4gQ2F0bXVsbFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG4gKGZ1bmN0aW9uKCQpe1xuICAkLmZuLmJnTG9hZGVkID0gZnVuY3Rpb24oY3VzdG9tKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gRGVmYXVsdCBwbHVnaW4gc2V0dGluZ3NcbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICBhZnRlckxvYWRlZCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2JnLWxvYWRlZCcpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBNZXJnZSBkZWZhdWx0IGFuZCB1c2VyIHNldHRpbmdzXG4gICAgdmFyIHNldHRpbmdzID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBjdXN0b20pO1xuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGVsZW1lbnRcbiAgICBzZWxmLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgIGJnSW1ncyA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLnNwbGl0KCcsICcpO1xuICAgICAgJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JywwKTtcbiAgICAgICQuZWFjaCggYmdJbWdzLCBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgICAgdmFyIGltZyA9IHZhbHVlLnJlcGxhY2UoL151cmxcXChbXCInXT8vLCAnJykucmVwbGFjZSgvW1wiJ10/XFwpJC8sICcnKTtcbiAgICAgICAgJCgnPGltZy8+JykuYXR0cignc3JjJywgaW1nKS5sb2FkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7IC8vIHByZXZlbnQgbWVtb3J5IGxlYWtzXG4gICAgICAgICAgJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JywkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnKSsxKTtcbiAgICAgICAgICBpZiAoJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JykgPj0gYmdJbWdzLmxlbmd0aCkge1xuICAgICAgICAgICAgc2V0dGluZ3MuYWZ0ZXJMb2FkZWQuY2FsbCgkdGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH07XG59KShqUXVlcnkpO1xuXG5cbmZ1bmN0aW9uIG15U3RvcEZ1bmN0aW9uKCkge1xuICAgIGNsZWFyVGltZW91dChzbGlkZVRvZ2dsZVByb2plY3RzKTtcbn1cblxuZnVuY3Rpb24gbXlTdG9wRnVuY3Rpb24oKSB7XG4gICAgY2xlYXJUaW1lb3V0KHByb2plY3RQcmV2aWV3KTtcbn1cblxuXG5cblxuICAgICAkKGZ1bmN0aW9uKCkge1xuICAkKCcuZHdheW5lLW1lZXQtdGhlLXRlYW0nKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAkKCcuZHdheW5lLW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgJCgnLmR3YXluZS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJy4xJyk7XG4gICAgJCgnLmR3YXluZS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgICQoJy5kd2F5bmUtcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnMTBweCcpO1xuXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIC8vIG9uIG1vdXNlb3V0LCByZXNldCB0aGUgYmFja2dyb3VuZCBjb2xvdXJcbiAgICAkKCcuZHdheW5lLW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICcnKTtcbiAgICAkKCcuZHdheW5lLXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnJyk7XG4gICAgICQoJy5kd2F5bmUtcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJycpO1xuICAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJycpO1xuICAgICAkKCcucHJvZmlsZScpLnNob3coKTtcbiAgfSk7XG59KTtcblxuXG4gICAgICQoZnVuY3Rpb24oKSB7XG4gICQoJy5ydWR5LW1lZXQtdGhlLXRlYW0nKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAkKCcucnVkeS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgICQoJy5ydWR5LXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnLjEnKTtcbiAgICAkKCcucnVkeS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgICQoJy5ydWR5LXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJzEwcHgnKTtcblxuICB9LCBmdW5jdGlvbigpIHtcbiAgICAvLyBvbiBtb3VzZW91dCwgcmVzZXQgdGhlIGJhY2tncm91bmQgY29sb3VyXG4gICAgJCgnLnJ1ZHktbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJycpO1xuICAgICQoJy5ydWR5LXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnJyk7XG4gICAgICQoJy5ydWR5LXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcnKTtcbiAgICAgJCgnLnJ1ZHktcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnJyk7XG4gICAgICQoJy5wcm9maWxlJykuc2hvdygpO1xuICB9KTtcbn0pO1xuXG5cbiAgICAgJChmdW5jdGlvbigpIHtcbiAgJCgnLmxpYW0tbWVldC10aGUtdGVhbScpLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgICQoJy5saWFtLW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgJCgnLmxpYW0tcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcuMScpO1xuICAgICQoJy5saWFtLXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcxJyk7XG4gICAgJCgnLmxpYW0tcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnMTBweCcpO1xuXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIC8vIG9uIG1vdXNlb3V0LCByZXNldCB0aGUgYmFja2dyb3VuZCBjb2xvdXJcbiAgICAkKCcubGlhbS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAnJyk7XG4gICAgJCgnLmxpYW0tcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcnKTtcbiAgICAgJCgnLmxpYW0tcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJycpO1xuICAgICAkKCcubGlhbS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcnKTtcbiAgICAgJCgnLnByb2ZpbGUnKS5zaG93KCk7XG4gIH0pO1xufSk7XG5cblxuJChcIi50ZWFtLWJ1dHRvbiBhXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cbiAgJCgnLnByb2ZpbGUnKS5oaWRlKCk7XG5cbn0pO1xuXG5cbiQoJy5mYWRpbmctc2xpZGVyLTEsIC5mYWRpbmctc2xpZGVyLTIsIC5mYWRpbmctc2xpZGVyLTMnKS51bnNsaWRlcih7XG5hbmltYXRpb246ICdmYWRlJywgYXV0b3BsYXk6IHRydWUsIHNwZWVkOiA4MDAwLCBkZWxheTogOTAwMCwgYXJyb3dzOiBmYWxzZSwgbmF2OiBmYWxzZVxufSk7XG5cblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBqUXVlcnkoJy5zZXJ2aWNlcy1oZWFkZXInKS5hZGRDbGFzcyhcImhpZGRlblwiKS52aWV3cG9ydENoZWNrZXIoe1xuICAgICAgICBjbGFzc1RvQWRkOiAndmlzaWJsZSBhbmltYXRlZCBmYWRlSW5VcCcsXG4gICAgICAgIG9mZnNldDogMjUwXG4gICAgICAgfSk7XG59KTtcbiJdfQ==
