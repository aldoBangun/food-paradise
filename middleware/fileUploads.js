const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
   destination: (req, file, callback) => {
      if(file.fieldname === 'videos') {
         callback(null, path.join(__dirname, `../public/videos`))
      }
      
      if(file.fieldname === 'photo' || file.fieldname === 'avatar') {
         callback(null, path.join(__dirname, `../public/images`))
      }
   },
   filename: (req, file, callback) => {
      const validName = file.originalname.split(' ').join('-')
      const randomNumber = Math.round(Math.random() * 1e9)
      const uniqueName = `${Date.now()}-${randomNumber}-${validName}`

      callback(null, uniqueName)
   }
})

const imageFileHandler = (req, file, callback) => {
   const ONE_MEGA_BYTE = 1024 * 1024
   const isValidMimeType = file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'

   if(!isValidMimeType) {
      callback(new Error('Only accept .png, .jpg, .jpeg image format'), false)
      return
   }

   if(file?.size > ONE_MEGA_BYTE) {
      callback(new Error('Image cannot be more than 1 MB'), false)
      return
   }

   callback(null, true)
}

const videoFileHandler = (req, file, callback) => {
   const ONE_HUNDRED_MEGA_BYTE = 100 * 1024 * 1024
   const isValidMimeType = file.mimetype == 'video/mp4' || file.mimetype == 'video/webm' || file.mimetype == 'video/quicktime'

   if(!isValidMimeType) {
      callback(new Error('Only accept .mp4, .webm, .mov video format'), false)
      return
   }

   if(file?.size > ONE_HUNDRED_MEGA_BYTE) {
      callback(new Error('Video cannot be more than 100 MB'), false)
      return
   }

   callback(null, true)
}

const fileFilter = (req, file, callback) => {
   if(file.fieldname === 'photo' || file.fieldname === 'avatar') {
      imageFileHandler(req, file, callback)
   }

   if(file.fieldname === 'videos') {
      videoFileHandler(req, file, callback)
   }
}

const upload = multer({
   storage: storage,
   fileFilter: fileFilter
})


module.exports = { upload }