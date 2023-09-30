import { connectToDB } from '@/lib/db-connection'
import User from '@/models/user.model'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          await connectToDB()

          const { email, password } = credentials as { email: string; password: string }

          const userExist = await User.findOne({ email })

          if (!userExist) return null

          const pwdMatch = await bcrypt.compare(password, userExist.password)

          if (!pwdMatch) return null

          delete userExist.password

          return userExist
        } catch (error) {
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
