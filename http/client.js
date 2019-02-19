const http = require('http')
const fs = require('fs')

const getHtml = http.request({
  // tcp
  host: 'www.baidu.com',
  port: 80,
  // http
  protocal: 'http:',
  method: 'get',
  path: '/'
}, res => {
  // 这个函数会在服务器响应的时候触发
  let content = ''
  res.on('data', data => {
    content += data.toString()
  })

  res.on('end', _ => {
    fs.writeFileSync('./baidu.html', content)
  })
})

const getImage = http.request({
  // tcp
  host: 'www.baidu.com',
  port: 80,
  // http
  protocal: 'http:',
  method: 'get',
  path: '/img/bd_logo1.png'
}, res => {
  let content = Buffer.alloc(0)

  res.on('data', data => {
    content = Buffer.concat([content, data], content.length + data.length)
  })

  res.on('end', _ => {
    fs.writeFileSync('./bd_logo.png', content)
  })
})

// 请求的发送需要调用下面的方法
getHtml.write('')
getHtml.end()

getImage.write('')
getImage.end()