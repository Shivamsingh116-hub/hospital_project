const mongoose = require('mongoose')
const patientAppointDataSchema =new mongoose.Schema({
    loginUsername: {
        type: String
    },
    currentDateSend: {
        type: String
    },
    drAppointUsername:{
        type:String
    },
    formProgress:{
        type:String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    number: {
        type: Number
    },
    disease: {
        type: String
    },
    doctorName: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    message: {
        type: String
    }
})
const patientAppointDataModel = mongoose.model('patientAppointData', patientAppointDataSchema)
module.exports = patientAppointDataModel