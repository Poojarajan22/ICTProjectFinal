const mongoose = require('mongoose')

var schema = mongoose.Schema({
    title: String,
    description: String,
    requirements: String,
    location: String,
    salary: Number,
    jobType: String
})

var JobModel = mongoose.model('job', schema)

module.exports = JobModel

