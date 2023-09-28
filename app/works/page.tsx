'use client'

import Card from '@/components/molecules/Card'
import { Button } from '@/components/ui/button'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'

const WorksPage = () => {
  const router = useRouter()
  return (
    <>
      <div className='flex justify-end py-3'>
        <Button className='gap-3' onClick={() => router.push('/works/new')}>
          Add Work
          <FontAwesomeIcon icon={faAdd} />
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  )
}

export default WorksPage
