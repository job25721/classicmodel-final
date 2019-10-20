const express = require('express')
const app = express()
const Database = require('../config/database')

const bcrypt = require('bcrypt');
const saltRounds = 5;


module.exports = {

    addUser(req, res) {
        empNum = parseInt(req.body.empNum)
        pswd = req.body.password
        Database.query('SELECT employeeNumber FROM employees WHERE employeeNumber = ' + empNum, (err, data) => {

            
            if (data.length > 0) {
                Database.query('SELECT employeeNumber FROM users WHERE employeeNumber = ' + empNum, (err, data2) => {
                    if (data2.length > 0) {
                        res.send("this emp already have account");
                    } else {
                        bcrypt.hash(pswd, saltRounds, function (err, hash) {
                            Database.query('INSERT INTO users(employeeNumber,pswd) VALUES(' + empNum + ',' + '"' + hash + '"' + ')')
                        });
                        res.send("added");
                    }
                })

            } else {
                res.send("no such employee data");
            }
        });
    },

    login(req, res) {
        empNum = parseInt(req.body.username)
        password = req.body.password
        Database.query('SELECT pswd FROM users WHERE employeeNumber = ' + empNum, (err, data) => {
            if(data.length > 0){
                bcrypt.compare(password.toString(), data[0].pswd, function (err, compared) {
                    if (compared) {
                        req.session.loggedin = true
                        req.session.user = empNum
                        res.redirect('/home')
                    } else {
                        res.redirect('/login')
                    }
                });
            }else{
                res.redirect('/login')
            }
            
        });
    },
    logout(req, res) {
        req.session.loggedin = false
        res.redirect('/login')
    }
}