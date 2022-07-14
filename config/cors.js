const whiteList = ['http://localhost:3000', 'https://food-paradise-app.herokuapp.com']

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1) return callback(null, origin)
    callback(new Error('Not Allowed by CORS'))
  }
}

module.exports = corsOptions
