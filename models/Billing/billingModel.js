const mongoose = require('mongoose')
const addbillingSchema = new mongoose.Schema({

    name: {
        type: String
    },
    age: {
        type: Number,

    },
    bill: {
        type: Number
    },
    loginUsername: {
        type: String
    }
})
const addbillingModel = mongoose.model('billingData', addbillingSchema)
module.exports = addbillingModel