const mysql = require('mysql')

module.exports = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '054613100',
    database: 'classicmodels'
})
