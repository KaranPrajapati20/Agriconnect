const mongoose = require('mongoose');

const DiseaseDetailsSchema = new mongoose.Schema({
    Disease_Name : {
        type : String,
        required : true,
    },

    Disease_Details : {
        type : String,
       
    },
    Crop_Name : {
        type : String,
       
    },
    Reasons : {
        type : String,
        
    },
    Diagnosis : {
        type : String,
        
    },
    Management_Strategies : {
        type : String,
    }
})

const DiseaseDetails = mongoose.model('DiseaseDetails',DiseaseDetailsSchema);

module.exports = DiseaseDetails;