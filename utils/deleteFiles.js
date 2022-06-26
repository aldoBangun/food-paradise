const fs = require('fs')
const path = require('path')

const deleteFiles = (dir, files) => {
   return new Promise((resolve, reject) => {
      files.forEach(file => {
         const filePath = path.join(__dirname, `../public/${dir}`, file)
         
         fs.unlink(filePath, (err) => {
            if(err) return reject(err)
            resolve()
         })
      })
   })
}

module.exports = deleteFiles