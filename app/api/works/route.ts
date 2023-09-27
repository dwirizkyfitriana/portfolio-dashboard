import { connectToDB } from '@/lib/db-connection'
import { formatZodError, generateFilename } from '@/lib/utils'
import { uploadImage } from '@/lib/upload-utils'
import Work from '@/models/work.model'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { workSchema } from '@/schema/work'

export const GET = async () => {
  try {
    await connectToDB()

    const works = await Work.find({})

    return NextResponse.json({ data: works, message: 'Success', statusCode: 200 }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'failed to fetch all works', statusCode: 500 },
      { status: 500 }
    )
  }
}

export const POST = async (req: Request) => {
  try {
    await connectToDB()

    const body = await req.json()

    const work = workSchema.parse(body)

    const uploadPromise = work.images.map(async (image) => {
      const { url } = await uploadImage(image, generateFilename(work.title))

      return url
    })

    const uploadedUrls = await Promise.all(uploadPromise)

    const newWork = new Work({ ...work, images: uploadedUrls })
    const result = await newWork.save()

    return NextResponse.json({ data: result, message: 'success', statusCode: 201 }, { status: 201 })
  } catch (error) {
    const message = error instanceof ZodError ? formatZodError(error) : 'failed so save works'
    return NextResponse.json({ message, statusCode: 500 }, { status: 500 })
  }
}
