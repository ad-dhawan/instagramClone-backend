const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
var multer = require('multer');
var upload = multer();

const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts');

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log("Database Connected");
    }
)

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(upload.array()); 
app.use(express.static('public'));

//Routes Middleware
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);

app.listen(8000, () => {
    console.log("Instagram Clone Backend Running at port 8000");
})