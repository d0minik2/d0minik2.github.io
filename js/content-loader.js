const shuffle_artworks = true
const artworks = [
    {
        "filename": "https://live.staticflickr.com/65535/54284724939_c653b8f064_c.jpg",
        "title": "untitled",
        "technique": "acrylic on canvas",
        "size": "60x80 cm"
    },
    {
        "filename": "https://live.staticflickr.com/65535/54284910175_6ea5ea388b_c.jpg",
        "title": "untitled",
        "technique": "acrylic on canvas",
        "size": "50x70 cm"
    },
    {
        "filename": "https://live.staticflickr.com/65535/54283597002_80f546bb43_z.jpg",
        "title": "untitled",
        "technique": "acrylic on canvas",
        "size": "50x70 cm"
    },
    {
        "filename": "https://live.staticflickr.com/65535/54284910140_efa9ef1e55_z.jpg",
        "title": "untitled",
        "technique": "acrylic on canvas",
        "size": "50x70 cm"
    },
    {
        "filename": "https://live.staticflickr.com/65535/54283597067_cc5c168d99_z.jpg",
        "title": "untitled",
        "technique": "oil on canvas",
        "size": "60x80 cm"
    }
    ,
    {
        "filename": "https://live.staticflickr.com/65535/54284483376_f0948fa5ae_z.jpg",
        "title": "untitled",
        "technique": "oil on plywood",
        "size": "60x80 cm"
    },
    {
        "filename": "https://live.staticflickr.com/65535/54284731298_d3406e42f9_z.jpg",
        "title": "untitled",
        "technique": "oil on canvas",
        "size": "50x70 cm"
    },
    {
        "filename": "https://live.staticflickr.com/65535/54284731273_85f48e41a9.jpg",
        "title": "untitled",
        "technique": "acrylic on plywood",
        "size": "58x62 cm"
    },
    {
        "filename": "https://live.staticflickr.com/65535/54284724864_1d05aa9551.jpg",
        "title": "untitled",
        "technique": "acrylic on canvas",
        "size": "60x80 cm"
    },
    {
        "filename": "https://live.staticflickr.com/65535/54284724854_8a133034ee.jpg",
        "title": "untitled",
        "technique": "acrlic on canvas",
        "size": "50x50 cm"
    },
    {
        "filename": "https://live.staticflickr.com/65535/54283596952_80b0216c3a.jpg",
        "title": "untitled",
        "technique": "acrylic on plywood",
        "size": "30x40 cm"
    }
    ,
    {
        "filename": "https://live.staticflickr.com/65535/54283596932_eb0587a129.jpg",
        "title": "untitled",
        "technique": "acrylic on plywood",
        "size": "50x70 cm"
    },
    {
        "filename": "https://live.staticflickr.com/65535/54284483311_aa80357796.jpg",
        "title": "untitled",
        "technique": "acrylic on plywood",
        "size": "30x40 cm"
    },
    {
        "filename": "https://live.staticflickr.com/65535/54284724839_9de1c7dd64.jpg",
        "title": "untitled",
        "technique": "acrylic on canvas",
        "size": "50x50 cm"
    },
    {
        "filename": "https://live.staticflickr.com/65535/54284483326_985745a56d.jpg",
        "title": "untitled",
        "technique": "acrylic on canvas",
        "size": "50x70 cm"
    },
    {
        "filename": "https://live.staticflickr.com/65535/54284483276_79b95090bc.jpg",
        "title": "untitled",
        "technique": "acrylic on canvas",
        "size": "50x50 cm"
    }
]


function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

function load_content() {
    // load paintings
    const container = $(".gallery-items")

    let aw_list = []

    artworks.forEach(artwork => {
        let aw_div = $("<div>").addClass("artwork")
        let img = $("<img>").attr("src", `${artwork.filename}`)
            .attr("alt", artwork.title)
            .attr("loading", "lazy")
        let title = $("<h4>").addClass("artwork-title").text(artwork.title)
        let technique = $("<p>").addClass("artwork-technique").text(artwork.technique)
        let size = $("<p>").addClass("artwork-size").text(artwork.size)

        aw_div.append(img)
            .append(title)
            .append(technique)
            .append(size)
        aw_list.push(aw_div)
    });

    if (shuffle_artworks) {
        shuffle(aw_list)
    }

    aw_list.forEach(aw => {
        container.append(aw)
    });
}

$(document).ready(function () {
    load_content()
    // fetch('./js/artworks.json')
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));
})