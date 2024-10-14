function check_visivble(elm) {
    var rect = elm[0].getBoundingClientRect();
    var view_height = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - view_height >= 0);
}


function parallax_move(class_name, x, y, speed) {
    const elem = $(`.${class_name}`)
    let mx = (window.innerWidth - x * speed) / 100 * -1
    let my = (window.innerHeight - y * speed) / 100 * -1

    function parallax_s() {
        elem.css("margin-left", `${mx}px`)
        elem.css("margin-top", `${my}px`)
    }
    requestAnimationFrame(parallax_s)
}


function smooth_scroll(class_name, speed) {
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


function rotate_scroll(class_name, speed) {
    const elem = $(`.${class_name}`)
    function scroll_r() {

        let angle = (window.pageYOffset / 10) * speed
        elem.css("transform", `rotate(${angle}deg)`)

        callRot = requestAnimationFrame(scroll_r)
    }
    scroll_r();
}


function sm_slide(elem, side) {
    let left = elem.css("left")
    let right = elem.css("right")
    let width = $(".social-media").css("width")

    left = parseInt(left.substring(0, left.length - 2))
    right = parseInt(right.substring(0, right.length - 2))
    width = parseInt(width.substring(0, width.length - 2))

    function slide_anim() {
        let prct_show = (window.pageYOffset - ($("#social-media-anchor").position().top - window.innerHeight)) / window.innerHeight
        prct_show *= 2

        if (prct_show > 2) {
            // fade out 
            prct_show = 3 - prct_show
        }
        let opacity = (prct_show - .3) * 2

        if (side == 0) {
            let l = Math.min(Math.max((left - (prct_show * left)) * 3, 0), window.innerWidth * .3)
            elem.css("left", l + "px")
        } else {
            let r = Math.min(Math.max((right - (prct_show * right)) * 3, 0), window.innerWidth * .3)
            elem.css("right", r + "px")
        }

        elem.css("opacity", opacity)

        let curr_opacity = elem.css("opacity")
        curr_opacity = parseFloat(curr_opacity)

        if (curr_opacity > .5) {
            $(".social-media").css("pointer-events", "all")

        } else {
            $(".social-media").css("pointer-events", "none")
        }
        requestAnimationFrame(slide_anim)
    }
    slide_anim()
}


function texture_flash() {
    // funny (random texture flash)
    let rng = Math.floor(Math.random() * (100 - 1) + 1)
    if (rng == 5) {
        $(".texture1").css("visibility", "visible")
        setTimeout(function () {
            $(".texture1").css("visibility", "hidden");
        }, 600);
    }
}


$(document).ready(function () {
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

    $(document).on('beforeunload', function () {
        $(window).scrollTop(0);
    });

    let gallery_anchor_visible = false
    $(document).on('scroll', function () {
        if (check_visivble($(".gallery-container"))) {
            // after social media div

            if (!gallery_anchor_visible) {
                gallery_anchor_visible = true

                // $(".head").css("position", "absolute")
                // $(".head").css("top", window.pageYOffset + "px")

                // $(".head").css("transform", "scale(.7, .7")
                // $(".head").css("left", "50%").css("transform", "translateX(-50%)")

                // $(".mask").css("height", "40vh")
                // $(".mask").css("transform", "scale(0.8)")
            }



            // $(".mask")
            // $(".head").css("z-index", "-1")

            let opacity = Math.min(($(".gallery-container")[0].getBoundingClientRect().top - window.pageYOffset + window.innerHeight) / window.innerHeight * -1)
            // $(".gallery-container").css("opacity", opacity)

            $(".mask").css("filter", `blur(${opacity * 100}px)`)
            opacity = Math.max(0, Math.min(20 / (opacity)))
            $(".head").css("opacity", `${opacity}%`)


        } else {
            if (gallery_anchor_visible) {
                gallery_anchor_visible = false
                // $(".head").css("position", "fixed")
                // $(".head").css("top", 0 + "px")

                // $(".mask").css("height", "initial")
            }

            $(".mask").css("filter", `blur(${0}px)`)
            $(".head").css("opacity", `${100}%`)

        }

        // let opacity = Math.min(($(".gallery-container")[0].getBoundingClientRect().top - window.pageYOffset + window.innerHeight) / window.innerHeight * -1)
        // $(".gallery-container").css("opacity", opacity)
        // $(".head").css("filter", `blur(${opacity * 100}px)`)
    });



    // if not mobile TODO
    $(document).mousemove(function (mouse) {
        // if (!gallery_anchor_visible) {

        // }
        parallax_move("mask", mouse.pageX, mouse.pageY, 1.5)

    })


    // --- ANIMATIONS

    rotate_scroll("moth", 0.2)
    smooth_scroll("fixed-scroll", .07)
    // smooth_scroll("gallery-title", .01)
    // smooth_scroll("gallery-container", .07)
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