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

// init controller
var controller = new ScrollMagic.Controller();

// create a scene
new ScrollMagic.Scene({
  duration: 175, // the scene should last for a scroll distance of 100px
  offset: 220 // start this scene after scrolling for 50px
}).setPin(".header") // pins the element for the the scene's duration
.addTo(controller); // assign the scene to the controller

$('.content-bg').parallax({ imageSrc: 'images/content-bg.jpg' });

$(window).scroll(function () {
  $(window).trigger('resize');
});

$(window).resize(function () {
  $(window).trigger('resize.px.parallax');
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsUUFBUSxHQUFSLENBQVksd0JBQVo7O0FBR0EsRUFBRSxZQUFXO0FBQ1gsSUFBRSw4QkFBRixFQUFrQyxLQUFsQyxDQUF3QyxZQUFXO0FBQ2pELFFBQUksU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNEIsRUFBNUIsQ0FBdkMsSUFBMEUsU0FBUyxRQUFULElBQXFCLEtBQUssUUFBTCxFQUFlO0FBQ2hILFVBQUksU0FBUyxFQUFFLEtBQUssSUFBTCxDQUFYLENBRDRHO0FBRWhILGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBK0IsR0FBL0IsQ0FBM0IsQ0FGdUc7QUFHaEgsVUFBSSxPQUFPLE1BQVAsRUFBZTtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCLEdBQWhCO1NBRGIsRUFFRyxJQUZILEVBRGlCO0FBSWpCLGVBQU8sS0FBUCxDQUppQjtPQUFuQjtLQUhGO0dBRHNDLENBQXhDLENBRFc7Q0FBWCxDQUFGOzs7O0FBc0JBLENBQUMsWUFBVztBQUNKLE1BQUksVUFBVSxFQUFFLE1BQUYsRUFBVSxNQUFWLEVBQVY7TUFDRixVQUFVLEVBQUUsWUFBRixDQUFWO01BQ0EsZ0JBQWdCLFFBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsTUFBbkIsRUFBaEIsQ0FIRTtBQUlKLFVBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsQ0FBQyxVQUFVLGFBQVYsQ0FBRCxHQUEwQixDQUExQixHQUE4QixNQUE5QixDQUF2QixDQUpJO0FB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WSxVQUFaLEVBQWpCOzs7QUFHSixJQUFJLFlBQVksS0FBWixDQUFrQjtBQUNkLFlBQVUsR0FBVjtBQUNBLFVBQVEsR0FBUjtBQUZjLENBQXRCLEVBSUssTUFKTCxDQUlZLFNBSlo7Q0FLSyxLQUxMLENBS1csVUFMWDs7QUFRQSxFQUFFLGFBQUYsRUFBaUIsUUFBakIsQ0FBMEIsRUFBQyxVQUFVLHVCQUFWLEVBQTNCOztBQUdBLEVBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsWUFBVTtBQUFFLElBQUUsTUFBRixFQUFVLE9BQVYsQ0FBa0IsUUFBbEIsRUFBRjtDQUFWLENBQWpCOztBQUdBLEVBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsWUFBVztBQUMxQixJQUFFLE1BQUYsRUFBVSxPQUFWLENBQWtCLG9CQUFsQixFQUQwQjtDQUFYLENBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGpzaGludCBkZXZlbDp0cnVlICovXG5jb25zb2xlLmxvZygnTG9vayBhdCBhcHAvanMvbWFpbi5qcycpO1xuXG5cbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XG4gICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG5cblxuXG5cbi8vIEludHJvIEZ1bGwgU2NyZWVuIHBhZ2UgU2VjdGlvblxuXG5cbihmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHdpbmRvd0ggPSAkKHdpbmRvdykuaGVpZ2h0KCksXG4gICAgICAgICAgaW50cm9FbCA9ICQoJ2Rpdi5vcGVuZXInKSxcbiAgICAgICAgICBpbnRyb0hlYWRpbmdIID0gaW50cm9FbC5maW5kKCdoMScpLmhlaWdodCgpO1xuICAgICAgICBpbnRyb0VsLmNzcygncGFkZGluZycsICh3aW5kb3dIIC0gaW50cm9IZWFkaW5nSCkvMiArICdweCAwJyk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpbnRyb0VsLnNsaWRlVXAoMTAwMCwgZnVuY3Rpb24oKSB7ICQoZG9jdW1lbnQpLm9mZignc2Nyb2xsJyk7IH0pO1xuICAgICAgICAgICQod2luZG93KS5zY3JvbGxUb3AoMCk7XG5cbiAgICAgICAgfSk7XG4gICAgICB9KSgpO1xuXG5cblxuXG5cblxuXG4vLyBFeGFtcGxlIDE6IEZyb20gYW4gZWxlbWVudCBpbiBET01cbiQoJy5vcGVuLXBvcHVwLWxpbmsnKS5tYWduaWZpY1BvcHVwKHtcbiAgdHlwZTonaW5saW5lJyxcbiAgcmVtb3ZhbERlbGF5OiA1MDAsIC8vZGVsYXkgcmVtb3ZhbCBieSBYIHRvIGFsbG93IG91dC1hbmltYXRpb25cbiAgY2FsbGJhY2tzOiB7XG4gICAgYmVmb3JlT3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgdGhpcy5zdC5tYWluQ2xhc3MgPSB0aGlzLnN0LmVsLmF0dHIoJ2RhdGEtZWZmZWN0Jyk7XG4gICAgfVxuICB9LFxuICBtaWRDbGljazogdHJ1ZSAvLyBhbGxvdyBvcGVuaW5nIHBvcHVwIG9uIG1pZGRsZSBtb3VzZSBjbGljay4gQWx3YXlzIHNldCBpdCB0byB0cnVlIGlmIHlvdSBkb24ndCBwcm92aWRlIGFsdGVybmF0aXZlIHNvdXJjZS5cbn0pO1xuXG5cblxuXG4vLyByZXNwb25zaXZlIG5hdmlnYXRpb25cblxuXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgJChcIi5idXR0b24gYVwiKS5jbGljayhmdW5jdGlvbigpe1xuXG5cbiAgICAgICBcbiAgICAgICAgJChcIi5vdmVybGF5XCIpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdidG4tb3BlbicpLnRvZ2dsZUNsYXNzKCdidG4tY2xvc2UnKTtcblxuICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLWNsb3NlXCIpKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgfSBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLW9wZW5cIikpIHtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKCdvdmVyZmxvdycsICdhdXRvJyk7XG4gICAgfVxufSk7XG4gICBcbn0pO1xuJCgnLm92ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQoXCIub3ZlcmxheVwiKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgJChcIi5idXR0b24gYVwiKS50b2dnbGVDbGFzcygnYnRuLW9wZW4nKS50b2dnbGVDbGFzcygnYnRuLWNsb3NlJyk7XG4gICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICBvcGVuID0gZmFsc2U7XG4gICAgXG59KTtcblxuXG5cblxuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpe1xuICAvL29wZW4gdGhlIGxhdGVyYWwgcGFuZWxcbiAgJCgnLmNkLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoJy5jZC1wYW5lbCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe1xuICAgICAgICBcImRpc3BsYXlcIjogXCJpbmxpbmUtYmxvY2tcIiwgXG4gICAgICAgIFwidHJhbnNpdGlvblwiOiBcImFsbCBlYXNlLWluIDVzXCIsIFxuICAgICAgICBcInRyYW5zaXRpb24tZGVsYXlcIiA6IFwiLjVzXCJcbiAgICAgIH0pO1xuXG4gIH0pO1xuICAvL2Nsb3NlIHRoZSBsYXRlcmFsIHBhbmVsXG4gICQoJy5jZC1wYW5lbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBpZiggJChldmVudC50YXJnZXQpLmlzKCcuY2QtcGFuZWwnKSB8fCAkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wYW5lbC1jbG9zZScpICkgeyBcbiAgICAgICQoJy5jZC1wYW5lbCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAkKFwiYm9keVwiKS5jc3MoJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICAgICAkKCcuY2QtcGFuZWwtY2xvc2UnKS5jc3Moe2Rpc3BsYXk6IFwibm9uZVwifSk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5cblxuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpe1xuICAvL2NhY2hlIERPTSBlbGVtZW50c1xuICB2YXIgcHJvamVjdHNDb250YWluZXIgPSAkKCcuY2QtcHJvamVjdHMtY29udGFpbmVyJyksXG4gICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlciA9IHByb2plY3RzQ29udGFpbmVyLmZpbmQoJy5jZC1wcm9qZWN0cy1wcmV2aWV3cycpLFxuICAgIHByb2plY3RQcmV2aWV3cyA9IHByb2plY3RzUHJldmlld1dyYXBwZXIuY2hpbGRyZW4oJ2xpJyksXG4gICAgcHJvamVjdHMgPSBwcm9qZWN0c0NvbnRhaW5lci5maW5kKCcuY2QtcHJvamVjdHMnKSxcbiAgICBuYXZpZ2F0aW9uVHJpZ2dlciA9ICQoJy5jZC1uYXYtdHJpZ2dlcicpLFxuICAgIG5hdmlnYXRpb24gPSAkKCcuY2QtcHJpbWFyeS1uYXYnKSxcbiAgICAvL2lmIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IENTUyB0cmFuc2l0aW9ucy4uLlxuICAgIHRyYW5zaXRpb25zTm90U3VwcG9ydGVkID0gKCAkKCcubm8tY3NzdHJhbnNpdGlvbnMnKS5sZW5ndGggPiAwKTtcblxuICB2YXIgYW5pbWF0aW5nID0gZmFsc2UsXG4gICAgLy93aWxsIGJlIHVzZWQgdG8gZXh0cmFjdCByYW5kb20gbnVtYmVycyBmb3IgcHJvamVjdHMgc2xpZGUgdXAvc2xpZGUgZG93biBlZmZlY3RcbiAgICBudW1SYW5kb21zID0gcHJvamVjdHMuZmluZCgnbGknKS5sZW5ndGgsIFxuICAgIHVuaXF1ZVJhbmRvbXMgPSBbXTtcblxuICAvL29wZW4gcHJvamVjdFxuICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLm9uKCdjbGljaycsICdhJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYoIGFuaW1hdGluZyA9PSBmYWxzZSApIHtcbiAgICAgIGFuaW1hdGluZyA9IHRydWU7XG4gICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5hZGQocHJvamVjdHNDb250YWluZXIpLmFkZENsYXNzKCdwcm9qZWN0LW9wZW4nKTtcbiAgICAgIG9wZW5Qcm9qZWN0KCQodGhpcykucGFyZW50KCdsaScpKTtcbiAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcbiAgICB9XG4gIH0pO1xuXG4gIG5hdmlnYXRpb25UcmlnZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIGlmKCBhbmltYXRpbmcgPT0gZmFsc2UgKSB7XG4gICAgICBhbmltYXRpbmcgPSB0cnVlO1xuICAgICAgaWYoIG5hdmlnYXRpb25UcmlnZ2VyLmhhc0NsYXNzKCdwcm9qZWN0LW9wZW4nKSApIHtcblxuICAgICAgICAvL2Nsb3NlIHZpc2libGUgcHJvamVjdFxuICAgICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5hZGQocHJvamVjdHNDb250YWluZXIpLnJlbW92ZUNsYXNzKCdwcm9qZWN0LW9wZW4nKTtcbiAgICAgICAgY2xvc2VQcm9qZWN0KCk7XG4gICAgICAgICQoJy5jZC1wYW5lbC1jbG9zZScpLmNzcyh7ZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIn0pO1xuICAgICAgfSBlbHNlIGlmKCBuYXZpZ2F0aW9uVHJpZ2dlci5oYXNDbGFzcygnbmF2LXZpc2libGUnKSApIHtcbiAgICAgICAgLy9jbG9zZSBtYWluIG5hdmlnYXRpb25cbiAgICAgICAgbmF2aWdhdGlvblRyaWdnZXIucmVtb3ZlQ2xhc3MoJ25hdi12aXNpYmxlJyk7XG4gICAgICAgIG5hdmlnYXRpb24ucmVtb3ZlQ2xhc3MoJ25hdi1jbGlja2FibGUgbmF2LXZpc2libGUnKTtcbiAgICAgICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIHByb2plY3RQcmV2aWV3cy5yZW1vdmVDbGFzcygnc2xpZGUtb3V0Jyk7XG4gICAgICAgIGVsc2Ugc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLCAtMSwgMCwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9vcGVuIG1haW4gbmF2aWdhdGlvblxuICAgICAgICBuYXZpZ2F0aW9uVHJpZ2dlci5hZGRDbGFzcygnbmF2LXZpc2libGUnKTtcbiAgICAgICAgbmF2aWdhdGlvbi5hZGRDbGFzcygnbmF2LXZpc2libGUnKTtcbiAgICAgICAgaWYodHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQpIHByb2plY3RQcmV2aWV3cy5hZGRDbGFzcygnc2xpZGUtb3V0Jyk7XG4gICAgICAgIGVsc2Ugc2xpZGVUb2dnbGVQcm9qZWN0cyhwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmNoaWxkcmVuKCdsaScpLCAtMSwgMCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBcblxuICAgIGlmKHRyYW5zaXRpb25zTm90U3VwcG9ydGVkKSBhbmltYXRpbmcgPSBmYWxzZTtcbiAgfSk7XG5cblxuXG5cbiAgLy9zY3JvbGwgZG93biB0byBwcm9qZWN0IGluZm9cbiAgcHJvamVjdHNDb250YWluZXIub24oJ2NsaWNrJywgJy5zY3JvbGwnLCBmdW5jdGlvbigpe1xuICAgIHByb2plY3RzQ29udGFpbmVyLmFuaW1hdGUoeydzY3JvbGxUb3AnOiQod2luZG93KS5oZWlnaHQoKX0sIDUwMCk7IFxuICB9KTtcblxuICAvL2NoZWNrIGlmIGJhY2tncm91bmQtaW1hZ2VzIGhhdmUgYmVlbiBsb2FkZWQgYW5kIHNob3cgcHJvamVjdCBwcmV2aWV3c1xuICBwcm9qZWN0UHJldmlld3MuY2hpbGRyZW4oJ2EnKS5iZ0xvYWRlZCh7XG4gICAgICBhZnRlckxvYWRlZCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHNob3dQcmV2aWV3KHByb2plY3RQcmV2aWV3cy5lcSgwKSk7XG4gICAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNob3dQcmV2aWV3KHByb2plY3RQcmV2aWV3KSB7XG4gICAgaWYocHJvamVjdFByZXZpZXcubGVuZ3RoID4gMCApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgcHJvamVjdFByZXZpZXcuYWRkQ2xhc3MoJ2JnLWxvYWRlZCcpO1xuICAgICAgICBzaG93UHJldmlldyhwcm9qZWN0UHJldmlldy5uZXh0KCkpO1xuICAgICAgfSwgMTUwKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvcGVuUHJvamVjdChwcm9qZWN0UHJldmlldykge1xuICAgIHZhciBwcm9qZWN0SW5kZXggPSBwcm9qZWN0UHJldmlldy5pbmRleCgpO1xuICAgIHByb2plY3RzLmNoaWxkcmVuKCdsaScpLmVxKHByb2plY3RJbmRleCkuYWRkKHByb2plY3RQcmV2aWV3KS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICBcbiAgICBpZiggdHJhbnNpdGlvbnNOb3RTdXBwb3J0ZWQgKSB7XG4gICAgICBwcm9qZWN0UHJldmlld3MuYWRkQ2xhc3MoJ3NsaWRlLW91dCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpJykuZXEocHJvamVjdEluZGV4KS5hZGRDbGFzcygnY29udGVudC12aXNpYmxlJyk7XG4gICAgICBhbmltYXRpbmcgPSBmYWxzZTtcbiAgICB9IGVsc2UgeyBcbiAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdFByZXZpZXdzLCBwcm9qZWN0SW5kZXgsIDAsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlUHJvamVjdCgpIHtcbiAgICBwcm9qZWN0cy5maW5kKCcuc2VsZWN0ZWQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKS5vbignd2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdjb250ZW50LXZpc2libGUnKS5vZmYoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnKTtcbiAgICAgIHNsaWRlVG9nZ2xlUHJvamVjdHMocHJvamVjdHNQcmV2aWV3V3JhcHBlci5jaGlsZHJlbignbGknKSwgLTEsIDAsIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIC8vaWYgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgQ1NTIHRyYW5zaXRpb25zLi4uXG4gICAgaWYoIHRyYW5zaXRpb25zTm90U3VwcG9ydGVkICkge1xuICAgICAgcHJvamVjdFByZXZpZXdzLnJlbW92ZUNsYXNzKCdzbGlkZS1vdXQnKTtcbiAgICAgIHByb2plY3RzLmZpbmQoJy5jb250ZW50LXZpc2libGUnKS5yZW1vdmVDbGFzcygnY29udGVudC12aXNpYmxlJyk7XG4gICAgICBhbmltYXRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIsIHByb2plY3RJbmRleCwgaW5kZXgsIGJvb2wpIHtcbiAgICBpZihpbmRleCA9PSAwICkgY3JlYXRlQXJyYXlSYW5kb20oKTtcbiAgICBpZiggcHJvamVjdEluZGV4ICE9IC0xICYmIGluZGV4ID09IDAgKSBpbmRleCA9IDE7XG5cbiAgICB2YXIgcmFuZG9tUHJvamVjdEluZGV4ID0gbWFrZVVuaXF1ZVJhbmRvbSgpO1xuICAgIGlmKCByYW5kb21Qcm9qZWN0SW5kZXggPT0gcHJvamVjdEluZGV4ICkgcmFuZG9tUHJvamVjdEluZGV4ID0gbWFrZVVuaXF1ZVJhbmRvbSgpO1xuICAgIFxuICAgIGlmKCBpbmRleCA8IG51bVJhbmRvbXMgLSAxICkge1xuICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShyYW5kb21Qcm9qZWN0SW5kZXgpLnRvZ2dsZUNsYXNzKCdzbGlkZS1vdXQnLCBib29sKTtcbiAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vYW5pbWF0ZSBuZXh0IHByZXZpZXcgcHJvamVjdFxuICAgICAgICBzbGlkZVRvZ2dsZVByb2plY3RzKHByb2plY3RzUHJldmlld1dyYXBwZXIsIHByb2plY3RJbmRleCwgaW5kZXggKyAxLCBib29sKTtcbiAgICAgIH0sIDE1MCk7XG4gICAgfSBlbHNlIGlmICggaW5kZXggPT0gbnVtUmFuZG9tcyAtIDEgKSB7XG4gICAgICAvL3RoaXMgaXMgdGhlIGxhc3QgcHJvamVjdCBwcmV2aWV3IHRvIGJlIGFuaW1hdGVkIFxuICAgICAgcHJvamVjdHNQcmV2aWV3V3JhcHBlci5lcShyYW5kb21Qcm9qZWN0SW5kZXgpLnRvZ2dsZUNsYXNzKCdzbGlkZS1vdXQnLCBib29sKS5vbmUoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpe1xuICAgICAgICBpZiggcHJvamVjdEluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgcHJvamVjdHMuY2hpbGRyZW4oJ2xpLnNlbGVjdGVkJykuYWRkQ2xhc3MoJ2NvbnRlbnQtdmlzaWJsZScpO1xuICAgICAgICAgIHByb2plY3RzUHJldmlld1dyYXBwZXIuZXEocHJvamVjdEluZGV4KS5hZGRDbGFzcygnc2xpZGUtb3V0JykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgIH0gZWxzZSBpZiggbmF2aWdhdGlvbi5oYXNDbGFzcygnbmF2LXZpc2libGUnKSAmJiBib29sICkge1xuICAgICAgICAgIG5hdmlnYXRpb24uYWRkQ2xhc3MoJ25hdi1jbGlja2FibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0c1ByZXZpZXdXcmFwcGVyLmVxKHJhbmRvbVByb2plY3RJbmRleCkub2ZmKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyk7XG4gICAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5MzUxNzU5L2phdmFzY3JpcHQtcmFuZG9tLW51bWJlci1vdXQtb2YtNS1uby1yZXBlYXQtdW50aWwtYWxsLWhhdmUtYmVlbi11c2VkXG4gIGZ1bmN0aW9uIG1ha2VVbmlxdWVSYW5kb20oKSB7XG4gICAgICB2YXIgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB1bmlxdWVSYW5kb21zLmxlbmd0aCk7XG4gICAgICB2YXIgdmFsID0gdW5pcXVlUmFuZG9tc1tpbmRleF07XG4gICAgICAvLyBub3cgcmVtb3ZlIHRoYXQgdmFsdWUgZnJvbSB0aGUgYXJyYXlcbiAgICAgIHVuaXF1ZVJhbmRvbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheVJhbmRvbSgpIHtcbiAgICAvL3Jlc2V0IGFycmF5XG4gICAgdW5pcXVlUmFuZG9tcy5sZW5ndGggPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtUmFuZG9tczsgaSsrKSB7XG4gICAgICAgICAgICB1bmlxdWVSYW5kb21zLnB1c2goaSk7XG4gICAgICAgIH1cbiAgfVxufSk7XG5cbiAvKlxuICogQkcgTG9hZGVkXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgSm9uYXRoYW4gQ2F0bXVsbFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG4gKGZ1bmN0aW9uKCQpe1xuICAkLmZuLmJnTG9hZGVkID0gZnVuY3Rpb24oY3VzdG9tKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gRGVmYXVsdCBwbHVnaW4gc2V0dGluZ3NcbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICBhZnRlckxvYWRlZCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2JnLWxvYWRlZCcpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBNZXJnZSBkZWZhdWx0IGFuZCB1c2VyIHNldHRpbmdzXG4gICAgdmFyIHNldHRpbmdzID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBjdXN0b20pO1xuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGVsZW1lbnRcbiAgICBzZWxmLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgIGJnSW1ncyA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLnNwbGl0KCcsICcpO1xuICAgICAgJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JywwKTtcbiAgICAgICQuZWFjaCggYmdJbWdzLCBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgICAgdmFyIGltZyA9IHZhbHVlLnJlcGxhY2UoL151cmxcXChbXCInXT8vLCAnJykucmVwbGFjZSgvW1wiJ10/XFwpJC8sICcnKTtcbiAgICAgICAgJCgnPGltZy8+JykuYXR0cignc3JjJywgaW1nKS5sb2FkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7IC8vIHByZXZlbnQgbWVtb3J5IGxlYWtzXG4gICAgICAgICAgJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JywkdGhpcy5kYXRhKCdsb2FkZWQtY291bnQnKSsxKTtcbiAgICAgICAgICBpZiAoJHRoaXMuZGF0YSgnbG9hZGVkLWNvdW50JykgPj0gYmdJbWdzLmxlbmd0aCkge1xuICAgICAgICAgICAgc2V0dGluZ3MuYWZ0ZXJMb2FkZWQuY2FsbCgkdGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH07XG59KShqUXVlcnkpO1xuXG5cblxuLy8gaW5pdCBjb250cm9sbGVyXG52YXIgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cbi8vIGNyZWF0ZSBhIHNjZW5lXG5uZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xuICAgICAgICBkdXJhdGlvbjogMTc1LCAgLy8gdGhlIHNjZW5lIHNob3VsZCBsYXN0IGZvciBhIHNjcm9sbCBkaXN0YW5jZSBvZiAxMDBweFxuICAgICAgICBvZmZzZXQ6IDIyMCAgICAgIC8vIHN0YXJ0IHRoaXMgc2NlbmUgYWZ0ZXIgc2Nyb2xsaW5nIGZvciA1MHB4XG4gICAgfSlcbiAgICAuc2V0UGluKFwiLmhlYWRlclwiKSAvLyBwaW5zIHRoZSBlbGVtZW50IGZvciB0aGUgdGhlIHNjZW5lJ3MgZHVyYXRpb25cbiAgICAuYWRkVG8oY29udHJvbGxlcik7IC8vIGFzc2lnbiB0aGUgc2NlbmUgdG8gdGhlIGNvbnRyb2xsZXJcblxuXG4kKCcuY29udGVudC1iZycpLnBhcmFsbGF4KHtpbWFnZVNyYzogJ2ltYWdlcy9jb250ZW50LWJnLmpwZyd9KTtcblxuXG4kKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7ICQod2luZG93KS50cmlnZ2VyKCdyZXNpemUnKTsgfSk7XG5cblxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZS5weC5wYXJhbGxheCcpO1xufSk7XG5cbiAiXX0=
