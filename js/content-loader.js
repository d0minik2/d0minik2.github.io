const shuffle_artworks = true
const artworks_json = "https://raw.githubusercontent.com/d0minik2/d0minik2.github.io/refs/heads/main/js/artworks.json"

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

function load_content(artworks) {
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
    fetch(artworks_json)
        .then((response) => response.json())
        .then((json) => load_content(json.artworks));
})