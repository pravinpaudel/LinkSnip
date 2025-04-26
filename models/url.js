const mongoose = require('mongoose')
const { Schema, model } = mongoose

const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortId: {
        type: String,
        unique: true,
        required: true
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }     
}, { timestamps: true })

const URL = model('url', urlSchema)
module.exports = URL