const express = require('express')
const router = express.Router()
//admin controller
const admin = require('../controller/admin')

router.get('/',admin.Preorder)

module.exports = router;