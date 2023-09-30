import WorkCards from '@/components/organism/WorkCards'
import { Button } from '@/components/ui/button'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const WorksPage = () => {
  return (
    <>
      <div className='flex justify-end py-3'>
        <Link href='works/new'>
          <Button className='gap-3'>
            Add Work
            <FontAwesomeIcon icon={faAdd} />
          </Button>
        </Link>
      </div>
      <WorkCards />
    </>
  )
}

export default WorksPage
