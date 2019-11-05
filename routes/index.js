const router = require('express').Router()
const index = require('../controller/index')

router.use(function(req,res,next){
    next()
})



router.get('/', index.Index)
router.get('/contributor',index.Contributor)
router.get('/login', index.Login)
router.get('/catalog', index.Catalog)
router.get('/catalog/getData', index.getData)
router.get('/catalog/fetchPopUp', index.fetchPopUp)
router.get('/addUser',index.addUser)
router.get('/catalog/scaleFilter', index.scaleFilter)
router.get('/catalog/vendorFilter', index.vendorFilter)
router.post('/select',index.select)
    
//authenRENDER
    router.get('/authenFailed', index.authenFailed)

module.exports = router;