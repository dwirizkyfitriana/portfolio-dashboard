import cloudinary from 'cloudinary'

export const uploadImage = async (file: string, filename: string) => {
  return await cloudinary.v2.uploader.upload(file, {
    folder: 'portfolio',
    public_id: filename
  })
}
