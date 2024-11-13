const {connectDB} = require('./DB/connectDB');
require('dotenv').config();
const {app} = require('./app.js');

connectDB()
.then(() => {
    app.listen(process.env.PORT,() => {
        console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection failed  ", error);
  });
