import { connectToDB } from '@/lib/db-connection'
import { formatZodError, generateFilename, uploadImage } from '@/lib/utils'
import Work from '@/models/work.model'
import { updateWorkSchema } from '@/schema/work'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectToDB()

    const { id } = params

    const work = await Work.findById(id)

    if (!work)
      return NextResponse.json({ message: 'work not found', statusCode: 404 }, { status: 404 })

    return NextResponse.json({ data: work, message: 'success', statusCode: 200 }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'failed to fetch work', statusCode: 500 }, { status: 500 })
  }
}

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectToDB()

    const { id } = params
    const body = await req.json()

    const exist = await Work.findById(id)
    if (!exist)
      return NextResponse.json({ message: 'work not found', statusCode: 404 }, { status: 404 })

    const updateWork = updateWorkSchema.parse(body)

    if (updateWork.images && updateWork.images.length > 0) {
      const uploadedUrls = await Promise.all(
        updateWork.images.map(async (item) => {
          const { url } = await uploadImage(
            item.file,
            generateFilename(updateWork.title || exist.title)
          )

          return url
        })
      )

      // update image url
      updateWork.images?.map((item, index) => {
        exist.images[item.index] = uploadedUrls[index]
      })
    }

    for (const key in updateWork) {
      if (key === 'images') continue

      exist[key] = updateWork[key as keyof typeof updateWork]
    }

    const result = await exist.save()
    return NextResponse.json({ data: result, message: 'success', statusCode: 200 }, { status: 200 })
  } catch (error) {
    const message = error instanceof ZodError ? formatZodError(error) : 'failed so update works'
    return NextResponse.json({ message, statusCode: 500 }, { status: 500 })
  }
}

export const DELETE = async (_req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectToDB()

    const { id } = params

    await Work.findByIdAndRemove(id)

    return NextResponse.json({ data: { id }, message: 'success', statusCode: 200 }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'failed to delete work', statusCode: 500 }, { status: 500 })
  }
}
