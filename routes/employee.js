const express = require('express')
const router = express.Router()
//admin controller
const admin = require('../controller/admin')

router.get('/',admin.Employee)
router.get('/edit',admin.editEmployee)


router.get('/fetchEmployeeData',admin.fetchEmployee)

module.exports = router;