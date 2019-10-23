const express = require('express')
const router = express.Router()
//admin controller
const admin = require('../controller/admin')

router.get('/',admin.Instock)

//fetchProduct in product admin page
router.get('/instockFetch',admin.instockData)

module.exports = router;