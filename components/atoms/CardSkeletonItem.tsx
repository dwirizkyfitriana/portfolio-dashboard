const CardSkeletonItem = () => {
  return (
    <div
      role='status'
      className='p-[21px] rounded-[20px] w-full bg-white dark:bg-dark-card-bg space-y-5 animate-pulse'
    >
      <div className='rounded-[18px] w-full lg:h-[192px] bg-gray-200 dark:bg-gray-700'></div>

      <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-4/5 mb-4'></div>

      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-4/5 mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-2.5'></div>
    </div>
  )
}

export default CardSkeletonItem
