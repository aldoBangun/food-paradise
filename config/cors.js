const whiteList = ['https://food-paradise-react.web.app', 'https://food-paradise-app.herokuapp.com']

if (process.env.NODE_ENV !== 'production') {
  whiteList.push('http://localhost:3000')
}

const corsOptionsDelegate = function (req, callback) {
  if (whiteList.indexOf(req.header('Origin')) !== -1) return callback(null, { origin: true })
  callback(null, { origin: false })
}

module.exports = corsOptionsDelegate
