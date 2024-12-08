const mongoose = require('mongoose')
require('dotenv').config();
const dbURI = process.env.MONGO_URI;
const dbConnection = mongoose.connect(dbURI).then(() => {
    console.log("COnnect to database")
})
module.exports = dbConnection