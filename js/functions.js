$.fn.is_in_viewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$.fn.overflow_fix = function () {
    if ($(this).is_in_viewport()) {
        $(this).css("overflow", "initial")
    } else {
        $(this).css("overflow", "hidden")
    }
}

$.fn.apply_transform = function (type, value, keep_inital = false) {

    if ($(this).data("transforms") == undefined) {
        $(this).data("transforms", {})

        if (keep_inital) {
            let idx = $(this).css("transform").indexOf("(")
            $(this).data("transforms")[$(this).css("transform").substr(0, idx)] = $(this).css("transform").substring(idx + 1, ($(this).css("transform").length - 1))
        }
    }
    $(this).data("transforms")[type] = value

    if (!$(this).data("transform_block")) {

        const transforms = $(this).data("transforms")

        let all_transforms = ""
        Object.keys(transforms).forEach(transform => {
            all_transforms += transform + "(" + transforms[transform] + ") "
        });

        $(this).css("transform", all_transforms)
    }

}

$.fn.block_transforms = function () {
    $(this).data("transform_block", true)
}

$.fn.unblock_transforms = function () {
    $(this).data("transform_block", false)
}



function add_smooth_scroll(elem, speed = .05, keep_inital = false) {
    elem.unblock_transforms()
    let pos = 0

    function scroll_s() {
        pos += Math.round((window.pageYOffset - pos) * speed)

        pos = Math.min(pos, window.innerHeight)
        elem.apply_transform("translateY", `${-1 * pos}px`, keep_inital)
        elem.apply_transform("translateZ", "0")

        callScroll = requestAnimationFrame(scroll_s)
    }
    scroll_s();
}


function add_rotate_scroll(elem, speed, keep_inital = false) {
    elem.unblock_transforms()
    function scroll_r() {

        if (elem.is_in_viewport()) {

            let angle = (window.pageYOffset / 10) * speed
            elem.apply_transform("rotate", `${angle}deg`, keep_inital)
        }

        callRot = requestAnimationFrame(scroll_r)
        // $("#head").overflow_fix()
    }
    scroll_r();
}


function add_parallax(elem, speed = 1) {
    elem.unblock_transforms()

    $(document).mousemove(function (mouse) {
        function parallax_s() {
            let mx = (window.innerWidth - mouse.pageX * speed) / 100 * -1
            let my = (window.innerHeight - mouse.pageY * speed) / 100 * -1

            elem.css("margin-left", `${mx}px`)
            elem.css("margin-top", `${my}px`)

        }

        requestAnimationFrame(parallax_s)
    })

}


function is_small_media() {
    return window.matchMedia("(max-width: 800px)").matches
}


function on_media_change(fn_small, fn_normal) {
    const media = window.matchMedia("(max-width: 800px)")
    if (media.matches) {
        fn_small()
    } else {
        fn_normal()
    }

    media.addEventListener("change", function () {
        if (media.matches) {
            fn_small()
        } else {
            fn_normal()
        }
    })
}


function img_bg_overlay() {
    const overlay = $(".gallery > .overlay")
    const gallery = $(".gallery")

    // fix bug when leaving by scroll

    $(".artwork > img").mouseover(function () {
        if (!is_small_media()) {
            if ($(window).scrollTop() - gallery.offset().top > 0) {

                overlay.css("background-image", `url(${$(this).attr("src")})`)
                overlay.addClass("visible")
            }
        }
    })
    $(".artwork > img").mouseleave(function () {
        overlay.removeClass("visible")
    })
}


function loader(trigger_elem) {
    const loader = $(".loader")
    console.log(loader)

    trigger_elem.on("load", function () {
        console.log("loaded")
        loader.css("animation", "fade-out 1s linear forwards")
    })
}