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

// This will bring in the income model
const Income = require('./../models/income')

router.post('/create-income', requireToken, (req, res, next) => {
  req.body.income.owner = req.user._id
  const incomeData = req.body.income
  console.log('in route')
  Income.create(incomeData)
    .then(income => res.status(201).json({ income }))
    .catch(next)
})

router.get('/income', requireToken, (req, res, next) => {
  const incomeOwner = {owner: req.user._id}
  Income.find(incomeOwner)
    .populate('owner', 'email')
    .then(income => res.json(income))
    .catch(next)
})

router.patch('update-income', (req, res, next) => {
  const incomeOwner = {owner: req.user._id}
  console.log(req)
  Income.find(incomeOwner)
    .then(handle404)
    .then(foundIncome => {
      return foundIncome.updateOne()
    })
    .then(income => res.status(204).json({ income }))
    .catch(next)
})

module.exports = router
