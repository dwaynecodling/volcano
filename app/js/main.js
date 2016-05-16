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



// Example 1: From an element in DOM
$('.open-popup-link').magnificPopup({
  type:'inline',
  removalDelay: 500, //delay removal by X to allow out-animation
  callbacks: {
    beforeOpen: function() {
       this.st.mainClass = this.st.el.attr('data-effect');
    }
  },
  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
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



// init controller
var controller = new ScrollMagic.Controller();

// create a scene
new ScrollMagic.Scene({
        duration: 480,  // the scene should last for a scroll distance of 100px
        offset: 300      // start this scene after scrolling for 50px
    })
    .setPin(".welcome-div") // pins the element for the the scene's duration
    .addTo(controller); // assign the scene to the controller


$('.content-bg').parallax({imageSrc: 'images/content-bg.jpg'});

$(window).scroll(function(){ $(window).trigger('resize'); });




(function() {

        // detect if IE : from http://stackoverflow.com/a/16657946    
        var ie = (function(){
          var undef,rv = -1; // Return value assumes failure.
          var ua = window.navigator.userAgent;
          var msie = ua.indexOf('MSIE ');
          var trident = ua.indexOf('Trident/');

          if (msie > 0) {
            // IE 10 or older => return version number
            rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
          } else if (trident > 0) {
            // IE 11 (or newer) => return version number
            var rvNum = ua.indexOf('rv:');
            rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
          }

          return ((rv > -1) ? rv : undef);
        }());


        // disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179          
        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        var keys = [32, 37, 38, 39, 40], wheelIter = 0;

        function preventDefault(e) {
          e = e || window.event;
          if (e.preventDefault)
          e.preventDefault();
          e.returnValue = false;  
        }

        function keydown(e) {
          for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
              preventDefault(e);
              return;
            }
          }
        }

        function touchmove(e) {
          preventDefault(e);
        }

        function wheel(e) {
          // for IE 
          //if( ie ) {
            //preventDefault(e);
          //}
        }

        function disable_scroll() {
          window.onmousewheel = document.onmousewheel = wheel;
          document.onkeydown = keydown;
          document.body.ontouchmove = touchmove;
        }

        function enable_scroll() {
          window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;  
        }

        var docElem = window.document.documentElement,
          scrollVal,
          isRevealed, 
          noscroll, 
          isAnimating,
          container = document.getElementById( 'container' ),
          trigger = container.querySelector( 'button.trigger' );

        function scrollY() {
          return window.pageYOffset || docElem.scrollTop;
        }
        
        function scrollPage() {
          scrollVal = scrollY();
          
          if( noscroll && !ie ) {
            if( scrollVal < 0 ) return false;
            // keep it that way
            window.scrollTo( 0, 0 );
          }

          if( classie.has( container, 'notrans' ) ) {
            classie.remove( container, 'notrans' );
            return false;
          }

          if( isAnimating ) {
            return false;
          }
          
          if( scrollVal <= 0 && isRevealed ) {
            toggle(0);
          }
          else if( scrollVal > 0 && !isRevealed ){
            toggle(1);
          }
        }

        function toggle( reveal ) {
          isAnimating = true;
          
          if( reveal ) {
            classie.add( container, 'modify' );
          }
          else {
            noscroll = true;
            disable_scroll();
            classie.remove( container, 'modify' );
          }

          // simulating the end of the transition:
          setTimeout( function() {
            isRevealed = !isRevealed;
            isAnimating = false;
            if( reveal ) {
              noscroll = false;
              enable_scroll();
            }
          }, 1200 );
        }

        // refreshing the page...
        var pageScroll = scrollY();
        noscroll = pageScroll === 0;
        
        disable_scroll();
        
        if( pageScroll ) {
          isRevealed = true;
          classie.add( container, 'notrans' );
          classie.add( container, 'modify' );
        }
        
        window.addEventListener( 'scroll', scrollPage );
        trigger.addEventListener( 'click', function() { toggle( 'reveal' ); } );
      })();