const model = require("../models/model");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const extendTags = () => {
    for (let i = 0; i < model.raw.length; i++) {
        let tag = {
            id: i,
            name: model.raw[i],
            popularity: getRandomInt(1, 100000)
        }

        model.tags.push(tag)
    }

}

extendTags()

module.exports = { getRandomInt }