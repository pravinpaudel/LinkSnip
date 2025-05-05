const User = require('../models/userModel');
const { setUser } = require('../service/auth');

const handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if(password.length < 8)
            return res.render('signup', {error: 'Password must be at least 8 characters long'});
        if(!name || !email || !password)
            return res.render('signup', {error: 'All fields are required'});
        const user = await User.create({ name, email, password });
        const token = setUser(user);
        res.cookie('sessionId', token);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('signup', {error: 'Username already exists'});
    }
}

const handleUsserLogin = async (req, res)=> {
    const { email, password} = req.body;
    const user = await User.findOne({ email })
    if(!user) return res.render('login', {error: "Invalid username or password."});
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