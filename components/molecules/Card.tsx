import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

const Card = () => {
  return (
    <div className='p-[21px] rounded-[20px] w-full bg-white dark:bg-dark-card-bg space-y-5'>
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

      <h4 className='group cursor-pointer'>
        Learn More{' '}
        <FontAwesomeIcon className='ml-2 group-hover:animate-arrow' icon={faArrowRight} />
      </h4>
    </div>
  )
}

export default Card
