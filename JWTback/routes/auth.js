'use strict'

const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../validation')
const lodash = require('lodash')

const getSafeUser = (user) => {
  if (!user) {
    return null
  }
  return lodash.omit(user, ['password'])
}

// Register
router.post('/register', async (req, res) => {
  // Validation
  const { error } = registerValidation(req.body)
  if(error) {
    return res.status(400).send({message: 'Bad data', details: error.details.map((detail) => detail.message)})
  }

  // Checking if the user is already in the DB
  const emailExist = await User.findOne({email: req.body.email})
  if(emailExist) {
    return res.status(400).send({message: 'Email already exists'})
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  try {
    const savedUser = await user.save()
    res.status(200).send({user: getSafeUser(user.toJSON())})
  } catch(err) {
    res.status(500).send(err)
  }
})

// Login
router.post('/login', async (req, res) => {
  // Validation
  const { error } = loginValidation(req.body)
  if(error) {
    return res.status(400).send(error.details[0].message)
  }

  // Checking if the email exists
  return User.findOne({email: req.body.email}).then((user) => {
    if (!user) {
      return Promise.reject(new Error('Email or password is wrong (MAIL)'))
    }

    return bcrypt.compare(req.body.password, user.password).then((validPass) => {
      if(!validPass) {
        return Promise.reject(new Error('Email or password is wrong (PASS)'))
      }
    }).then(() => {
      return {token: jwt.sign({_id: user._id, name: user.name}, process.env.TOKEN_SECRET), refresh: jwt.sign({_id: user._id, name: user.name}, process.env.REFRESH_SECRET)}
    }).then((tokens) => {
      let {token, refresh} = tokens
      return res.status(200).send({
        user: getSafeUser(user.toJSON()),
        token,
        refresh
      })
    })
  }).catch((e) => {
    return res.status(500).send({message: e.message})
  })
})

module.exports = router
