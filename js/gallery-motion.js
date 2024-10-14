$(document).ready(function () {
    const gallery_container = $(".gallery-container")
    const gallery = $(".gallery")
    const gallery_overlay = $(".gallery-overlay")

    const glide = new Glide(".gallery-container", {
        type: "carousel",
        focusAt: "center",
        touchRatio: .2,
        perView: 3,
        // peek: {before: 100, after 100}
        breakpoints: {
            1024: {
                perView: 3
            },
            600: {
                perView: 1,
                peek: { before: 80, after: 80 }
            }
        }
    })
    glide.mount()

    gallery_overlay.css("background-image", `url(${$(".glide__slide--active > img").attr('src')})`)
    glide.on("swipe.end", function () {

        gallery_container.css("transform", "scale(1)");
        if (check_visivble(gallery_container)) {
            // gallery_overlay.css("opacity", .5)

        }
    })

    glide.on("swipe.start", function () {
        gallery_container.css("transform", "scale(.9)");
    })

    glide.on("run.after", function () {
        gallery_overlay.css("background-image", `url(${$(".glide__slide--active > img").attr('src')})`)
    })

    $(document).on('scroll', function () {
        let prct_show = (window.pageYOffset - (gallery_container.position().top - window.innerHeight)) / window.innerHeight
        prct_show = Math.min(Math.max(0, prct_show * 2 / 3), .6)
        gallery_overlay.css("opacity", prct_show)
        console.log(prct_show)
        // if (check_visivble(gallery_container)) {
        //     glide.index += 1
        //     glide.update()
        // }
    })




    // let hover = false;
    // // let startX;
    // // let x;
    // // let current_position;

    // gallery_container.on("mousedown", function (e) {
    //     // startX = e.offsetX - parseInt(gallery.css("left"), 10);
    //     hover = true;
    //     gallery_container.css("cursor", "grabbing");
    //     gallery_container.css("transform", "scale(.9)");

    // })
    // gallery_container.on("mouseup", function () {
    //     hover = false;
    //     gallery_container.css("cursor", "pointer");
    //     gallery_container.css("transform", "scale(1)");
    // })

    // gallery_container.on("mousemove", function (e) {
    //     if (hover) {
    //         e.preventDefault();
    //         x = e.offsetX;
    //         console.log(x, startX)
    //         gallery.children().css("transform", `translateX(${(x - startX)}px)`)
    //     }


    //     // MOVE LIST ITEMS NOT WHOLE
    // })
})
