import React from 'react'

const Footer = () => {
  return (
    <div>
      <h1 className='absolute bottom-5 text-light-text-primary dark:text-white'>
        &copy; {new Date().getFullYear()} Dwi Fitriana. All Rights Reserved.
      </h1>
    </div>
  )
}

export default Footer
