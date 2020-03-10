'use strict'

// import lodash from 'lodash'
// import Promise from 'bluebird'

const lodash = require('lodash')
const Promise = require('bluebird')

let tokens = [{}]

class Auth {
  static addToken(_id, token, name) {
    tokens.push({name: token, _id: _id})
  }

  static getToken(_id) {
    return new Promise((resolve, reject) => {
      const token = tokens.find(user => user._id === _id)
      console.log(`tokens: ${{tokens}} id: ${_id}`)
      if(token === undefined) {
        return reject(new Error('did not found'))
      } else {
        return resolve(token.name)
      }
    })
    // return tokens.find(user => user._id === _id)
    // return lodash.filter(tokens, { _id: _id})
  }

  static replaceToken(_id, newToken, name) {
    tokens = tokens.filter(user => user._id != _id)
    this.addToken(_id, newToken, name)
  }
}

module.exports = Auth
