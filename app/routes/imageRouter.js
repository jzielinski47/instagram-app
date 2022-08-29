// @ts-nocheck
const model = require("../models/model")
const imageController = require("../controllers/imageController")

const fs = require("fs")
const formidable = require('formidable')

// POST /api/photos
// GET /api/photos
// GET /api/photos/123456
// DELETE /api/photos/123456
// PATCH  /api/photos

const router = async (req, res) => {

    let id = readUrl(req.url)

    switch (req.method) {
        case "GET":
            switch (req.url) {
                case "/api/photos": selectAll(req, res); break;
                case "/api/photos/" + id: select(req, res, id); break;
                case "/api/photos/tags/" + id: selectTags(req, res, id); break;
            }
            break;
        case "POST":
            switch (req.url) {
                case "/api/photos":
                    upload(req, res);
                    break;
            }
            break;
        case "DELETE":
            switch (req.url) {
                case "/api/photos/" + id:
                    remove(req, res, id)
                    break;
            }
            break;
        case "PATCH":
            switch (req.url) {
                case "/api/photos/" + id: update(req, res, id); break;
                case '/api/photos/tags/' + id: updateImageTag(req, res, id); break;
                case '/api/photos/tags/mass/' + id: updateImageTags(req, res, id); break;
            }
            break;
    }

}

module.exports = router

const readUrl = (url) => {
    const modules = url.split('/')
    const id = modules[modules.length - 1]
    return id
}

const upload = (req, res) => {
    const form = formidable({ keepExtensions: true });
    form.uploadDir = "app/upload/"

    form.parse(req, (err, fields, files) => {

        let file = files.file;
        console.log(fields, files)
        imageController.add(fields.album, file)

        res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
        res.end(JSON.stringify(model.images[model.images.length - 1], null, 5));
    });

}
const selectAll = (req, res) => {

    let test = [{ a: 2 }, { a: 3 }]

    res.writeHead(200, { 'content-type': 'application/json;charset=utf-8' });
    res.end(JSON.stringify(model.images, null, 5));
    // res.end(JSON.stringify(test, null, 5))

}

const select = (req, res, id) => {
    let selectedImage = { status: "Image doesn't exist" };
    model.images.forEach(image => {
        if (image.id == id) selectedImage = image
    })

    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
    res.end(JSON.stringify(selectedImage));
}

const remove = (req, res, id) => {
    let selectedImage = { status: "Image doesn't exist" };
    model.images.forEach(image => {
        if (image.id == id) {
            fs.unlink(image.url, (err) => { if (err) throw err; console.log('deleted file') })
            model.images.splice(model.images.indexOf(image), 1)

            selectedImage = { status: "removed image (id:" + image.id + ")" };
        }
    })

    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
    res.end(JSON.stringify(selectedImage));

}

const update = (req, res, id) => {
    let selectedImage = { status: "Image doesn't exist" };
    model.images.forEach(image => {
        if (image.id == id) {
            let index = model.images.indexOf(image)
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            let patch = { status: "zmiana " + image.history.length, timestamp: today.toISOString() }
            image.history.push(patch)
            image.lastChange = image.history[image.history.length - 1].status
            selectedImage = image
            model.images[index] = image
        }
    })

    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
    res.end(JSON.stringify(selectedImage));
}

const updateImageTag = (req, res, id) => {
    let capture = ''
    req.on('data', (chunk => capture += chunk))
    req.on('end', () => {
        console.log(capture);
        let selectedImage = { status: "Image doesn't exist" };
        model.images.forEach(image => {
            if (image.id == id) {

                let json = {
                    name: capture,
                    popularity: tagsController.getRandomInt(1, 10000)
                }

                image.tags.push(json)
                console.log(json)

                selectedImage = image
            }
        })
        res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
        res.end(selectedImage);
    })
}

const updateImageTags = (req, res, id) => {

    console.log(id)

    let capture = ''
    req.on('data', (chunk => capture += chunk))
    req.on('end', () => {
        console.log(capture);
        let json = JSON.parse(capture)
        let selectedImage = { status: "Image doesn't exist" };
        model.images.forEach(image => {
            if (image.id == id) {
                json.forEach(el => image.tags.push(el))
                selectedImage = image
                console.log(image)
            }
        })
        res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
        res.end();
    })
}

const selectTags = (req, res, id) => {
    let selectedImage = { status: "Image doesn't exist" };
    model.images.forEach(image => {
        if (image.id == id) {
            console.log(image.tags, 1)
            selectedImage = image
        }
    })

    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
    res.end(JSON.stringify(selectedImage));
}