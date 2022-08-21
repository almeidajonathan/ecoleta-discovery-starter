const express = require('express')

const server = express()


server.use(express.static("public"))

//utilizando template engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurando as rotas
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("list-results.html")
})


server.listen(3000, () => {
    console.log('servidor em funcionamento...');
})
