import { isBase64 } from '@/lib/utils'
import { z } from 'zod'

export const workSchema = z.object({
  _id: z.string(),
  images: z
    .string()
    .trim()
    .min(1, { message: 'image can not be an empty string!' })
    .refine(isBase64, { message: 'image must be base64 of an image' })
    .array()
    .nonempty({ message: 'images can not be empty!' })
    .max(4, { message: 'max images limited to 4!' }),
  title: z.string().trim().min(1, { message: 'title can not be emtpy!' }),
  subtitle: z.string().trim().min(1, { message: 'subtitle can not be emtpy!' }),
  desc: z.string().trim().min(1, { message: 'desc can not be emtpy!' }),
  link: z
    .string()
    .trim()
    .min(1, { message: 'link can not be emtpy!' })
    .startsWith('https://', { message: 'link must start with `https`' }),
  tech: z
    .string()
    .trim()
    .min(1, { message: 'tech can not be an emtpy string!' })
    .array()
    .nonempty({ message: 'tech can not be emtpy!' }),
  status: z.enum(['Launched', 'Work in Progress'], {
    required_error: 'status must be `Launched` or `Work in Progress`'
  })
})

export const addWorkSchema = workSchema.omit({ _id: true })

export const updateWorkSchema = addWorkSchema
  .extend({
    images: z
      .array(
        z.object({
          index: z.number(),
          file: z
            .string()
            .trim()
            .min(1, { message: 'image can not be an empty string!' })
            .refine(isBase64, { message: 'image must be base64 of an image' })
        })
      )
      .nonempty({ message: 'images can not be empty!' })
      .max(4, { message: 'max images limited to 4!' })
  })
  .partial()
