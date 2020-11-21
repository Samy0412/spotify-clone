import React from 'react'
import '../styles/Body.scss'
import Header from './Header'

function Body({spotify}) {
  return (
    <div className="body">
      <Header spotify={spotify}/>
    </div>
  )
}

export default Body
