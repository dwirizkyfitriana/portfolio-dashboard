'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <div
      className='absolute right-5 bottom-5 cursor-pointer'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <div className='purple-gradient w-[60px] h-[60px] rounded-full flex items-center justify-center'>
        <FontAwesomeIcon className='text-white' icon={theme === 'dark' ? faSun : faMoon} />
      </div>
    </div>
  )
}

export default ThemeToggle
