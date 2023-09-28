'use client'

import Footer from '@/components/molecules/Footer'
import PageHeader from '@/components/molecules/PageHeader'
import Sidebar from '@/components/organism/Sidebar'
import { sidebarItems } from '@/lib/navigations'
import { ThemeProvider } from 'next-themes'
import { usePathname } from 'next/navigation'

const Provider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const title = sidebarItems.filter((item) => item.href === pathname).at(0)?.label || 'Dashboard'

  return (
    <ThemeProvider attribute='class' defaultTheme='dark' disableTransitionOnChange>
      {pathname !== '/sign-in' ? (
        <>
          <div className='grid grid-cols-[290px_1fr] h-screen w-screen'>
            <Sidebar />
            <div className='relative grid grid-rows-[83px_1fr] h-full w-full p-5 pb-12 bg-light-bg dark:bg-dark-bg'>
              <PageHeader title={title} breadcrumb={title} />
              <div className='h-full max-h-[calc(100vh-161px)] overflow-x-hidden overflow-y-scroll py-5'>
                {children}
              </div>
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
