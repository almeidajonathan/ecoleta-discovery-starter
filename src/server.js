const express = require('express')
const db = require('./database/db')

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
    
    db.all(`SELECT * FROM places`, function(err, rows) {
                if(err) {
                    return console.log(err)
                } else {
                    console.log("Aqui estão seus registros")
                    console.log(rows)
                }
                
                const total = rows.length

                //exibir a página com os dados do db
                return res.render("list-results.html", { places: rows, total})

            })

})


server.listen(3000, () => {
    console.log('servidor em funcionamento...');
})
