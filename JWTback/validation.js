'use strict'

const Joi = require('@hapi/joi')

// Register Validation
const registerValidation = data => {
  const schema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  }
  return Joi.validate(data, schema)
}

const loginValidation = data => {
  const schema = {
    email: Joi.string()
    .min(6)
    .required()
    .email(),
    password: Joi.string()
    .min(6)
    .required()
  }
  return Joi.validate(data, schema)
}

const refreshValidation = data => {
  const schema = {
    refresh: Joi.string()
      .required()
  }
}

const renewValidation = data => {
  const schema = {
    refresh: Joi.string()
      .required(),
    token: Joi.string()
      .required()
  }
}

module.exports.renewValidation = renewValidation
module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.refreshValidation = refreshValidation
