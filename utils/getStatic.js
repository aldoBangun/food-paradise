const { BASE_URL } = process.env
 
const getStatic = (data) => {
   return data.map(item => {
      if(item?.avatar) {
         item.avatar = `${BASE_URL}${item.avatar}`
      }

      if(item?.photo) {
         item.photo = `${BASE_URL}${item.photo}`
      }

      if(item?.videos) {
         item.videos = item.videos.map((source) => `${BASE_URL}${source}`)
      }

      return item
   })
}

module.exports = getStatic