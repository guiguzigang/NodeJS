(async function () {
  const Koa = require('koa')
  const KoaStaticCache = require('koa-static-cache')
  const KoaBodyParser = require('koa-bodyparser')
  const router = require('./routers/main')
  const Session = require('koa-session')
  const PORT = 4500

  const app = new Koa()

  app.keys = ['board']

  app.use(Session({
    key: 'koa:sess',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false
  }, app))

  app.use(KoaStaticCache('./public', {
    prefix: 'public',
    gzip: true
  }))

  app.use(KoaBodyParser())
  app.use(router.routes())

  app.listen(PORT)
  console.log(`app running at port ${PORT}`)
})()