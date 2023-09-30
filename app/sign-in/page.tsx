import FormSignIn from '@/components/molecules/FormSignIn'
import SignInImage from '@/components/molecules/SignInImage'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const SignIn = async () => {
  const session = await getServerSession()

  if (session) redirect('/')
  return (
    <div className='grid grid-cols-2 h-max '>
      <div className='flex flex-col m-auto'>
        <h1 className='text-4xl font-bold leading-[56px] text-light-text-primary dark:text-white'>
          Sign In
        </h1>
        <p className='text-gray-600 dark:text-dark-grey'>
          Enter your email and password to sign in!
        </p>
        <FormSignIn />
      </div>
      <SignInImage />
    </div>
  )
}

export default SignIn
