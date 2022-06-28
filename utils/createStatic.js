const fs = require('fs')
// const path = require('path')
const dirImages = './public/images'
const dirVideos = './public/videos'

const createStatic = async () => {

   try {
      await fs.mkdir(dirImages, { recursive: true }, async (err) => {
         if(err) throw err
      })

      await fs.mkdir(dirVideos, { recursive: true }, (err) => {
         if(err) throw err
      })

      console.log('Static folder ready')

   } catch (err) {
      console.log(err)
   }
}

module.exports = createStatic