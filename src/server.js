const express = require('express')
const db = require('./database/db')

const server = express()


server.use(express.static("public"))
server.use(express.urlencoded({ extended: true }))

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
    // console.log(req.query)
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    const query = `INSERT INTO places(name, image, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`
    // var { name, image, address, address2, uf, city, state, items } = body.req;
    // const values = [name, image, address, address2, uf, city, state, items]
    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    function afterInsertData(err) {
        let type = 'successful';
        if (err) {
            type = "error";
            // return console.log(err)
        } else {
            console.log('Cadastro realizado!')
            console.log(this)
        }
        console.log(`type: ${type}`)
        return res.render("create-point.html", { type })
    }

    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {

    const search = req.query.search
    console.log(`search: ${search}`)
    if (search == " ") {
        return res.render("list-results.html", { total: 0 })
    }


        db.all(`SELECT * FROM places WHERE city LIKE "%${search}%"`, function (err, rows) {
            if (err) {
                return console.log(err)
            } else {
                console.log("Aqui estão seus registros")
                console.log(rows)
            }

            const total = rows.length

            //exibir a página com os dados do db
            return res.render("list-results.html", { places: rows, total })

        })
    
})


server.listen(3000, () => {
    console.log('servidor em funcionamento...');
})
