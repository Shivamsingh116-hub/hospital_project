const mongoose = require('mongoose')
const loginSchema = new mongoose.Schema({
    username: {
        type: String,

    },
    password: {
        type: String
    },
    name: {
        type: String
    }, email: {
        type: String
    }, number: {
        type: Number
    }
})
const doctorLoginModel = mongoose.model('doctorLoginData', loginSchema)
module.exports = doctorLoginModel