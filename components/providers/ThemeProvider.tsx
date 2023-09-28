'use client'

import { ThemeProvider as Provider } from 'next-themes'

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider attribute='class' defaultTheme='dark' disableTransitionOnChange>
      {children}
    </Provider>
  )
}

export default ThemeProvider
