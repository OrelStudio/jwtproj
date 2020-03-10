'use strict'

const router = require('express').Router()
const verify = require('./verifyToken')

router.get('/', verify, (req, res) => {
  res.json({
    post: {
      title: 'my post',
      description: 'post data'
    }
  })
})

module.exports = router
