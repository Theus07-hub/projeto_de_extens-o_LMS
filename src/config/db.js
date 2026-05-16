
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "passport",
    database: "lms"
})

module.exports = db