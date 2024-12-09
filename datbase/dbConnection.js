const mongoose = require('mongoose')
const { config } = require('dotenv')
require('dotenv').config();
const dbURI = process.env.MONGO_URI
const dbConnection = mongoose.connect(dbURI).then(() => {
    console.log("COnnect to database")
}).catch((err) => {
    console.log(err)
})
module.exports = dbConnection