const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
   destination: (req, file, callback) => {
      if(file.fieldname === 'videos') {
         callback(null, path.join(__dirname, `../public/videos`))
      }
      
      if(file.fieldname === 'photo') {
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
   const isValidMimeType = file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'

   if(!isValidMimeType) {
      callback(new Error('Only accept .png, .jpg, .jpeg image format'), false)
      return
   }

   callback(null, true)
}

const videoFileHandler = (req, file, callback) => {
   const isValidMimeType = file.mimetype == 'video/mp4' || file.mimetype == 'video/webm' || file.mimetype == 'video/quicktime'

   if(!isValidMimeType) {
      callback(new Error('Only accept .mp4, .webm, .mov video format'), false)
      return
   }

   callback(null, true)
}

const fileFilter = (req, file, callback) => {
   if(file.fieldname === 'photo') {
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