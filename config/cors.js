const whiteList = ['http://localhost:3000', "*"]

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1) return callback(null, true)
    callback(new Error('Not Allowed by CORS'))
  }
}

module.exports = corsOptions
