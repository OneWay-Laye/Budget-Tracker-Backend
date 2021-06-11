// FIRST lets start with our require statements

// This will bring in express
const express = require('express')
// this will bring in mongoose
const mongoose = require('mongoose')
// this will bring in Passport for authentication
const passport = require('passport')

// this will bring in the express router
const router = express.Router()

// I need to bring in the custom errors
const { handle404, requireOwnership } = require('./../../lib/custom_errors')
const requireToken = passport.authenticate('bearer', {session: false})

// This will bring in the Expense model
const Expense = require('./../models/expense')

// This is to create any expense
router.post('/create-expense', requireToken, (req, res, next) => {
  // Step 1 - add expense owner by using the required token to get id
  // Step 2 - set data = to what user gives
  // then create expense using the data.
  // the results need to have a success status and we need to make it into JSON
  req.body.expense.owner = req.user._id
  const expensedata = req.body.expense
  Expense.create(expensedata)
    // .then(BadParamsError)
    .then(expense => res.status(201).json({ expense }))
    .catch(next)
})

// This will allow owner of expense to update an expense
router.patch('/update-expense/:id', requireToken, (req, res, next) => {
  // Step 1 - Delete owner off expense(:id) so other users aren't able to modify
  // the owner
  // Step 2 - set var to store both id and data user wants to update with
  // Step 3 - Find the expense with the provided :id
  // Step 4 - require ownership with 2 params
  // Step 5 - update the body of that expense with the request and then return it
  delete req.body.expense.owner
  const expenseId = req.params.id
  const expenseData = req.body.expense
  Expense.findById(expenseId)
    .then(handle404)
    .then(foundExpense => requireOwnership(req, foundExpense))
    .then((authExpense) => {
      return authExpense.updateOne(expenseData)
    })
    .then(expense => res.status(204).json())
    .catch(next)
})

// This will *Show* a specific Expense
router.get('/expense/:id', requireToken, (req, res, next) => {
// Step 1 - find expense using specific id
// Step 2 - handle 404 incase expense is not found
// Step 3 - if expense is found require ownership to insure not just anyone
//          can view this
// Step 4 - send the expense with using JSON
// This step wasnt needed but i would like to understand what everything is
  const expenseId = req.params.id
  Expense.findById(expenseId)
    .then(handle404)
    .then(foundExpense => requireOwnership(req, foundExpense))
    .then(authExpense => res.json({ authExpense }))
    .catch(next)
})

// This will Index all Expenses
router.get('/expense', requireToken, (req, res, next) => {
  // Step 1 - I like to send the params as vars for more legible code
  // Step 2 - find all expenses by the owner of
  // Step 3 - for now i would populate that large {owner} as just email
  // until you create user virtual
  const expenseOwner = {owner: req.user._id}
  Expense.find(expenseOwner)
    // .then(handle404)
    .populate('owner', 'email')
    .then(authExpenses => res.json(authExpenses))
    .catch(next)
})

// Last but not least Delete an expense
router.delete('/expense/:id', requireToken, (req, res, next) => {
// Step 1 - Find the expense you want deleted with the ID
// Step 2 - handle404 then require ownership
// Step 3 - delete the expense
// Step 4 - send the res
  const expenseId = req.params.id
  Expense.findById(expenseId)
    .then(handle404)
    .then(foundExpense => requireOwnership(req, foundExpense))
    .then(authExpense => authExpense.deleteOne())
    .then(() => res.status(204).json())
    .catch(next)
})

module.exports = router
