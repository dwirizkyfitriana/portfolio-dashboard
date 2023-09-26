'use client'

import Footer from '@/components/molecules/Footer'
import PageHeader from '@/components/molecules/PageHeader'
import Sidebar from '@/components/organism/Sidebar'
import { ThemeProvider } from 'next-themes'
import { usePathname } from 'next/navigation'

const Provider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <ThemeProvider attribute='class' defaultTheme='dark' disableTransitionOnChange>
      {pathname !== '/sign-in' ? (
        <>
          <div className='grid grid-cols-[290px_1fr]'>
            <Sidebar />
            <div className='px-5 pt-12 bg-light-bg dark:bg-dark-bg'>
              <PageHeader title='Main Dashboard' breadcrumb='Dashboard' />
              <div className='mt-7'>{children}</div>
              <Footer />
            </div>
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </ThemeProvider>
  )
}

export default Provider
