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
