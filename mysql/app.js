async function connetServer() {
  const mysql = require('mysql2/promise')

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
  })

  // query 返回的是一个数组，第一个数组是记录的值，第二个数组是记录中包含的字段信息
  const [users] = await connection.query('SELECT name, age, gender FROM user')

  console.log(users)
}

connetServer()