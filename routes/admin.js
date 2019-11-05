const express = require('express')
const router = express.Router()
const admin = require('../controller/admin')

//call another routes
//const customer = require('./customer')

//use logger middleware to admin 
router.use(require('../Middleware/loggerMiddleware'))

// admin/-------
router.get('/',admin.Home)
router.get('/status', admin.Status)
router.get('/preordermanage', admin.Preordermanage)

//multiRouters
// admin/----/------
router.use('/customer',require('./customer'))
router.use('/employee',require('./employee'))
router.use('/instock',require('./product'))
router.use('/preorder',require('./preorder'))
router.use('/discount', require('./discount'))

//fetch data in all admin pages
router.get('/fetchDetails',admin.fetchDetails)



module.exports = router;


