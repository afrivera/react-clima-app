import React from 'react'

const Error = ({ mensaje }) => {
  return (
    <p className='error red darken-4'>{ mensaje }</p>
  )
}

export default Error