function isLoggedIn(req, res, next) {
    // console.log(req)
    if(req.user){
        next();
    }else{
        res.redirect('/auth')
    }
}

module.exports = isLoggedIn