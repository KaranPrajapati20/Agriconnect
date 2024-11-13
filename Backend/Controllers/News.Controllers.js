const News = require('../Models//News.Model');

const NewsContollers = async (req,res) => {
    try {
        
    const news = await News.find({});
    res.status(200).json({
        news,
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = 
{
    NewsContollers
}