const mongoose = require('mongoose')
const User = require('./User')

const StorySchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    body : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : 'public',
        // enum will tell list of possible values
        enum : ['public' , 'private']
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Story', StorySchema)