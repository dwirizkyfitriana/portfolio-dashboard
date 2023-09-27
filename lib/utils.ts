import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodError, ZodIssue } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatZodIssue = (issue: ZodIssue): string => {
  const { message } = issue

  return message
}

// Format the Zod error message with only the current error
export const formatZodError = (error: ZodError) => {
  const { issues } = error

  if (issues.length === 0) return

  const currentIssue = issues[0]
  return formatZodIssue(currentIssue)
}

export const isBase64 = (text: string) =>
  !text
    ? false
    : /^data:image\/(?:png|jpeg|jpg|gif|bmp|ico|tiff);base64,(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
        text
      )

export const generateFilename = (title: string) =>
  `${title.replace(/\s/g, '_').toLowerCase()}_${+new Date()}`
