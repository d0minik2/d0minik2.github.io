const body = document.body

function smooth_scroll (class_name) {
    const fixed_scroll = document.getElementsByClassName(class_name)[0]
    const speed = 0.1

    var offset = 0

    function scroll_s() {
        offset += (window.pageYOffset - offset) * speed

        var scroll = "translateY(-" + offset + "px) translateZ(0)"
        fixed_scroll.style.transform = scroll

        callScroll = requestAnimationFrame(scroll_s)
    }

    scroll_s();
}


$( document ).ready(function() {
    


    // $(window).on('scroll', function() {
    //     var scroll_top = $(window).scrollTop()

    //     // smooth_scroll($(".fixed-scroll"), Math.min(Math.round(scroll_top * -1, 2000)))
    //     // $(".fixed-scroll").css("top", `${Math.min(scroll_top**3 * -.000005, 2000)}px`)

    //     // $(".logo").css("width", `${Math.max(70 - scroll_top**2 * .00005, 65)}vw`) <- size

    // });


    smooth_scroll("fixed-scroll")
    
    
});