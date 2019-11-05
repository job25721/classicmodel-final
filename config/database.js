const mysql = require('mysql')
// var Sequelize = require('sequelize')

// var connection = new Sequelize('classicmodels', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
// });

// module.exports = connection ;


module.exports = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'classicmodels'
})
