// FIRST lets start with our require statements

// This will bring in express
const express = require('express')

// this will bring in the express router
const router = express.Router()

//

// This will bring in the Bill model
const Bill = require('./../models/bill')

router.post('/create-bill', (req, res, next) => {
  const billdata = req.body.bill
  Bill.create(billdata)
    .then(bill => res.status(201).json({ bill }))
    .catch(next)
})


module.exports = router
