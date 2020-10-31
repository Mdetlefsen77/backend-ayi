const mongoose = require("mongoose");
const User = require('./User')
const Shopping = require('./Shopping')
const Comercio = require('./Comercio')



const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

module.exports = {User, Shopping, Comercio, pointSchema}