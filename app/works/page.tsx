import Card from '@/components/molecules/Card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const WorksPage = () => {
  return (
    <>
      {/* <div className='flex justify-end'>
        <Button className='' >Add</Button>
      </div> */}
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
