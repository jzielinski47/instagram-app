const model = require("../models/model");

const extendMetadata = () => {
    let i = 0;
    model.filters.forEach(filter => {
        let extended = {
            id: i,
            name: filter,
            desc: "",
            method: filter,
            args: ""
        }

        i++;
    })
}

const applyFilter = (file, filter) => {

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    let ext = {
        status: filter,
        timestamp: today.toISOString(),
        url: file.url
    }

    return ext
}

extendMetadata()

module.exports = { applyFilter }