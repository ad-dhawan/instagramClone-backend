const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')

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

//Routes Middleware
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);

app.listen(8000, () => {
    console.log("Instagram Clone Backend Running at port 8000");
})