'use strict'

const jwt = require('jsonwebtoken')

function verify (req, res, next) {
  const token = req.header('Authorization') || req.header('authorization') // key in header
  if(!token) {
    return res.status(401).send({massage: 'Access Denied'})
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch(err) {
    res.status(400).send({message: 'Invalid Token'})

  }
}

module.exports = verify
