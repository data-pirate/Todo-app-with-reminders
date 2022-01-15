/**
 * checks if there is a user i.e. user is logged in or not
 * @param {requeset} req
 * @param {respone} res
 * @param {next function to be called} next
 */
const isLoggedIn = (req, res, next) => {
    // console.log(req.user)
    if (req.user) {
        next();
    } else {
        res.redirect('/auth');
    }
};
module.exports = isLoggedIn;
