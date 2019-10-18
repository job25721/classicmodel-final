const mysql = require('mysql')

module.exports = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '',
    database: 'classicmodels'
})

// const Sequelize = require('sequelize');
// module.exports = new Sequelize('classicmodels', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
// })