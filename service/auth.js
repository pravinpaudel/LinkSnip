const jwt = require('jsonwebtoken');

const setUser =  (user) => {
    const payload = {
        // ...user,
        id: user._id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // Set expiration time to 1 hour
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

const getUser = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}