
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "C4mp0s@116",
    database: "lms"
})

module.exports = db