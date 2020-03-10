'use strict'

import React from 'react'
import { getPosts } from '../../api/verify'

import '../../css/Posts.css'

const Posts = props => {
  const test = () => {
    console.log(getPosts())
  }

  return (
    <div className="posts">
      <div className="test" onClick={test}>{'sadsasdasasdasd'}</div>
    </div>
  )
}

export default Posts
