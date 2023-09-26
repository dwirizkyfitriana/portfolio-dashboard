'use client'

import Image from 'next/image'
import ThemeToggle from '../atoms/ThemeToggleSignIn'

const SignInImage = () => {
  return (
    <div className='relative'>
      <Image
        className='!w-full !h-screen rounded-bl-[20%]'
        src='/assets/images/background.png'
        alt=''
        width={965}
        height={1152}
        priority
      />
      <div className='absolute w-full h-full z-10 top-0 left-0 m-0'>
        <div className='flex flex-col w-full h-4/5'>
          <div className='m-auto space-y-10'>
            <Image
              draggable={false}
              src='/assets/images/logo.svg'
              alt=''
              width={279}
              height={279}
            />
            <h1 className='font-bold text-5xl text-white'>Dwi Fitriana</h1>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </div>
  )
}

export default SignInImage
