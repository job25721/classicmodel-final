const express = require('express')
const app = express()
const Database = require('../config/database')


module.exports = {
    
    
    login(req,res){
        
        
    },
    logout(req,res){
        req.session.loggedin = false
        res.redirect('/login')
    }
}