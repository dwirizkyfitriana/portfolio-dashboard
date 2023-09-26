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
    <>
      <FontAwesomeIcon
        icon={theme === 'dark' ? faSun : faMoon}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
    </>
  )
}

export default ThemeToggle
