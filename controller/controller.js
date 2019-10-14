const express = require('express')
const app = express()
const Database = require('../config/database')

module.exports = {
    login(req,res){
        
        var username = req.body.username
        var password = req.body.password
        
        if(username && password){
            Database.query('SELECT * FROM users WHERE username = ? AND password = ?',[username,password],
                function(err,result,fields){
                    if(result.length >0 ){
                        req.session.loggedin = true
                        req.session.username = username
                        res.redirect('/home')
                    }else{
                        res.render('pages/login')
                    }
                }
            )
        }
    },
    logout(req,res){
        req.session.loggedin = false
        res.redirect('/login')
    }
}