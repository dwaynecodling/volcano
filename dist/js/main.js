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

// split your email into two parts and remove the @ symbol
var first = "dwayneandrecodling";
var last = "gmail.com";

$("#form").validator().on("submit", function (event) {
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
  var telephone = $("#telephone").val();
  var services = $("#services").val();
  var details = $("#details").val();

  $.ajax({
    type: "POST",
    url: "action_page.php",
    data: "name=" + name + "&email=" + email + "&telephone=" + telephone + "&services=" + services + "&details=" + details,
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

function formSuccess() {
  $("#form")[0].reset();
  submitMSG(true, "Message Submitted!");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxFQUFsQyxDQUFxQyxPQUFyQyxFQUE4QyxVQUFTLEtBQVQsRUFBZTtBQUMzRCxRQUFJLFNBQVMsUUFBVCxDQUFrQixPQUFsQixDQUEwQixLQUExQixFQUFnQyxFQUFoQyxLQUF1QyxLQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLEtBQXRCLEVBQTRCLEVBQTVCLENBQXZDLElBQTBFLFNBQVMsUUFBVCxJQUFxQixLQUFLLFFBQUwsRUFBZTtBQUNoSCxVQUFJLFNBQVMsRUFBRSxLQUFLLElBQUwsQ0FBWCxDQUQ0RztBQUVoSCxlQUFTLE9BQU8sTUFBUCxHQUFnQixNQUFoQixHQUF5QixFQUFFLFdBQVcsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixDQUFoQixDQUFYLEdBQStCLEdBQS9CLENBQTNCLENBRnVHO0FBR2hILFVBQUksT0FBTyxNQUFQLEVBQWU7QUFDakIsVUFBRSxZQUFGLEVBQWdCLE9BQWhCLENBQXdCO0FBQ3RCLHFCQUFXLE9BQU8sTUFBUCxHQUFnQixHQUFoQjtTQURiLEVBRUcsSUFGSCxFQURpQjtBQUlqQixlQUFPLEtBQVAsQ0FKaUI7T0FBbkI7S0FIRjtHQUQ0QyxDQUE5QyxDQURXO0NBQVgsQ0FBRjs7OztBQXlCQSxFQUFFLGFBQUYsRUFBaUIsRUFBakIsQ0FBb0IsT0FBcEIsRUFBNkIsVUFBUyxLQUFULEVBQWU7QUFDeEMsSUFBRSxVQUFGLEVBQWMsVUFBZCxDQUF5QixHQUF6QixFQUR3QztBQUV4QyxJQUFFLFdBQUYsRUFBZSxXQUFmLENBQTJCLFdBQTNCLEVBQXdDLFdBQXhDLENBQW9ELFVBQXBELEVBRndDO0FBR3hDLElBQUUsTUFBRixFQUFVLEdBQVYsQ0FB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QVFoQyxDQUFFLFdBQUYsRUFBZSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFVBQVMsS0FBVCxFQUFlO0FBQ3hDLFFBQUksRUFBRSxNQUFNLE1BQU4sQ0FBRixDQUFnQixFQUFoQixDQUFtQixpQkFBbkIsS0FBeUMsRUFBRSxNQUFNLE1BQU4sQ0FBRixDQUFnQixFQUFoQixDQUFtQixXQUFuQixDQUF6QyxFQUEyRTtBQUM3RSxZQUFNLGNBQU4sR0FENkU7QUFFN0UsUUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixZQUFwQixFQUY2RTtLQUEvRTtHQUR5QixDQUEzQjs7QUFSZ0MsR0FlaEMsQ0FBRSxRQUFGLEVBQVksS0FBWixDQUFrQixVQUFTLEtBQVQsRUFBZTtBQUM3QixRQUFHLE1BQU0sS0FBTixJQUFhLElBQWIsRUFBa0I7QUFDbkIsUUFBRSxXQUFGLEVBQWUsV0FBZixDQUEyQixZQUEzQixFQURtQjtLQUFyQjtHQURjLENBQWxCLENBZmdDO0NBQVgsQ0FBdkIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoganNoaW50IGRldmVsOnRydWUgKi9cclxuY29uc29sZS5sb2coJ0xvb2sgYXQgYXBwL2pzL21haW4uanMnKTtcclxuXHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XHJcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XHJcbiAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsnXScpO1xyXG4gICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyByZXNwb25zaXZlIG5hdmlnYXRpb25cclxuXHJcblxyXG4kKFwiLndyYXAtbmF2IGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcclxuICAgICQoXCIuYnV0dG9uIGFcIikudG9nZ2xlQ2xhc3MoJ2J0bi1jbG9zZScpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpO1xyXG4gICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy14JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteScsICd2aXNpYmxlJyk7XHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICQoXCIuYnV0dG9uIGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoXCIub3ZlcmxheVwiKS5mYWRlVG9nZ2xlKDIwMCk7XHJcbiAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcclxuXHJcbiAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImJ0bi1jbG9zZVwiKSkge1xyXG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJidG4tb3BlblwiKSkge1xyXG4gICAgICAgICAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy14JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteScsICd2aXNpYmxlJyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxufSk7XHJcbiQoJy5vdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcclxuICAgICQoXCIuYnV0dG9uIGFcIikudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJykudG9nZ2xlQ2xhc3MoJ2J0bi1jbG9zZScpO1xyXG4gICAgICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcclxuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXknLCAndmlzaWJsZScpO1xyXG4gICAgb3BlbiA9IGZhbHNlO1xyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKXtcclxuICAvL29wZW4gdGhlIGxhdGVyYWwgcGFuZWxcclxuICAkKCcuY2QtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICQoJy5jZC1wYW5lbCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtcclxuICAgICAgICBcImRpc3BsYXlcIjogXCJpbmxpbmUtYmxvY2tcIixcclxuICAgICAgICBcInRyYW5zaXRpb25cIjogXCJhbGwgZWFzZS1pbiA1c1wiLFxyXG4gICAgICAgIFwidHJhbnNpdGlvbi1kZWxheVwiIDogXCIuNXNcIlxyXG4gICAgICB9KTtcclxuXHJcbiAgfSk7XHJcbiAgLy9jbG9zZSB0aGUgbGF0ZXJhbCBwYW5lbFxyXG4gICQoJy5jZC1wYW5lbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGlmKCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wYW5lbCcpIHx8ICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXBhbmVsLWNsb3NlJykgKSB7XHJcbiAgICAgICQoJy5jZC1wYW5lbCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcclxuICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXknLCAndmlzaWJsZScpO1xyXG4gICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCl7XHJcbiAgLy9jYWNoZSBET00gZWxlbWVudHNcclxuICB2YXIgcHJvamVjdHNDb250YWluZXIgPSAkKCcuY2QtcHJvamVjdHMtY29udGFpbmVyJyksXHJcbiAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyID0gcHJvamVjdHNDb250YWluZXIuZmluZCgnLmNkLXByb2plY3RzLXByZXZpZXdzJyksXHJcbiAgICBwcm9qZWN0UHJldmlld3MgPSBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLFxyXG4gICAgcHJvamVjdHMgPSBwcm9qZWN0c0NvbnRhaW5lci5maW5kKCcuY2QtcHJvamVjdHMnKSxcclxuICAgIG5hdmlnYXRpb25UcmlnZ2VyID0gJCgnLmNkLW5hdi10cmlnZ2VyJyksXHJcbiAgICBuYXZpZ2F0aW9uID0gJCgnLmNkLXByaW1hcnktbmF2JyksXHJcbiAgICAvL2lmIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IENTUyB0cmFuc2l0aW9ucy4uLlxyXG4gICAgdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgPSAoICQoJy5uby1jc3N0cmFuc2l0aW9ucycpLmxlbmd0aCA+IDApO1xyXG5cclxuICB2YXIgYW5pbWF0aW5nID0gZmFsc2UsXHJcbiAgICAvL3dpbGwgYmUgdXNlZCB0byBleHRyYWN0IHJhbmRvbSBudW1iZXJzIGZvciBwcm9qZWN0cyBzbGlkZSB1cC9zbGlkZSBkb3duIGVmZmVjdFxyXG4gICAgbnVtUmFuZG9tcyA9IHByb2plY3RzLmZpbmQoJ2xpJykubGVuZ3RoLFxyXG4gICAgdW5pcXVlUmFuZG9tcyA9IFtdO1xyXG5cclxuICAvL29wZW4gcHJvamVjdFxyXG4gIHByb2plY3RzUHJldmlld1dyYXBwZXIub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYoIGFuaW1hdGluZyA9PSBmYWxzZSApIHtcclxuICAgICAgYW5pbWF0aW5nID0gdHJ1ZTtcclxuICAgICAgbmF2aWdhdGlvblRyaWdnZXIuYWRkKHByb2plY3RzQ29udGFpbmVyKS5hZGRDbGFzcygncHJvamVjdC1vcGVuJyk7XHJcbiAgICAgIG9wZW5Qcm9qZWN0KCQodGhpcykucGFyZW50KCdsaScpKTtcclxuICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBuYXZpZ2F0aW9uVHJpZ2dlci5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGlmKCBhbmltYXRpbmcgPT0gZmFsc2UgKSB7XHJcbiAgICAgIGFuaW1hdGluZyA9IHRydWU7XHJcbiAgICAgIGlmKCBuYXZpZ2F0aW9uVHJpZ2dlci5oYXNDbGFzcygncHJvamVjdC1vcGVuJykgKSB7XHJcblxyXG4gICAgICAgIC8vY2xvc2UgdmlzaWJsZSBwcm9qZWN0XHJcbiAgICAgICAgbmF2aWdhdGlvblRyaWdnZXIuYWRkKHByb2plY3RzQ29udGFpbmVyKS5yZW1vdmVDbGFzcygncHJvamVjdC1vcGVuJyk7XHJcbiAgICAgICAgY2xvc2VQcm9qZWN0KCk7XHJcbiAgICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcImlubGluZS1ibG9ja1wifSk7XHJcbiAgICAgIH0gZWxzZSBpZiggbmF2aWdhdGlvblRyaWdnZXIuaGFzQ2xhc3MoJ25hdi12aXNpYmxlJykgKSB7XHJcbiAgICAgICAgLy9jbG9zZSBtYWluIG5hdmlnYXRpb25cclxuICAgICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5yZW1vdmVDbGFzcygnbmF2LXZpc2libGUnKTtcclxuICAgICAgICBuYXZpZ2F0aW9uLnJlbW92ZUNsYXNzKCduYXYtY2xpY2thYmxlIG5hdi12aXNpYmxlJyk7XHJcbiAgICAgICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIHByb2plY3RQcmV2aWV3cy5yZW1vdmVDbGFzcygnc2xpZGUtb3V0Jyk7XHJcbiAgICAgICAgZWxzZSBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCBmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy9vcGVuIG1haW4gbmF2aWdhdGlvblxyXG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZENsYXNzKCduYXYtdmlzaWJsZScpO1xyXG4gICAgICAgIG5hdmlnYXRpb24uYWRkQ2xhc3MoJ25hdi12aXNpYmxlJyk7XHJcbiAgICAgICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIHByb2plY3RQcmV2aWV3cy5hZGRDbGFzcygnc2xpZGUtb3V0Jyk7XHJcbiAgICAgICAgZWxzZSBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksIC0xLCAwLCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmKHRyYW5zaXRpb25zTm90U3VwcG9ydGVkKSBhbmltYXRpbmcgPSBmYWxzZTtcclxuICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgLy9zY3JvbGwgZG93biB0byBwcm9qZWN0IGluZm9cclxuICBwcm9qZWN0c0NvbnRhaW5lci5vbignY2xpY2snLCAnLnNjcm9sbCcsIGZ1bmN0aW9uKCl7XHJcbiAgICBwcm9qZWN0c0NvbnRhaW5lci5hbmltYXRlKHsnc2Nyb2xsVG9wJzokKHdpbmRvdykuaGVpZ2h0KCl9LCA1MDApO1xyXG4gIH0pO1xyXG5cclxuICAvL2NoZWNrIGlmIGJhY2tncm91bmQtaW1hZ2VzIGhhdmUgYmVlbiBsb2FkZWQgYW5kIHNob3cgcHJvamVjdCBwcmV2aWV3c1xyXG4gIHByb2plY3RQcmV2aWV3cy5jaGlsZHJlbignYScpLmJnTG9hZGVkKHtcclxuICAgICAgYWZ0ZXJMb2FkZWQgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHNob3dQcmV2aWV3KHByb2plY3RQcmV2aWV3cy5lcSgwKSk7XHJcbiAgICAgIH1cclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXcpIHtcclxuICAgIGlmKHByb2plY3RQcmV2aWV3Lmxlbmd0aCA+IDAgKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICBwcm9qZWN0UHJldmlldy5hZGRDbGFzcygnYmctbG9hZGVkJyk7XHJcbiAgICAgICAgc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXcubmV4dCgpKTtcclxuICAgICAgfSwgMTUwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG9wZW5Qcm9qZWN0KHByb2plY3RQcmV2aWV3KSB7XHJcbiAgICB2YXIgcHJvamVjdEluZGV4ID0gcHJvamVjdFByZXZpZXcuaW5kZXgoKTtcclxuICAgIHByb2plY3RzLmNoaWxkcmVuKCdsaScpLmVxKHByb2plY3RJbmRleCkuYWRkKHByb2plY3RQcmV2aWV3KS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHJcbiAgICBpZiggdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgKSB7XHJcbiAgICAgIHByb2plY3RQcmV2aWV3cy5hZGRDbGFzcygnc2xpZGUtb3V0JykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgIHByb2plY3RzLmNoaWxkcmVuKCdsaScpLmVxKHByb2plY3RJbmRleCkuYWRkQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpO1xyXG4gICAgICBhbmltYXRpbmcgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdFByZXZpZXdzLCBwcm9qZWN0SW5kZXgsIDAsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2xvc2VQcm9qZWN0KCkge1xyXG4gICAgcHJvamVjdHMuZmluZCgnLnNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJykub24oJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdjb250ZW50LXZpc2libGUnKS5vZmYoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnKTtcclxuICAgICAgc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLCAtMSwgMCwgZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9pZiBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBDU1MgdHJhbnNpdGlvbnMuLi5cclxuICAgIGlmKCB0cmFuc2l0aW9uc05vdFN1cHBvcnRlZCApIHtcclxuICAgICAgcHJvamVjdFByZXZpZXdzLnJlbW92ZUNsYXNzKCdzbGlkZS1vdXQnKTtcclxuICAgICAgcHJvamVjdHMuZmluZCgnLmNvbnRlbnQtdmlzaWJsZScpLnJlbW92ZUNsYXNzKCdjb250ZW50LXZpc2libGUnKTtcclxuICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIsIHByb2plY3RJbmRleCwgaW5kZXgsIGJvb2wpIHtcclxuICAgIGlmKGluZGV4ID09IDAgKSBjcmVhdGVBcnJheVJhbmRvbSgpO1xyXG4gICAgaWYoIHByb2plY3RJbmRleCAhPSAtMSAmJiBpbmRleCA9PSAwICkgaW5kZXggPSAxO1xyXG5cclxuICAgIHZhciByYW5kb21Qcm9qZWN0SW5kZXggPSBtYWtlVW5pcXVlUmFuZG9tKCk7XHJcbiAgICBpZiggcmFuZG9tUHJvamVjdEluZGV4ID09IHByb2plY3RJbmRleCApIHJhbmRvbVByb2plY3RJbmRleCA9IG1ha2VVbmlxdWVSYW5kb20oKTtcclxuXHJcbiAgICBpZiggaW5kZXggPCBudW1SYW5kb21zIC0gMSApIHtcclxuICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShyYW5kb21Qcm9qZWN0SW5kZXgpLnRvZ2dsZUNsYXNzKCdzbGlkZS1vdXQnLCBib29sKTtcclxuICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKXtcclxuICAgICAgICAvL2FuaW1hdGUgbmV4dCBwcmV2aWV3IHByb2plY3RcclxuICAgICAgICBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIsIHByb2plY3RJbmRleCwgaW5kZXggKyAxLCBib29sKTtcclxuICAgICAgfSwgMTUwKTtcclxuICAgIH0gZWxzZSBpZiAoIGluZGV4ID09IG51bVJhbmRvbXMgLSAxICkge1xyXG4gICAgICAvL3RoaXMgaXMgdGhlIGxhc3QgcHJvamVjdCBwcmV2aWV3IHRvIGJlIGFuaW1hdGVkXHJcbiAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocmFuZG9tUHJvamVjdEluZGV4KS50b2dnbGVDbGFzcygnc2xpZGUtb3V0JywgYm9vbCkub25lKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBpZiggcHJvamVjdEluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICBwcm9qZWN0cy5jaGlsZHJlbignbGkuc2VsZWN0ZWQnKS5hZGRDbGFzcygnY29udGVudC12aXNpYmxlJyk7XHJcbiAgICAgICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHByb2plY3RJbmRleCkuYWRkQ2xhc3MoJ3NsaWRlLW91dCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiggbmF2aWdhdGlvbi5oYXNDbGFzcygnbmF2LXZpc2libGUnKSAmJiBib29sICkge1xyXG4gICAgICAgICAgbmF2aWdhdGlvbi5hZGRDbGFzcygnbmF2LWNsaWNrYWJsZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkub2ZmKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyk7XHJcbiAgICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5MzUxNzU5L2phdmFzY3JpcHQtcmFuZG9tLW51bWJlci1vdXQtb2YtNS1uby1yZXBlYXQtdW50aWwtYWxsLWhhdmUtYmVlbi11c2VkXHJcbiAgZnVuY3Rpb24gbWFrZVVuaXF1ZVJhbmRvbSgpIHtcclxuICAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdW5pcXVlUmFuZG9tcy5sZW5ndGgpO1xyXG4gICAgICB2YXIgdmFsID0gdW5pcXVlUmFuZG9tc1tpbmRleF07XHJcbiAgICAgIC8vIG5vdyByZW1vdmUgdGhhdCB2YWx1ZSBmcm9tIHRoZSBhcnJheVxyXG4gICAgICB1bmlxdWVSYW5kb21zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVBcnJheVJhbmRvbSgpIHtcclxuICAgIC8vcmVzZXQgYXJyYXlcclxuICAgIHVuaXF1ZVJhbmRvbXMubGVuZ3RoID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtUmFuZG9tczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHVuaXF1ZVJhbmRvbXMucHVzaChpKTtcclxuICAgICAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbiAvKlxyXG4gKiBCRyBMb2FkZWRcclxuICogQ29weXJpZ2h0IChjKSAyMDE0IEpvbmF0aGFuIENhdG11bGxcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG4gKi9cclxuIChmdW5jdGlvbigkKXtcclxuICAkLmZuLmJnTG9hZGVkID0gZnVuY3Rpb24oY3VzdG9tKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgLy8gRGVmYXVsdCBwbHVnaW4gc2V0dGluZ3NcclxuICAgIHZhciBkZWZhdWx0cyA9IHtcclxuICAgICAgYWZ0ZXJMb2FkZWQgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2JnLWxvYWRlZCcpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE1lcmdlIGRlZmF1bHQgYW5kIHVzZXIgc2V0dGluZ3NcclxuICAgIHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgY3VzdG9tKTtcclxuXHJcbiAgICAvLyBMb29wIHRocm91Z2ggZWxlbWVudFxyXG4gICAgc2VsZi5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgYmdJbWdzID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykuc3BsaXQoJywgJyk7XHJcbiAgICAgICR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcsMCk7XHJcbiAgICAgICQuZWFjaCggYmdJbWdzLCBmdW5jdGlvbihrZXksIHZhbHVlKXtcclxuICAgICAgICB2YXIgaW1nID0gdmFsdWUucmVwbGFjZSgvXnVybFxcKFtcIiddPy8sICcnKS5yZXBsYWNlKC9bXCInXT9cXCkkLywgJycpO1xyXG4gICAgICAgICQoJzxpbWcvPicpLmF0dHIoJ3NyYycsIGltZykubG9hZChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7IC8vIHByZXZlbnQgbWVtb3J5IGxlYWtzXHJcbiAgICAgICAgICAkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnLCR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcpKzEpO1xyXG4gICAgICAgICAgaWYgKCR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcpID49IGJnSW1ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc2V0dGluZ3MuYWZ0ZXJMb2FkZWQuY2FsbCgkdGhpcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4gIH07XHJcbn0pKGpRdWVyeSk7XHJcblxyXG5cclxuZnVuY3Rpb24gbXlTdG9wRnVuY3Rpb24oKSB7XHJcbiAgICBjbGVhclRpbWVvdXQoc2xpZGVUb2dnbGVQcm9qZWN0cyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG15U3RvcEZ1bmN0aW9uKCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KHByb2plY3RQcmV2aWV3KTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuICAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICQoJy5kd2F5bmUtbWVldC10aGUtdGVhbScpLmhvdmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmR3YXluZS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpO1xyXG4gICAgJCgnLmR3YXluZS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJy4xJyk7XHJcbiAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcxJyk7XHJcbiAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJzEwcHgnKTtcclxuXHJcbiAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBvbiBtb3VzZW91dCwgcmVzZXQgdGhlIGJhY2tncm91bmQgY29sb3VyXHJcbiAgICAkKCcuZHdheW5lLW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICcnKTtcclxuICAgICQoJy5kd2F5bmUtcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcnKTtcclxuICAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcnKTtcclxuICAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJycpO1xyXG4gICAgICQoJy5wcm9maWxlJykuc2hvdygpO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcblxyXG4gICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgJCgnLnJ1ZHktbWVldC10aGUtdGVhbScpLmhvdmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLnJ1ZHktbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJ3BvaW50ZXInKTtcclxuICAgICQoJy5ydWR5LXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnLjEnKTtcclxuICAgICQoJy5ydWR5LXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcxJyk7XHJcbiAgICAkKCcucnVkeS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcxMHB4Jyk7XHJcblxyXG4gIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gb24gbW91c2VvdXQsIHJlc2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG91clxyXG4gICAgJCgnLnJ1ZHktbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJycpO1xyXG4gICAgJCgnLnJ1ZHktcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcnKTtcclxuICAgICAkKCcucnVkeS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnJyk7XHJcbiAgICAgJCgnLnJ1ZHktcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnJyk7XHJcbiAgICAgJCgnLnByb2ZpbGUnKS5zaG93KCk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuXHJcbiAgICAgJChmdW5jdGlvbigpIHtcclxuICAkKCcubGlhbS1tZWV0LXRoZS10ZWFtJykuaG92ZXIoZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcubGlhbS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpO1xyXG4gICAgJCgnLmxpYW0tcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcuMScpO1xyXG4gICAgJCgnLmxpYW0tcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJzEnKTtcclxuICAgICQoJy5saWFtLXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJzEwcHgnKTtcclxuXHJcbiAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBvbiBtb3VzZW91dCwgcmVzZXQgdGhlIGJhY2tncm91bmQgY29sb3VyXHJcbiAgICAkKCcubGlhbS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAnJyk7XHJcbiAgICAkKCcubGlhbS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJycpO1xyXG4gICAgICQoJy5saWFtLXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcnKTtcclxuICAgICAkKCcubGlhbS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcnKTtcclxuICAgICAkKCcucHJvZmlsZScpLnNob3coKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5cclxuJChcIi50ZWFtLWJ1dHRvbiBhXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblxyXG4gICQoJy5wcm9maWxlJykuaGlkZSgpO1xyXG5cclxufSk7XHJcblxyXG5cclxuJCgnLmZhZGluZy1zbGlkZXItMSwgLmZhZGluZy1zbGlkZXItMiwgLmZhZGluZy1zbGlkZXItMycpLnVuc2xpZGVyKHtcclxuYW5pbWF0aW9uOiAnZmFkZScsIGF1dG9wbGF5OiB0cnVlLCBzcGVlZDogODAwMCwgZGVsYXk6IDkwMDAsIGFycm93czogZmFsc2UsIG5hdjogZmFsc2VcclxufSk7XHJcblxyXG5cclxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIGpRdWVyeSgnLnNlcnZpY2VzLWhlYWRlcicpLmFkZENsYXNzKFwiaGlkZGVuXCIpLnZpZXdwb3J0Q2hlY2tlcih7XHJcbiAgICAgICAgY2xhc3NUb0FkZDogJ3Zpc2libGUgYW5pbWF0ZWQgZmFkZUluVXAnLFxyXG4gICAgICAgIG9mZnNldDogMjUwXHJcbiAgICAgICB9KTtcclxufSk7XHJcblxyXG5cclxuLy9TdWJtaXQgRm9ybVxyXG5cclxuXHJcbiAgICAvLyBzcGxpdCB5b3VyIGVtYWlsIGludG8gdHdvIHBhcnRzIGFuZCByZW1vdmUgdGhlIEAgc3ltYm9sXHJcbiAgICB2YXIgZmlyc3QgPSBcImR3YXluZWFuZHJlY29kbGluZ1wiO1xyXG4gICAgdmFyIGxhc3QgPSBcImdtYWlsLmNvbVwiO1xyXG5cclxuXHJcbiQoXCIjZm9ybVwiKS52YWxpZGF0b3IoKS5vbihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmIChldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xyXG4gICAgICAgIC8vIGhhbmRsZSB0aGUgaW52YWxpZCBmb3JtLi4uXHJcbiAgICAgICAgZm9ybUVycm9yKCk7XHJcbiAgICAgICAgc3VibWl0TVNHKGZhbHNlLCBcIkRpZCB5b3UgZmlsbCBpbiB0aGUgZm9ybSBwcm9wZXJseT9cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgbG9va3MgZ29vZCFcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHN1Ym1pdEZvcm0oKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuZnVuY3Rpb24gc3VibWl0Rm9ybSgpe1xyXG4gICAgLy8gSW5pdGlhdGUgVmFyaWFibGVzIFdpdGggRm9ybSBDb250ZW50XHJcbiAgICB2YXIgbmFtZSA9ICQoXCIjbmFtZVwiKS52YWwoKTtcclxuICAgIHZhciBlbWFpbCA9ICQoXCIjZW1haWxcIikudmFsKCk7XHJcbiAgICB2YXIgdGVsZXBob25lID0gJChcIiN0ZWxlcGhvbmVcIikudmFsKCk7XHJcbiAgICB2YXIgc2VydmljZXMgPSAkKFwiI3NlcnZpY2VzXCIpLnZhbCgpO1xyXG4gICAgdmFyIGRldGFpbHMgPSAkKFwiI2RldGFpbHNcIikudmFsKCk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICB1cmw6IFwiYWN0aW9uX3BhZ2UucGhwXCIsXHJcbiAgICAgICAgZGF0YTogXCJuYW1lPVwiICsgbmFtZSArIFwiJmVtYWlsPVwiICsgZW1haWwgKyBcIiZ0ZWxlcGhvbmU9XCIgKyB0ZWxlcGhvbmUgKyBcIiZzZXJ2aWNlcz1cIiArIHNlcnZpY2VzICsgXCImZGV0YWlscz1cIiArIGRldGFpbHMsXHJcbiAgICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uKHRleHQpe1xyXG4gICAgICAgICAgICBpZiAodGV4dCA9PSBcInN1Y2Nlc3NcIil7XHJcbiAgICAgICAgICAgICAgICBmb3JtU3VjY2VzcygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9ybUVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRNU0coZmFsc2UsdGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybVN1Y2Nlc3MoKXtcclxuICAgICQoXCIjZm9ybVwiKVswXS5yZXNldCgpO1xyXG4gICAgc3VibWl0TVNHKHRydWUsIFwiTWVzc2FnZSBTdWJtaXR0ZWQhXCIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1FcnJvcigpe1xyXG4gICAgJChcIiNmb3JtXCIpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoJ3NoYWtlIGFuaW1hdGVkJykub25lKCd3ZWJraXRBbmltYXRpb25FbmQgbW96QW5pbWF0aW9uRW5kIE1TQW5pbWF0aW9uRW5kIG9hbmltYXRpb25lbmQgYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3VibWl0TVNHKHZhbGlkLCBtc2cpe1xyXG4gICAgaWYodmFsaWQpe1xyXG4gICAgICAgIHZhciBtc2dDbGFzc2VzID0gXCJoMyB0ZXh0LWNlbnRlciB0YWRhIGFuaW1hdGVkIHRleHQtc3VjY2Vzc1wiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgbXNnQ2xhc3NlcyA9IFwiaDMgdGV4dC1jZW50ZXIgdGV4dC1kYW5nZXJcIjtcclxuICAgIH1cclxuICAgICQoXCIjbXNnU3VibWl0XCIpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MobXNnQ2xhc3NlcykudGV4dChtc2cpO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKXtcclxuICAvL29wZW4gcG9wdXBcclxuICAkKCcuY2QtcG9wdXAtdHJpZ2dlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAkKCcuY2QtcG9wdXAnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gIH0pO1xyXG4gIFxyXG4gIC8vY2xvc2UgcG9wdXBcclxuICAkKCcuY2QtcG9wdXAnKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICBpZiggJChldmVudC50YXJnZXQpLmlzKCcuY2QtcG9wdXAtY2xvc2UnKSB8fCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wb3B1cCcpICkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgLy9jbG9zZSBwb3B1cCB3aGVuIGNsaWNraW5nIHRoZSBlc2Mga2V5Ym9hcmQgYnV0dG9uXHJcbiAgJChkb2N1bWVudCkua2V5dXAoZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICBpZihldmVudC53aGljaD09JzI3Jyl7XHJcbiAgICAgICAgJCgnLmNkLXBvcHVwJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyJdfQ==
