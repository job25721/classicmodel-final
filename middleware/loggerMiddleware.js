const loggerMiddleware =  function (req,res,next) {
        if(!req.session.loggedin){
            res.redirect('/authenFailed')
        }else
            next()
}

module.exports = loggerMiddleware;