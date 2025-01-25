const mongoose = require('mongoose');

var applicationSchema = new mongoose.Schema({
    jobId:{
      type: String,
      ref: 'Job',
      required: true,
    },
    email:{
      type: String,
      required: true,
    },
    linkedInUrl: {
      type: String,
      required: true,
    },
    cvUrl: {
      type: String,
      required: true,
    },

  })

var Application  = mongoose.model('Application', applicationSchema)

module.exports = Application 
