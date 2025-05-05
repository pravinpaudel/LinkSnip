const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const connectDB = require('./connectDb')
const { auth, isAuthenticated } = require('./middleware/auth');


const urlRoutes = require('./routes/url')
const URL = require('./models/url')
const staticRouter = require('./routes/staticRouter')
const userRouter = require('./routes/userRouter')
const PORT = 3000

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use(express.json())
app.use(express.urlencoded({extended: false})); // to parse the body of the form request
app.use(cookieParser())

app.use('/url', auth, urlRoutes)
app.use('/', isAuthenticated, staticRouter)
app.use('/user', userRouter)
app.get('/url/:shortId', async(req, res) => {
    const shortId = req.params.shortId
    const url = await URL.findOneAndUpdate({shortId}, {$push: {visitHistory: {timestamp: Date.now()}}})
    if(!url) return res.status(400).json({error: 'url not found'})
    res.redirect(url.originalUrl)
})
app.get('/logout', (req, res) => {
    res.clearCookie('sessionId')
    res.redirect('/login')
})

console.log('Connecting to DB...')
// Connect to the database
await connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


