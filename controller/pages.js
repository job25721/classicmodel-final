const fs = require('fs');
const path = require('path')

var pathIndex = path.join(__dirname,'../pages','login.html')
var pathSuccess = path.join(__dirname,'../pages','success.html')

module.exports = {
    index (req,res){
        fs.readFile(pathIndex,(err,data)=>{
            if(err) throw err
            res.end(data)
        })
        
    }
    ,
    success (req,res){
        fs.readFile(pathSuccess,(err,data)=>{
            if(err) throw err
            res.end(data)
        })
        
    }
}