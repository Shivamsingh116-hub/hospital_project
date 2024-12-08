const mongoose = require('mongoose')
const dbConnection = mongoose.connect('mongodb://0.0.0.0/hospitalData').then(() => {
    console.log("COnnect to database")
})
module.exports = dbConnection