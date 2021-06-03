const mongoose = require('mongoose')
const Schema = mongoose.Schema

const billSchema = new Schema({
  company: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  due: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Bill', billSchema)
