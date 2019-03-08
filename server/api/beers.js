const router = require('express').Router()
const {Beers} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const beer = await Beers.findAll()
    res.json(beer)
  } catch (err) {
    next(err)
  }
})

module.exports = router
