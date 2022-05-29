const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "voter"
    }
})

module.exports = mongoose.model('Admin', adminSchema)
