
`.\node_modules\.bin\sequelize`

### 初始化项目
`.\node_modules\.bin\sequelize init`

执行命令警告： sequelize deprecated String based operators are now deprecated. Please use Symbol based operators for better security,

config.json中配置 "operatorsAliases": false 消除警告

### 创建数据库
`.\node_modules\.bin\sequelize db:create`

### 删除数据库
`.\node_modules\.bin\sequelize db:drop`

### 切换执行环境，默认空
`set NODE_ENV=test`
`echo %NODE_ENV%`

### 走test执行环境
`.\node_modules\.bin\sequelize db:create`

### 切换为默认
`set NODE_ENV=`

### 创建模型 生成迁移文件与模型文件
`.\node_modules\.bin\sequelize model:create --name User --attributes username:STRING`

### 执行迁移文件 创建表
`.\node_modules\.bin\sequelize db:migrate`

### 查看当前项目迁移状态
`.\node_modules\.bin\sequelize db:migrate:status`

### 撤销迁移
`.\node_modules\.bin\sequelize db:migrate:undo`

### 指定撤销迁移的文件
`.\node_modules\.bin\sequelize db:migrate:undo --name 迁移文件名称`
`.\node_modules\.bin\sequelize db:migrate:undo:all`

### 新增表的字段
`.\node_modules\.bin\sequelize migration:create --name UserAdd`

### 添加种子文件 create|generate  会在seeders下面创建响应的文件
`.\node_modules\.bin\sequelize seed:create --name userTest`

### 添加/删除数据
`.\node_modules\.bin\sequelize db:seed` // 没用效果？？
`.\node_modules\.bin\sequelize db:seed:all`
`.\node_modules\.bin\sequelize db:seed:undo`

### 种子文件的操作不会存储操作的历史，如果要记录可以在config/config.json文件中添加配置
```js
{
  "seederStorage": "json", // 指定以json文件记录
  "seederStoragePath": "seederStorage.json" // 指定记录的文件
}
{
  "seederStorage": "sequelize", // 指定以sequelize数据库记录
  "seederStorageTableName": "seederStorage" // 指定记录的表
}
```