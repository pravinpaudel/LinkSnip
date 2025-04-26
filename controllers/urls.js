const URL = require('../models/url')
// const { nanoid } = import("nanoid");


const handleCreateShortUrl = async (req, res) => {
    console.log(req.body)
    if(!req.body.url)
        return res.status(400).json({error: 'url is required'})

    const shortId = await generateShortId();
    await URL.create({
        shortId: shortId,
        originalUrl: req.body.url,
        visitHistory: [],
        createdBy: req.user._id
    })
    return res.render('home', {id: shortId})
}

const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId })
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}
async function generateShortId() {
    const { nanoid } = await import("nanoid"); // Dynamic import inside an async function
    return nanoid(8);
}

async function generateShortId() {
    const { nanoid } = await import("nanoid"); // Dynamic import inside an async function
    return nanoid(8);
}


module.exports = { handleCreateShortUrl, handleGetAnalytics }