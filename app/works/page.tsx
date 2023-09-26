import Image from 'next/image'

const WorksPage = () => {
  return (
    <div className='grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1'>
      <div className='p-[21px] rounded-[20px] w-full bg-white space-y-5'>
        <Image
          className='rounded-[18px] w-full'
          src='/assets/images/card-placeholder.png'
          alt=''
          width={400}
          height={300}
        />

        <h1 className='text-lg font-bold'>Abstract Colors</h1>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident adipisci, repellendus,
          consequatur ipsum,
        </p>
      </div>
      <div className='p-[21px] rounded-[20px] w-full bg-white space-y-5'>
        <Image
          className='rounded-[18px] w-full'
          src='/assets/images/card-placeholder.png'
          alt=''
          width={400}
          height={300}
        />

        <h1 className='text-lg font-bold'>Abstract Colors</h1>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident adipisci, repellendus,
          consequatur ipsum,
        </p>
      </div>
      <div className='p-[21px] rounded-[20px] w-full bg-white space-y-5'>
        <Image
          className='rounded-[18px] w-full'
          src='/assets/images/card-placeholder.png'
          alt=''
          width={400}
          height={300}
        />

        <h1 className='text-lg font-bold'>Abstract Colors</h1>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident adipisci, repellendus,
          consequatur ipsum,
        </p>
      </div>
    </div>
  )
}

export default WorksPage
