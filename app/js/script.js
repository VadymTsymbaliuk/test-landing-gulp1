$(document).ready(function (){

    const hash = window.location.hash;

    const body = $("html, body");
    const header = $('header');
    const headerHeigth = header.outerHeight();

    scrollToElement(hash);

    function scrollToElement(selectorToScrollElement, callback = null){
            if(!selectorToScrollElement) return;

            const scrollTo = (($(selectorToScrollElement)).offset().top) - headerHeigth;

            $('header nav .nav-item.active').removeClass('active');
            body.stop().animate({scrollTop: scrollTo}, 500, 'swing', ()=> {
                $(`a.nav-link[href="${selectorToScrollElement}"]`).parent().addClass('active');
                if(callback) callback()
            });
    };

    $('.comments').masonry({
        // options...
        itemSelector: '.item',
        columnWidth: '.item',
        percentPosition: true,
        gutter: 12
    });

    $('header nav .nav-item .nav-link').click(function (){
        scrollToElement($(this).attr('href'));
    });

    $('a.navbar-brand').click(function (){
        scrollToElement($(this).attr('href'), ()=>{
            window.location.hash = '';
        });
    })

    $(window).scroll(function(){
        const scrollTo = $(window).scrollTop();

        if (scrollTo >= headerHeigth)
            header.addClass('shadow');
        else
            header.addClass('shadow');
    });

})

