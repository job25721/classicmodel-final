const fs = require('fs');
const path = require('path')


module.exports = {
    Index (req,res){
       res.render('pages/index')
    },
    Login (req,res){
        res.render('pages/login')
    },
    Home(req,res){
        if(req.session.loggedin === true){
            res.render('pages/home')
        }else{
            res.redirect('/authenFailed')
        }
    },
    Catalog (req,res){
       res.render('pages/catalog/catalog')
    },
    Instock(req,res){
        if(req.session.loggedin === true){
            res.render('pages/ordering/instock')
        }else{
            res.redirect('/authenFailed')
        }
    },
    Preorder(req,res){
        if(req.session.loggedin === true){
            res.render('pages/ordering/pre-order') 
        }else{
            res.redirect('/authenFailed')
        }
    },
    Status(req,res){
        if(req.session.loggedin === true){
            res.render('pages/status') 
        }else{
            res.redirect('/authenFailed')
        }
    },
    Discount(req,res){
        if(req.session.loggedin === true){
            res.render('pages/discount')
        }else{
            res.redirect('/authenFailed')
        }
    },
    Preordermanage(req,res){
        if(req.session.loggedin === true){
            res.render('pages/preorder')
        }else{
            res.redirect('/authenFailed')
        }
    },
    Customer(req,res){
        if(req.session.loggedin === true){
             res.render('pages/customer')
        }else{
            res.redirect('/authenFailed')
        }
    },
    Employee(req,res){
        if(req.session.loggedin === true){
            res.render('pages/employee')
        }else{
            res.redirect('/authenFailed')
        }
    },
    success (req,res){
        if(req.session.loggedin === true){
            res.render('pages/success')
        }else{
            res.redirect('/authenFailed')
        }
    },
    authenFailed (req,res){
        res.render('pages/redirectPage')
    }
}