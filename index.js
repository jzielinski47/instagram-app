// @ts-nocheck
const http = require('http');
const port = 3000;

const imageRouter = require("./app/routes/imageRouter");
const tagsRouter = require("./app/routes/tagsRouter");
const filterRouter = require("./app/routes/filterRouter");

const server = http.createServer(async (req, res) => {

    console.log(req.url)

    if (req.url.search("/api/photos") != -1) { await imageRouter(req, res) }
    else if (req.url.search("/api/tags") != -1) { await tagsRouter(req, res) }
    else if (req.url.search("/api/filters") != -1) { await filterRouter(req, res) }

})

server.listen(port, () => console.log(`Server is running at ${port}`))