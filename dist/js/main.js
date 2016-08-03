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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxFQUFsQyxDQUFxQyxPQUFyQyxFQUE4QyxVQUFTLEtBQVQsRUFBZTtBQUMzRCxRQUFJLFNBQVMsUUFBVCxDQUFrQixPQUFsQixDQUEwQixLQUExQixFQUFnQyxFQUFoQyxLQUF1QyxLQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLEtBQXRCLEVBQTRCLEVBQTVCLENBQXZDLElBQTBFLFNBQVMsUUFBVCxJQUFxQixLQUFLLFFBQUwsRUFBZTtBQUNoSCxVQUFJLFNBQVMsRUFBRSxLQUFLLElBQUwsQ0FBWCxDQUQ0RztBQUVoSCxlQUFTLE9BQU8sTUFBUCxHQUFnQixNQUFoQixHQUF5QixFQUFFLFdBQVcsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixDQUFoQixDQUFYLEdBQStCLEdBQS9CLENBQTNCLENBRnVHO0FBR2hILFVBQUksT0FBTyxNQUFQLEVBQWU7QUFDakIsVUFBRSxZQUFGLEVBQWdCLE9BQWhCLENBQXdCO0FBQ3RCLHFCQUFXLE9BQU8sTUFBUCxHQUFnQixHQUFoQjtTQURiLEVBRUcsSUFGSCxFQURpQjtBQUlqQixlQUFPLEtBQVAsQ0FKaUI7T0FBbkI7S0FIRjtHQUQ0QyxDQUE5QyxDQURXO0NBQVgsQ0FBRjs7OztBQXlCQSxFQUFFLGFBQUYsRUFBaUIsRUFBakIsQ0FBb0IsT0FBcEIsRUFBNkIsVUFBUyxLQUFULEVBQWU7QUFDeEMsSUFBRSxVQUFGLEVBQWMsVUFBZCxDQUF5QixHQUF6QixFQUR3QztBQUV4QyxJQUFFLFdBQUYsRUFBZSxXQUFmLENBQTJCLFdBQTNCLEVBQXdDLFdBQXhDLENBQW9ELFVBQXBELEVBRndDO0FBR3hDLElBQUUsTUFBRixFQUFVLEdBQVYsQ0FB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S0FBUixFQUFlLEtBQUssS0FBTDtDQUQ1RTs7QUFLQSxPQUFPLFFBQVAsRUFBaUIsS0FBakIsQ0FBdUIsWUFBVztBQUM5QixTQUFPLGtCQUFQLEVBQTJCLFFBQTNCLENBQW9DLFFBQXBDLEVBQThDLGVBQTlDLENBQThEO0FBQzFELGdCQUFZLDJCQUFaO0FBQ0EsWUFBUSxHQUFSO0dBRkosRUFEOEI7Q0FBWCxDQUF2QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBqc2hpbnQgZGV2ZWw6dHJ1ZSAqL1xyXG5jb25zb2xlLmxvZygnTG9vayBhdCBhcHAvanMvbWFpbi5qcycpO1xyXG5cclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgJCgnYVtocmVmKj1cIiNcIl06bm90KFtocmVmPVwiI1wiXSknKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpICYmIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWUpIHtcclxuICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcclxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XHJcbiAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vIHJlc3BvbnNpdmUgbmF2aWdhdGlvblxyXG5cclxuXHJcbiQoXCIud3JhcC1uYXYgYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAkKFwiLm92ZXJsYXlcIikuZmFkZVRvZ2dsZSgyMDApO1xyXG4gICAgJChcIi5idXR0b24gYVwiKS50b2dnbGVDbGFzcygnYnRuLWNsb3NlJykudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJyk7XHJcbiAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy15JywgJ3Zpc2libGUnKTtcclxuICAgXHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgJChcIi5idXR0b24gYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcblxyXG5cclxuICAgICAgIFxyXG4gICAgICAgICQoXCIub3ZlcmxheVwiKS5mYWRlVG9nZ2xlKDIwMCk7XHJcbiAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcclxuXHJcbiAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImJ0bi1jbG9zZVwiKSkge1xyXG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJidG4tb3BlblwiKSkge1xyXG4gICAgICAgICAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy14JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteScsICd2aXNpYmxlJyk7XHJcbiAgICB9XHJcbn0pO1xyXG4gICBcclxufSk7XHJcbiQoJy5vdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcclxuICAgICQoXCIuYnV0dG9uIGFcIikudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJykudG9nZ2xlQ2xhc3MoJ2J0bi1jbG9zZScpO1xyXG4gICAgICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcclxuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXknLCAndmlzaWJsZScpO1xyXG4gICAgb3BlbiA9IGZhbHNlO1xyXG4gICAgXHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCl7XHJcbiAgLy9vcGVuIHRoZSBsYXRlcmFsIHBhbmVsXHJcbiAgJCgnLmNkLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAkKCcuY2QtcGFuZWwnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7XHJcbiAgICAgICAgXCJkaXNwbGF5XCI6IFwiaW5saW5lLWJsb2NrXCIsIFxyXG4gICAgICAgIFwidHJhbnNpdGlvblwiOiBcImFsbCBlYXNlLWluIDVzXCIsIFxyXG4gICAgICAgIFwidHJhbnNpdGlvbi1kZWxheVwiIDogXCIuNXNcIlxyXG4gICAgICB9KTtcclxuXHJcbiAgfSk7XHJcbiAgLy9jbG9zZSB0aGUgbGF0ZXJhbCBwYW5lbFxyXG4gICQoJy5jZC1wYW5lbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGlmKCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wYW5lbCcpIHx8ICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXBhbmVsLWNsb3NlJykgKSB7IFxyXG4gICAgICAkKCcuY2QtcGFuZWwnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy15JywgJ3Zpc2libGUnKTtcclxuICAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcclxuICAgIH1cclxuICB9KTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpe1xyXG4gIC8vY2FjaGUgRE9NIGVsZW1lbnRzXHJcbiAgdmFyIHByb2plY3RzQ29udGFpbmVyID0gJCgnLmNkLXByb2plY3RzLWNvbnRhaW5lcicpLFxyXG4gICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlciA9IHByb2plY3RzQ29udGFpbmVyLmZpbmQoJy5jZC1wcm9qZWN0cy1wcmV2aWV3cycpLFxyXG4gICAgcHJvamVjdFByZXZpZXdzID0gcHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSxcclxuICAgIHByb2plY3RzID0gcHJvamVjdHNDb250YWluZXIuZmluZCgnLmNkLXByb2plY3RzJyksXHJcbiAgICBuYXZpZ2F0aW9uVHJpZ2dlciA9ICQoJy5jZC1uYXYtdHJpZ2dlcicpLFxyXG4gICAgbmF2aWdhdGlvbiA9ICQoJy5jZC1wcmltYXJ5LW5hdicpLFxyXG4gICAgLy9pZiBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBDU1MgdHJhbnNpdGlvbnMuLi5cclxuICAgIHRyYW5zaXRpb25zTm90U3VwcG9ydGVkID0gKCAkKCcubm8tY3NzdHJhbnNpdGlvbnMnKS5sZW5ndGggPiAwKTtcclxuXHJcbiAgdmFyIGFuaW1hdGluZyA9IGZhbHNlLFxyXG4gICAgLy93aWxsIGJlIHVzZWQgdG8gZXh0cmFjdCByYW5kb20gbnVtYmVycyBmb3IgcHJvamVjdHMgc2xpZGUgdXAvc2xpZGUgZG93biBlZmZlY3RcclxuICAgIG51bVJhbmRvbXMgPSBwcm9qZWN0cy5maW5kKCdsaScpLmxlbmd0aCwgXHJcbiAgICB1bmlxdWVSYW5kb21zID0gW107XHJcblxyXG4gIC8vb3BlbiBwcm9qZWN0XHJcbiAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5vbignY2xpY2snLCAnYScsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZiggYW5pbWF0aW5nID09IGZhbHNlICkge1xyXG4gICAgICBhbmltYXRpbmcgPSB0cnVlO1xyXG4gICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5hZGQocHJvamVjdHNDb250YWluZXIpLmFkZENsYXNzKCdwcm9qZWN0LW9wZW4nKTtcclxuICAgICAgb3BlblByb2plY3QoJCh0aGlzKS5wYXJlbnQoJ2xpJykpO1xyXG4gICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe2Rpc3BsYXk6IFwibm9uZVwifSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIG5hdmlnYXRpb25UcmlnZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBcclxuICAgIGlmKCBhbmltYXRpbmcgPT0gZmFsc2UgKSB7XHJcbiAgICAgIGFuaW1hdGluZyA9IHRydWU7XHJcbiAgICAgIGlmKCBuYXZpZ2F0aW9uVHJpZ2dlci5oYXNDbGFzcygncHJvamVjdC1vcGVuJykgKSB7XHJcblxyXG4gICAgICAgIC8vY2xvc2UgdmlzaWJsZSBwcm9qZWN0XHJcbiAgICAgICAgbmF2aWdhdGlvblRyaWdnZXIuYWRkKHByb2plY3RzQ29udGFpbmVyKS5yZW1vdmVDbGFzcygncHJvamVjdC1vcGVuJyk7XHJcbiAgICAgICAgY2xvc2VQcm9qZWN0KCk7XHJcbiAgICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcImlubGluZS1ibG9ja1wifSk7XHJcbiAgICAgIH0gZWxzZSBpZiggbmF2aWdhdGlvblRyaWdnZXIuaGFzQ2xhc3MoJ25hdi12aXNpYmxlJykgKSB7XHJcbiAgICAgICAgLy9jbG9zZSBtYWluIG5hdmlnYXRpb25cclxuICAgICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5yZW1vdmVDbGFzcygnbmF2LXZpc2libGUnKTtcclxuICAgICAgICBuYXZpZ2F0aW9uLnJlbW92ZUNsYXNzKCduYXYtY2xpY2thYmxlIG5hdi12aXNpYmxlJyk7XHJcbiAgICAgICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIHByb2plY3RQcmV2aWV3cy5yZW1vdmVDbGFzcygnc2xpZGUtb3V0Jyk7XHJcbiAgICAgICAgZWxzZSBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCBmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy9vcGVuIG1haW4gbmF2aWdhdGlvblxyXG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZENsYXNzKCduYXYtdmlzaWJsZScpO1xyXG4gICAgICAgIG5hdmlnYXRpb24uYWRkQ2xhc3MoJ25hdi12aXNpYmxlJyk7XHJcbiAgICAgICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIHByb2plY3RQcmV2aWV3cy5hZGRDbGFzcygnc2xpZGUtb3V0Jyk7XHJcbiAgICAgICAgZWxzZSBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSBcclxuXHJcbiAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgYW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgfSk7XHJcblxyXG5cclxuXHJcblxyXG4gIC8vc2Nyb2xsIGRvd24gdG8gcHJvamVjdCBpbmZvXHJcbiAgcHJvamVjdHNDb250YWluZXIub24oJ2NsaWNrJywgJy5zY3JvbGwnLCBmdW5jdGlvbigpe1xyXG4gICAgcHJvamVjdHNDb250YWluZXIuYW5pbWF0ZSh7J3Njcm9sbFRvcCc6JCh3aW5kb3cpLmhlaWdodCgpfSwgNTAwKTsgXHJcbiAgfSk7XHJcblxyXG4gIC8vY2hlY2sgaWYgYmFja2dyb3VuZC1pbWFnZXMgaGF2ZSBiZWVuIGxvYWRlZCBhbmQgc2hvdyBwcm9qZWN0IHByZXZpZXdzXHJcbiAgcHJvamVjdFByZXZpZXdzLmNoaWxkcmVuKCdhJykuYmdMb2FkZWQoe1xyXG4gICAgICBhZnRlckxvYWRlZCA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXdzLmVxKDApKTtcclxuICAgICAgfVxyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBzaG93UHJldmlldyhwcm9qZWN0UHJldmlldykge1xyXG4gICAgaWYocHJvamVjdFByZXZpZXcubGVuZ3RoID4gMCApIHtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIHByb2plY3RQcmV2aWV3LmFkZENsYXNzKCdiZy1sb2FkZWQnKTtcclxuICAgICAgICBzaG93UHJldmlldyhwcm9qZWN0UHJldmlldy5uZXh0KCkpO1xyXG4gICAgICB9LCAxNTApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb3BlblByb2plY3QocHJvamVjdFByZXZpZXcpIHtcclxuICAgIHZhciBwcm9qZWN0SW5kZXggPSBwcm9qZWN0UHJldmlldy5pbmRleCgpO1xyXG4gICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpJykuZXEocHJvamVjdEluZGV4KS5hZGQocHJvamVjdFByZXZpZXcpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgXHJcbiAgICBpZiggdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgKSB7XHJcbiAgICAgIHByb2plY3RQcmV2aWV3cy5hZGRDbGFzcygnc2xpZGUtb3V0JykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgIHByb2plY3RzLmNoaWxkcmVuKCdsaScpLmVxKHByb2plY3RJbmRleCkuYWRkQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpO1xyXG4gICAgICBhbmltYXRpbmcgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7IFxyXG4gICAgICBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RQcmV2aWV3cywgcHJvamVjdEluZGV4LCAwLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNsb3NlUHJvamVjdCgpIHtcclxuICAgIHByb2plY3RzLmZpbmQoJy5zZWxlY3RlZCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpLm9uKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKXtcclxuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnY29udGVudC12aXNpYmxlJykub2ZmKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyk7XHJcbiAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSwgLTEsIDAsIGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vaWYgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgQ1NTIHRyYW5zaXRpb25zLi4uXHJcbiAgICBpZiggdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgKSB7XHJcbiAgICAgIHByb2plY3RQcmV2aWV3cy5yZW1vdmVDbGFzcygnc2xpZGUtb3V0Jyk7XHJcbiAgICAgIHByb2plY3RzLmZpbmQoJy5jb250ZW50LXZpc2libGUnKS5yZW1vdmVDbGFzcygnY29udGVudC12aXNpYmxlJyk7XHJcbiAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLCBwcm9qZWN0SW5kZXgsIGluZGV4LCBib29sKSB7XHJcbiAgICBpZihpbmRleCA9PSAwICkgY3JlYXRlQXJyYXlSYW5kb20oKTtcclxuICAgIGlmKCBwcm9qZWN0SW5kZXggIT0gLTEgJiYgaW5kZXggPT0gMCApIGluZGV4ID0gMTtcclxuXHJcbiAgICB2YXIgcmFuZG9tUHJvamVjdEluZGV4ID0gbWFrZVVuaXF1ZVJhbmRvbSgpO1xyXG4gICAgaWYoIHJhbmRvbVByb2plY3RJbmRleCA9PSBwcm9qZWN0SW5kZXggKSByYW5kb21Qcm9qZWN0SW5kZXggPSBtYWtlVW5pcXVlUmFuZG9tKCk7XHJcbiAgICBcclxuICAgIGlmKCBpbmRleCA8IG51bVJhbmRvbXMgLSAxICkge1xyXG4gICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkudG9nZ2xlQ2xhc3MoJ3NsaWRlLW91dCcsIGJvb2wpO1xyXG4gICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vYW5pbWF0ZSBuZXh0IHByZXZpZXcgcHJvamVjdFxyXG4gICAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlciwgcHJvamVjdEluZGV4LCBpbmRleCArIDEsIGJvb2wpO1xyXG4gICAgICB9LCAxNTApO1xyXG4gICAgfSBlbHNlIGlmICggaW5kZXggPT0gbnVtUmFuZG9tcyAtIDEgKSB7XHJcbiAgICAgIC8vdGhpcyBpcyB0aGUgbGFzdCBwcm9qZWN0IHByZXZpZXcgdG8gYmUgYW5pbWF0ZWQgXHJcbiAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocmFuZG9tUHJvamVjdEluZGV4KS50b2dnbGVDbGFzcygnc2xpZGUtb3V0JywgYm9vbCkub25lKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBpZiggcHJvamVjdEluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICBwcm9qZWN0cy5jaGlsZHJlbignbGkuc2VsZWN0ZWQnKS5hZGRDbGFzcygnY29udGVudC12aXNpYmxlJyk7XHJcbiAgICAgICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHByb2plY3RJbmRleCkuYWRkQ2xhc3MoJ3NsaWRlLW91dCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiggbmF2aWdhdGlvbi5oYXNDbGFzcygnbmF2LXZpc2libGUnKSAmJiBib29sICkge1xyXG4gICAgICAgICAgbmF2aWdhdGlvbi5hZGRDbGFzcygnbmF2LWNsaWNrYWJsZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkub2ZmKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyk7XHJcbiAgICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5MzUxNzU5L2phdmFzY3JpcHQtcmFuZG9tLW51bWJlci1vdXQtb2YtNS1uby1yZXBlYXQtdW50aWwtYWxsLWhhdmUtYmVlbi11c2VkXHJcbiAgZnVuY3Rpb24gbWFrZVVuaXF1ZVJhbmRvbSgpIHtcclxuICAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdW5pcXVlUmFuZG9tcy5sZW5ndGgpO1xyXG4gICAgICB2YXIgdmFsID0gdW5pcXVlUmFuZG9tc1tpbmRleF07XHJcbiAgICAgIC8vIG5vdyByZW1vdmUgdGhhdCB2YWx1ZSBmcm9tIHRoZSBhcnJheVxyXG4gICAgICB1bmlxdWVSYW5kb21zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVBcnJheVJhbmRvbSgpIHtcclxuICAgIC8vcmVzZXQgYXJyYXlcclxuICAgIHVuaXF1ZVJhbmRvbXMubGVuZ3RoID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtUmFuZG9tczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHVuaXF1ZVJhbmRvbXMucHVzaChpKTtcclxuICAgICAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbiAvKlxyXG4gKiBCRyBMb2FkZWRcclxuICogQ29weXJpZ2h0IChjKSAyMDE0IEpvbmF0aGFuIENhdG11bGxcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG4gKi9cclxuIChmdW5jdGlvbigkKXtcclxuICAkLmZuLmJnTG9hZGVkID0gZnVuY3Rpb24oY3VzdG9tKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgLy8gRGVmYXVsdCBwbHVnaW4gc2V0dGluZ3NcclxuICAgIHZhciBkZWZhdWx0cyA9IHtcclxuICAgICAgYWZ0ZXJMb2FkZWQgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2JnLWxvYWRlZCcpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE1lcmdlIGRlZmF1bHQgYW5kIHVzZXIgc2V0dGluZ3NcclxuICAgIHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgY3VzdG9tKTtcclxuXHJcbiAgICAvLyBMb29wIHRocm91Z2ggZWxlbWVudFxyXG4gICAgc2VsZi5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgYmdJbWdzID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykuc3BsaXQoJywgJyk7XHJcbiAgICAgICR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcsMCk7XHJcbiAgICAgICQuZWFjaCggYmdJbWdzLCBmdW5jdGlvbihrZXksIHZhbHVlKXtcclxuICAgICAgICB2YXIgaW1nID0gdmFsdWUucmVwbGFjZSgvXnVybFxcKFtcIiddPy8sICcnKS5yZXBsYWNlKC9bXCInXT9cXCkkLywgJycpO1xyXG4gICAgICAgICQoJzxpbWcvPicpLmF0dHIoJ3NyYycsIGltZykubG9hZChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7IC8vIHByZXZlbnQgbWVtb3J5IGxlYWtzXHJcbiAgICAgICAgICAkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnLCR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcpKzEpO1xyXG4gICAgICAgICAgaWYgKCR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcpID49IGJnSW1ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc2V0dGluZ3MuYWZ0ZXJMb2FkZWQuY2FsbCgkdGhpcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4gIH07XHJcbn0pKGpRdWVyeSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICQoJy5kd2F5bmUtbWVldC10aGUtdGVhbScpLmhvdmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmR3YXluZS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpO1xyXG4gICAgJCgnLmR3YXluZS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJy4xJyk7XHJcbiAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcxJyk7XHJcbiAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJzEwcHgnKTtcclxuXHJcbiAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBvbiBtb3VzZW91dCwgcmVzZXQgdGhlIGJhY2tncm91bmQgY29sb3VyXHJcbiAgICAkKCcuZHdheW5lLW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICcnKTtcclxuICAgICQoJy5kd2F5bmUtcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcnKTtcclxuICAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcnKTtcclxuICAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJycpO1xyXG4gICAgICQoJy5wcm9maWxlJykuc2hvdygpO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcblxyXG4gICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgJCgnLnJ1ZHktbWVldC10aGUtdGVhbScpLmhvdmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLnJ1ZHktbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJ3BvaW50ZXInKTtcclxuICAgICQoJy5ydWR5LXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnLjEnKTtcclxuICAgICQoJy5ydWR5LXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcxJyk7XHJcbiAgICAkKCcucnVkeS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcxMHB4Jyk7XHJcblxyXG4gIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gb24gbW91c2VvdXQsIHJlc2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG91clxyXG4gICAgJCgnLnJ1ZHktbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJycpO1xyXG4gICAgJCgnLnJ1ZHktcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcnKTtcclxuICAgICAkKCcucnVkeS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnJyk7XHJcbiAgICAgJCgnLnJ1ZHktcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnJyk7XHJcbiAgICAgJCgnLnByb2ZpbGUnKS5zaG93KCk7XHJcbiAgfSk7XHJcbn0pOyAgICAgXHJcblxyXG5cclxuICAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICQoJy5saWFtLW1lZXQtdGhlLXRlYW0nKS5ob3ZlcihmdW5jdGlvbigpIHtcclxuICAgICQoJy5saWFtLW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICdwb2ludGVyJyk7XHJcbiAgICAkKCcubGlhbS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJy4xJyk7XHJcbiAgICAkKCcubGlhbS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xyXG4gICAgJCgnLmxpYW0tcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnMTBweCcpO1xyXG5cclxuICB9LCBmdW5jdGlvbigpIHtcclxuICAgIC8vIG9uIG1vdXNlb3V0LCByZXNldCB0aGUgYmFja2dyb3VuZCBjb2xvdXJcclxuICAgICQoJy5saWFtLW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICcnKTtcclxuICAgICQoJy5saWFtLXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnJyk7XHJcbiAgICAgJCgnLmxpYW0tcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJycpO1xyXG4gICAgICQoJy5saWFtLXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJycpO1xyXG4gICAgICQoJy5wcm9maWxlJykuc2hvdygpO1xyXG4gIH0pO1xyXG59KTsgICAgIFxyXG5cclxuXHJcbiQoXCIudGVhbS1idXR0b24gYVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG5cclxuICAkKCcucHJvZmlsZScpLmhpZGUoKTtcclxuICAgXHJcbn0pO1xyXG5cclxuXHJcbiQoJy5mYWRpbmctc2xpZGVyLTEsIC5mYWRpbmctc2xpZGVyLTIsIC5mYWRpbmctc2xpZGVyLTMnKS51bnNsaWRlcih7XHJcbmFuaW1hdGlvbjogJ2ZhZGUnLCBhdXRvcGxheTogdHJ1ZSwgc3BlZWQ6IDgwMDAsIGRlbGF5OiA5MDAwLCBhcnJvd3M6IGZhbHNlLCBuYXY6IGZhbHNlXHJcbn0pO1xyXG5cclxuXHJcbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICBqUXVlcnkoJy5zZXJ2aWNlcy1oZWFkZXInKS5hZGRDbGFzcyhcImhpZGRlblwiKS52aWV3cG9ydENoZWNrZXIoe1xyXG4gICAgICAgIGNsYXNzVG9BZGQ6ICd2aXNpYmxlIGFuaW1hdGVkIGZhZGVJblVwJyxcclxuICAgICAgICBvZmZzZXQ6IDI1MFxyXG4gICAgICAgfSk7XHJcbn0pO1xyXG5cclxuIl19
