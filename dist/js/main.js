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

//Submit Form

$("#form").on("submit", function (event) {
  if (event.isDefaultPrevented()) {
    // handle the invalid form...
    formError();
    submitMSG(false, "Did you fill in the form properly?");
  } else {
    // everything looks good!
    event.preventDefault();
    submitForm();
  }
});

function submitForm() {
  // Initiate Variables With Form Content
  var name = $("#name").val();
  var email = $("#email").val();
  var message = $("#message").val();

  $.ajax({
    type: "POST",
    url: "action_page.php",
    data: "name=" + name + "&email=" + email + "&message=" + message,
    success: function success(text) {
      if (text == "success") {
        formSuccess();
      } else {
        formError();
        submitMSG(false, text);
      }
    }
  });
}

// split your email into two parts and remove the @ symbol
var first = "dwayneandrecodling";
var last = "gmail.com";

function formSuccess() {
  $("#form")[0].reset();
  $("#form").removeClass().addClass('cd-popup-trigger').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    $(this).removeClass();
  });
}

function formError() {
  $("#form").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    $(this).removeClass();
  });
}

function submitMSG(valid, msg) {
  if (valid) {
    var msgClasses = "h3 text-center tada animated text-success";
  } else {
    var msgClasses = "h3 text-center text-danger";
  }
  $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}

jQuery(document).ready(function ($) {
  //open popup
  $('.cd-popup-trigger').on('click', function (event) {
    event.preventDefault();
    $('.cd-popup').addClass('is-visible');
  });

  //close popup
  $('.cd-popup').on('click', function (event) {
    if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup')) {
      event.preventDefault();
      $(this).removeClass('is-visible');
    }
  });
  //close popup when clicking the esc keyboard button
  $(document).keyup(function (event) {
    if (event.which == '27') {
      $('.cd-popup').removeClass('is-visible');
    }
  });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxFQUFsQyxDQUFxQyxPQUFyQyxFQUE4QyxVQUFTLEtBQVQsRUFBZTtBQUMzRCxRQUFJLFNBQVMsUUFBVCxDQUFrQixPQUFsQixDQUEwQixLQUExQixFQUFnQyxFQUFoQyxLQUF1QyxLQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLEtBQXRCLEVBQTRCLEVBQTVCLENBQXZDLElBQTBFLFNBQVMsUUFBVCxJQUFxQixLQUFLLFFBQUwsRUFBZTtBQUNoSCxVQUFJLFNBQVMsRUFBRSxLQUFLLElBQUwsQ0FBWCxDQUQ0RztBQUVoSCxlQUFTLE9BQU8sTUFBUCxHQUFnQixNQUFoQixHQUF5QixFQUFFLFdBQVcsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixDQUFoQixDQUFYLEdBQStCLEdBQS9CLENBQTNCLENBRnVHO0FBR2hILFVBQUksT0FBTyxNQUFQLEVBQWU7QUFDakIsVUFBRSxZQUFGLEVBQWdCLE9BQWhCLENBQXdCO0FBQ3RCLHFCQUFXLE9BQU8sTUFBUCxHQUFnQixHQUFoQjtTQURiLEVBRUcsSUFGSCxFQURpQjtBQUlqQixlQUFPLEtBQVAsQ0FKaUI7T0FBbkI7S0FIRjtHQUQ0QyxDQUE5QyxDQURXO0NBQVgsQ0FBRjs7OztBQXlCQSxFQUFFLGFBQUYsRUFBaUIsRUFBakIsQ0FBb0IsT0FBcEIsRUFBNkIsVUFBUyxLQUFULEVBQWU7QUFDeEMsSUFBRSxVQUFGLEVBQWMsVUFBZCxDQUF5QixHQUF6QixFQUR3QztBQUV4QyxJQUFFLFdBQUYsRUFBZSxXQUFmLENBQTJCLFdBQTNCLEVBQXdDLFdBQXhDLENBQW9ELFVBQXBELEVBRndDO0FBR3hDLElBQUUsTUFBRixFQUFVLEdBQVYsQ0FB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QWU7QUFDeEMsUUFBSSxFQUFFLE1BQU0sTUFBTixDQUFGLENBQWdCLEVBQWhCLENBQW1CLGlCQUFuQixLQUF5QyxFQUFFLE1BQU0sTUFBTixDQUFGLENBQWdCLEVBQWhCLENBQW1CLFdBQW5CLENBQXpDLEVBQTJFO0FBQzdFLFlBQU0sY0FBTixHQUQ2RTtBQUU3RSxRQUFFLElBQUYsRUFBUSxXQUFSLENBQW9CLFlBQXBCLEVBRjZFO0tBQS9FO0dBRHlCLENBQTNCOztBQVJnQyxHQWVoQyxDQUFFLFFBQUYsRUFBWSxLQUFaLENBQWtCLFVBQVMsS0FBVCxFQUFlO0FBQzdCLFFBQUcsTUFBTSxLQUFOLElBQWEsSUFBYixFQUFrQjtBQUNuQixRQUFFLFdBQUYsRUFBZSxXQUFmLENBQTJCLFlBQTNCLEVBRG1CO0tBQXJCO0dBRGMsQ0FBbEIsQ0FmZ0M7Q0FBWCxDQUF2QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBqc2hpbnQgZGV2ZWw6dHJ1ZSAqL1xyXG5jb25zb2xlLmxvZygnTG9vayBhdCBhcHAvanMvbWFpbi5qcycpO1xyXG5cclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgJCgnYVtocmVmKj1cIiNcIl06bm90KFtocmVmPVwiI1wiXSknKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpICYmIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWUpIHtcclxuICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcclxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XHJcbiAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vIHJlc3BvbnNpdmUgbmF2aWdhdGlvblxyXG5cclxuXHJcbiQoXCIud3JhcC1uYXYgYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAkKFwiLm92ZXJsYXlcIikuZmFkZVRvZ2dsZSgyMDApO1xyXG4gICAgJChcIi5idXR0b24gYVwiKS50b2dnbGVDbGFzcygnYnRuLWNsb3NlJykudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJyk7XHJcbiAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy15JywgJ3Zpc2libGUnKTtcclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgJChcIi5idXR0b24gYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcclxuICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJykudG9nZ2xlQ2xhc3MoJ2J0bi1jbG9zZScpO1xyXG5cclxuICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLWNsb3NlXCIpKSB7XHJcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImJ0bi1vcGVuXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy15JywgJ3Zpc2libGUnKTtcclxuICAgIH1cclxufSk7XHJcblxyXG59KTtcclxuJCgnLm92ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAkKFwiLm92ZXJsYXlcIikuZmFkZVRvZ2dsZSgyMDApO1xyXG4gICAgJChcIi5idXR0b24gYVwiKS50b2dnbGVDbGFzcygnYnRuLW9wZW4nKS50b2dnbGVDbGFzcygnYnRuLWNsb3NlJyk7XHJcbiAgICAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy14JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteScsICd2aXNpYmxlJyk7XHJcbiAgICBvcGVuID0gZmFsc2U7XHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpe1xyXG4gIC8vb3BlbiB0aGUgbGF0ZXJhbCBwYW5lbFxyXG4gICQoJy5jZC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgJCgnLmNkLXBhbmVsJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe1xyXG4gICAgICAgIFwiZGlzcGxheVwiOiBcImlubGluZS1ibG9ja1wiLFxyXG4gICAgICAgIFwidHJhbnNpdGlvblwiOiBcImFsbCBlYXNlLWluIDVzXCIsXHJcbiAgICAgICAgXCJ0cmFuc2l0aW9uLWRlbGF5XCIgOiBcIi41c1wiXHJcbiAgICAgIH0pO1xyXG5cclxuICB9KTtcclxuICAvL2Nsb3NlIHRoZSBsYXRlcmFsIHBhbmVsXHJcbiAgJCgnLmNkLXBhbmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgaWYoICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXBhbmVsJykgfHwgJChldmVudC50YXJnZXQpLmlzKCcuY2QtcGFuZWwtY2xvc2UnKSApIHtcclxuICAgICAgJCgnLmNkLXBhbmVsJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy14JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe2Rpc3BsYXk6IFwibm9uZVwifSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKXtcclxuICAvL2NhY2hlIERPTSBlbGVtZW50c1xyXG4gIHZhciBwcm9qZWN0c0NvbnRhaW5lciA9ICQoJy5jZC1wcm9qZWN0cy1jb250YWluZXInKSxcclxuICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIgPSBwcm9qZWN0c0NvbnRhaW5lci5maW5kKCcuY2QtcHJvamVjdHMtcHJldmlld3MnKSxcclxuICAgIHByb2plY3RQcmV2aWV3cyA9IHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksXHJcbiAgICBwcm9qZWN0cyA9IHByb2plY3RzQ29udGFpbmVyLmZpbmQoJy5jZC1wcm9qZWN0cycpLFxyXG4gICAgbmF2aWdhdGlvblRyaWdnZXIgPSAkKCcuY2QtbmF2LXRyaWdnZXInKSxcclxuICAgIG5hdmlnYXRpb24gPSAkKCcuY2QtcHJpbWFyeS1uYXYnKSxcclxuICAgIC8vaWYgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgQ1NTIHRyYW5zaXRpb25zLi4uXHJcbiAgICB0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCA9ICggJCgnLm5vLWNzc3RyYW5zaXRpb25zJykubGVuZ3RoID4gMCk7XHJcblxyXG4gIHZhciBhbmltYXRpbmcgPSBmYWxzZSxcclxuICAgIC8vd2lsbCBiZSB1c2VkIHRvIGV4dHJhY3QgcmFuZG9tIG51bWJlcnMgZm9yIHByb2plY3RzIHNsaWRlIHVwL3NsaWRlIGRvd24gZWZmZWN0XHJcbiAgICBudW1SYW5kb21zID0gcHJvamVjdHMuZmluZCgnbGknKS5sZW5ndGgsXHJcbiAgICB1bmlxdWVSYW5kb21zID0gW107XHJcblxyXG4gIC8vb3BlbiBwcm9qZWN0XHJcbiAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5vbignY2xpY2snLCAnYScsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZiggYW5pbWF0aW5nID09IGZhbHNlICkge1xyXG4gICAgICBhbmltYXRpbmcgPSB0cnVlO1xyXG4gICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5hZGQocHJvamVjdHNDb250YWluZXIpLmFkZENsYXNzKCdwcm9qZWN0LW9wZW4nKTtcclxuICAgICAgb3BlblByb2plY3QoJCh0aGlzKS5wYXJlbnQoJ2xpJykpO1xyXG4gICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe2Rpc3BsYXk6IFwibm9uZVwifSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIG5hdmlnYXRpb25UcmlnZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYoIGFuaW1hdGluZyA9PSBmYWxzZSApIHtcclxuICAgICAgYW5pbWF0aW5nID0gdHJ1ZTtcclxuICAgICAgaWYoIG5hdmlnYXRpb25UcmlnZ2VyLmhhc0NsYXNzKCdwcm9qZWN0LW9wZW4nKSApIHtcclxuXHJcbiAgICAgICAgLy9jbG9zZSB2aXNpYmxlIHByb2plY3RcclxuICAgICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5hZGQocHJvamVjdHNDb250YWluZXIpLnJlbW92ZUNsYXNzKCdwcm9qZWN0LW9wZW4nKTtcclxuICAgICAgICBjbG9zZVByb2plY3QoKTtcclxuICAgICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe2Rpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCJ9KTtcclxuICAgICAgfSBlbHNlIGlmKCBuYXZpZ2F0aW9uVHJpZ2dlci5oYXNDbGFzcygnbmF2LXZpc2libGUnKSApIHtcclxuICAgICAgICAvL2Nsb3NlIG1haW4gbmF2aWdhdGlvblxyXG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLnJlbW92ZUNsYXNzKCduYXYtdmlzaWJsZScpO1xyXG4gICAgICAgIG5hdmlnYXRpb24ucmVtb3ZlQ2xhc3MoJ25hdi1jbGlja2FibGUgbmF2LXZpc2libGUnKTtcclxuICAgICAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgcHJvamVjdFByZXZpZXdzLnJlbW92ZUNsYXNzKCdzbGlkZS1vdXQnKTtcclxuICAgICAgICBlbHNlIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSwgLTEsIDAsIGZhbHNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL29wZW4gbWFpbiBuYXZpZ2F0aW9uXHJcbiAgICAgICAgbmF2aWdhdGlvblRyaWdnZXIuYWRkQ2xhc3MoJ25hdi12aXNpYmxlJyk7XHJcbiAgICAgICAgbmF2aWdhdGlvbi5hZGRDbGFzcygnbmF2LXZpc2libGUnKTtcclxuICAgICAgICBpZih0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCkgcHJvamVjdFByZXZpZXdzLmFkZENsYXNzKCdzbGlkZS1vdXQnKTtcclxuICAgICAgICBlbHNlIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSwgLTEsIDAsIHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIGFuaW1hdGluZyA9IGZhbHNlO1xyXG4gIH0pO1xyXG5cclxuXHJcblxyXG5cclxuICAvL3Njcm9sbCBkb3duIHRvIHByb2plY3QgaW5mb1xyXG4gIHByb2plY3RzQ29udGFpbmVyLm9uKCdjbGljaycsICcuc2Nyb2xsJywgZnVuY3Rpb24oKXtcclxuICAgIHByb2plY3RzQ29udGFpbmVyLmFuaW1hdGUoeydzY3JvbGxUb3AnOiQod2luZG93KS5oZWlnaHQoKX0sIDUwMCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vY2hlY2sgaWYgYmFja2dyb3VuZC1pbWFnZXMgaGF2ZSBiZWVuIGxvYWRlZCBhbmQgc2hvdyBwcm9qZWN0IHByZXZpZXdzXHJcbiAgcHJvamVjdFByZXZpZXdzLmNoaWxkcmVuKCdhJykuYmdMb2FkZWQoe1xyXG4gICAgICBhZnRlckxvYWRlZCA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXdzLmVxKDApKTtcclxuICAgICAgfVxyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBzaG93UHJldmlldyhwcm9qZWN0UHJldmlldykge1xyXG4gICAgaWYocHJvamVjdFByZXZpZXcubGVuZ3RoID4gMCApIHtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIHByb2plY3RQcmV2aWV3LmFkZENsYXNzKCdiZy1sb2FkZWQnKTtcclxuICAgICAgICBzaG93UHJldmlldyhwcm9qZWN0UHJldmlldy5uZXh0KCkpO1xyXG4gICAgICB9LCAxNTApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb3BlblByb2plY3QocHJvamVjdFByZXZpZXcpIHtcclxuICAgIHZhciBwcm9qZWN0SW5kZXggPSBwcm9qZWN0UHJldmlldy5pbmRleCgpO1xyXG4gICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpJykuZXEocHJvamVjdEluZGV4KS5hZGQocHJvamVjdFByZXZpZXcpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG5cclxuICAgIGlmKCB0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCApIHtcclxuICAgICAgcHJvamVjdFByZXZpZXdzLmFkZENsYXNzKCdzbGlkZS1vdXQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpJykuZXEocHJvamVjdEluZGV4KS5hZGRDbGFzcygnY29udGVudC12aXNpYmxlJyk7XHJcbiAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0UHJldmlld3MsIHByb2plY3RJbmRleCwgMCwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjbG9zZVByb2plY3QoKSB7XHJcbiAgICBwcm9qZWN0cy5maW5kKCcuc2VsZWN0ZWQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKS5vbignd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpLm9mZignd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcpO1xyXG4gICAgICBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCBmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2lmIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IENTUyB0cmFuc2l0aW9ucy4uLlxyXG4gICAgaWYoIHRyYW5zaXRpb25zTm90U3VwcG9ydGVkICkge1xyXG4gICAgICBwcm9qZWN0UHJldmlld3MucmVtb3ZlQ2xhc3MoJ3NsaWRlLW91dCcpO1xyXG4gICAgICBwcm9qZWN0cy5maW5kKCcuY29udGVudC12aXNpYmxlJykucmVtb3ZlQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpO1xyXG4gICAgICBhbmltYXRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlciwgcHJvamVjdEluZGV4LCBpbmRleCwgYm9vbCkge1xyXG4gICAgaWYoaW5kZXggPT0gMCApIGNyZWF0ZUFycmF5UmFuZG9tKCk7XHJcbiAgICBpZiggcHJvamVjdEluZGV4ICE9IC0xICYmIGluZGV4ID09IDAgKSBpbmRleCA9IDE7XHJcblxyXG4gICAgdmFyIHJhbmRvbVByb2plY3RJbmRleCA9IG1ha2VVbmlxdWVSYW5kb20oKTtcclxuICAgIGlmKCByYW5kb21Qcm9qZWN0SW5kZXggPT0gcHJvamVjdEluZGV4ICkgcmFuZG9tUHJvamVjdEluZGV4ID0gbWFrZVVuaXF1ZVJhbmRvbSgpO1xyXG5cclxuICAgIGlmKCBpbmRleCA8IG51bVJhbmRvbXMgLSAxICkge1xyXG4gICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkudG9nZ2xlQ2xhc3MoJ3NsaWRlLW91dCcsIGJvb2wpO1xyXG4gICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vYW5pbWF0ZSBuZXh0IHByZXZpZXcgcHJvamVjdFxyXG4gICAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlciwgcHJvamVjdEluZGV4LCBpbmRleCArIDEsIGJvb2wpO1xyXG4gICAgICB9LCAxNTApO1xyXG4gICAgfSBlbHNlIGlmICggaW5kZXggPT0gbnVtUmFuZG9tcyAtIDEgKSB7XHJcbiAgICAgIC8vdGhpcyBpcyB0aGUgbGFzdCBwcm9qZWN0IHByZXZpZXcgdG8gYmUgYW5pbWF0ZWRcclxuICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShyYW5kb21Qcm9qZWN0SW5kZXgpLnRvZ2dsZUNsYXNzKCdzbGlkZS1vdXQnLCBib29sKS5vbmUoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCBwcm9qZWN0SW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgIHByb2plY3RzLmNoaWxkcmVuKCdsaS5zZWxlY3RlZCcpLmFkZENsYXNzKCdjb250ZW50LXZpc2libGUnKTtcclxuICAgICAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocHJvamVjdEluZGV4KS5hZGRDbGFzcygnc2xpZGUtb3V0JykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmKCBuYXZpZ2F0aW9uLmhhc0NsYXNzKCduYXYtdmlzaWJsZScpICYmIGJvb2wgKSB7XHJcbiAgICAgICAgICBuYXZpZ2F0aW9uLmFkZENsYXNzKCduYXYtY2xpY2thYmxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocmFuZG9tUHJvamVjdEluZGV4KS5vZmYoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnKTtcclxuICAgICAgICBhbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTkzNTE3NTkvamF2YXNjcmlwdC1yYW5kb20tbnVtYmVyLW91dC1vZi01LW5vLXJlcGVhdC11bnRpbC1hbGwtaGF2ZS1iZWVuLXVzZWRcclxuICBmdW5jdGlvbiBtYWtlVW5pcXVlUmFuZG9tKCkge1xyXG4gICAgICB2YXIgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB1bmlxdWVSYW5kb21zLmxlbmd0aCk7XHJcbiAgICAgIHZhciB2YWwgPSB1bmlxdWVSYW5kb21zW2luZGV4XTtcclxuICAgICAgLy8gbm93IHJlbW92ZSB0aGF0IHZhbHVlIGZyb20gdGhlIGFycmF5XHJcbiAgICAgIHVuaXF1ZVJhbmRvbXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgcmV0dXJuIHZhbDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5UmFuZG9tKCkge1xyXG4gICAgLy9yZXNldCBhcnJheVxyXG4gICAgdW5pcXVlUmFuZG9tcy5sZW5ndGggPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1SYW5kb21zOyBpKyspIHtcclxuICAgICAgICAgICAgdW5pcXVlUmFuZG9tcy5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxuIC8qXHJcbiAqIEJHIExvYWRlZFxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgSm9uYXRoYW4gQ2F0bXVsbFxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiAqL1xyXG4gKGZ1bmN0aW9uKCQpe1xyXG4gICQuZm4uYmdMb2FkZWQgPSBmdW5jdGlvbihjdXN0b20pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAvLyBEZWZhdWx0IHBsdWdpbiBzZXR0aW5nc1xyXG4gICAgdmFyIGRlZmF1bHRzID0ge1xyXG4gICAgICBhZnRlckxvYWRlZCA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnYmctbG9hZGVkJyk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gTWVyZ2UgZGVmYXVsdCBhbmQgdXNlciBzZXR0aW5nc1xyXG4gICAgdmFyIHNldHRpbmdzID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBjdXN0b20pO1xyXG5cclxuICAgIC8vIExvb3AgdGhyb3VnaCBlbGVtZW50XHJcbiAgICBzZWxmLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICBiZ0ltZ3MgPSAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKS5zcGxpdCgnLCAnKTtcclxuICAgICAgJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JywwKTtcclxuICAgICAgJC5lYWNoKCBiZ0ltZ3MsIGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xyXG4gICAgICAgIHZhciBpbWcgPSB2YWx1ZS5yZXBsYWNlKC9edXJsXFwoW1wiJ10/LywgJycpLnJlcGxhY2UoL1tcIiddP1xcKSQvLCAnJyk7XHJcbiAgICAgICAgJCgnPGltZy8+JykuYXR0cignc3JjJywgaW1nKS5sb2FkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTsgLy8gcHJldmVudCBtZW1vcnkgbGVha3NcclxuICAgICAgICAgICR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcsJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JykrMSk7XHJcbiAgICAgICAgICBpZiAoJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JykgPj0gYmdJbWdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5hZnRlckxvYWRlZC5jYWxsKCR0aGlzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiAgfTtcclxufSkoalF1ZXJ5KTtcclxuXHJcblxyXG5mdW5jdGlvbiBteVN0b3BGdW5jdGlvbigpIHtcclxuICAgIGNsZWFyVGltZW91dChzbGlkZVRvZ2dsZVByb2plY3RzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbXlTdG9wRnVuY3Rpb24oKSB7XHJcbiAgICBjbGVhclRpbWVvdXQocHJvamVjdFByZXZpZXcpO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG4gICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgJCgnLmR3YXluZS1tZWV0LXRoZS10ZWFtJykuaG92ZXIoZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuZHdheW5lLW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICdwb2ludGVyJyk7XHJcbiAgICAkKCcuZHdheW5lLXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnLjEnKTtcclxuICAgICQoJy5kd2F5bmUtcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJzEnKTtcclxuICAgICQoJy5kd2F5bmUtcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnMTBweCcpO1xyXG5cclxuICB9LCBmdW5jdGlvbigpIHtcclxuICAgIC8vIG9uIG1vdXNlb3V0LCByZXNldCB0aGUgYmFja2dyb3VuZCBjb2xvdXJcclxuICAgICQoJy5kd2F5bmUtbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJycpO1xyXG4gICAgJCgnLmR3YXluZS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJycpO1xyXG4gICAgICQoJy5kd2F5bmUtcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJycpO1xyXG4gICAgICQoJy5kd2F5bmUtcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnJyk7XHJcbiAgICAgJCgnLnByb2ZpbGUnKS5zaG93KCk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuXHJcbiAgICAgJChmdW5jdGlvbigpIHtcclxuICAkKCcucnVkeS1tZWV0LXRoZS10ZWFtJykuaG92ZXIoZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcucnVkeS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpO1xyXG4gICAgJCgnLnJ1ZHktcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcuMScpO1xyXG4gICAgJCgnLnJ1ZHktcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJzEnKTtcclxuICAgICQoJy5ydWR5LXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJzEwcHgnKTtcclxuXHJcbiAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBvbiBtb3VzZW91dCwgcmVzZXQgdGhlIGJhY2tncm91bmQgY29sb3VyXHJcbiAgICAkKCcucnVkeS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAnJyk7XHJcbiAgICAkKCcucnVkeS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJycpO1xyXG4gICAgICQoJy5ydWR5LXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcnKTtcclxuICAgICAkKCcucnVkeS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcnKTtcclxuICAgICAkKCcucHJvZmlsZScpLnNob3coKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5cclxuICAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICQoJy5saWFtLW1lZXQtdGhlLXRlYW0nKS5ob3ZlcihmdW5jdGlvbigpIHtcclxuICAgICQoJy5saWFtLW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICdwb2ludGVyJyk7XHJcbiAgICAkKCcubGlhbS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJy4xJyk7XHJcbiAgICAkKCcubGlhbS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xyXG4gICAgJCgnLmxpYW0tcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnMTBweCcpO1xyXG5cclxuICB9LCBmdW5jdGlvbigpIHtcclxuICAgIC8vIG9uIG1vdXNlb3V0LCByZXNldCB0aGUgYmFja2dyb3VuZCBjb2xvdXJcclxuICAgICQoJy5saWFtLW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICcnKTtcclxuICAgICQoJy5saWFtLXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnJyk7XHJcbiAgICAgJCgnLmxpYW0tcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJycpO1xyXG4gICAgICQoJy5saWFtLXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJycpO1xyXG4gICAgICQoJy5wcm9maWxlJykuc2hvdygpO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcblxyXG4kKFwiLnRlYW0tYnV0dG9uIGFcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuXHJcbiAgJCgnLnByb2ZpbGUnKS5oaWRlKCk7XHJcblxyXG59KTtcclxuXHJcblxyXG4kKCcuZmFkaW5nLXNsaWRlci0xLCAuZmFkaW5nLXNsaWRlci0yLCAuZmFkaW5nLXNsaWRlci0zJykudW5zbGlkZXIoe1xyXG5hbmltYXRpb246ICdmYWRlJywgYXV0b3BsYXk6IHRydWUsIHNwZWVkOiA4MDAwLCBkZWxheTogOTAwMCwgYXJyb3dzOiBmYWxzZSwgbmF2OiBmYWxzZVxyXG59KTtcclxuXHJcblxyXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgalF1ZXJ5KCcuc2VydmljZXMtaGVhZGVyJykuYWRkQ2xhc3MoXCJoaWRkZW5cIikudmlld3BvcnRDaGVja2VyKHtcclxuICAgICAgICBjbGFzc1RvQWRkOiAndmlzaWJsZSBhbmltYXRlZCBmYWRlSW5VcCcsXHJcbiAgICAgICAgb2Zmc2V0OiAyNTBcclxuICAgICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG4vL1N1Ym1pdCBGb3JtXHJcblxyXG5cclxuJChcIiNmb3JtXCIpLm9uKFwic3VibWl0XCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcbiAgICAgICAgLy8gaGFuZGxlIHRoZSBpbnZhbGlkIGZvcm0uLi5cclxuICAgICAgICBmb3JtRXJyb3IoKTtcclxuICAgICAgICBzdWJtaXRNU0coZmFsc2UsIFwiRGlkIHlvdSBmaWxsIGluIHRoZSBmb3JtIHByb3Blcmx5P1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gZXZlcnl0aGluZyBsb29rcyBnb29kIVxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgc3VibWl0Rm9ybSgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG5mdW5jdGlvbiBzdWJtaXRGb3JtKCl7XHJcbiAgICAvLyBJbml0aWF0ZSBWYXJpYWJsZXMgV2l0aCBGb3JtIENvbnRlbnRcclxuICAgIHZhciBuYW1lID0gJChcIiNuYW1lXCIpLnZhbCgpO1xyXG4gICAgdmFyIGVtYWlsID0gJChcIiNlbWFpbFwiKS52YWwoKTtcclxuICAgIHZhciBtZXNzYWdlID0gJChcIiNtZXNzYWdlXCIpLnZhbCgpO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgdXJsOiBcImFjdGlvbl9wYWdlLnBocFwiLFxyXG4gICAgICAgIGRhdGE6IFwibmFtZT1cIiArIG5hbWUgKyBcIiZlbWFpbD1cIiArIGVtYWlsICsgXCImbWVzc2FnZT1cIiArIG1lc3NhZ2UsXHJcbiAgICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uKHRleHQpe1xyXG4gICAgICAgICAgICBpZiAodGV4dCA9PSBcInN1Y2Nlc3NcIil7XHJcbiAgICAgICAgICAgICAgICBmb3JtU3VjY2VzcygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9ybUVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRNU0coZmFsc2UsdGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbiAgICAvLyBzcGxpdCB5b3VyIGVtYWlsIGludG8gdHdvIHBhcnRzIGFuZCByZW1vdmUgdGhlIEAgc3ltYm9sXHJcbiAgICB2YXIgZmlyc3QgPSBcImR3YXluZWFuZHJlY29kbGluZ1wiO1xyXG4gICAgdmFyIGxhc3QgPSBcImdtYWlsLmNvbVwiO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGZvcm1TdWNjZXNzKCl7XHJcbiAgJChcIiNmb3JtXCIpWzBdLnJlc2V0KCk7XHJcbiAgICAkKFwiI2Zvcm1cIikucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcygnY2QtcG9wdXAtdHJpZ2dlcicpLm9uZSgnd2Via2l0QW5pbWF0aW9uRW5kIG1vekFuaW1hdGlvbkVuZCBNU0FuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kIGFuaW1hdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBmb3JtRXJyb3IoKXtcclxuICAgICQoXCIjZm9ybVwiKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKCdzaGFrZSBhbmltYXRlZCcpLm9uZSgnd2Via2l0QW5pbWF0aW9uRW5kIG1vekFuaW1hdGlvbkVuZCBNU0FuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kIGFuaW1hdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBzdWJtaXRNU0codmFsaWQsIG1zZyl7XHJcbiAgICBpZih2YWxpZCl7XHJcbiAgICAgICAgdmFyIG1zZ0NsYXNzZXMgPSBcImgzIHRleHQtY2VudGVyIHRhZGEgYW5pbWF0ZWQgdGV4dC1zdWNjZXNzXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBtc2dDbGFzc2VzID0gXCJoMyB0ZXh0LWNlbnRlciB0ZXh0LWRhbmdlclwiO1xyXG4gICAgfVxyXG4gICAgJChcIiNtc2dTdWJtaXRcIikucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhtc2dDbGFzc2VzKS50ZXh0KG1zZyk7XHJcbn1cclxuXHJcblxyXG5cclxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKXtcclxuICAvL29wZW4gcG9wdXBcclxuICAkKCcuY2QtcG9wdXAtdHJpZ2dlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAkKCcuY2QtcG9wdXAnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gIH0pO1xyXG4gIFxyXG4gIC8vY2xvc2UgcG9wdXBcclxuICAkKCcuY2QtcG9wdXAnKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICBpZiggJChldmVudC50YXJnZXQpLmlzKCcuY2QtcG9wdXAtY2xvc2UnKSB8fCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wb3B1cCcpICkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgLy9jbG9zZSBwb3B1cCB3aGVuIGNsaWNraW5nIHRoZSBlc2Mga2V5Ym9hcmQgYnV0dG9uXHJcbiAgJChkb2N1bWVudCkua2V5dXAoZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICBpZihldmVudC53aGljaD09JzI3Jyl7XHJcbiAgICAgICAgJCgnLmNkLXBvcHVwJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyJdfQ==
