import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exist!'],
    required: [true, 'Email is required!']
  },
  password: {
    type: String,
    required: [true, 'Password is required!']
  },
  image: {
    type: String
  },
  name: {
    type: String,
    required: [true, 'Password is required!']
  }
})

const User = models.User || model('User', UserSchema)

export default User
