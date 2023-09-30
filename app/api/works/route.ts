import { connectToDB } from '@/lib/db-connection'
import { formatZodError, generateFilename } from '@/lib/utils'
import { uploadImage } from '@/lib/upload-utils'
import Work from '@/models/work.model'
import { NextResponse } from 'next/server'
import { ZodError, z } from 'zod'
import { addWorkSchema } from '@/schema/work'
import { getServerSession } from 'next-auth'

function validateAndParse(input: any, defaultValue = 1) {
  const preprocess = z.string().regex(/^\d+$/).transform(Number).safeParse(input)
  return preprocess.success ? preprocess.data : defaultValue
}

export const GET = async (req: Request) => {
  try {
    await connectToDB()

    const url = new URL(req.url)
    const params = new URLSearchParams(url.search)

    const showcase = params.get('showcase') === 'true'

    if (showcase) {
      const works = await Work.aggregate([{ $sample: { size: 3 } }])
      return NextResponse.json(
        { data: works, message: 'Success', statusCode: 200 },
        { status: 200 }
      )
    }

    const page = z.number().parse(validateAndParse(params.get('page')))
    const limit = z.number().parse(validateAndParse(params.get('limit'), 10))

    const [works, total] = await Promise.all([
      Work.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Work.countDocuments()
    ])

    return NextResponse.json(
      { data: { total, data: works, page, limit }, message: 'Success', statusCode: 200 },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'failed to fetch all works', statusCode: 500 },
      { status: 500 }
    )
  }
}

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession()
    if (!session)
      return NextResponse.json({ message: 'Unauthorize', statusCode: 401 }, { status: 401 })

    await connectToDB()

    const body = await req.json()

    const work = addWorkSchema.parse(body)

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
