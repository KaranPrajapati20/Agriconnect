const mongoose  = require('mongoose');

const connectDB = async(req,res) => {
    try {
        await mongoose.connect(`${process.env.DATABASE_URL}`)
        .then(() => {console.log("DATABASE Connected Successfully")})
    } catch (error) {
        console.log(`MongoDB Connection Error : ${error}`)
    } 
}

module.exports = 
{
    connectDB
}; 