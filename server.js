const { config } = require('dotenv')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const patientLoginModel = require('./models/patientLogin.js')
const dbConnection = require('./datbase/dbConnection.js')
const doctorLoginModel = require('./models/doctorLogin.js')
const patientAppointDataModel = require('./models/appointment data/patientAppointData.js')
const addbillingModel = require('./models/Billing/billingModel.js')
const app = express()
app.use(express.json())
require('dotenv').config();
app.use(cors())
app.use(morgan(('dev')))
config({ path: "./.env" })
const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.post("/delete_appointment_from_doctor", async (req, res) => {
    const { _id } = req.body
    console.log(_id)
    await patientAppointDataModel.findByIdAndDelete({ _id: _id }).then((respon) => {
        console.log(respon)
    }).catch((err) => {
        res.json(err)
    })
})
app.post("/delete_appointment_from_patient", async (req, res) => {
    const { _id } = req.body
    console.log(_id)
    await patientAppointDataModel.findByIdAndDelete({ _id: _id }).then((respon) => {
        console.log(respon)
    }).catch((err) => {
        res.json(err)
    })
})
app.post("/delete_billing_data", async (req, res) => {
    const { id } = req.body
    await addbillingModel.findByIdAndDelete({ _id: id }).then((user) => {
        res.json(user)
    }).catch((err) => {
        res.json(err)
    })
})
app.post("/get_billing_data", async (req, res) => {
    const { loginUsername } = req.body
    await addbillingModel.find({ loginUsername: loginUsername }).then((respon) => {
        res.json(respon)
    }).catch((err) => {
        res.json(err)
    })
})
app.post("/add_billing", async (req, res) => {
    const { name, age, bill, loginUsername } = req.body
    await addbillingModel.create({ name: name, age: age, bill: bill, loginUsername: loginUsername }).then(async (user) => {
        res.json(user)
    }).catch((err) => {
        res.json(err)
    })
})
app.post("/_get_progress_data", async (req, res) => {
    const { formProgress, number, loginUsername } = req.body
    await patientAppointDataModel.findOneAndUpdate({ number: number }, { formProgress: formProgress }, { new: true })
        .then((respon) => {
            res.json(respon)
        }).catch((err) => {
            res.json(err)
        })
})
app.post("/get_patient_appointment_data_for_patient", async (req, res) => {
    const { loginUsername } = req.body
    await patientAppointDataModel.find({ loginUsername: loginUsername }).then((user) => {
        res.json(user)
    }).catch((err) => {
        res.json(err)
    })
})
app.post("/get_doctors_data", async (req, res) => {
    await doctorLoginModel.find().then((response) => {
        res.json(response)
    }).catch((err) => {
        res.json(err)
    })
})
app.post("/get_patient_appointment_data", async (req, res) => {
    const { username } = req.body
    await patientAppointDataModel.find({ drAppointUsername: username }).then((response) => {
        res.json(response)
    }).catch((err) => {
        res.json(err)
    })
})
app.post("/add_patient_appointment_data", async (req, res) => {
    const { loginUsername, drAppointUsername, currentDateSend, name, formProgress, email, number, date, disease, doctorName, time, message } = req.body
    const patientAppointmentData = {
        loginUsername: loginUsername, drAppointUsername: drAppointUsername, currentDateSend: currentDateSend, name: name, email: email, number: number, date: date,
        disease: disease, doctorName: doctorName, time: time, message: message, formProgress: formProgress
    }
    await patientAppointDataModel.findOne({ number: number }).then((user) => {
        if (user.number == number) {
            res.json({ success: false, message: "From this number appointment already existed. Please fill another number" })

        }
    }).catch(async () => {
        await patientAppointDataModel.create(patientAppointmentData).then(async (response) => {
            await patientAppointDataModel.find({ loginUsername: loginUsername }).then((patient) => {
                res.json(patient)

            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log("error occur in server", err)
        })
    })

})
app.post("/match_patient_login_data", async (req, res) => {
    const { username, password } = req.body

    await patientLoginModel.findOne({ username: username }).then((data) => {
        if (data) {
            if (data.password === password) {
                res.json({ success: true, message: "Patient Login Successfully", username: username })
            } else {
                res.json({ success: false, message: "Password is wrong" })
            }
        } else {
            res.json({ success: false, message: "No username found!. Please register " })
        }
    }).catch((err) => {
        res.json(err)
    })


})
app.post("/match_doctor_login_data", async (req, res) => {
    const { username, password } = req.body
    await doctorLoginModel.findOne({ username: username }).then((data) => {
        if (data) {
            if (data.password === password) {
                res.json({ success: true, message: "Doctor Login Successfully", username: username })
            } else {
                res.json({ success: false, message: "Password is wrong" })
            }
        } else {
            res.json({ success: false, message: "No username found!. Please register " })
        }
    }).catch((err) => {
        res.json(err)
    })

})
app.post('/add_doctor_login_data', async (req, res) => {
    const { username, password, name, email, number } = req.body
    await doctorLoginModel.findOne({ username: username }).then((user) => {
        if (user.username === username) {
            res.json({ success: false, message: "Username already existed" })
        }
    }).catch(async () => {

        await doctorLoginModel.findOne({ number: number }).then((user) => {
            if (user.number == number) {
                res.json({ success: false, message: "Contact number already existed" })
            }
        }).catch(async () => {
            await doctorLoginModel.create({ username: username, password: password, name: name, email: email, number: number })
                .then(() => res.json({ success: true, message: "Doctor Registraion successfull" })).catch(() => {
                    res.json({ success: false, message: "Doctor Registration not successfull!" })
                })
        })

    })
})

app.post('/add_patient_login_data', async (req, res) => {
    const { username, password, name, email, number } = req.body
    await patientLoginModel.findOne({ username: username }).then((user) => {
        if (user.username === username) {
            res.json({ success: false, message: "Username already existed" })
        }
    }).catch(async () => {

        await patientLoginModel.findOne({ number: number }).then((user) => {
            if (user.number == number) {
                res.json({ success: false, message: "Contact number already existed" })
            }
        }).catch(async () => {
            await patientLoginModel.create({ username: username, password: password, name: name, email: email, number: number })
                .then(() => res.json({ success: true, message: "Patient Registration successfull" })).catch(() => {
                    res.json({ success: false, message: "Patient Registration not successfull!" })
                })
        })

    })


})

app.listen(process.env.PORT || 6000, () => {
    console.log(`Server running on ${process.env.PORT}`)
})
