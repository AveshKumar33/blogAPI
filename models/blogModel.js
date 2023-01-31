const { mongoose } = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    title: {
        type: String,
        unique: true,
        require: true
    },
    blogger: {
        type: String
    },
    comments: {
        comment: [{
            title: {
                type: String,
                unique: false
            },
            user: {
                type: String
            },
            date:{
                type:Date,
                default:Date.now
            },
        }],
    
    },
    isPublish: {
        type: Boolean,
        default: false
    },
    date:{
       type:Date,
       default:Date.now
    }
})
const Blog = mongoose.model('Blog', blogSchema);
module.exports = { Blog };