$(document).ready(function () {
    // --- LOGO ANIMATION ---
    if (true) {
        add_smooth_scroll($(".logo-letter-1"), .02) // D
        add_rotate_scroll($(".logo-letter-1"), .1)

        add_smooth_scroll($(".logo-letter-2"), .03) // O

        add_rotate_scroll($(".logo-letter-3"), -.1) // M
        add_smooth_scroll($(".logo-letter-3"), .03)

        add_smooth_scroll($(".logo-letter-4"), .04) // I

        add_rotate_scroll($(".logo-letter-5"), .08) // N
        add_smooth_scroll($(".logo-letter-5"), .02)

        add_smooth_scroll($(".logo-letter-6"), .05) // I

        add_rotate_scroll($(".logo-letter-7"), -.2) // K
        add_smooth_scroll($(".logo-letter-7"), .02)
    }


    // on_media_change(add_smooth_scroll($(".titles > h1")), $(".titles > h1").block_transforms())


    // --- OTHER HEAD ANIMATIONS --- 
    if (true) {
        add_smooth_scroll($(".titles"), .03, false)
        // add_smooth_scroll($(".mask"), .03, true)
        // add_parallax($(".mask"), 1.5)
    }


    // --- GALLERY ANIMATIONS --- 
    if (true) {
        // add_smooth_scroll($(".gallery"), .03, false)
    }
})