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
jQuery(document).ready(function () {
  jQuery('#about').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated fadeIn',
    offset: 50
  });

  jQuery('.process-top').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated fadeInLeft',
    offset: 50
  });

  jQuery('#branding').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated fadeInLeft',
    offset: 50
  });

  jQuery('#services').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated fadeInLeft',
    offset: 50
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
    submitMSG(false, "Please complete all of the form before submitting?");
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
  var details = $("#details").val();

  $.ajax({
    type: "POST",
    url: "action_page.php",
    data: "name=" + name + "&email=" + email + "&telephone=" + telephone + "&details=" + details,
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
  $('.cd-popup').addClass('is-visible');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxFQUFsQyxDQUFxQyxPQUFyQyxFQUE4QyxVQUFTLEtBQVQsRUFBZTtBQUMzRCxRQUFJLFNBQVMsUUFBVCxDQUFrQixPQUFsQixDQUEwQixLQUExQixFQUFnQyxFQUFoQyxLQUF1QyxLQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLEtBQXRCLEVBQTRCLEVBQTVCLENBQXZDLElBQTBFLFNBQVMsUUFBVCxJQUFxQixLQUFLLFFBQUwsRUFBZTtBQUNoSCxVQUFJLFNBQVMsRUFBRSxLQUFLLElBQUwsQ0FBWCxDQUQ0RztBQUVoSCxlQUFTLE9BQU8sTUFBUCxHQUFnQixNQUFoQixHQUF5QixFQUFFLFdBQVcsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixDQUFoQixDQUFYLEdBQStCLEdBQS9CLENBQTNCLENBRnVHO0FBR2hILFVBQUksT0FBTyxNQUFQLEVBQWU7QUFDakIsVUFBRSxZQUFGLEVBQWdCLE9BQWhCLENBQXdCO0FBQ3RCLHFCQUFXLE9BQU8sTUFBUCxHQUFnQixHQUFoQjtTQURiLEVBRUcsSUFGSCxFQURpQjtBQUlqQixlQUFPLEtBQVAsQ0FKaUI7T0FBbkI7S0FIRjtHQUQ0QyxDQUE5QyxDQURXO0NBQVgsQ0FBRjs7OztBQXlCQSxFQUFFLGFBQUYsRUFBaUIsRUFBakIsQ0FBb0IsT0FBcEIsRUFBNkIsVUFBUyxLQUFULEVBQWU7QUFDeEMsSUFBRSxVQUFGLEVBQWMsVUFBZCxDQUF5QixHQUF6QixFQUR3QztBQUV4QyxJQUFFLFdBQUYsRUFBZSxXQUFmLENBQTJCLFdBQTNCLEVBQXdDLFdBQXhDLENBQW9ELFVBQXBELEVBRndDO0FBR3hDLElBQUUsTUFBRixFQUFVLEdBQVYsQ0FB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IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBqc2hpbnQgZGV2ZWw6dHJ1ZSAqL1xuY29uc29sZS5sb2coJ0xvb2sgYXQgYXBwL2pzL21haW4uanMnKTtcblxuXG4kKGZ1bmN0aW9uKCkge1xuICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpICYmIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWUpIHtcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArJ10nKTtcbiAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG5cblxuXG5cblxuXG5cblxuLy8gcmVzcG9uc2l2ZSBuYXZpZ2F0aW9uXG5cblxuJChcIi53cmFwLW5hdiBhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAkKFwiLm92ZXJsYXlcIikuZmFkZVRvZ2dsZSgyMDApO1xuICAgICQoXCIuYnV0dG9uIGFcIikudG9nZ2xlQ2xhc3MoJ2J0bi1jbG9zZScpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpO1xuICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy15JywgJ3Zpc2libGUnKTtcblxufSk7XG5cblxuXG5cblxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgICQoXCIuYnV0dG9uIGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuXG5cblxuICAgICAgICAkKFwiLm92ZXJsYXlcIikuZmFkZVRvZ2dsZSgyMDApO1xuICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJykudG9nZ2xlQ2xhc3MoJ2J0bi1jbG9zZScpO1xuXG4gICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJidG4tY2xvc2VcIikpIHtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJidG4tb3BlblwiKSkge1xuICAgICAgICAgICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy15JywgJ3Zpc2libGUnKTtcbiAgICB9XG59KTtcblxufSk7XG4kKCcub3ZlcmxheScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAkKFwiLm92ZXJsYXlcIikuZmFkZVRvZ2dsZSgyMDApO1xuICAgICQoXCIuYnV0dG9uIGFcIikudG9nZ2xlQ2xhc3MoJ2J0bi1vcGVuJykudG9nZ2xlQ2xhc3MoJ2J0bi1jbG9zZScpO1xuICAgICAgICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteScsICd2aXNpYmxlJyk7XG4gICAgb3BlbiA9IGZhbHNlO1xuXG59KTtcblxuXG5cblxuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpe1xuICAvL29wZW4gdGhlIGxhdGVyYWwgcGFuZWxcbiAgJCgnLmNkLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoJy5jZC1wYW5lbCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe1xuICAgICAgICBcImRpc3BsYXlcIjogXCJpbmxpbmUtYmxvY2tcIixcbiAgICAgICAgXCJ0cmFuc2l0aW9uXCI6IFwiYWxsIGVhc2UtaW4gNXNcIixcbiAgICAgICAgXCJ0cmFuc2l0aW9uLWRlbGF5XCIgOiBcIi41c1wiXG4gICAgICB9KTtcblxuICB9KTtcbiAgLy9jbG9zZSB0aGUgbGF0ZXJhbCBwYW5lbFxuICAkKCcuY2QtcGFuZWwnKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG4gICAgaWYoICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXBhbmVsJykgfHwgJChldmVudC50YXJnZXQpLmlzKCcuY2QtcGFuZWwtY2xvc2UnKSApIHtcbiAgICAgICQoJy5jZC1wYW5lbCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdy15JywgJ3Zpc2libGUnKTtcbiAgICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe2Rpc3BsYXk6IFwibm9uZVwifSk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5cblxuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpe1xuICAvL2NhY2hlIERPTSBlbGVtZW50c1xuICB2YXIgcHJvamVjdHNDb250YWluZXIgPSAkKCcuY2QtcHJvamVjdHMtY29udGFpbmVyJyksXG4gICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlciA9IHByb2plY3RzQ29udGFpbmVyLmZpbmQoJy5jZC1wcm9qZWN0cy1wcmV2aWV3cycpLFxuICAgIHByb2plY3RQcmV2aWV3cyA9IHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksXG4gICAgcHJvamVjdHMgPSBwcm9qZWN0c0NvbnRhaW5lci5maW5kKCcuY2QtcHJvamVjdHMnKSxcbiAgICBuYXZpZ2F0aW9uVHJpZ2dlciA9ICQoJy5jZC1uYXYtdHJpZ2dlcicpLFxuICAgIG5hdmlnYXRpb24gPSAkKCcuY2QtcHJpbWFyeS1uYXYnKSxcbiAgICAvL2lmIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IENTUyB0cmFuc2l0aW9ucy4uLlxuICAgIHRyYW5zaXRpb25zTm90U3VwcG9ydGVkID0gKCAkKCcubm8tY3NzdHJhbnNpdGlvbnMnKS5sZW5ndGggPiAwKTtcblxuICB2YXIgYW5pbWF0aW5nID0gZmFsc2UsXG4gICAgLy93aWxsIGJlIHVzZWQgdG8gZXh0cmFjdCByYW5kb20gbnVtYmVycyBmb3IgcHJvamVjdHMgc2xpZGUgdXAvc2xpZGUgZG93biBlZmZlY3RcbiAgICBudW1SYW5kb21zID0gcHJvamVjdHMuZmluZCgnbGknKS5sZW5ndGgsXG4gICAgdW5pcXVlUmFuZG9tcyA9IFtdO1xuXG4gIC8vb3BlbiBwcm9qZWN0XG4gIHByb2plY3RzUHJldmlld1dyYXBwZXIub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiggYW5pbWF0aW5nID09IGZhbHNlICkge1xuICAgICAgYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLmFkZChwcm9qZWN0c0NvbnRhaW5lcikuYWRkQ2xhc3MoJ3Byb2plY3Qtb3BlbicpO1xuICAgICAgb3BlblByb2plY3QoJCh0aGlzKS5wYXJlbnQoJ2xpJykpO1xuICAgICAgJCgnLmNkLXBhbmVsLWNsb3NlJykuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xuICAgIH1cbiAgfSk7XG5cbiAgbmF2aWdhdGlvblRyaWdnZXIub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiggYW5pbWF0aW5nID09IGZhbHNlICkge1xuICAgICAgYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgIGlmKCBuYXZpZ2F0aW9uVHJpZ2dlci5oYXNDbGFzcygncHJvamVjdC1vcGVuJykgKSB7XG5cbiAgICAgICAgLy9jbG9zZSB2aXNpYmxlIHByb2plY3RcbiAgICAgICAgbmF2aWdhdGlvblRyaWdnZXIuYWRkKHByb2plY3RzQ29udGFpbmVyKS5yZW1vdmVDbGFzcygncHJvamVjdC1vcGVuJyk7XG4gICAgICAgIGNsb3NlUHJvamVjdCgpO1xuICAgICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe2Rpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCJ9KTtcbiAgICAgIH0gZWxzZSBpZiggbmF2aWdhdGlvblRyaWdnZXIuaGFzQ2xhc3MoJ25hdi12aXNpYmxlJykgKSB7XG4gICAgICAgIC8vY2xvc2UgbWFpbiBuYXZpZ2F0aW9uXG4gICAgICAgIG5hdmlnYXRpb25UcmlnZ2VyLnJlbW92ZUNsYXNzKCduYXYtdmlzaWJsZScpO1xuICAgICAgICBuYXZpZ2F0aW9uLnJlbW92ZUNsYXNzKCduYXYtY2xpY2thYmxlIG5hdi12aXNpYmxlJyk7XG4gICAgICAgIGlmKHRyYW5zaXRpb25zTm90U3VwcG9ydGVkKSBwcm9qZWN0UHJldmlld3MucmVtb3ZlQ2xhc3MoJ3NsaWRlLW91dCcpO1xuICAgICAgICBlbHNlIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSwgLTEsIDAsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vb3BlbiBtYWluIG5hdmlnYXRpb25cbiAgICAgICAgbmF2aWdhdGlvblRyaWdnZXIuYWRkQ2xhc3MoJ25hdi12aXNpYmxlJyk7XG4gICAgICAgIG5hdmlnYXRpb24uYWRkQ2xhc3MoJ25hdi12aXNpYmxlJyk7XG4gICAgICAgIGlmKHRyYW5zaXRpb25zTm90U3VwcG9ydGVkKSBwcm9qZWN0UHJldmlld3MuYWRkQ2xhc3MoJ3NsaWRlLW91dCcpO1xuICAgICAgICBlbHNlIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSwgLTEsIDAsIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHRyYW5zaXRpb25zTm90U3VwcG9ydGVkKSBhbmltYXRpbmcgPSBmYWxzZTtcbiAgfSk7XG5cblxuXG5cbiAgLy9zY3JvbGwgZG93biB0byBwcm9qZWN0IGluZm9cbiAgcHJvamVjdHNDb250YWluZXIub24oJ2NsaWNrJywgJy5zY3JvbGwnLCBmdW5jdGlvbigpe1xuICAgIHByb2plY3RzQ29udGFpbmVyLmFuaW1hdGUoeydzY3JvbGxUb3AnOiQod2luZG93KS5oZWlnaHQoKX0sIDUwMCk7XG4gIH0pO1xuXG4gIC8vY2hlY2sgaWYgYmFja2dyb3VuZC1pbWFnZXMgaGF2ZSBiZWVuIGxvYWRlZCBhbmQgc2hvdyBwcm9qZWN0IHByZXZpZXdzXG4gIHByb2plY3RQcmV2aWV3cy5jaGlsZHJlbignYScpLmJnTG9hZGVkKHtcbiAgICAgIGFmdGVyTG9hZGVkIDogZnVuY3Rpb24oKXtcbiAgICAgICAgc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXdzLmVxKDApKTtcbiAgICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2hvd1ByZXZpZXcocHJvamVjdFByZXZpZXcpIHtcbiAgICBpZihwcm9qZWN0UHJldmlldy5sZW5ndGggPiAwICkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBwcm9qZWN0UHJldmlldy5hZGRDbGFzcygnYmctbG9hZGVkJyk7XG4gICAgICAgIHNob3dQcmV2aWV3KHByb2plY3RQcmV2aWV3Lm5leHQoKSk7XG4gICAgICB9LCAxNTApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9wZW5Qcm9qZWN0KHByb2plY3RQcmV2aWV3KSB7XG4gICAgdmFyIHByb2plY3RJbmRleCA9IHByb2plY3RQcmV2aWV3LmluZGV4KCk7XG4gICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpJykuZXEocHJvamVjdEluZGV4KS5hZGQocHJvamVjdFByZXZpZXcpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuXG4gICAgaWYoIHRyYW5zaXRpb25zTm90U3VwcG9ydGVkICkge1xuICAgICAgcHJvamVjdFByZXZpZXdzLmFkZENsYXNzKCdzbGlkZS1vdXQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgIHByb2plY3RzLmNoaWxkcmVuKCdsaScpLmVxKHByb2plY3RJbmRleCkuYWRkQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpO1xuICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdFByZXZpZXdzLCBwcm9qZWN0SW5kZXgsIDAsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlUHJvamVjdCgpIHtcbiAgICBwcm9qZWN0cy5maW5kKCcuc2VsZWN0ZWQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKS5vbignd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdjb250ZW50LXZpc2libGUnKS5vZmYoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnKTtcbiAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSwgLTEsIDAsIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIC8vaWYgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgQ1NTIHRyYW5zaXRpb25zLi4uXG4gICAgaWYoIHRyYW5zaXRpb25zTm90U3VwcG9ydGVkICkge1xuICAgICAgcHJvamVjdFByZXZpZXdzLnJlbW92ZUNsYXNzKCdzbGlkZS1vdXQnKTtcbiAgICAgIHByb2plY3RzLmZpbmQoJy5jb250ZW50LXZpc2libGUnKS5yZW1vdmVDbGFzcygnY29udGVudC12aXNpYmxlJyk7XG4gICAgICBhbmltYXRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIsIHByb2plY3RJbmRleCwgaW5kZXgsIGJvb2wpIHtcbiAgICBpZihpbmRleCA9PSAwICkgY3JlYXRlQXJyYXlSYW5kb20oKTtcbiAgICBpZiggcHJvamVjdEluZGV4ICE9IC0xICYmIGluZGV4ID09IDAgKSBpbmRleCA9IDE7XG5cbiAgICB2YXIgcmFuZG9tUHJvamVjdEluZGV4ID0gbWFrZVVuaXF1ZVJhbmRvbSgpO1xuICAgIGlmKCByYW5kb21Qcm9qZWN0SW5kZXggPT0gcHJvamVjdEluZGV4ICkgcmFuZG9tUHJvamVjdEluZGV4ID0gbWFrZVVuaXF1ZVJhbmRvbSgpO1xuXG4gICAgaWYoIGluZGV4IDwgbnVtUmFuZG9tcyAtIDEgKSB7XG4gICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkudG9nZ2xlQ2xhc3MoJ3NsaWRlLW91dCcsIGJvb2wpO1xuICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgLy9hbmltYXRlIG5leHQgcHJldmlldyBwcm9qZWN0XG4gICAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlciwgcHJvamVjdEluZGV4LCBpbmRleCArIDEsIGJvb2wpO1xuICAgICAgfSwgMTUwKTtcbiAgICB9IGVsc2UgaWYgKCBpbmRleCA9PSBudW1SYW5kb21zIC0gMSApIHtcbiAgICAgIC8vdGhpcyBpcyB0aGUgbGFzdCBwcm9qZWN0IHByZXZpZXcgdG8gYmUgYW5pbWF0ZWRcbiAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocmFuZG9tUHJvamVjdEluZGV4KS50b2dnbGVDbGFzcygnc2xpZGUtb3V0JywgYm9vbCkub25lKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoIHByb2plY3RJbmRleCAhPSAtMSkge1xuICAgICAgICAgIHByb2plY3RzLmNoaWxkcmVuKCdsaS5zZWxlY3RlZCcpLmFkZENsYXNzKCdjb250ZW50LXZpc2libGUnKTtcbiAgICAgICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHByb2plY3RJbmRleCkuYWRkQ2xhc3MoJ3NsaWRlLW91dCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICB9IGVsc2UgaWYoIG5hdmlnYXRpb24uaGFzQ2xhc3MoJ25hdi12aXNpYmxlJykgJiYgYm9vbCApIHtcbiAgICAgICAgICBuYXZpZ2F0aW9uLmFkZENsYXNzKCduYXYtY2xpY2thYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShyYW5kb21Qcm9qZWN0SW5kZXgpLm9mZignd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcpO1xuICAgICAgICBhbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xOTM1MTc1OS9qYXZhc2NyaXB0LXJhbmRvbS1udW1iZXItb3V0LW9mLTUtbm8tcmVwZWF0LXVudGlsLWFsbC1oYXZlLWJlZW4tdXNlZFxuICBmdW5jdGlvbiBtYWtlVW5pcXVlUmFuZG9tKCkge1xuICAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdW5pcXVlUmFuZG9tcy5sZW5ndGgpO1xuICAgICAgdmFyIHZhbCA9IHVuaXF1ZVJhbmRvbXNbaW5kZXhdO1xuICAgICAgLy8gbm93IHJlbW92ZSB0aGF0IHZhbHVlIGZyb20gdGhlIGFycmF5XG4gICAgICB1bmlxdWVSYW5kb21zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlSYW5kb20oKSB7XG4gICAgLy9yZXNldCBhcnJheVxuICAgIHVuaXF1ZVJhbmRvbXMubGVuZ3RoID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVJhbmRvbXM7IGkrKykge1xuICAgICAgICAgICAgdW5pcXVlUmFuZG9tcy5wdXNoKGkpO1xuICAgICAgICB9XG4gIH1cbn0pO1xuXG4gLypcbiAqIEJHIExvYWRlZFxuICogQ29weXJpZ2h0IChjKSAyMDE0IEpvbmF0aGFuIENhdG11bGxcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuIChmdW5jdGlvbigkKXtcbiAgJC5mbi5iZ0xvYWRlZCA9IGZ1bmN0aW9uKGN1c3RvbSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIERlZmF1bHQgcGx1Z2luIHNldHRpbmdzXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgYWZ0ZXJMb2FkZWQgOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmFkZENsYXNzKCdiZy1sb2FkZWQnKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gTWVyZ2UgZGVmYXVsdCBhbmQgdXNlciBzZXR0aW5nc1xuICAgIHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgY3VzdG9tKTtcblxuICAgIC8vIExvb3AgdGhyb3VnaCBlbGVtZW50XG4gICAgc2VsZi5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICBiZ0ltZ3MgPSAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKS5zcGxpdCgnLCAnKTtcbiAgICAgICR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcsMCk7XG4gICAgICAkLmVhY2goIGJnSW1ncywgZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICAgIHZhciBpbWcgPSB2YWx1ZS5yZXBsYWNlKC9edXJsXFwoW1wiJ10/LywgJycpLnJlcGxhY2UoL1tcIiddP1xcKSQvLCAnJyk7XG4gICAgICAgICQoJzxpbWcvPicpLmF0dHIoJ3NyYycsIGltZykubG9hZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpOyAvLyBwcmV2ZW50IG1lbW9yeSBsZWFrc1xuICAgICAgICAgICR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcsJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JykrMSk7XG4gICAgICAgICAgaWYgKCR0aGlzLmRhdGEoJ2xvYWRlZC1jb3VudCcpID49IGJnSW1ncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNldHRpbmdzLmFmdGVyTG9hZGVkLmNhbGwoJHRoaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuICB9O1xufSkoalF1ZXJ5KTtcblxuXG5mdW5jdGlvbiBteVN0b3BGdW5jdGlvbigpIHtcbiAgICBjbGVhclRpbWVvdXQoc2xpZGVUb2dnbGVQcm9qZWN0cyk7XG59XG5cbmZ1bmN0aW9uIG15U3RvcEZ1bmN0aW9uKCkge1xuICAgIGNsZWFyVGltZW91dChwcm9qZWN0UHJldmlldyk7XG59XG5cblxuXG5cbiAgICAgJChmdW5jdGlvbigpIHtcbiAgJCgnLmR3YXluZS1tZWV0LXRoZS10ZWFtJykuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgJCgnLmR3YXluZS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgICQoJy5kd2F5bmUtcHJvZmlsZS1pbWFnZScpLmNzcygnb3BhY2l0eScsICcuMScpO1xuICAgICQoJy5kd2F5bmUtcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJzEwcHgnKTtcblxuICB9LCBmdW5jdGlvbigpIHtcbiAgICAvLyBvbiBtb3VzZW91dCwgcmVzZXQgdGhlIGJhY2tncm91bmQgY29sb3VyXG4gICAgJCgnLmR3YXluZS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAnJyk7XG4gICAgJCgnLmR3YXluZS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJycpO1xuICAgICAkKCcuZHdheW5lLXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcnKTtcbiAgICAgJCgnLmR3YXluZS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcnKTtcbiAgICAgJCgnLnByb2ZpbGUnKS5zaG93KCk7XG4gIH0pO1xufSk7XG5cblxuICAgICAkKGZ1bmN0aW9uKCkge1xuICAkKCcucnVkeS1tZWV0LXRoZS10ZWFtJykuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgJCgnLnJ1ZHktbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAkKCcucnVkeS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJy4xJyk7XG4gICAgJCgnLnJ1ZHktcHJvZmlsZS10ZXh0JykuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgICAkKCcucnVkeS1wcm9maWxlLXRleHQnKS5jc3MoJ3RvcCcsICcxMHB4Jyk7XG5cbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgLy8gb24gbW91c2VvdXQsIHJlc2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG91clxuICAgICQoJy5ydWR5LW1lZXQtdGhlLXRlYW0nKS5jc3MoJ2N1cnNvcicsICcnKTtcbiAgICAkKCcucnVkeS1wcm9maWxlLWltYWdlJykuY3NzKCdvcGFjaXR5JywgJycpO1xuICAgICAkKCcucnVkeS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnJyk7XG4gICAgICQoJy5ydWR5LXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJycpO1xuICAgICAkKCcucHJvZmlsZScpLnNob3coKTtcbiAgfSk7XG59KTtcblxuXG4gICAgICQoZnVuY3Rpb24oKSB7XG4gICQoJy5saWFtLW1lZXQtdGhlLXRlYW0nKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAkKCcubGlhbS1tZWV0LXRoZS10ZWFtJykuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgICQoJy5saWFtLXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnLjEnKTtcbiAgICAkKCcubGlhbS1wcm9maWxlLXRleHQnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgICQoJy5saWFtLXByb2ZpbGUtdGV4dCcpLmNzcygndG9wJywgJzEwcHgnKTtcblxuICB9LCBmdW5jdGlvbigpIHtcbiAgICAvLyBvbiBtb3VzZW91dCwgcmVzZXQgdGhlIGJhY2tncm91bmQgY29sb3VyXG4gICAgJCgnLmxpYW0tbWVldC10aGUtdGVhbScpLmNzcygnY3Vyc29yJywgJycpO1xuICAgICQoJy5saWFtLXByb2ZpbGUtaW1hZ2UnKS5jc3MoJ29wYWNpdHknLCAnJyk7XG4gICAgICQoJy5saWFtLXByb2ZpbGUtdGV4dCcpLmNzcygnb3BhY2l0eScsICcnKTtcbiAgICAgJCgnLmxpYW0tcHJvZmlsZS10ZXh0JykuY3NzKCd0b3AnLCAnJyk7XG4gICAgICQoJy5wcm9maWxlJykuc2hvdygpO1xuICB9KTtcbn0pO1xuXG5cbiQoXCIudGVhbS1idXR0b24gYVwiKS5jbGljayhmdW5jdGlvbigpe1xuXG4gICQoJy5wcm9maWxlJykuaGlkZSgpO1xuXG59KTtcblxuXG4kKCcuZmFkaW5nLXNsaWRlci0xLCAuZmFkaW5nLXNsaWRlci0yLCAuZmFkaW5nLXNsaWRlci0zJykudW5zbGlkZXIoe1xuYW5pbWF0aW9uOiAnZmFkZScsIGF1dG9wbGF5OiB0cnVlLCBzcGVlZDogODAwMCwgZGVsYXk6IDkwMDAsIGFycm93czogZmFsc2UsIG5hdjogZmFsc2Vcbn0pO1xuXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgalF1ZXJ5KCcuc2VydmljZXMtaGVhZGVyJykuYWRkQ2xhc3MoXCJoaWRkZW5cIikudmlld3BvcnRDaGVja2VyKHtcbiAgICAgICAgY2xhc3NUb0FkZDogJ3Zpc2libGUgYW5pbWF0ZWQgZmFkZUluVXAnLFxuICAgICAgICBvZmZzZXQ6IDI1MFxuICAgICAgIH0pO1xufSk7XG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIGpRdWVyeSgnI2Fib3V0JykuYWRkQ2xhc3MoXCJoaWRkZW5cIikudmlld3BvcnRDaGVja2VyKHtcbiAgICAgICAgY2xhc3NUb0FkZDogJ3Zpc2libGUgYW5pbWF0ZWQgZmFkZUluJyxcbiAgICAgICAgb2Zmc2V0OiA1MFxuICAgICAgIH0pO1xuXG4gICAgICAgIGpRdWVyeSgnLnByb2Nlc3MtdG9wJykuYWRkQ2xhc3MoXCJoaWRkZW5cIikudmlld3BvcnRDaGVja2VyKHtcbiAgICAgICAgY2xhc3NUb0FkZDogJ3Zpc2libGUgYW5pbWF0ZWQgZmFkZUluTGVmdCcsXG4gICAgICAgIG9mZnNldDogNTBcbiAgICAgICB9KTtcblxuICAgICAgICAgalF1ZXJ5KCcjYnJhbmRpbmcnKS5hZGRDbGFzcyhcImhpZGRlblwiKS52aWV3cG9ydENoZWNrZXIoe1xuICAgICAgICBjbGFzc1RvQWRkOiAndmlzaWJsZSBhbmltYXRlZCBmYWRlSW5MZWZ0JyxcbiAgICAgICAgb2Zmc2V0OiA1MFxuICAgICAgIH0pO1xuICAgICAgICAgXG4gICAgICAgICBqUXVlcnkoJyNzZXJ2aWNlcycpLmFkZENsYXNzKFwiaGlkZGVuXCIpLnZpZXdwb3J0Q2hlY2tlcih7XG4gICAgICAgIGNsYXNzVG9BZGQ6ICd2aXNpYmxlIGFuaW1hdGVkIGZhZGVJbkxlZnQnLFxuICAgICAgICBvZmZzZXQ6IDUwXG4gICAgICAgfSk7XG59KTtcblxuXG5cblxuXG4vL1N1Ym1pdCBGb3JtXG5cblxuICAgIC8vIHNwbGl0IHlvdXIgZW1haWwgaW50byB0d28gcGFydHMgYW5kIHJlbW92ZSB0aGUgQCBzeW1ib2xcbiAgICB2YXIgZmlyc3QgPSBcImR3YXluZWFuZHJlY29kbGluZ1wiO1xuICAgIHZhciBsYXN0ID0gXCJnbWFpbC5jb21cIjtcblxuXG4kKFwiI2Zvcm1cIikudmFsaWRhdG9yKCkub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIC8vIGhhbmRsZSB0aGUgaW52YWxpZCBmb3JtLi4uXG4gICAgICAgIGZvcm1FcnJvcigpO1xuICAgICAgICBzdWJtaXRNU0coZmFsc2UsIFwiUGxlYXNlIGNvbXBsZXRlIGFsbCBvZiB0aGUgZm9ybSBiZWZvcmUgc3VibWl0dGluZz9cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZXZlcnl0aGluZyBsb29rcyBnb29kIVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzdWJtaXRGb3JtKCk7XG4gICAgfVxufSk7XG5cblxuZnVuY3Rpb24gc3VibWl0Rm9ybSgpe1xuICAgIC8vIEluaXRpYXRlIFZhcmlhYmxlcyBXaXRoIEZvcm0gQ29udGVudFxuICAgIHZhciBuYW1lID0gJChcIiNuYW1lXCIpLnZhbCgpO1xuICAgIHZhciBlbWFpbCA9ICQoXCIjZW1haWxcIikudmFsKCk7XG4gICAgdmFyIHRlbGVwaG9uZSA9ICQoXCIjdGVsZXBob25lXCIpLnZhbCgpO1xuICAgIHZhciBkZXRhaWxzID0gJChcIiNkZXRhaWxzXCIpLnZhbCgpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIHVybDogXCJhY3Rpb25fcGFnZS5waHBcIixcbiAgICAgICAgZGF0YTogXCJuYW1lPVwiICsgbmFtZSArIFwiJmVtYWlsPVwiICsgZW1haWwgKyBcIiZ0ZWxlcGhvbmU9XCIgKyB0ZWxlcGhvbmUgKyAgXCImZGV0YWlscz1cIiArIGRldGFpbHMsXG4gICAgICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbih0ZXh0KXtcbiAgICAgICAgICAgIGlmICh0ZXh0ID09IFwic3VjY2Vzc1wiKXtcbiAgICAgICAgICAgICAgICBmb3JtU3VjY2VzcygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JtRXJyb3IoKTtcbiAgICAgICAgICAgICAgICBzdWJtaXRNU0coZmFsc2UsdGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZm9ybVN1Y2Nlc3MoKXtcbiAgICAkKFwiI2Zvcm1cIilbMF0ucmVzZXQoKTtcbiAgICBzdWJtaXRNU0codHJ1ZSwgXCJNZXNzYWdlIFN1Ym1pdHRlZCFcIik7XG4gICAgJCgnLmNkLXBvcHVwJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbn1cblxuZnVuY3Rpb24gZm9ybUVycm9yKCl7XG4gICAgJChcIiNmb3JtXCIpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoJ3NoYWtlIGFuaW1hdGVkJykub25lKCd3ZWJraXRBbmltYXRpb25FbmQgbW96QW5pbWF0aW9uRW5kIE1TQW5pbWF0aW9uRW5kIG9hbmltYXRpb25lbmQgYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzdWJtaXRNU0codmFsaWQsIG1zZyl7XG4gICAgaWYodmFsaWQpe1xuICAgICAgICB2YXIgbXNnQ2xhc3NlcyA9IFwiaDMgdGV4dC1jZW50ZXIgdGFkYSBhbmltYXRlZCB0ZXh0LXN1Y2Nlc3NcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbXNnQ2xhc3NlcyA9IFwiaDMgdGV4dC1jZW50ZXIgdGV4dC1kYW5nZXJcIjtcbiAgICB9XG4gICAgJChcIiNtc2dTdWJtaXRcIikucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhtc2dDbGFzc2VzKS50ZXh0KG1zZyk7XG59XG5cblxuXG5cblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKXtcbiAgLy9vcGVuIHBvcHVwXG4gICQoJy5jZC1wb3B1cC10cmlnZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCgnLmNkLXBvcHVwJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgfSk7XG4gIFxuICAvL2Nsb3NlIHBvcHVwXG4gICQoJy5jZC1wb3B1cCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBpZiggJChldmVudC50YXJnZXQpLmlzKCcuY2QtcG9wdXAtY2xvc2UnKSB8fCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wb3B1cCcpICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICB9XG4gIH0pO1xuICAvL2Nsb3NlIHBvcHVwIHdoZW4gY2xpY2tpbmcgdGhlIGVzYyBrZXlib2FyZCBidXR0b25cbiAgJChkb2N1bWVudCkua2V5dXAoZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgaWYoZXZlbnQud2hpY2g9PScyNycpe1xuICAgICAgICAkKCcuY2QtcG9wdXAnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgfVxuICAgIH0pO1xufSk7Il19
