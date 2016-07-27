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

  $('.services-list').animateCSS('fadeInUp', { delay: 1600 });

  $('.impact-text').animateCSS('fadeInUp', { delay: 4600 });

  $('.services-text').animateCSS('fadeInUp', { delay: 7600 });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7QUFDQSxRQUFRLEdBQVIsQ0FBWSx3QkFBWjs7QUFHQSxFQUFFLFlBQVc7QUFDWCxJQUFFLDhCQUFGLEVBQWtDLEtBQWxDLENBQXdDLFlBQVc7QUFDakQsUUFBSSxTQUFTLFFBQVQsQ0FBa0IsT0FBbEIsQ0FBMEIsS0FBMUIsRUFBZ0MsRUFBaEMsS0FBdUMsS0FBSyxRQUFMLENBQWMsT0FBZCxDQUFzQixLQUF0QixFQUE0QixFQUE1QixDQUF2QyxJQUEwRSxTQUFTLFFBQVQsSUFBcUIsS0FBSyxRQUF4RyxFQUFrSDtBQUNoSCxVQUFJLFNBQVMsRUFBRSxLQUFLLElBQVAsQ0FBYjtBQUNBLGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBakMsQ0FBbEM7QUFDQSxVQUFJLE9BQU8sTUFBWCxFQUFtQjtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCO0FBREwsU0FBeEIsRUFFRyxJQUZIO0FBR0EsZUFBTyxLQUFQO0FBQ0Q7QUFDRjtBQUNGLEdBWEQ7QUFZRCxDQWJEOztBQXNCQTs7O0FBR0EsRUFBRSxhQUFGLEVBQWlCLEtBQWpCLENBQXVCLFlBQVU7QUFDN0IsSUFBRSxVQUFGLEVBQWMsVUFBZCxDQUF5QixHQUF6QjtBQUNBLElBQUUsV0FBRixFQUFlLFdBQWYsQ0FBMkIsV0FBM0IsRUFBd0MsV0FBeEMsQ0FBb0QsVUFBcEQ7QUFDQSxJQUFFLE1BQUYsRUFBVSxHQUFWLENBQWMsWUFBZCxFQUE0QixRQUE1QjtBQUNJLElBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxZQUFkLEVBQTRC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LENBZkk7O0FBa0JMLEVBQUUsZ0JBQUYsRUFBb0IsS0FBcEIsQ0FBMEIsWUFBVTs7QUFFbEMsSUFBRSxVQUFGLEVBQWMsSUFBZDtBQUVELENBSkQ7O0FBT0EsRUFBRSxzREFBRixFQUEwRCxRQUExRCxDQUFtRTtBQUNuRSxhQUFXLE1BRHdELEVBQ2hELFVBQVUsSUFEc0MsRUFDaEMsT0FBTyxJQUR5QixFQUNuQixPQUFPLElBRFksRUFDTixRQUFRLEtBREYsRUFDUyxLQUFLO0FBRGQsQ0FBbkU7O0FBU0EsRUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBVztBQUM5QixJQUFFLGtCQUFGLEVBQXNCLFVBQXRCLENBQWlDLFVBQWpDLEVBQThDLEVBQUMsT0FBTSxJQUFQLEVBQTlDOztBQUVFLElBQUUsZ0JBQUYsRUFBb0IsVUFBcEIsQ0FBK0IsVUFBL0IsRUFBMkMsRUFBQyxPQUFNLElBQVAsRUFBM0M7O0FBR0MsSUFBRSxjQUFGLEVBQWtCLFVBQWxCLENBQTZCLFVBQTdCLEVBQXlDLEVBQUMsT0FBTSxJQUFQLEVBQXpDOztBQUVDLElBQUUsZ0JBQUYsRUFBb0IsVUFBcEIsQ0FBK0IsVUFBL0IsRUFBMkMsRUFBQyxPQUFNLElBQVAsRUFBM0M7QUFLTCxDQWJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGpzaGludCBkZXZlbDp0cnVlICovXG5jb25zb2xlLmxvZygnTG9vayBhdCBhcHAvanMvbWFpbi5qcycpO1xuXG5cbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XG4gICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG5cblxuXG5cblxuXG5cbi8vIHJlc3BvbnNpdmUgbmF2aWdhdGlvblxuXG5cbiQoXCIud3JhcC1uYXYgYVwiKS5jbGljayhmdW5jdGlvbigpe1xuICAgICQoXCIub3ZlcmxheVwiKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgJChcIi5idXR0b24gYVwiKS50b2dnbGVDbGFzcygnYnRuLWNsb3NlJykudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJyk7XG4gICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy14JywgJ2hpZGRlbicpO1xuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXknLCAndmlzaWJsZScpO1xuICAgXG59KTtcblxuXG5cblxuXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgJChcIi5idXR0b24gYVwiKS5jbGljayhmdW5jdGlvbigpe1xuXG5cbiAgICAgICBcbiAgICAgICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcblxuICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLWNsb3NlXCIpKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgfSBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLW9wZW5cIikpIHtcbiAgICAgICAgICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteScsICd2aXNpYmxlJyk7XG4gICAgfVxufSk7XG4gICBcbn0pO1xuJCgnLm92ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQoXCIub3ZlcmxheVwiKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgJChcIi5idXR0b24gYVwiKS50b2dnbGVDbGFzcygnYnRuLW9wZW4nKS50b2dnbGVDbGFzcygnYnRuLWNsb3NlJyk7XG4gICAgICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy15JywgJ3Zpc2libGUnKTtcbiAgICBvcGVuID0gZmFsc2U7XG4gICAgXG59KTtcblxuXG5cblxuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpe1xuICAvL29wZW4gdGhlIGxhdGVyYWwgcGFuZWxcbiAgJCgnLmNkLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoJy5jZC1wYW5lbCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe1xuICAgICAgICBcImRpc3BsYXlcIjogXCJpbmxpbmUtYmxvY2tcIiwgXG4gICAgICAgIFwidHJhbnNpdGlvblwiOiBcImFsbCBlYXNlLWluIDVzXCIsIFxuICAgICAgICBcInRyYW5zaXRpb24tZGVsYXlcIiA6IFwiLjVzXCJcbiAgICAgIH0pO1xuXG4gIH0pO1xuICAvL2Nsb3NlIHRoZSBsYXRlcmFsIHBhbmVsXG4gICQoJy5jZC1wYW5lbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBpZiggJChldmVudC50YXJnZXQpLmlzKCcuY2QtcGFuZWwnKSB8fCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wYW5lbC1jbG9zZScpICkgeyBcbiAgICAgICQoJy5jZC1wYW5lbCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy15JywgJ3Zpc2libGUnKTtcbiAgICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe2Rpc3BsYXk6IFwibm9uZVwifSk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5cblxuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpe1xuICAvL2NhY2hlIERPTSBlbGVtZW50c1xuICB2YXIgcHJvamVjdHNDb250YWluZXIgPSAkKCcuY2QtcHJvamVjdHMtY29udGFpbmVyJyksXG4gICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlciA9IHByb2plY3RzQ29udGFpbmVyLmZpbmQoJy5jZC1wcm9qZWN0cy1wcmV2aWV3cycpLFxuICAgIHByb2plY3RQcmV2aWV3cyA9IHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksXG4gICAgcHJvamVjdHMgPSBwcm9qZWN0c0NvbnRhaW5lci5maW5kKCcuY2QtcHJvamVjdHMnKSxcbiAgICBuYXZpZ2F0aW9uVHJpZ2dlciA9ICQoJy5jZC1uYXYtdHJpZ2dlcicpLFxuICAgIG5hdmlnYXRpb24gPSAkKCcuY2QtcHJpbWFyeS1uYXYnKSxcbiAgICAvL2lmIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IENTUyB0cmFuc2l0aW9ucy4uLlxuICAgIHRyYW5zaXRpb25zTm90U3VwcG9ydGVkID0gKCAkKCcubm8tY3NzdHJhbnNpdGlvbnMnKS5sZW5ndGggPiAwKTtcblxuICB2YXIgYW5pbWF0aW5nID0gZmFsc2UsXG4gICAgLy93aWxsIGJlIHVzZWQgdG8gZXh0cmFjdCByYW5kb20gbnVtYmVycyBmb3IgcHJvamVjdHMgc2xpZGUgdXAvc2xpZGUgZG93biBlZmZlY3RcbiAgICBudW1SYW5kb21zID0gcHJvamVjdHMuZmluZCgnbGknKS5sZW5ndGgsIFxuICAgIHVuaXF1ZVJhbmRvbXMgPSBbXTtcblxuICAvL29wZW4gcHJvamVjdFxuICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLm9uKCdjbGljaycsICdhJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYoIGFuaW1hdGluZyA9PSBmYWxzZSApIHtcbiAgICAgIGFuaW1hdGluZyA9IHRydWU7XG4gICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5hZGQocHJvamVjdHNDb250YWluZXIpLmFkZENsYXNzKCdwcm9qZWN0LW9wZW4nKTtcbiAgICAgIG9wZW5Qcm9qZWN0KCQodGhpcykucGFyZW50KCdsaScpKTtcbiAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcbiAgICB9XG4gIH0pO1xuXG4gIG5hdmlnYXRpb25UcmlnZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIGlmKCBhbmltYXRpbmcgPT0gZmFsc2UgKSB7XG4gICAgICBhbmltYXRpbmcgPSB0cnVlO1xuICAgICAgaWYoIG5hdmlnYXRpb25UcmlnZ2VyLmhhc0NsYXNzKCdwcm9qZWN0LW9wZW4nKSApIHtcblxuICAgICAgICAvL2Nsb3NlIHZpc2libGUgcHJvamVjdFxuICAgICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5hZGQocHJvamVjdHNDb250YWluZXIpLnJlbW92ZUNsYXNzKCdwcm9qZWN0LW9wZW4nKTtcbiAgICAgICAgY2xvc2VQcm9qZWN0KCk7XG4gICAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7ZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIn0pO1xuICAgICAgfSBlbHNlIGlmKCBuYXZpZ2F0aW9uVHJpZ2dlci5oYXNDbGFzcygnbmF2LXZpc2libGUnKSApIHtcbiAgICAgICAgLy9jbG9zZSBtYWluIG5hdmlnYXRpb25cbiAgICAgICAgbmF2aWdhdGlvblRyaWdnZXIucmVtb3ZlQ2xhc3MoJ25hdi12aXNpYmxlJyk7XG4gICAgICAgIG5hdmlnYXRpb24ucmVtb3ZlQ2xhc3MoJ25hdi1jbGlja2FibGUgbmF2LXZpc2libGUnKTtcbiAgICAgICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIHByb2plY3RQcmV2aWV3cy5yZW1vdmVDbGFzcygnc2xpZGUtb3V0Jyk7XG4gICAgICAgIGVsc2Ugc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLCAtMSwgMCwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9vcGVuIG1haW4gbmF2aWdhdGlvblxuICAgICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5hZGRDbGFzcygnbmF2LXZpc2libGUnKTtcbiAgICAgICAgbmF2aWdhdGlvbi5hZGRDbGFzcygnbmF2LXZpc2libGUnKTtcbiAgICAgICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIHByb2plY3RQcmV2aWV3cy5hZGRDbGFzcygnc2xpZGUtb3V0Jyk7XG4gICAgICAgIGVsc2Ugc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLCAtMSwgMCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBcblxuICAgIGlmKHRyYW5zaXRpb25zTm90U3VwcG9ydGVkKSBhbmltYXRpbmcgPSBmYWxzZTtcbiAgfSk7XG5cblxuXG5cbiAgLy9zY3JvbGwgZG93biB0byBwcm9qZWN0IGluZm9cbiAgcHJvamVjdHNDb250YWluZXIub24oJ2NsaWNrJywgJy5zY3JvbGwnLCBmdW5jdGlvbigpe1xuICAgIHByb2plY3RzQ29udGFpbmVyLmFuaW1hdGUoeydzY3JvbGxUb3AnOiQod2luZG93KS5oZWlnaHQoKX0sIDUwMCk7IFxuICB9KTtcblxuICAvL2NoZWNrIGlmIGJhY2tncm91bmQtaW1hZ2VzIGhhdmUgYmVlbiBsb2FkZWQgYW5kIHNob3cgcHJvamVjdCBwcmV2aWV3c1xuICBwcm9qZWN0UHJldmlld3MuY2hpbGRyZW4oJ2EnKS5iZ0xvYWRlZCh7XG4gICAgICBhZnRlckxvYWRlZCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHNob3dQcmV2aWV3KHByb2plY3RQcmV2aWV3cy5lcSgwKSk7XG4gICAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNob3dQcmV2aWV3KHByb2plY3RQcmV2aWV3KSB7XG4gICAgaWYocHJvamVjdFByZXZpZXcubGVuZ3RoID4gMCApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgcHJvamVjdFByZXZpZXcuYWRkQ2xhc3MoJ2JnLWxvYWRlZCcpO1xuICAgICAgICBzaG93UHJldmlldyhwcm9qZWN0UHJldmlldy5uZXh0KCkpO1xuICAgICAgfSwgMTUwKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvcGVuUHJvamVjdChwcm9qZWN0UHJldmlldykge1xuICAgIHZhciBwcm9qZWN0SW5kZXggPSBwcm9qZWN0UHJldmlldy5pbmRleCgpO1xuICAgIHByb2plY3RzLmNoaWxkcmVuKCdsaScpLmVxKHByb2plY3RJbmRleCkuYWRkKHByb2plY3RQcmV2aWV3KS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICBcbiAgICBpZiggdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgKSB7XG4gICAgICBwcm9qZWN0UHJldmlld3MuYWRkQ2xhc3MoJ3NsaWRlLW91dCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpJykuZXEocHJvamVjdEluZGV4KS5hZGRDbGFzcygnY29udGVudC12aXNpYmxlJyk7XG4gICAgICBhbmltYXRpbmcgPSBmYWxzZTtcbiAgICB9IGVsc2UgeyBcbiAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdFByZXZpZXdzLCBwcm9qZWN0SW5kZXgsIDAsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlUHJvamVjdCgpIHtcbiAgICBwcm9qZWN0cy5maW5kKCcuc2VsZWN0ZWQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKS5vbignd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdjb250ZW50LXZpc2libGUnKS5vZmYoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnKTtcbiAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSwgLTEsIDAsIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIC8vaWYgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgQ1NTIHRyYW5zaXRpb25zLi4uXG4gICAgaWYoIHRyYW5zaXRpb25zTm90U3VwcG9ydGVkICkge1xuICAgICAgcHJvamVjdFByZXZpZXdzLnJlbW92ZUNsYXNzKCdzbGlkZS1vdXQnKTtcbiAgICAgIHByb2plY3RzLmZpbmQoJy5jb250ZW50LXZpc2libGUnKS5yZW1vdmVDbGFzcygnY29udGVudC12aXNpYmxlJyk7XG4gICAgICBhbmltYXRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIsIHByb2plY3RJbmRleCwgaW5kZXgsIGJvb2wpIHtcbiAgICBpZihpbmRleCA9PSAwICkgY3JlYXRlQXJyYXlSYW5kb20oKTtcbiAgICBpZiggcHJvamVjdEluZGV4ICE9IC0xICYmIGluZGV4ID09IDAgKSBpbmRleCA9IDE7XG5cbiAgICB2YXIgcmFuZG9tUHJvamVjdEluZGV4ID0gbWFrZVVuaXF1ZVJhbmRvbSgpO1xuICAgIGlmKCByYW5kb21Qcm9qZWN0SW5kZXggPT0gcHJvamVjdEluZGV4ICkgcmFuZG9tUHJvamVjdEluZGV4ID0gbWFrZVVuaXF1ZVJhbmRvbSgpO1xuICAgIFxuICAgIGlmKCBpbmRleCA8IG51bVJhbmRvbXMgLSAxICkge1xuICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShyYW5kb21Qcm9qZWN0SW5kZXgpLnRvZ2dsZUNsYXNzKCdzbGlkZS1vdXQnLCBib29sKTtcbiAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vYW5pbWF0ZSBuZXh0IHByZXZpZXcgcHJvamVjdFxuICAgICAgICBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIsIHByb2plY3RJbmRleCwgaW5kZXggKyAxLCBib29sKTtcbiAgICAgIH0sIDE1MCk7XG4gICAgfSBlbHNlIGlmICggaW5kZXggPT0gbnVtUmFuZG9tcyAtIDEgKSB7XG4gICAgICAvL3RoaXMgaXMgdGhlIGxhc3QgcHJvamVjdCBwcmV2aWV3IHRvIGJlIGFuaW1hdGVkIFxuICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShyYW5kb21Qcm9qZWN0SW5kZXgpLnRvZ2dsZUNsYXNzKCdzbGlkZS1vdXQnLCBib29sKS5vbmUoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpe1xuICAgICAgICBpZiggcHJvamVjdEluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpLnNlbGVjdGVkJykuYWRkQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpO1xuICAgICAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocHJvamVjdEluZGV4KS5hZGRDbGFzcygnc2xpZGUtb3V0JykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgIH0gZWxzZSBpZiggbmF2aWdhdGlvbi5oYXNDbGFzcygnbmF2LXZpc2libGUnKSAmJiBib29sICkge1xuICAgICAgICAgIG5hdmlnYXRpb24uYWRkQ2xhc3MoJ25hdi1jbGlja2FibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkub2ZmKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyk7XG4gICAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5MzUxNzU5L2phdmFzY3JpcHQtcmFuZG9tLW51bWJlci1vdXQtb2YtNS1uby1yZXBlYXQtdW50aWwtYWxsLWhhdmUtYmVlbi11c2VkXG4gIGZ1bmN0aW9uIG1ha2VVbmlxdWVSYW5kb20oKSB7XG4gICAgICB2YXIgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB1bmlxdWVSYW5kb21zLmxlbmd0aCk7XG4gICAgICB2YXIgdmFsID0gdW5pcXVlUmFuZG9tc1tpbmRleF07XG4gICAgICAvLyBub3cgcmVtb3ZlIHRoYXQgdmFsdWUgZnJvbSB0aGUgYXJyYXlcbiAgICAgIHVuaXF1ZVJhbmRvbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheVJhbmRvbSgpIHtcbiAgICAvL3Jlc2V0IGFycmF5XG4gICAgdW5pcXVlUmFuZG9tcy5sZW5ndGggPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtUmFuZG9tczsgaSsrKSB7XG4gICAgICAgICAgICB1bmlxdWVSYW5kb21zLnB1c2goaSk7XG4gICAgICAgIH1cbiAgfVxufSk7XG5cbiAvKlxuICogQkcgTG9hZGVkXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgSm9uYXRoYW4gQ2F0bXVsbFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG4gKGZ1bmN0aW9uKCQpe1xuICAkLmZuLmJnTG9hZGVkID0gZnVuY3Rpb24oY3VzdG9tKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gRGVmYXVsdCBwbHVnaW4gc2V0dGluZ3NcbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICBhZnRlckxvYWRlZCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2JnLWxvYWRlZCcpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBNZXJnZSBkZWZhdWx0IGFuZCB1c2VyIHNldHRpbmdzXG4gICAgdmFyIHNldHRpbmdzID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBjdXN0b20pO1xuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGVsZW1lbnRcbiAgICBzZWxmLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgIGJnSW1ncyA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLnNwbGl0KCcsICcpO1xuICAgICAgJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JywwKTtcbiAgICAgICQuZWFjaCggYmdJbWdzLCBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgICAgdmFyIGltZyA9IHZhbHVlLnJlcGxhY2UoL151cmxcXChbXCInXT8vLCAnJykucmVwbGFjZSgvW1wiJ10/XFwpJC8sICcnKTtcbiAgICAgICAgJCgnPGltZy8+JykuYXR0cignc3JjJywgaW1nKS5sb2FkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7IC8vIHByZXZlbnQgbWVtb3J5IGxlYWtzXG4gICAgICAgICAgJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JywkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnKSsxKTtcbiAgICAgICAgICBpZiAoJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JykgPj0gYmdJbWdzLmxlbmd0aCkge1xuICAgICAgICAgICAgc2V0dGluZ3MuYWZ0ZXJMb2FkZWQuY2FsbCgkdGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH07XG59KShqUXVlcnkpO1xuXG5cblxuXG5cblxuXG5cbiAgICAgJChmdW5jdGlvbigpIHtcbiAgJCgnLmR3YXluZS1tZWV0LXRoZS10ZWFtJykuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgJCgnLmR3YXluZS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgICQoJy5kd2F5bmUtcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcuMScpO1xuICAgICQoJy5kd2F5bmUtcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJzEwcHgnKTtcblxuICB9LCBmdW5jdGlvbigpIHtcbiAgICAvLyBvbiBtb3VzZW91dCwgcmVzZXQgdGhlIGJhY2tncm91bmQgY29sb3VyXG4gICAgJCgnLmR3YXluZS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAnJyk7XG4gICAgJCgnLmR3YXluZS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJycpO1xuICAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcnKTtcbiAgICAgJCgnLmR3YXluZS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcnKTtcbiAgICAgJCgnLnByb2ZpbGUnKS5zaG93KCk7XG4gIH0pO1xufSk7XG5cblxuICAgICAkKGZ1bmN0aW9uKCkge1xuICAkKCcucnVkeS1tZWV0LXRoZS10ZWFtJykuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgJCgnLnJ1ZHktbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAkKCcucnVkeS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJy4xJyk7XG4gICAgJCgnLnJ1ZHktcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgICAkKCcucnVkeS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcxMHB4Jyk7XG5cbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgLy8gb24gbW91c2VvdXQsIHJlc2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG91clxuICAgICQoJy5ydWR5LW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICcnKTtcbiAgICAkKCcucnVkeS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJycpO1xuICAgICAkKCcucnVkeS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnJyk7XG4gICAgICQoJy5ydWR5LXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJycpO1xuICAgICAkKCcucHJvZmlsZScpLnNob3coKTtcbiAgfSk7XG59KTsgICAgIFxuXG5cbiAgICAgJChmdW5jdGlvbigpIHtcbiAgJCgnLmxpYW0tbWVldC10aGUtdGVhbScpLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgICQoJy5saWFtLW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgJCgnLmxpYW0tcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcuMScpO1xuICAgICQoJy5saWFtLXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcxJyk7XG4gICAgJCgnLmxpYW0tcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnMTBweCcpO1xuXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIC8vIG9uIG1vdXNlb3V0LCByZXNldCB0aGUgYmFja2dyb3VuZCBjb2xvdXJcbiAgICAkKCcubGlhbS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAnJyk7XG4gICAgJCgnLmxpYW0tcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcnKTtcbiAgICAgJCgnLmxpYW0tcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJycpO1xuICAgICAkKCcubGlhbS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcnKTtcbiAgICAgJCgnLnByb2ZpbGUnKS5zaG93KCk7XG4gIH0pO1xufSk7ICAgICBcblxuXG4kKFwiLnRlYW0tYnV0dG9uIGFcIikuY2xpY2soZnVuY3Rpb24oKXtcblxuICAkKCcucHJvZmlsZScpLmhpZGUoKTtcbiAgIFxufSk7XG5cblxuJCgnLmZhZGluZy1zbGlkZXItMSwgLmZhZGluZy1zbGlkZXItMiwgLmZhZGluZy1zbGlkZXItMycpLnVuc2xpZGVyKHtcbmFuaW1hdGlvbjogJ2ZhZGUnLCBhdXRvcGxheTogdHJ1ZSwgc3BlZWQ6IDQwMDAsIGRlbGF5OiA5MDAwLCBhcnJvd3M6IGZhbHNlLCBuYXY6IGZhbHNlXG59KTtcblxuXG5cblxuXG5cbiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAkKCcuc2VydmljZXMtaGVhZGVyJykuYW5pbWF0ZUNTUygnZmFkZUluVXAnICwge2RlbGF5OjEyMDB9KTtcblxuICAgICQoJy5zZXJ2aWNlcy1saXN0JykuYW5pbWF0ZUNTUygnZmFkZUluVXAnLCB7ZGVsYXk6MTYwMH0pO1xuXG5cbiAgICAgJCgnLmltcGFjdC10ZXh0JykuYW5pbWF0ZUNTUygnZmFkZUluVXAnLCB7ZGVsYXk6NDYwMH0pO1xuXG4gICAgICAkKCcuc2VydmljZXMtdGV4dCcpLmFuaW1hdGVDU1MoJ2ZhZGVJblVwJywge2RlbGF5Ojc2MDB9KTtcblxuXG4gICAgIFxuXG59KTtcblxuIl19
