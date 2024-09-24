function check_visivble(elm) {
    var rect = elm[0].getBoundingClientRect();
    var view_height = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - view_height >= 0);
  }

function smooth_scroll (class_name, speed) {
    const elem = $(`.${class_name}`)
    let pos = 0

    function scroll_s() {
        pos += Math.round((window.pageYOffset - pos) * speed)

        elem.css("transform", `translateY(-${pos}px) translateZ(0)`)

        callScroll = requestAnimationFrame(scroll_s)
    }
    scroll_s();
}


function rotate_scroll (class_name, speed) {
    const elem = $(`.${class_name}`)
    function scroll_r() {
        
        let angle = (window.pageYOffset/10) * speed
        elem.css("transform", `rotate(${angle}deg)`)

        callRot = requestAnimationFrame(scroll_r)
    }
    scroll_r();
}


function parallax_move (class_name, x, y, speed) {
    const elem = $(`.${class_name}`) 
    let mx = (window.innerWidth - x * speed)/100*-1
    let my = (window.innerHeight - y * speed)/100 *-1

    elem.css("margin-left", `${mx}px`)
    elem.css("margin-top", `${my}px`)
}


function slide_in (elem, side) {
    let left = elem.css("left")
    let right = elem.css("right")
    let width = $(".social-media").css("width")

    left = parseInt(left.substring(0, left.length - 2))
    right = parseInt(right.substring(0, right.length - 2))
    width = parseInt(width.substring(0, width.length - 2))
    opacity = 0

    if (window.pageYOffset < 200) {
        elem.css("opacity", "0%")
        $(".social-media").css("pointer-events", "none")
    } else {
        // elem.css("opacity", "100%")
        $(".social-media").css("pointer-events", "fill")
    }

    function slide_anim () {
        if (side == 0) {
            left -= (window.pageYOffset*2 - window.innerHeight) /50
            left = Math.min(Math.max(left, 0), window.innerWidth/3)
            elem.css("left", left + "px")
            elem.css("opacity", 40/left)
            console.log(width/left)
        } else {
            right -= (window.pageYOffset*2 - window.innerHeight) /50
            right = Math.min(Math.max(right, 0), window.innerWidth/3)
            elem.css("right", right +"px")
            elem.css("opacity", 40/right )

        }
        requestAnimationFrame(slide_anim)
    }
    requestAnimationFrame(slide_anim)
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





$( document ).ready(function() {
    
    $(document).on('beforeunload', function(){
        $(window).scrollTop(0);
    });



    // ANIMATIONS
      
    $(document).on('scroll', function() {
        // texture_flash()
        // var scroll_top = $(window).scrollTop()
        // if (scroll_top < 1200) {
        //     if (scroll_top>850) {
        //         let blur = Math.max(Math.min((scroll_top - 850)/5, 200), 0)
        //         $(".mask").css("filter", `blur(${blur}px)`)
        //         $(".mask").css("transform", `scale(1, ${1 - blur / 200})`)
        //         $(".mask").css("left", `50%`)
        //         $(".mask").css("transform", `translateX(-50%))`)
        //     } else {
        //         $(".mask").css("filter", `blur(0px)`)
        //         $(".mask").css("transform", `scale(1, 1)`)
        //         $(".mask").css("left", `50%`)
        //         $(".mask").css("transform", `translateX(-50%))`)
        //     }
        // } 
        slide_in($("#sm-cara"), 0)
        slide_in($("#sm-ig"), 1) 
        slide_in($("#sm-rb"), 0)       
    });

    $(document).mousemove(function (mouse) {
        parallax_move("mask", mouse.pageX, mouse.pageY, 1.5)
    })
    
    smooth_scroll("fixed-scroll", .07)
    // smooth_scroll("social-media", .07)

    // --- animate logo letters
    smooth_scroll("logo-letter-1", .03)

    smooth_scroll("logo-letter-2", .05)

    rotate_scroll("logo-letter-3", -.1)

    smooth_scroll("logo-letter-4", .05)

    rotate_scroll("logo-letter-5", .08)

    smooth_scroll("logo-letter-6", .03)

    rotate_scroll("logo-letter-7", -.2)

});