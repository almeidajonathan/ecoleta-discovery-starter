const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database("./src/database/database.db")

db.serialize(() => {
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         name TEXT,
    //         image TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)
    // const query = `INSERT INTO places(name, image, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`
    // const values = [
    //     "Colectoria",
    //     "https://images.unsplash.com/photo-1619641805634-b867f535071c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1184&q=80",
    //     "Guilherme Gemballa, Jardim América",
    //     "Nº 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Resíduos Eletrônico, Lâmpadas"
    // ]

    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err)
    //     } else {
    //         console.log('Cadastro realizado!')
    //         console.log(this)
    //     }
    // }

    // db.run(query, values, afterInsertData)

    // db.run(`DELETE FROM places WHERE id = ?`, [13], function(err) {
    //     if(err) {
    //         return console.log(err)
    //     } else {
    //         console.log('Registro deletado!')
    //     }
    // })

    
    //   db.run(`DELETE FROM places`, function(err) {
    //     if(err) {
    //         return console.log(err)
    //     } else {
    //         console.log('Registros deletados!')
    //     }
    // })


    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err)
    //     } else {
    //         console.log("Aqui estão seus registros")
    //         console.log(rows)
    //     }
    // })
})

module.exports = db