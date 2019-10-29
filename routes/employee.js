const express = require('express')
const router = express.Router()
//admin controller
const admin = require('../controller/admin')

router.get('/',admin.Employee)
router.get('/e',admin.e)


router.get('/fetchEmployeeData',admin.fetchEmployee)
router.post('/edit',admin.editEmployee)


module.exports = router;