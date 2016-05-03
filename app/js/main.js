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





// Intro Full Screen page Section


(function() {
        var windowH = $(window).height(),
          introEl = $('div.opener'),
          introHeadingH = introEl.find('h1').height();
        introEl.css('padding', (windowH - introHeadingH)/2 + 'px 0');
        $(document).on('scroll', function() {
          introEl.slideUp(1000, function() { $(document).off('scroll'); });
          $(window).scrollTop(0);

        });
      })();







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
    });
});
$('.overlay').on('click', function(){
    $(".overlay").fadeToggle(200);
    $(".button a").toggleClass('btn-open').toggleClass('btn-close');
    open = false;
});


$("button").click(function(){
    $(".sf-drawer").toggleClass("out");
});




$('#loginPanel').click(function(){
            
                if ($('#userNav').is(':hidden')) {
                   
                   $('#userNav').show('slide',{direction:'left'},1000);
                } else {
                   
                   $('#userNav').hide('slide',{direction:'left'},1000);
                }
});

$('#loginPanel1').click(function(){
            
                if ($('#userNav').is(':hidden')) {
                   
                   $('#userNav').show('slide',{direction:'right'},1000);
                } else {
                   
                   $('#userNav').hide('slide',{direction:'right'},1000);
                }
});


$('#loginPanel2').click(function(){
            
                if ($('#userNav').is(':hidden')) {
                   
                   $('#userNav').show('slide',{direction:'left'},1000);
                } else {
                   
                   $('#userNav').hide('slide',{direction:'right'},1000);
                }
});


