const body = document.body


function smooth_scroll (class_name, speed) {
    const elem = document.getElementsByClassName(class_name)[0]
    var offset = 0

    function scroll_s() {
        offset += (window.pageYOffset - offset) * speed

        var scroll = `translateY(-${offset}px) translateZ(0)`
        elem.style.transform = scroll

        callScroll = requestAnimationFrame(scroll_s)
    }

    scroll_s();
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
        // $(".fixed-scroll").css("top", `${Math.min(scroll_top**3 * -.000005, 2000)}px`)
        // $(".logo").css("width", `${Math.max(70 - scroll_top**2 * .00005, 65)}vw`) <- size
        // $(".logo").css("transform", `scale(${2 / scroll_top}, scale(${2 / scroll_top})`)
        // console.log(2 / scroll_top)
        // texture_flash()

        if (scroll_top < 900) {
            // fix mask position, release when scrolled 900px
            $(".mask").css("top", `${scroll_top}px`)
        }
    });
    

    smooth_scroll("fixed-scroll", .1)
    smooth_scroll("social-media", .07)
    // smooth_shrink("logo", 10)
    
    
});