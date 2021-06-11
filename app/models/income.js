const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema({
  monthlyIncome: {
    type: Number
  },
  leftover: {
    type: Number
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Income', incomeSchema)
