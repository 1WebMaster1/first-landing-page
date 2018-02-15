$(document).ready(function(){
$('.owl-carousel').owlCarousel({
    loop:true,
    dots: true,
    items: 1
})


    $('.nav_link').click(function(e){
        e.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('html,body').animate({
            scrollTop: top
        }, 2000)
    })


    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
            }
        }
    });

    $("#my-menu").mmenu({
        extensions: [
            'widescreen',
            'position-right',
            'pagedim-black'
         ],
         navbar:{
            title: '<img src="img/logo.png" alt="ActiveBox" />'
         },
        pageScroll : {
         scroll : true,
         update : true, 
         },
      });

    var api = $('#my-menu').data('mmenu');
    api.bind('open:finish', function() {
        $('.hamburger').addClass('is-active');
    }).bind('close:finish', function() {
        $('.hamburger').removeClass('is-active');
    })
})

