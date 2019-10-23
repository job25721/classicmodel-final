const router = require('express').Router()
const admin = require('../controller/admin')

//admin middleware
router.use(function(req,res,next){
    if(!req.session.loggedin){
        res.redirect('/authenFailed')
    }else{
        next()
    }
})

router.get('/fetchDetails',admin.fetchDetails)
router.get('/',admin.Home)
router.get('/instock',admin.Instock)
router.get('/preorder',admin.Preorder)
router.get('/status', admin.Status)
router.get('/discount', admin.Discount)
router.get('/preordermanage', admin.Preordermanage)
router.get('/customer', admin.Customer)
router.get('/employee', admin.Employee)

//fetch data in admin pages
router.get('/customerFetch',admin.fetchCustomer)
router.get('/instockFetch',admin.instockData)

module.exports = router;


