const mysql = require('mysql')

module.exports = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '',
    database: 'classicmodel'
})

// const Sequelize = require('sequelize');
// module.exports = new Sequelize('classicmodels', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
// })