import HeaderMenu from '../atoms/HeaderMenu'

const PageHeader = ({ title, breadcrumb }: { title: string; breadcrumb: string }) => {
  return (
    <div className='flex justify-between items-center'>
      <div>
        <h6 className='text-sm font-medium text-grey-700 dark:text-white'>Pages / {breadcrumb}</h6>
        <h1 className='text-[34px] font-bold text-light-text-primary dark:text-white'>{title}</h1>
      </div>
      <HeaderMenu />
    </div>
  )
}

export default PageHeader
