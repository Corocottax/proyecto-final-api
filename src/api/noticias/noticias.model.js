const mongoose = require('mongoose')


const newSchema = new mongoose.Schema({
    title: { type: String, trim: true },
    img: { type: String, trim: true },
    description: { type: String, trim: true },

}, { timestamps: true, collection: 'news'})


const News = mongoose.model('news', newSchema)
module.exports = News