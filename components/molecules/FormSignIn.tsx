'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const formSchema = z.object({
  email: z.string().min(1, { message: 'Email can not be empty!' }).email('Email not valid!'),
  password: z.string().min(1, { message: 'Password can not be empty' })
})

const FormLogin = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-9'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email<span className='text-red-800'>*</span>
              </FormLabel>
              <FormControl>
                <Input className='dark:bg-dark-bg' placeholder='mail@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password<span className='text-red-800'>*</span>
              </FormLabel>
              <FormControl>
                <Input className='dark:bg-dark-bg' placeholder='Enter your password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className='w-full text-white bg-light-primary hover:bg-dark-primary dark:bg-dark-primary dark:hover:bg-light-primary'
          type='submit'
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default FormLogin
