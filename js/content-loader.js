const shuffle_artworks = true
const artworks = [
    {
        "filename": "01.png",
        "title": "untitled",
        "technique": "acrylic on canvas",
        "size": "60x80 cm"
    },
    {
        "filename": "02.png",
        "title": "untitled",
        "technique": "acrylic on canvas",
        "size": "50x70 cm"
    },
    {
        "filename": "03.png",
        "title": "untitled",
        "technique": "acrylic on canvas",
        "size": "50x70 cm"
    },
    {
        "filename": "04.png",
        "title": "untitled",
        "technique": "acrylic on canvas",
        "size": "50x70 cm"
    },
    {
        "filename": "05.png",
        "title": "untitled",
        "technique": "oil on canvas",
        "size": "60x80 cm"
    }
    ,
    {
        "filename": "06.png",
        "title": "untitled",
        "technique": "oil on plywood",
        "size": "60x80 cm"
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
        let img = $("<img>").attr("src", `./artworks/${artwork.filename}`).attr("alt", artwork.title)
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
})