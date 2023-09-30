'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import Card from '../molecules/Card'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useIntersection } from '@mantine/hooks'
import { z } from 'zod'
import { workSchema } from '@/schema/work'

const WorkCards = () => {
  const [count, setCount] = useState(0)
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['works'],
    async ({ pageParam = 1 }) => {
      const response = await axios.get(`/api/works?page=${pageParam}&limit=6`)
      const data = response.data.data
      setCount(data.total)

      return data.data as z.infer<typeof workSchema>
    },
    {
      getNextPageParam: (_, pages) => pages.length + 1,
      initialData: {
        pageParams: [1],
        pages: []
      }
    }
  )

  const lastCardRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastCardRef.current,
    threshold: 1
  })

  useEffect(() => {
    if (entry?.isIntersecting && count > 6) fetchNextPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, entry])

  const works = data?.pages.flatMap((work) => work)

  if (works?.length === 0) return <p>Loading...</p>

  return (
    <div className='grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1'>
      {works?.map((work, index) => {
        if (index === works.length - 1)
          return (
            <div key={work._id} ref={ref}>
              <Card title={work.title} body={work.desc} imageUrl={work.images[0]} />
            </div>
          )
        return (
          <div key={work._id}>
            <Card title={work.title} body={work.desc} imageUrl={work.images[0]} />
          </div>
        )
      })}
    </div>
  )
}

export default WorkCards
