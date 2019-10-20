const Database = require('../config/database')
const bcrypt = require('bcrypt');
const saltRounds = 5;
module.exports = {
    scaleFilter(req, res) {
        Database.query('SELECT DISTINCT productScale FROM products', function (err, data, fields) {
            res.json(data);
        });
    },
    vendorFilter(req, res) {
        Database.query('SELECT DISTINCT productVendor FROM products', function (err, data, fields) {            
            res.json(data);
        });
    },
    fetchDetails(req,res){
        var empNum = parseInt(req.session.user) 
        Database.query('SELECT firstName,lastName,jobTitle FROM employees WHERE employeeNumber =' + empNum,(err,data)=>{
            
            res.json(data)
        })
    },
    
    select (req,res){
        user = parseInt(req.body.num) 
        pass = req.body.pass
        
        
        Database.query('SELECT pswd FROM users WHERE employeeNumber = ' + user,(err,data)=>{
            
            if(data.length > 0){
                bcrypt.compare(pass.toString(), data[0].pswd, function(err, bool) {
                    res.send("Password Match : " + bool)
                });
            }else{
                res.send("no such employee")
            }           
            
        })
        
    },
    
}