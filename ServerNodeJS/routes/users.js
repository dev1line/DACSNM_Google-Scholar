const express = require('express')
const router = express.Router()
const scholar = require('scholarly')

/* GET users listing. */
router.get('/', (req, res) => {
  let userName = req.query.user
  scholar.user(userName).then(data => {
    res.json(data)
  })
})
module.exports = router
