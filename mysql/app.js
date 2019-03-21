(async function run() {
  const mysql = require('mysql2/promise')

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
  })

  // query 返回的是一个数组，第一个数组是记录的值，第二个数组是记录中包含的字段信息
  const [users] = await connection.query('SELECT name, age, gender FROM user ORDER BY age DESC')
  const res = await connection.query('INSERT INTO user (name, age) VALUES ("米米", 30)')
  if (res.affectedRows > 0) {
    console.log('添加成功')
  }
  console.log(users, res)
})()