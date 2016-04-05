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



$(function(){
  $('nav a').click(function(){
    $('nav a').removeClass("active");
    $(this).addClass("active");
});
});

// Intro Full Screen page Section  


(function() {
        var windowH = $(window).height(),
          introEl = $('div.opener'),
          introHeadingH = introEl.find('h1').height();
        introEl.css('padding', (windowH - introHeadingH)/2 + 'px 0');
        $(document).on('scroll', function() {
          introEl.slideUp(1000, function() { $(document).off('scroll'); });
        });
      })();


// init controller
var controller = new ScrollMagic.Controller();

// create a scene
new ScrollMagic.Scene({
        duration: 250,  // the scene should last for a scroll distance of 100px
        offset: 200      // start this scene after scrolling for 50px
    })
    .setPin(".header") // pins the element for the the scene's duration
    .addTo(controller); // assign the scene to the controller


// init controller
var controller = new ScrollMagic.Controller();

// create a scene
new ScrollMagic.Scene({
        duration: 110,  // the scene should last for a scroll distance of 100px
        offset: 1000      // start this scene after scrolling for 50px
    })
    .setPin(".intro-footer") // pins the element for the the scene's duration
    .addTo(controller); // assign the scene to the controller




