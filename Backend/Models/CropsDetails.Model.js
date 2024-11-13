const mongoose = require('mongoose');

const CropsDetailsSchema = new mongoose.Schema({
    Crop_Name : {
        type : String,
        required : true,
        unique : true
    },

    Weather : {
        type : String,
    },
    Soils : {
        type : String,
    },
    Water_Treatment : {
        type : String,
    },
    Minerals_and_Nutrients : {
        type : String,
    },
    Additional_Tips : {
        type : String,
    }
})

const CropsDetails = mongoose.model('CropsDetails',CropsDetailsSchema);

module.exports = CropsDetails;