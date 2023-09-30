'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const formSchema = z.object({
  email: z.string().min(1, { message: 'Email can not be empty!' }).email('Email not valid!'),
  password: z.string().min(1, { message: 'Password can not be empty' })
})

const FormLogin = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values })

    setIsLoading(true)
    const result = await signIn('credentials', {
      ...values,
      redirect: false
    })
    console.log({ result })

    setIsLoading(false)

    if (result?.error) {
      setErrorMsg('Invalid Email or Password!')
      return
    }

    router.push('/')
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
                <Input
                  className='dark:bg-dark-bg'
                  placeholder='mail@example.com'
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
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password<span className='text-red-800'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className='dark:bg-dark-bg'
                  type='password'
                  placeholder='Enter your password'
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className='w-full text-white bg-light-primary hover:bg-dark-primary dark:bg-dark-primary dark:hover:bg-light-primary'
          type='submit'
          isLoading={isLoading}
          disabled={isLoading}
        >
          Submit
        </Button>

        <p className='text-red-600 !mt-3 text-center'>{errorMsg}</p>
      </form>
    </Form>
  )
}

export default FormLogin
