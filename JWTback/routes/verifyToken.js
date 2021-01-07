'use strict'

const jwt = require('jsonwebtoken')

const TOKEN_SECRET = "E8ndq&Vke4xMFJ#g3yLM+%zxVfNW_sytnRv4_+Pn!BE_AUza4AJv-+TnPBKu+9m4uSVRj"
const REFRESH_SECRET = "spdjg345fioIYUDFeirfgdffg5DG34IYSHBf34gdfgdfgdgGF4564fgdgfdf"

function verify (req, res, next) {
  const token = req.header('Authorization') || req.header('authorization') // key in header
  if(!token) {
    return res.status(401).send({massage: 'Access Denied'})
  }

  try {
    const verified = jwt.verify(token, TOKEN_SECRET)
    req.user = verified
    next()
  } catch(err) {
    res.status(400).send({message: 'Invalid Token'})

  }
}

module.exports = verify
