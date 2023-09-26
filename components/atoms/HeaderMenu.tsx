import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ThemeToggle from './ThemeToggle'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

const HeaderMenu = () => {
  return (
    <div className='flex items-center justify-evenly rounded-[30px] bg-white dark:bg-dark-card-bg h-[60px] w-52 text-light-text-primary dark:text-white [&>*]:cursor-pointer'>
      <FontAwesomeIcon icon={faBell} />
      <ThemeToggle />
      <FontAwesomeIcon icon={faCircleInfo} />
      <div className='max-w-[41px] max-h-[41px]'>
        <Image
          className='rounded-full'
          src='/assets/images/avatar.png'
          alt=''
          width={41}
          height={41}
        />
      </div>
    </div>
  )
}

export default HeaderMenu
