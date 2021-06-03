const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
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
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
},
{
  timestamps: true
})

module.exports = mongoose.model('Expense', expenseSchema)
