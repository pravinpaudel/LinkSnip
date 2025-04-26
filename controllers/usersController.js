const User = require('../models/userModel');
const { setUser } = require('../service/auth');

const handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        res.redirect('/');
        const token = setUser(user);
        res.cookie('sessionId', token);
    } catch (error) {
        console.log(error);
        res.render('signup', {error: 'User already exists'});
    }
}

const handleUsserLogin = async (req, res)=> {
    const { email, password} = req.body;
    const user = await User.findOne({ email })
    if(!user) return res.redirect('/login', {error: "Invalid username or password."});
    if(user.password !== password)
        return res.render('login', {error: 'Invalid password'});

    const token = setUser(user);
    res.cookie('sessionId', token);
    res.redirect('/');
}

module.exports = {
    handleUserSignup,
    handleUsserLogin
}