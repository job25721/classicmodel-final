const express = require('express')
const router = express.Router()
//admin controller
const admin = require('../controller/admin')

const Database = require('../config/database')

//jobTitle must have sale
router.use(function(req,res,next){    
    let employeeNumber = 0
    if(req.session.user !== undefined) employeeNumber = parseInt(req.session.user) 
    var Permission = false
    
    Database.query('select * from `employees` where `employeeNumber` = ' + employeeNumber +' AND jobTitle like "%Sale%"',(err,data)=>{
        console.log(data);
        if(data.length > 0 ) Permission = true
        else Permission = false
        console.log(Permission);
    
        if(!Permission) res.render('pages/noPermission')
        else next()
    })
})
    

router.get('/',admin.Instock)

//fetchProduct in product admin page
router.get('/instockFetch',admin.instockData)

module.exports = router;