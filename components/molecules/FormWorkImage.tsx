'use client'

import { useEffect, useRef, useState } from 'react'
import { FormItem, FormLabel } from '../ui/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { Input } from '../ui/input'
import { imageToBase64 } from '@/lib/utils'

const FormWorkImage = ({
  setValue
}: {
  setValue: (type: 'images' | 'tech', value: string[]) => void
}) => {
  const [images, setImages] = useState<File[]>([])
  const [base64, setBase64] = useState<string[]>([])

  const imageRef = useRef<HTMLInputElement | null>(null)

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const arrFiles = Array.from(files).slice(0, 4)

    if (images.length >= 4) return

    arrFiles.map((file, index) =>
      images.some((image) => image.name === file.name) ? arrFiles.splice(index, 1) : file
    )

    setImages((prev) => [...prev, ...Array.from(arrFiles)])
    imageRef.current && (imageRef.current.value = '')

    const base64Array = await convertImagesToBase64(arrFiles)
    setBase64((prev) => [...prev, ...base64Array])
  }

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev]
      newImages.splice(index, 1)
      return newImages
    })
    setBase64((prev) => {
      const newImages = [...prev]
      newImages.splice(index, 1)
      return newImages
    })
  }

  const convertImagesToBase64 = async (files: File[]) => {
    const base64Array: string[] = []

    for (const file of files) {
      const base64String = await imageToBase64(file)
      base64Array.push(base64String)
    }

    return base64Array
  }

  useEffect(() => {
    setValue('images', base64)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base64])

  return (
    <FormItem>
      <FormLabel>
        Images<span className='text-red-800'>*</span>
      </FormLabel>
      <div className='grid grid-cols-4 gap-2'>
        {images.map((item, index) => (
          <div
            className='relative flex items-center justify-center gap-4 h-[100px] border-2 border-dashed rounded-2xl dark:border-white-10% cursor-pointer group'
            key={index}
          >
            <div
              className='absolute -top-2 -right-2 hidden group-hover:block'
              onClick={() => removeImage(index)}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </div>
            <Image
              className='aspect-video object-cover w-full rounded-2xl'
              src={URL.createObjectURL(item)}
              alt=''
              width={100}
              height={56.25}
            />
          </div>
        ))}

        {images.length >= 4 ? null : (
          <div
            className='relative flex items-center justify-center gap-4 h-[100px] border-2 border-dashed rounded-2xl dark:border-white-10% cursor-pointer group'
            onClick={() => imageRef.current?.click()}
          >
            <div className='flex flex-col gap-2 justify-center p-2'>
              <FontAwesomeIcon icon={faAdd} />
              <small className='text-center'>Add Thumbnail Images (up to 4)</small>
            </div>
          </div>
        )}
      </div>
      <Input
        ref={imageRef}
        className='hidden'
        type='file'
        multiple
        accept='image/jpeg, image/png'
        onChange={onImageChange}
      />
    </FormItem>
  )
}

export default FormWorkImage
