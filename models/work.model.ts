import { InferSchemaType, Schema, model, models } from 'mongoose'

const WorkSchema = new Schema(
  {
    images: {
      type: [String],
      required: [true, 'images can not be empty!']
    },
    title: {
      type: String,
      required: [true, 'title can not be empty!']
    },
    subtitle: {
      type: String,
      required: [true, 'subtitle can not be empty!']
    },
    desc: {
      type: String,
      required: [true, 'desc can not be empty!']
    },
    link: {
      type: String,
      required: [true, 'link can not be empty!']
    },
    tech: {
      type: [String],
      required: [true, 'tech can not be empty!']
    },
    status: {
      type: String,
      enum: ['Launched', 'Work in Progress'],
      default: 'Launched',
      required: [true, 'status can not be empty!']
    }
  },
  { timestamps: true }
)

const Work = models.Work || model('Work', WorkSchema)

export type Work = InferSchemaType<typeof WorkSchema>

export default Work
