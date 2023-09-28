import ThemeToggle from './ThemeToggle'
import Image from 'next/image'

const HeaderMenu = () => {
  return (
    <div className='flex items-center justify-evenly rounded-[30px] bg-white dark:bg-dark-card-bg h-[60px] w-32 text-light-text-primary dark:text-white [&>*]:cursor-pointer'>
      <ThemeToggle />
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
