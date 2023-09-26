'use client'

import { sidebarItems } from '@/lib/navigations'
import SidebarItem from '../atoms/SidebarItem'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className='w-[290px] h-screen max-h-screen bg-white dark:bg-dark-card-bg !m-0'>
      <div className='flex justify-center items-center h-32 border-b-2 border-b-light-bg dark:border-b-white-10%'>
        <h1 className='text-light-text-primary dark:text-white text-2xl font-bold leading-[100%]'>
          Dwi <span className='font-normal'>Fitriana</span>
        </h1>
      </div>

      <div className='flex flex-col gap-7 w-4/5 mx-auto mt-10'>
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} item={item} active={pathname === item.href} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
