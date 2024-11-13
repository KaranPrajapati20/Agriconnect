const GovermentSchem = require('../Models/GovermentSchem.Model');

const GovermentSchems = async (req,res) => {
    try {
        
    const GovermentSchems = await GovermentSchem.find({});

    res.status(200).json({
        GovermentSchems,
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = 
{
    GovermentSchems
}