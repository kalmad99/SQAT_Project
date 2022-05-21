const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
    voterID: {
        type: String,
        required: true,
    }, 
    candidateID: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Vote', voteSchema)
