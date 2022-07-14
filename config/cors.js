const whiteList = ['http://localhost:3000', 'https://food-paradise-app.herokuapp.com:57779']

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1) return callback(null, true)
    callback(new Error('Not Allowed by CORS'))
  }
}

module.exports = corsOptions
