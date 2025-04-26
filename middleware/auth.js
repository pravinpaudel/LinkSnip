const { getUser } = require('../service/auth');

const auth = (req, res, next) => {
    const sessionId = req.cookies?.sessionId // ? is used to check if the sessionId is present

    if(!sessionId)
        return res.redirect('/login');

    const user = getUser(sessionId);
    if(!user)
        return res.redirect('/login');
    req.user = user;
    next();
}

const isAuthenticated = (req, res, next) => {
    const sessionId = req.cookies?.sessionId
    const user = getUser(sessionId);
    req.user = user;
    next();
}

module.exports = {
    auth, isAuthenticated
}