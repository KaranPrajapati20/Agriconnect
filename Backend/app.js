const express  = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials:true
}))

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
const DiseaseRouter = require('./Routes/Disease.Routes');
const GovermentSchem = require('./Routes/GovermnetSchem.Routes')
const FarmersRouter = require('./Routes/Farmers.Routes');
const NewsRouter = require('./Routes/News.Routes');

//routes
app.use('/api/v1/disease-detection',DiseaseRouter);
app.use('/api/v1',GovermentSchem);
app.use('/api/v1',FarmersRouter);
app.use('/api/v1',NewsRouter)


module.exports = {app}

// http://localhost:8000/api/v1/ 