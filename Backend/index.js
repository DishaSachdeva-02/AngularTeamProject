const express = require('express');
const bodyparser= require('body-parser');
const cors = require('cors');
require('dotenv').config()
const app = express();
const mongoose=require('mongoose');
const members_route=require('./routes/member')
app.use(cors());
app.use(express.json());
// app.use(bodyparser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on('error' , ()=>{

    console.log('MongoDb connection error.....');

})
const port = process.env.PORT;
app.use('/users',members_route)
app.listen(port , ()=>{

    console.log(`Server is running on port ${port}....`);

})