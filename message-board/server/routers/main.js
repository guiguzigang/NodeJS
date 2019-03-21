const Router = require('koa-router')
const md5 = require('md5')
const Models = require('../models')
const Sequelize = require('sequelize')

const router = new Router()

router.get('/', async ctx => {
  const data = await Models.Users.findById(1, {
    include: {
      model: Models.Comments
    }
  })
  ctx.body = data
})

module.exports = router