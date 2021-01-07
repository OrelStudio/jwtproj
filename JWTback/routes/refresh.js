'use strict'

const router = require('express').Router()
const jwt = require('jsonwebtoken')

const TOKEN_SECRET = "E8ndq&Vke4xMFJ#g3yLM+%zxVfNW_sytnRv4_+Pn!BE_AUza4AJv-+TnPBKu+9m4uSVRj"
const REFRESH_SECRET = "spdjg345fioIYUDFeirfgdffg5DG34IYSHBf34gdfgdfgdgGF4564fgdgfdf"

// if there's no token but there's refresh token
router.post('/refresh', async(req, res) => {
  const refresh = req.header('refresh')
  if(refresh === 'null') {
    return res.status(401).send({massage: 'Access Denied'})
  } else {
    try {
      const verified = await jwt.verify(refresh, REFRESH_SECRET)
      req.user = verified

      return res.status(200).send({token: jwt.sign({_id: req.user._id, name: req.user.name}, TOKEN_SECRET)})
    } catch(err) {
      // console.log(err)
      return res.status(400).send({message: 'Invalid refresh'})
    }
  }

})

router.post('/renew', async(req, res) => {
  const token = req.header('Authorization') || req.header('authorization') // key in header
  if(!token) {
    return res.status(401).send({massage: 'Access Denied'})
  }

  try {
    const verified = jwt.verify(token, TOKEN_SECRET)
    req.user = verified
    return res.status(200).send({token: token})
  } catch(err) {
    const refresh = req.header('refresh')
    if(!refresh) {
      return res.status(401).send({massage: 'Access Denied'})
    }

    try {
      const verified = jwt.verify(refresh, REFRESH_SECRET)
      req.user = verified
      return res.status(200).send({token: jwt.sign({_id: user._id, name: user.name}, TOKEN_SECRET)})
    } catch(err) {
      return res.status(400).send({message: 'Access Denied'})
    }

  }
})

module.exports = router
