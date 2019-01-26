const express = require('express')
const app = express()

const asyncIO = function(cb) {
  setTimeout({
    cb()
  }, 500)
}

const mid = function(req, res, next) {
  req.body = 'mark'
  next()
}

app.use(mid)
app.use(function(req, res, next) {
  asyncIO(function() {
    req.body += ' saved'
    res.send(req.body + ' done')
  })
})

app.listen(3000)