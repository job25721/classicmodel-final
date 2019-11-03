const express = require('express');
const router = express.Router();

const admin = require('../controller/admin')

router.use(function(req,res,next){
    next()
})

router.get('/',admin.Discount)
router.get('/discountShow',admin.discountShow)
router.post('/discountDel',admin.discountDel)
router.post('/addDiscount',admin.addDiscount)


module.exports = router;