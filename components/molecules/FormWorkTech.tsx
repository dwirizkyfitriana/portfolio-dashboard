'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge } from '../ui/badge'
import { FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

const FormWorkTech = ({
  setValue
}: {
  setValue: (type: 'images' | 'tech', value: string[]) => void
}) => {
  const [tech, setTech] = useState<string[]>([])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code !== 'Semicolon') return
    event.preventDefault()
    const target = event.target as HTMLInputElement
    const value = target.value

    target.value = ''

    if (tech.includes(value)) return

    setTech((prev) => [...prev, value])
  }

  const removeTech = (index: number) => {
    setTech((prev) => {
      const newtech = [...prev]
      newtech.splice(index, 1)
      return newtech
    })
  }

  useEffect(() => {
    setValue('tech', tech)
  }, [tech])

  return (
    <FormItem>
      <FormLabel>
        Technologies (separate by semicolon (;))<span className='text-red-800'>*</span>
      </FormLabel>
      <div className='space-y-3'>
        <div className='space-x-2'>
          {tech.map((item, index) => (
            <Badge key={index} className='relative py-2 px-3 group'>
              {item}
              <div
                className='absolute -top-2 right-0 cursor-pointer hidden group-hover:block'
                onClick={() => removeTech(index)}
              >
                <FontAwesomeIcon className='[&>*]: text-red-500 text-sm' icon={faCircleXmark} />
              </div>
            </Badge>
          ))}
        </div>
        <Input
          placeholder='Enter technologies, separate by semicolon (;)'
          onKeyDown={handleKeyDown}
        />
      </div>
      <FormMessage />
    </FormItem>
  )
}

export default FormWorkTech
