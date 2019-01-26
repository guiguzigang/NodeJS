const fs = require('fs');
// 追加内容 
// fs.appendFileSync('./1.txt', '我是追加的内容');

export function rmdir(dir) {
  const files = fs.readdirSync(dir)

  files.forEach(child => {
    const childPath = `${dir}/${child}`
    if (fs.statSync(childPath).isDirectory()) {
      //因为文件夹里面可能还会有子文件，所以也不能直接删除
      rmdir(childPath)
    } else {
      // 删除每一个子文件
      fs.unlinkSync(childPath)
    }
  })
  // 不能删除非空文件夹
  fs.rmdirSync(dir)
}

// 当文件发生改变的时候，触发回调
// fs.watchFile('./data.txt', e => {
//     // console.log('changed');

//     //e : 类似事件对象，保存当前变化的细节
//     console.log(e); 
// });

// 监听文件或目录
fs.watch('./a', (eventType, filename) => {
  // eventType: change rename
  // filename: 当前发生改变的具体文件
  console.log(eventType, filename);
});
