/**
 * ls
 *  输出当前运行命令所在的目录下的文件和文件夹
 * ls -p d:\
 *  我们还可以指定要显示的目录
 */

const commander = require('commander')
const fs = require('fs')
const chalk = require('chalk')

// 文字的修饰：斜体，加粗重windows下（cmd）下支持不是特别的好
console.log(chalk.italic('Hello world!') + ' miaov')
console.log(chalk.bold.red.bgGreen('Hello world!') + ' miaov')

// 设置当前命令工具的版本
commander.version('v1.0.0', '-v, --version')

// method1() // node ls
method2() // node ls [-p]|[--path]

commander.parse(process.argv)

function method1() {
  const subCommander = commander.command('<path>')
  // 实现命令的具体逻辑
  commander.action((path) => { //这里的path参数就是在命令中定义的<path>
    // console.log('ls', path);

    // 把当前命令指定的目录下的文件以及文件夹全部显示在控制台中
    try {
      const files = fs.readdirSync(path);
      console.log(files, 1);
    } catch (e) {
      // 开发过程中，可以把错误打印出来，实际发布以后应该屏蔽错误信息
      console.log(e);
    }
  })
  // 在把process.argv交给parse解析之前进行一个简单的处理，少于3个参数，表示使用的是默认值
  if (process.argv.length < 3) {
    process.argv.push(__dirname);
  }
}
function method2() {
  // 设置命令选项
  commander.option('-p, --path [path]', '设置要显示的目录', __dirname)

  // 以列表的形式显示，如果选项不接收用户输入的值，那么这个选项将以boolean的形式提供给后面命令使用
  commander.option('-l, --list', '以列表的形式显示')

  // 实现命令的具体逻辑
  commander.action(_ => {
    // option中的变量会挂在到当前commander对象的同名属性下
    try {
      const files = fs.readdirSync(commander.path)
      console.log(2, commander.path)
      // 如果commander.list为true，以列表的形式显示
      if (commander.list) {
        const output = files.map(file => {
          const stat = fs.statSync(commander.path + '/' + file);
          // 根据isDirectory()显示不同的文件类型

          return stat.isDirectory() ? chalk.red(`[目录]   ${file}\r\n`) : `[文件]   ${file}\r\n`
        }).join('')

        console.log(output)
      } else {
        console.log(files)
      }
    } catch (err) {
      console.log(err)
    }
  })
}
