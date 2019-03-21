(async function () {
  /**
   * ORM
   *  对象关系映射
   *  把js中的对象与数据库进行关联（映射），后期通过操作对来来操作数据库
   * 
   * sequelize依赖了mysql2，但是没有默认安装，需要手动安装mysql2
   */
  const Sequelize = require('sequelize')
  const db = new Sequelize('test', 'root', '123456', {
    // host: '127.0.0.1',
    // port: '3306',
    dialect: 'mysql', // 使用的数据库
    timezone: 'Asia/Shanghai' //当我们向数据库中写入时间的时候，默认会根据系统当前所在时区进行设置
  })

  db.authenticate().then(_ => {
    console.log('连接成功')
  }).catch(e => {
    console.log('连接失败')
  })
  /**
   * 数据库连接完成以后，需要确定操作的表
   * 使用orm，不需要通过sql来操作表，而是通过对象来操作
   * 给每一个要操作的表定义一个对象 - 模型 Model
   */
  const TuserModel = await db.define('Tuser', {
    // 描述表中对应的字段信息, 对象的key默认对应着表的column，字段
    id: {
      type: Sequelize.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    age: {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    gender: {
      type: Sequelize.ENUM(['男', '女', '保密']),
      allowNull: false,
      defaultValue: '保密'
    }
  }, {
    // 用来设置字段以外的其他信息
    timestamps: false, // 是否需要增加createdAt、updatedAt、deconstedAt字段
    paranoid: false,
    freezeTableName: true,
    tableName: 'tuser',
    indexed: [{
      name: 'uname',
      fields: ['username']
    }, {
      name: 'age',
      fields: ['age']
    }]
  })

  /**
   * 模型类 -> 表
   * 模型创建出来的对象 -> 表中某条记录
   */
  // const user1 = new TuserModel() //和下面TuserModel.build是一样的

  // force: true 如果表已经存在，将会丢弃表
  // TuserModel.sync 同步存入信息 sync 方法如果表不存在会自动建表
  // const user1 = await TuserModel.sync({force: true}).then(_ => {
  //   return TuserModel.create({
  //     username: 'user1',
  //     age: 20,
  //     gender: '男'
  //   })
  // })

  // build方法如果表不存在不能存入，不会建表
  // const user2 = await TuserModel.build({
  //   username: 'user4',
  //   age: 30,
  //   gender: '女'
  // })
  // // 通过new或者build出来的对象不会立即同步到数据库中，需要使用后续的一些方法来同步
  // await user2.save()

  // const _user2 = await TuserModel.findById(2)
  // console.log(_user2)
  // _user2.set('age', 31)
  // await _user2.save()

  // update === set + save
  // await _user2.update({
  //   age: 33
  // })

  // _user2.destroy()


  // const rs = await TuserModel.findOne({
  //   where: {username: 'user4'}
  // })
  // console.log(rs)

  // const rs = await TuserModel.findAll();
  // console.log(rs);
  // console.log(rs.map(r => r.get('username')));
  // [ 'user1', 'user2', 'user4', 'user4' ]


  // const rs = await TuserModel.findAll({
  //   where: {
  //     //username: 'Reci'
  //     // username: {
  //     // [Sequelize.Op.eq]: 'Reci'   //和上面一致
  //     // },

  //     // age: {
  //     //     [Sequelize.Op.gte]: 30
  //     // },

  //     // 多条件 and且/or或
  //     [Sequelize.Op.or]: [{
  //         age: {
  //           [Sequelize.Op.gt]: 30
  //         }
  //       },
  //       {
  //         gender: '女'
  //       }
  //     ]
  //   }
  // });
  // console.log(rs.map(r => r.get('username')));

  // const rs = await TuserModel.findAll({
  //     limit: 2
  // });

  // const rs = await TuserModel.findAll({
  //     offset: 1
  // });
  
  // 可以通过offset 与 limit做分页
  // const rs = await TuserModel.findAll({
  //     offset: 4,
  //     limit: 2
  // });

  // const rs = await TuserModel.findAll({
  //     order: [
  //         ['age', 'desc']
  //     ]
  // });

  // console.log( rs.map(r => r.get('username')) );
  // const rs = await TuserModel.count()
  // console.log(rs)

  // const rs = await TuserModel.sum('age', {
  //   where: {
  //     gender: '女'
  //   }
  // })
  // console.log(rs)



  // 关联查询
  const MessageModel = await db.define('message', {
    id: {
      type: Sequelize.INTEGER(10),
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    uid: { // 其他的表的字段，把当前字段定义为外键
      type: Sequelize.INTEGER(10),
      defaultValue: 0,
      references: {
        model: TuserModel,
        key: 'id'
      }
    },
    content: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: ''
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'message'
  });

  // await MessageModel.sync() // 建表
  // .then(_ => {
  //   return MessageModel.create([
  //     {
  //       content: 'content1',
  //       uid: 1
  //     },
  //     {
  //       content: 'content2',
  //       uid: 3
  //     },
  //     {
  //       content: 'content3',
  //       uid: 3
  //     },
  //     {
  //       content: 'content4',
  //       uid: 4
  //     }
  //   ])
  // })


  // 插入多条数据save方法报错
  // const messages = await MessageModel.build([
  //   {
  //     content: 'content1',
  //     uid: 1
  //   },
  //   {
  //     content: 'content2',
  //     uid: 3
  //   },
  //   {
  //     content: 'content3',
  //     uid: 3
  //   },
  //   {
  //     content: 'content4',
  //     uid: 4
  //   }
  // ])
  // const messages = await MessageModel.build({
  //   content: 'content5',
  //   uid: 3
  // })
  // console.log(messages)
  //  通过new或者build出来的对象不会立即同步到数据库中，需要使用后续的一些方法来同步
  // await messages.save()

  // 获取某条留言的所有数据：留言本身的数据+该留言的用户数据

  // const data = {}

  // const message = await MessageModel.findById(3);
  // const user = await TuserModel.findById( message.get('uid') );

  // Object.assign( data, {
  //     id: message.get('id'), 
  //     uid: message.get('uid'), 
  //     username: user.get('username'),
  //     age: user.get('age'),
  //     gender: user.get('gender'),
  //     content: message.get('content'),
  // }  );

  // console.log(data);


  MessageModel.belongsTo(TuserModel, {
      foreignKey: 'uid'
  });

  const data2 = await MessageModel.findById(1, {
      include: [TuserModel]
  });

  // console.log(data2);

  console.log(`
      留言id：${data2.get('id')}
      留言人名称：${data2.Tuser.username}
      留言内容：${data2.get('content')}
  `);

  TuserModel.hasMany(MessageModel, {
    foreignKey: 'uid'
  });

  const data3 = await TuserModel.findById(3, {
    include: [MessageModel]
  });

  console.log(data3);

  // console.log(`
  //     留言id：${data3.get('id')}
  //     留言人名称：${data3.Tuser.username}
  //     留言内容：${data3.get('content')}
  // `);
})()