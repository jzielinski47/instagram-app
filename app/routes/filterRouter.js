// @ts-nocheck
const model = require("../models/model")
const filterController = require("../controllers/filterController")

// GET /api/filters // zwraca dostępne metody -> info dla programisty (opcjonalnie)
// GET /api/filters/metadata/1650305869815 // dane o zdjęciu, potrzebne do jego obróbki
// PATCH /api/filters // użycie konkretnego filtra, dane o nim przekazujemy w jsonie
// GET /uploads/nazwa_albumu/upload_a6a526ba40bc0c82f794818615184674-tint.jpg

const sharp = require("sharp");

const router = async (req, res) => {

    let id = readUrl(req.url)
    let path = readUrl(req.url)

    switch (req.method) {
        case "GET":
            switch (req.url) {
                case "/api/filters": break;
                case "/api/filters/metadata/" + id: metadata(req, res, id); break;
                case "/uploads/nazwa_albumu/" + path: break;
            }
            break;
        case "PATCH":
            switch (req.url) {
                case "/api/filters/" + id: update(req, res, id); break;
            }
            break;
    }

}

const readUrl = (url) => {
    const modules = url.split('/')
    const id = modules[modules.length - 1]
    return id
}

module.exports = router

const update = (req, res, id) => {
    let capture = ''
    req.on('data', (chunk => capture += chunk))
    req.on('end', () => {
        console.log(capture);
        let json = JSON.parse(capture)
        let selectedImage = { status: "Image doesn't exist" };
        model.images.forEach(image => {
            if (image.id == id) {

                model.filters.forEach(filter => json.forEach(el => {
                    if (el == filter) {
                        image.history.push(filterController.applyFilter(image, filter))
                    }
                }))
                selectedImage = image
                console.log(image)
            }
        })
        res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
        res.end();
    })
}

const metadata = (req, res, id) => {
    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
    res.end(JSON.stringify(image));
}