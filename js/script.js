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

        pos = Math.min(pos, window.innerHeight)
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


function sm_slide (elem, side) {
    let left = elem.css("left")
    let right = elem.css("right")
    let width = $(".social-media").css("width")

    left = parseInt(left.substring(0, left.length - 2))
    right = parseInt(right.substring(0, right.length - 2))
    width = parseInt(width.substring(0, width.length - 2))

    function slide_anim () {
        let prct_show = (window.pageYOffset - ($("#social-media-anchor").position().top - window.innerHeight))/window.innerHeight
        prct_show *= 2

        if (prct_show > 1) {
            // fade out 
            prct_show = 2 - prct_show
        }
        let opacity = (prct_show - .3) *2

        if (side == 0) {
            let l = Math.max(left - (prct_show*left), 0)
            elem.css("left", l + "px")
        } else {
            let r = Math.max(right - (prct_show*right), 0)
            elem.css("right", r + "px")
        }

        elem.css("opacity", opacity)

        let curr_opacity = elem.css("opacity")
        curr_opacity = parseFloat(curr_opacity)
        if (check_visivble($("#social-media-anchor"))) {
            $(".social-media").css("pointer-events", "all")
            
        } else {
            $(".social-media").css("pointer-events", "none")
        }
        requestAnimationFrame(slide_anim)
    }
    slide_anim()

    
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
    const anchors = [
        {
            id: "#",
            name: "main"
        },
        {
            id: "#social-media-anchor",
            name: "main"
        },
        {
            id: "#",
            name: "main"
        },
    ]

    $(document).on('beforeunload', function(){
        $(window).scrollTop(0);
    });


    $(document).on('scroll', function() {       
        if (check_visivble($(".fill"))) {
            // after social media div
            
            $(".head").css("position", "relative")
            $(".head").css("top", window.pageYOffset + "px")


            
            // $(".head").css("z-index", "-1")

            // let opacity =  Math.min(($(".fill")[0].getBoundingClientRect().top - window.pageYOffset + window.innerHeight) / window.innerHeight *-1)
            // $(".fill").css("opacity", opacity)

            // $(".head").css("filter", `blur(${opacity * 100}px)`)
            // console.log(opacity)
            
        }  else {
            $(".head").css("position", "fixed")
            $(".head").css("top", 0 + "px")
            // $(".head").css("filter", `blur(${0}px)`)
        }
        
        let opacity =  Math.min(($(".fill")[0].getBoundingClientRect().top - window.pageYOffset + window.innerHeight) / window.innerHeight *-1)
        $(".fill").css("opacity", opacity)
        // $(".head").css("filter", `blur(${opacity * 100}px)`)
    });

    // if not mobile TODO
    $(document).mousemove(function (mouse) {
        // parallax_move("mask", mouse.pageX, mouse.pageY, 1.5)
    })


    // --- ANIMATIONS
    
    smooth_scroll("fixed-scroll", .07)
    smooth_scroll("fill", .07)
    // smooth_scroll("social-media", .07)

    sm_slide($("#sm-cara"), 0)
    sm_slide($("#sm-ig"), 1) 
    sm_slide($("#sm-rb"), 0)  

    // --- animate logo letters
    smooth_scroll("logo-letter-1", .03)

    smooth_scroll("logo-letter-2", .05)

    rotate_scroll("logo-letter-3", -.1)

    smooth_scroll("logo-letter-4", .05)

    rotate_scroll("logo-letter-5", .08)

    smooth_scroll("logo-letter-6", .03)

    rotate_scroll("logo-letter-7", -.2)
});