$('.comments').masonry({
    // options...
    itemSelector: '.item',
    columnWidth: '.item',
    percentPosition: true,
    gutter: 12
});

//
 $('header nav .nav-item .nam-link').click(function (){
     const body = $("html, body");
     const scrollTo = $($(this).attr('href')).offset().top;
     body.stop().animate({scrollTop: scrollTo}, 500, 'swing', function() {
         console.log(this)
     });
 });

$(window).scroll(function(){
    const scroll = $(window).scrollTop();
    const header = $('header');
    const headerHeight = header.outerHeight();

    if (scroll >= headerHeight)
        header.addClass('.shadow');
    else
        header.removeClass('.shadow');
});

