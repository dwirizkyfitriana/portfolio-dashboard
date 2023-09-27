import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('MongoDb already connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: 'portfolio'
    })

    isConnected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.error(error)
  }
}
