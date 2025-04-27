const mongoose = require ('mongoose')

const BlogSchema = new mongoose.Schema({
        title:String,
        content:String
        
})

const BlogModel = mongoose.model("Blogs",BlogSchema)
module.exports = BlogModel