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
        }
    ]


function load_content() {
    // load paintings
    const container = $(".gallery")

    artworks.forEach(artwork => {
        let aw_div = $("<div>").addClass("artwork")

        let img = $("<img>").attr("src", `./artworks/${artwork.filename}`)
        let title = $("<h4>").addClass("artwork-title").text(artwork.title)
        let technique = $("<p>").addClass("artwork-technique").text(artwork.technique)
        let size = $("<p>").addClass("artwork-size").text(artwork.size)

        aw_div.append(img)
            .append(title)
            .append(technique)
            .append(size)
        container.append(aw_div)
    });
}

$(document).ready(function () {
    // load_content()
})