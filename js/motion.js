$(document).ready(function () {
    // --- LOGO ANIMATION ---

    const speed_multiplier = is_small_media() ? 1 : 1
    if (true) {
        add_smooth_scroll($(".logo-letter-1"), .02 * speed_multiplier) // D
        add_rotate_scroll($(".logo-letter-1"), .4 * speed_multiplier)

        add_smooth_scroll($(".logo-letter-2"), .03 * speed_multiplier) // O

        add_rotate_scroll($(".logo-letter-3"), -.1 * speed_multiplier) // M
        add_smooth_scroll($(".logo-letter-3"), .03 * speed_multiplier)

        add_smooth_scroll($(".logo-letter-4"), .04 * speed_multiplier) // I

        add_rotate_scroll($(".logo-letter-5"), .08 * speed_multiplier) // N
        add_smooth_scroll($(".logo-letter-5"), .02 * speed_multiplier)

        add_smooth_scroll($(".logo-letter-6"), .05 * speed_multiplier) // I

        add_rotate_scroll($(".logo-letter-7"), -.2 * speed_multiplier) // K
        add_smooth_scroll($(".logo-letter-7"), .02 * speed_multiplier)
    }


    // on_media_change(add_smooth_scroll($(".titles > h1")), $(".titles > h1").block_transforms())


    // --- OTHER HEAD ANIMATIONS --- 
    if (true) {
        add_smooth_scroll($(".titles"), .03, false)
        // add_smooth_scroll($(".mask"), .03, true)
        if (!is_small_media()) {

            add_parallax($(".banner"), 1.5)
        }
    }


    // --- GALLERY ANIMATIONS --- 
    if (true) {
        // add_smooth_scroll($(".gallery"), .03, false)
    }


})

