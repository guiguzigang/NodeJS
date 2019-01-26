const koa = require('koa')
const app = koa()

const asyncIO = function() {
  return new Promise(function(resove) {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}

const mid = function() {
  return function *(next) {
    this.body = 'mark'
    yield next
    this.body += ' done'
  }
}

app.use(mid)
app.use(function *(next) {
  yield asyncIO()
  this.body = ' saved'
  yield next
})

app.listen(3000)