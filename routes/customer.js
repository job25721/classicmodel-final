const express = require('express')
const router = express.Router()
//admin controller
const admin = require('../controller/admin')


router.get('/',admin.Customer)

//fetch customerData in customer admin page
router.get('/customerFetch',admin.fetchCustomer)
module.exports = router;