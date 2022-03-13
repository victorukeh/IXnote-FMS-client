import React, { useState, useEffect } from 'react'

const Photos = ({photo}) => {
  console.log(photo._id)
  return (
    <>
      <div style={{backgroundColor: 'black', width: '20px', height: '20px' }}>
          <img style={{width: '20px'}}src={`http://localhost:2000/photos/${photo.filename}`} alt=''/>
      </div>
    </>
  )
}

export default Photos
