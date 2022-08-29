// @ts-nocheck
const model = require("../models/model")
const tagsController = require("../controllers/tagsController")

// GET /api/tags/raw // pobranie wszystkich tagów bez konwersji na obiekty
// GET /api/tags // pobranie wszystkich tagów z konwersją na obiekty
// GET /api/tags/1 // pobranie jednego taga
// POST /api/tags // utworzenie nowego taga
// PATCH /api/photos/tags  // aktualizacja danych zdjęcia o nowy tag
// PATCH /api/photos/tags/mass // aktualizacja danych zdjęcia o tablicę nowych tag-ów
// GET /api/photos/tags/

const router = async (req, res) => {

    let id = readUrl(req.url)

    switch (req.method) {
        case "GET":
            switch (req.url) {
                case "/api/tags": selectAll(req, res); break;
                case "/api/tags/raw": selectRaw(req, res); break;
                case "/api/tags/" + id: select(req, res, id); break;
            }
            break;
        case "POST":
            if (req.url == '/api/tags') create(req, res);
            break;
        case "PATCH":
            break;
    }

}

module.exports = router

const readUrl = (url) => {
    const modules = url.split('/')
    const id = modules[modules.length - 1]
    return id
}

const selectRaw = (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
    res.end(JSON.stringify(model.raw));
}

const selectAll = (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
    res.end(JSON.stringify(model.tags));
}

const select = (req, res, id) => {
    let selectedTag = { status: "Tag doesn't exist" };
    model.tags.forEach(tag => {
        if (tag.id == id) selectedTag = tag
    })

    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
    res.end(JSON.stringify(selectedTag));
}

const create = (req, res) => {
    let capture = ''
    req.on('data', (chunk => capture += chunk))
    req.on('end', () => {
        console.log(capture);

        let newtag = JSON.parse(capture)
        newtag.id = model.tags[model.tags.length - 1].id + 1
        model.raw.push(newtag.name)
        model.tags.push(newtag)

        res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
        res.end(JSON.stringify(newtag));
    })
}

