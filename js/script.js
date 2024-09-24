function smooth_scroll (class_name, speed) {
    const elem = $(`.${class_name}`)
    let pos = 0

    function scroll_s() {
        pos += (window.pageYOffset - pos) * speed

        elem.css("transform", `translateY(-${pos}px) translateZ(0)`)

        callScroll = requestAnimationFrame(scroll_s)
    }

    scroll_s();
}


function rotate_scroll (class_name, speed) {
    const elem = $(`.${class_name}`)
    function scroll_r() {
        
        let angle = (window.pageYOffset/10) * speed
        console.log(angle)
        elem.css("transform", `rotate(${angle}deg)`)

        callScroll = requestAnimationFrame(scroll_r)
    }

    scroll_r();
}


function texture_flash () {
    // funi (random texture flash)
    let rng = Math.floor(Math.random() * (100 - 1) + 1)
    if (rng == 5) {
        $(".texture1").css("visibility", "visible")
        setTimeout(function(){
            $(".texture1").css("visibility", "hidden");
        },600);
    }
}


$(window).on('beforeunload', function(){
    $(window).scrollTop(0);
});



$( document ).ready(function() {
    $(window).on('scroll', function() {
        var scroll_top = $(window).scrollTop()

        if (scroll_top < 1200) {
            // fix mask position, release when scrolled
            $(".mask").css("top", `${scroll_top}px`)
            let blur = Math.max(Math.min((scroll_top - 850)/5, 100), 0)
            $(".mask").css("filter", `blur(${blur}px)`)

        } 
    });
    

    // ANIMATIONS
    
    smooth_scroll("fixed-scroll", .07)
    smooth_scroll("social-media", .05)

    // --- animate logo letters
    rotate_scroll("logo-letter-1", .3)
    smooth_scroll("logo-letter-1", .03)

    rotate_scroll("logo-letter-2", -.4)
    smooth_scroll("logo-letter-2", .01)

    rotate_scroll("logo-letter-3", -.1)

    rotate_scroll("logo-letter-4", -.05)
    smooth_scroll("logo-letter-4", .05)

    rotate_scroll("logo-letter-5", .2)

    rotate_scroll("logo-letter-6", .1)
    smooth_scroll("logo-letter-6", .02)

    rotate_scroll("logo-letter-7", -.1)
    smooth_scroll("logo-letter-7", .05) 

});