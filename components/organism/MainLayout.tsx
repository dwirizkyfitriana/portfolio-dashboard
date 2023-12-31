'use client'

import { pathMapper } from '@/lib/navigations'
import { redirect, usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import PageHeader from '../molecules/PageHeader'
import Footer from '../molecules/Footer'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()

  const pathname = usePathname()

  const pathMap = pathMapper.get(pathname)

  const title = pathMap?.title || 'Main Dashboard'
  const breadcrumb = pathMap?.breadCrumb || 'Dashboard'

  useEffect(() => {
    if (session === undefined) return
    if (pathname !== '/sign-in' && !session) redirect('/sign-in')
  }, [pathname, session])

  return (
    <>
      {pathname !== '/sign-in' ? (
        <div className='grid grid-cols-[290px_1fr] h-screen w-screen'>
          <Sidebar />
          <div className='relative grid grid-rows-[83px_1fr] h-full w-full p-5 pb-12 bg-light-bg dark:bg-dark-bg'>
            <PageHeader title={title} breadcrumb={breadcrumb} />
            <div className='h-full max-h-[calc(100vh-161px)] overflow-x-hidden overflow-y-scroll py-5'>
              {children}
            </div>
            <Footer />
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default MainLayout
