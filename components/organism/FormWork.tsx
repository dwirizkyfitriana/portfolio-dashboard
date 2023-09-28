'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { workSchema } from '@/schema/work'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FormWorkImage from '../molecules/FormWorkImage'
import FormWorkTech from '../molecules/FormWorkTech'

const FormWork = () => {
  const form = useForm<z.infer<typeof workSchema>>({
    resolver: zodResolver(workSchema),
    defaultValues: {
      images: [],
      title: '',
      subtitle: '',
      desc: '',
      link: '',
      tech: []
    }
  })

  const updateValue = (type: 'images' | 'tech', value: string[]) => {
    form.setValue(type, value as [string, ...string[]])
  }

  const onSubmit = (values: z.infer<typeof workSchema>) => {
    console.log({ values })
  }
  return (
    <Form {...form}>
      <form className='w-4/5 px-3 space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
        <FormWorkImage setValue={updateValue} />
        <FormField
          control={form.control}
          name='images'
          render={({ field }) => (
            <FormItem>
              <FormControl className='hidden'>
                <Input placeholder='Enter a title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title<span className='text-red-800'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='Enter a title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='subtitle'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Subtitle<span className='text-red-800'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='Enter a subtitle' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='desc'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description<span className='text-red-800'>*</span>
              </FormLabel>
              <FormControl>
                <Textarea className='resize-none' placeholder='Enter a subtitle' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='link'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Link<span className='text-red-800'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='Enter a link' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormWorkTech setValue={updateValue} />
        <FormField
          control={form.control}
          name='tech'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className='hidden' placeholder='Enter technologies' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='!mt-5 w-60' type='submit'>
          Save
        </Button>
      </form>
    </Form>
  )
}

export default FormWork
