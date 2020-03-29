'use strict'

const router = require('express').Router()
const { refreshValidation, renewValidation } = require('../validation')
const jwt = require('jsonwebtoken')

// if there's no token but there's refresh token
router.post('/refresh', async(req, res) => {
  // const { error } = refreshValidation(req.body)
  // console.log('here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  // if(error) {
  //   return res.status(400).send({message: 'Bad data', details: error.details.map((detail) => detail.message)})
  // }
  const refresh = req.header('refresh')
  if(!refresh) {
    return res.status(401).send({massage: 'Access Denied'})
  }

  try {
    const verified = jwt.verify(refresh, process.env.REFRESH_SECRET)
    req.user = verified
    return res.status(200).send({token: jwt.sign({_id: user._id, name: user.name}, process.env.TOKEN_SECRET)})
  } catch(err) {
    console.log(err)
    return res.status(400).send({message: 'Invalid refresh'})
  }
})

router.post('/renew', async(req, res) => {
  // const { error } = renewValidation(req.body)
  // if(error) {
  //   return res.status(400).send({message: 'Bad data', details: error.details.map((detail) => detail.message)})
  // }
  const token = req.header('Authorization') || req.header('authorization') // key in header
  if(!token) {
    return res.status(401).send({massage: 'Access Denied'})
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    return res.status(200).send({token: token})
  } catch(err) {
    const refresh = req.header('refresh')
    if(!refresh) {
      return res.status(401).send({massage: 'Access Denied'})
    }

    try {
      const verified = jwt.verify(refresh, process.env.REFRESH_SECRET)
      req.user = verified
      return res.status(200).send({token: jwt.sign({_id: user._id, name: user.name}, process.env.TOKEN_SECRET)})
    } catch(err) {
      return res.status(400).send({message: 'Access Denied'})
    }

  }
})

module.exports = router
