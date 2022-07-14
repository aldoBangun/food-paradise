const whiteList = ['http://localhost:3000', 'https://www.github.com', 'https://food-paradise-app.herokuapp.com', 'https://youtube.com']

const corsOptionsDelegate = function (req, callback) {
  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    callback(null, { origin: false })
    return
  }
  callback(null, { origin: false })
}

module.exports = corsOptionsDelegate