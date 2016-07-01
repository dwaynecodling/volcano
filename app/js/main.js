/* jshint devel:true */
console.log('Look at app/js/main.js');


$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
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



$(document).ready(function(){
    $(".button a").click(function(){


       
        $(".overlay").fadeToggle(200);
       $(this).toggleClass('btn-open').toggleClass('btn-close');

       if ($(this).hasClass("btn-close")) {
        $("body").css('overflow', 'hidden');
    } else if ($(this).hasClass("btn-open")) {
        $("body").css('overflow', 'auto');
    }
});
   
});
$('.overlay').on('click', function(){
    $(".overlay").fadeToggle(200);
    $(".button a").toggleClass('btn-open').toggleClass('btn-close');
   $("body").css('overflow', 'auto');
    open = false;
    
});





jQuery(document).ready(function($){
  //open the lateral panel
  $('.cd-btn').on('click', function(event){
    event.preventDefault();
    $('.cd-panel').addClass('is-visible');
     $("body").css('overflow', 'hidden');
      $('.cd-panel-close').css({
        "display": "inline-block", 
        "transition": "all ease-in 5s", 
        "transition-delay" : ".5s"
      });

  });
  //close the lateral panel
  $('.cd-panel').on('click', function(event){
    if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) { 
      $('.cd-panel').removeClass('is-visible');
      event.preventDefault();

      $("body").css('overflow', 'auto');
       $('.cd-panel-close').css({display: "none"});
    }
  });
});




jQuery(document).ready(function($){
  //cache DOM elements
  var projectsContainer = $('.cd-projects-container'),
    projectsPreviewWrapper = projectsContainer.find('.cd-projects-previews'),
    projectPreviews = projectsPreviewWrapper.children('li'),
    projects = projectsContainer.find('.cd-projects'),
    navigationTrigger = $('.cd-nav-trigger'),
    navigation = $('.cd-primary-nav'),
    //if browser doesn't support CSS transitions...
    transitionsNotSupported = ( $('.no-csstransitions').length > 0);

  var animating = false,
    //will be used to extract random numbers for projects slide up/slide down effect
    numRandoms = projects.find('li').length, 
    uniqueRandoms = [];

  //open project
  projectsPreviewWrapper.on('click', 'a', function(event){
    event.preventDefault();
    if( animating == false ) {
      animating = true;
      navigationTrigger.add(projectsContainer).addClass('project-open');
      openProject($(this).parent('li'));
      $('.cd-panel-close').css({display: "none"});
    }
  });

  navigationTrigger.on('click', function(event){
    event.preventDefault();
    
    if( animating == false ) {
      animating = true;
      if( navigationTrigger.hasClass('project-open') ) {

        //close visible project
        navigationTrigger.add(projectsContainer).removeClass('project-open');
        closeProject();
        $('.cd-panel-close').css({display: "inline-block"});
      } else if( navigationTrigger.hasClass('nav-visible') ) {
        //close main navigation
        navigationTrigger.removeClass('nav-visible');
        navigation.removeClass('nav-clickable nav-visible');
        if(transitionsNotSupported) projectPreviews.removeClass('slide-out');
        else slideToggleProjects(projectsPreviewWrapper.children('li'), -1, 0, false);
      } else {
        //open main navigation
        navigationTrigger.addClass('nav-visible');
        navigation.addClass('nav-visible');
        if(transitionsNotSupported) projectPreviews.addClass('slide-out');
        else slideToggleProjects(projectsPreviewWrapper.children('li'), -1, 0, true);
      }
    } 

    if(transitionsNotSupported) animating = false;
  });




  //scroll down to project info
  projectsContainer.on('click', '.scroll', function(){
    projectsContainer.animate({'scrollTop':$(window).height()}, 500); 
  });

  //check if background-images have been loaded and show project previews
  projectPreviews.children('a').bgLoaded({
      afterLoaded : function(){
        showPreview(projectPreviews.eq(0));
      }
  });

  function showPreview(projectPreview) {
    if(projectPreview.length > 0 ) {
      setTimeout(function(){
        projectPreview.addClass('bg-loaded');
        showPreview(projectPreview.next());
      }, 150);
    }
  }

  function openProject(projectPreview) {
    var projectIndex = projectPreview.index();
    projects.children('li').eq(projectIndex).add(projectPreview).addClass('selected');
    
    if( transitionsNotSupported ) {
      projectPreviews.addClass('slide-out').removeClass('selected');
      projects.children('li').eq(projectIndex).addClass('content-visible');
      animating = false;
    } else { 
      slideToggleProjects(projectPreviews, projectIndex, 0, true);
    }
  }

  function closeProject() {
    projects.find('.selected').removeClass('selected').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
      $(this).removeClass('content-visible').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      slideToggleProjects(projectsPreviewWrapper.children('li'), -1, 0, false);
    });

    //if browser doesn't support CSS transitions...
    if( transitionsNotSupported ) {
      projectPreviews.removeClass('slide-out');
      projects.find('.content-visible').removeClass('content-visible');
      animating = false;
    }
  }

  function slideToggleProjects(projectsPreviewWrapper, projectIndex, index, bool) {
    if(index == 0 ) createArrayRandom();
    if( projectIndex != -1 && index == 0 ) index = 1;

    var randomProjectIndex = makeUniqueRandom();
    if( randomProjectIndex == projectIndex ) randomProjectIndex = makeUniqueRandom();
    
    if( index < numRandoms - 1 ) {
      projectsPreviewWrapper.eq(randomProjectIndex).toggleClass('slide-out', bool);
      setTimeout( function(){
        //animate next preview project
        slideToggleProjects(projectsPreviewWrapper, projectIndex, index + 1, bool);
      }, 150);
    } else if ( index == numRandoms - 1 ) {
      //this is the last project preview to be animated 
      projectsPreviewWrapper.eq(randomProjectIndex).toggleClass('slide-out', bool).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        if( projectIndex != -1) {
          projects.children('li.selected').addClass('content-visible');
          projectsPreviewWrapper.eq(projectIndex).addClass('slide-out').removeClass('selected');
        } else if( navigation.hasClass('nav-visible') && bool ) {
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
 (function($){
  $.fn.bgLoaded = function(custom) {
    var self = this;

    // Default plugin settings
    var defaults = {
      afterLoaded : function(){
        this.addClass('bg-loaded');
      }
    };

    // Merge default and user settings
    var settings = $.extend({}, defaults, custom);

    // Loop through element
    self.each(function(){
      var $this = $(this),
        bgImgs = $this.css('background-image').split(', ');
      $this.data('loaded-count',0);
      $.each( bgImgs, function(key, value){
        var img = value.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        $('<img/>').attr('src', img).load(function() {
          $(this).remove(); // prevent memory leaks
          $this.data('loaded-count',$this.data('loaded-count')+1);
          if ($this.data('loaded-count') >= bgImgs.length) {
            settings.afterLoaded.call($this);
          }
        });
      });

    });
  };
})(jQuery);








     $(function() {
  $('.dwayne-meet-the-team').hover(function() {
    $('.dwayne-meet-the-team').css('cursor', 'pointer');
    $('.dwayne-profile-image').css('opacity', '.1');
    $('.dwayne-profile-text').css('opacity', '1');
    $('.dwayne-profile-text').css('top', '10px');

  }, function() {
    // on mouseout, reset the background colour
    $('.dwayne-meet-the-team').css('cursor', '');
    $('.dwayne-profile-image').css('opacity', '');
     $('.dwayne-profile-text').css('opacity', '');
     $('.dwayne-profile-text').css('top', '');
  });
});


     $(function() {
  $('.rudy-meet-the-team').hover(function() {
    $('.rudy-meet-the-team').css('cursor', 'pointer');
    $('.rudy-profile-image').css('opacity', '.1');
    $('.rudy-profile-text').css('opacity', '1');
    $('.rudy-profile-text').css('top', '10px');

  }, function() {
    // on mouseout, reset the background colour
    $('.rudy-meet-the-team').css('cursor', '');
    $('.rudy-profile-image').css('opacity', '');
     $('.rudy-profile-text').css('opacity', '');
     $('.rudy-profile-text').css('top', '');
  });
});     


     $(function() {
  $('.liam-meet-the-team').hover(function() {
    $('.liam-meet-the-team').css('cursor', 'pointer');
    $('.liam-profile-image').css('opacity', '.1');
    $('.liam-profile-text').css('opacity', '1');
    $('.liam-profile-text').css('top', '10px');

  }, function() {
    // on mouseout, reset the background colour
    $('.liam-meet-the-team').css('cursor', '');
    $('.liam-profile-image').css('opacity', '');
     $('.liam-profile-text').css('opacity', '');
     $('.liam-profile-text').css('top', '');
  });
});     




$('.fading-slider-1, .fading-slider-2, .fading-slider-3').unslider({
animation: 'fade', autoplay: true, speed: 4000, delay: 9000, arrows: false, nav: false
});











$(window).load( function(){
  $('.services-header').animateCSS('fadeInUp');

    $('.services-list').animateCSS('fadeInUp', {delay:500});

});