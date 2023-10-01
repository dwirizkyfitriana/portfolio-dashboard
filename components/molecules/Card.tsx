/* eslint-disable react/display-name */
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

const Card = ({
  title,
  imageUrl,
  body,
  href
}: {
  title: string
  imageUrl: string
  body: string
  href: string
}) => {
  return (
    <div className='p-[21px] rounded-[20px] w-full bg-white dark:bg-dark-card-bg space-y-5'>
      <Image
        className='rounded-[18px] w-full'
        src={imageUrl}
        alt=''
        width={400}
        height={300}
        priority
      />

      <h1 className='text-lg font-bold'>{title}</h1>

      <p>{body.length > 100 ? body.substring(0, 100) + '...' : body}</p>

      <div>
        <Link href={href} className='group cursor-pointer'>
          Learn More{' '}
          <FontAwesomeIcon className='ml-2 group-hover:animate-arrow' icon={faArrowRight} />
        </Link>
      </div>
    </div>
  )
}

export default Card
