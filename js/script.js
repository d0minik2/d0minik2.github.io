


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
    const tween = new TimelineLite()
    const controller = new ScrollMagic.Controller()

    $(window).on('scroll', function() {
        var scroll_top = $(window).scrollTop()

        if (scroll_top < 1200) {
            // fix mask position, release when scrolled
            $(".mask").css("top", `${scroll_top}px`)
            let blur = Math.max(Math.min((scroll_top - 850)/5, 100), 0)
            $(".mask").css("filter", `blur(${blur}px)`)

        } 
    });
    

    smooth_scroll("fixed-scroll", .07)
    // smooth_scroll("social-media", .07)   

    const flight_path = {
        curviness: 2,
        autoRotate: true,
        values: [
            {x: -200, y: 0},
            {x: -500, y:0}

        ]
    }

    tween.add(
        TweenLite.to(".logo", 1, {
            bezier: flight_path,
            ease: Power1.easeInOut,
            
        })
    )

    const scene = new ScrollMagic.Scene ({
        triggerElement: ".fixed-scroll",
        duration: 2000,
        triggerHook: 0
    }).setTween(tween).addIndicators().addTo(controller);
        
    
});