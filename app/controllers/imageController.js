const model = require("../models/model");

const add = (album, file) => {

    let image = {
        id: Date.now(),
        album: album,
        original: file.name,
        name: file.path.split('\\')[2].split('_')[1],
        url: file.path,
        lastChange: "original",
        history: [
            {
                "status": "original",
                "timestamp": file.lastModifiedDate
            }
        ],
        tags: []
    }

    model.images.push(image)
    console.log(model.images)
}

module.exports = { add }

