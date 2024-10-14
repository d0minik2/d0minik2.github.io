// /*--------------------
// Vars
// --------------------*/
// const $menu = document.querySelector('.gallery-container')
// const $items = document.querySelectorAll('.gallery')
// const $images = document.querySelectorAll('.gallery img')
// let menuWidth = $menu.clientWidth
// let itemWidth = $items[0].clientWidth
// let wrapWidth = $items.length * itemWidth

// let scrollSpeed = 0
// let oldScrollY = 0
// let scrollY = 0
// let y = 0


// /*--------------------
// Lerp
// --------------------*/
// const lerp = (v0, v1, t) => {
//     return v0 * (1 - t) + v1 * t
// }


// /*--------------------
// Dispose
// --------------------*/
// const dispose = (scroll) => {
//     gsap.set($items, {
//         x: (i) => {
//             return i * itemWidth + scroll
//         },
//         modifiers: {
//             x: (x, target) => {
//                 const s = gsap.utils.wrap(-itemWidth, wrapWidth - itemWidth, parseInt(x))
//                 return `${s}px`
//             }
//         }
//     })
// }
// dispose(0)


// /*--------------------
// Wheel
// --------------------*/
// const handleMouseWheel = (e) => {
//     scrollY -= e.deltaY * 0.9
// }


// /*--------------------
// Touch
// --------------------*/
// let touchStart = 0
// let touchX = 0
// let isDragging = false
// const handleTouchStart = (e) => {
//     touchStart = e.clientX || e.touches[0].clientX
//     isDragging = true
//     $menu.classList.add('is-dragging')
// }
// const handleTouchMove = (e) => {
//     if (!isDragging) return
//     touchX = e.clientX || e.touches[0].clientX
//     scrollY += (touchX - touchStart) * 2.5
//     touchStart = touchX
// }
// const handleTouchEnd = () => {
//     isDragging = false
//     $menu.classList.remove('is-dragging')
// }


// /*--------------------
// Listeners
// --------------------*/
// $menu.addEventListener('mousewheel', handleMouseWheel)

// $menu.addEventListener('touchstart', handleTouchStart)
// $menu.addEventListener('touchmove', handleTouchMove)
// $menu.addEventListener('touchend', handleTouchEnd)

// $menu.addEventListener('mousedown', handleTouchStart)
// $menu.addEventListener('mousemove', handleTouchMove)
// $menu.addEventListener('mouseleave', handleTouchEnd)
// $menu.addEventListener('mouseup', handleTouchEnd)

// $menu.addEventListener('selectstart', () => { return false })


// /*--------------------
// Resize
// --------------------*/
// window.addEventListener('resize', () => {
//     menuWidth = $menu.clientWidth
//     itemWidth = $items[0].clientWidth
//     wrapWidth = $items.length * itemWidth
// })


// /*--------------------
// Render
// --------------------*/
// const render = () => {
//     requestAnimationFrame(render)
//     y = lerp(y, scrollY, .1)
//     dispose(y)

//     scrollSpeed = y - oldScrollY
//     oldScrollY = y

//     gsap.to($items, {
//         // skewX: -scrollSpeed * .2,
//         // rotate: scrollSpeed * .01,
//         scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003
//     })
// }
// render()








// Created with Veloxi: https://veloxijs.com/guides/introduction/

// const { DragEvent, DragEventPlugin, Utils, createApp } = Veloxi

// const MIN_OPACITY = 0.35

// export class NextEvent {}
// export class PreviousEvent {}

// export const InfiniteCarouselPlugin = (context) => {
//   const dragEventPlugin = context.useEventPlugin(DragEventPlugin)
//   dragEventPlugin.on(DragEvent, onDrag)

//   let draggingWidth = 0
//   let totalDragging = 0
//   let container
//   let items
//   let totalItems
//   let containerX
//   let startDraggingX = 0

//   function getCurrentIndex() {
//     return parseInt(container.data.currentIndex)
//   }

//   context.onDataChanged((data) => {
//     if (data.dataName === 'currentIndex') {
//       const isDragging = startDraggingX !== 0
//       if (isDragging) {
//         updateItems(false)
//       } else {
//         update()
//       }
//     }
//   })

//   function itemWidth() {
//     return container.size.width
//   }

//   function updateOpacity() {
//     const initialX = container.position.initialX

//     items.forEach((item) => {
//       const progress = Utils.pointToViewProgress(
//         { x: initialX },
//         item,
//         itemWidth()
//       )
//       const opacity = Utils.remap(progress, 0, 1, MIN_OPACITY, 1)
//       item.opacity.set(opacity)
//     })
//   }

//   function onClick(item) {
//     const clickedIndex = items.indexOf(item)
//     if (clickedIndex === nextIndex()) {
//       context.emit(NextEvent, {})
//     } else if (clickedIndex === previousIndex()) {
//       context.emit(PreviousEvent, {})
//     }
//   }

//   function onDrag(event) {
//     if (event.isDragging) {
//       if (!startDraggingX) {
//         startDraggingX = containerX
//       }
//       container.position.set({ x: startDraggingX + event.width }, false)
//       draggingWidth = Math.abs(event.width) - totalDragging
//       updateOpacity()
//     } else {
//       if (event.width === 0) {
//         onClick(event.view)
//       }
//       startDraggingX = 0
//       totalDragging = 0
//       draggingWidth = 0
//       update()
//       if (Math.abs(event.x - event.previousX) > 5) {
//         if (event.x < event.previousX) {
//           context.emit(NextEvent, {})
//         } else if (event.x > event.previousX) {
//           context.emit(PreviousEvent, {})
//         }
//       }
//     }

//     const threshold = (container.size.width * 2) / 3
//     if (draggingWidth >= threshold) {
//       totalDragging = Math.abs(event.width) + container.size.width / 3
//       draggingWidth = container.size.width / 3
//       if (event.directions.includes('left')) {
//         context.emit(NextEvent, {})
//       } else if (event.directions.includes('right')) {
//         context.emit(PreviousEvent, {})
//       }
//     } else if (draggingWidth < -threshold) {
//       totalDragging = Math.abs(event.width) - container.size.width / 3
//       draggingWidth = -container.size.width / 3
//       if (event.directions.includes('left')) {
//         context.emit(NextEvent, {})
//       } else if (event.directions.includes('right')) {
//         context.emit(PreviousEvent, {})
//       }
//     }
//   }

//   context.setup(() => {
//     container = context.getView('container')
//     container.position.setAnimator('spring', { damping: 0.64, stiffness: 0.7 })
//     items = context.getViews('item')
//     items.forEach((item) => {
//       item.opacity.setAnimator('dynamic')
//       dragEventPlugin.addView(item)
//     })
//     totalItems = items.length
//     update()

//     window.addEventListener('resize', update)
//   })

//   function update() {
//     updateContainerPosition()
//     updateItems()
//   }

//   function updateContainerPosition() {
//     const initialX = container.position.initialX
//     containerX = initialX - getCurrentIndex() * itemWidth()
//     container.position.set({ x: containerX })
//   }

//   function localCurrentIndex() {
//     return ((getCurrentIndex() % totalItems) + totalItems) % totalItems
//   }

//   function nextIndex() {
//     return (localCurrentIndex() + 1) % totalItems
//   }

//   function previousIndex() {
//     return (localCurrentIndex() - 1 + totalItems) % totalItems
//   }

//   function updateItems(updateOpacity = true) {
//     const currentIndex = getCurrentIndex()
//     const totalWidth = itemWidth() * totalItems
//     const segment = Math.floor(currentIndex / totalItems)
//     const baseX = container.position.initialX + segment * totalWidth
//     const currentIndexPosition = baseX + localCurrentIndex() * itemWidth()
//     items.forEach((item, index) => {
//       if (updateOpacity) {
//         if (index === localCurrentIndex()) {
//           item.opacity.set(1, context.initialized)
//         } else {
//           item.opacity.set(MIN_OPACITY, context.initialized)
//         }
//       }
//       if (index === previousIndex()) {
//         item.position.set({ x: currentIndexPosition - itemWidth() })
//       } else if (index === nextIndex()) {
//         item.position.set({ x: currentIndexPosition + itemWidth() })
//       } else if (!context.initialized || index === localCurrentIndex()) {
//         item.position.set({ x: baseX + index * itemWidth() })
//       }
//     })
//   }
// }

// InfiniteCarouselPlugin.pluginName = 'InfiniteCarousel'

// const app = createApp()
// app.addPlugin(InfiniteCarouselPlugin)
// app.run()

// const container = document.querySelector(
//   '.infinite-carousel .item-container'
// )

// app.onPluginEvent(InfiniteCarouselPlugin, PreviousEvent, () => {
//   const currentIndex = parseInt(container.dataset.velDataCurrentIndex)
//   container.dataset.velDataCurrentIndex = `${currentIndex - 1}`
// })

// app.onPluginEvent(InfiniteCarouselPlugin, NextEvent, () => {
//   const currentIndex = parseInt(container.dataset.velDataCurrentIndex)
//   container.dataset.velDataCurrentIndex = `${currentIndex + 1}`
// })





// new Glider(document.querySelector('.gallery'), {
//     type: 'carousel',
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     duration: 5,
//     draggable: true,
//     arrows: {
//         prev: '.glider-prev',
//         next: '.glider-next'
//     }
// });


$(document).ready(function () {
    const gallery_container = $(".gallery-container")
    const gallery = $(".gallery")
    const gallery_overlay = $(".gallery-overlay")

    const glide = new Glide(".gallery-container", {
        type: "carousel",
        focusAt: "center",
        perView: 3
    })
    glide.mount()

    gallery_overlay.css("background-image", `url(${$(".glide__slide--active > img").attr('src')})`)
    glide.on("run.after", function () {
        gallery_overlay.css("background-image", `url(${$(".glide__slide--active > img").attr('src')})`)
        gallery_container.css("transform", "scale(1)");
        if (check_visivble($(gallery_container))) {
            // gallery_overlay.css("opacity", .5)

        }
    })

    glide.on("move", function () {
        gallery_container.css("transform", "scale(.9)");
    })

    $(document).on('scroll', function () {
        let prct_show = (window.pageYOffset - (gallery_container.position().top - window.innerHeight)) / window.innerHeight
        prct_show = Math.min(Math.max(0, prct_show * 2 / 3), .6)
        gallery_overlay.css("opacity", prct_show)
        console.log(prct_show)


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
