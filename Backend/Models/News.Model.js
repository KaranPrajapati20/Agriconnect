const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    News_Title : {
        type : String,
        required : true,
    },

    News_Details : {
        type : String,
       
    },
    News_Date : {
        type: Date,
        default: Date.now
       
    },
    News_Picture : {
        type : String,
    }
})

const News = mongoose.model('News',NewsSchema);

module.exports = News;