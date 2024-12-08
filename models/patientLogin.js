const mongoose = require('mongoose')
const patientLoginSchema = new mongoose.Schema({
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
const patientLoginModel = mongoose.model('patientLoginData', patientLoginSchema)
module.exports = patientLoginModel
