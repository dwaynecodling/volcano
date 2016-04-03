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


// Grab as much info as possible 
// outside the scroll handler for performace reasons.
var header             = document.querySelector('.content-top'),
    header_height      = getComputedStyle(header).height.split('px')[0],
    title              = header.querySelector('.header'),
    title_height       = getComputedStyle(title).height.split('px')[0],
    fix_class          = 'is--fixed';

function stickyScroll(e) {

  if( window.pageYOffset > (header_height - title_height ) / 0.6 ) {
    title.classList.add(fix_class);
  }

  if( window.pageYOffset < (header_height - title_height ) / 0.6 ) {
    title.classList.remove(fix_class);
  }
}

// Scroll handler to toggle classes.
window.addEventListener('scroll', stickyScroll, false);
