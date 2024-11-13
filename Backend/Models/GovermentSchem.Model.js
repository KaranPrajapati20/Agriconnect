const mongoose = require('mongoose');

const GovermentSchemSchema = new mongoose.Schema({
    Schem_Name : {
        type : String,
        required : true,
    },

    Schem_Details : {
        type : String,
       
    },
    Opening_Date : {
        type : String,
       
    },
    Closing_Date : {
        type : String,
    },
    Link : {
        type : String
    }
})

const GovermentSchem = mongoose.model('GovermentSchem',GovermentSchemSchema);

module.exports = GovermentSchem;