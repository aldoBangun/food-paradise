const whiteList = ['http://localhost:3000', 'https://food-paradise-app.herokuapp.com']

const corsOptionsDelegate = function (req, callback) {
  if (whiteList.indexOf(req.header('Origin')) !== -1) return callback(null, { origin: true })
  callback(null, { origin: false })
}

module.exports = corsOptionsDelegate