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
import { addWorkSchema, workSchema } from '@/schema/work'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FormWorkImage from '../molecules/FormWorkImage'
import FormWorkTech from '../molecules/FormWorkTech'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useToast } from '../ui/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useRouter } from 'next/navigation'

const FormWork = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()

  const form = useForm<z.infer<typeof addWorkSchema>>({
    resolver: zodResolver(addWorkSchema),
    defaultValues: {
      images: [],
      title: '',
      subtitle: '',
      desc: '',
      link: '',
      tech: [],
      status: 'Launched'
    }
  })

  const updateValue = (type: 'images' | 'tech', value: string[]) => {
    form.setValue(type, value as [string, ...string[]])
  }

  const { mutate: saveWork, isLoading } = useMutation({
    mutationFn: async (values: z.infer<typeof addWorkSchema>) =>
      await axios.post('/api/works', values),
    onSuccess: () => {
      toast({ description: 'Work added successfully' })
      form.reset()
      queryClient.invalidateQueries(['works'])
      router.push('/works')
    },
    onError: () => {
      toast({ description: 'Something went wrong, please try again later', variant: 'destructive' })
    }
  })

  const onSubmit = (values: z.infer<typeof addWorkSchema>) => {
    console.log({ values })

    saveWork(values)
  }
  return (
    <Form {...form}>
      <form className='w-4/5 px-3 space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
        <FormWorkImage setValue={updateValue} isLoading={isLoading} />
        <FormField
          control={form.control}
          name='images'
          render={({ field }) => (
            <FormItem>
              <FormControl className='hidden'>
                <Input placeholder='Enter a title' {...field} disabled={isLoading} />
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
                <Input placeholder='Enter a title' {...field} disabled={isLoading} />
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
                <Input placeholder='Enter a subtitle' {...field} disabled={isLoading} />
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
                <Textarea
                  className='resize-none'
                  placeholder='Enter a subtitle'
                  {...field}
                  disabled={isLoading}
                />
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
                <Input placeholder='Enter a link' {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormWorkTech setValue={updateValue} isLoading={isLoading} />
        <FormField
          control={form.control}
          name='tech'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className='hidden'
                  placeholder='Enter technologies'
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Status<span className='text-red-800'>*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger className='dark:bg-dark-bg'>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={workSchema.shape.status.Values.Launched}>
                    {workSchema.shape.status.Values.Launched}
                  </SelectItem>
                  <SelectItem value={workSchema.shape.status.Values['Work in Progress']}>
                    {workSchema.shape.status.Values['Work in Progress']}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='!mt-5 w-60' type='submit' isLoading={isLoading} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Form>
  )
}

export default FormWork
