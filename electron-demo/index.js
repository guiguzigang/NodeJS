const {app, BrowserWindow, Menu, MenuItem, ipcMain} = require('electron')
const username = 'Gavin'
global.username = username

const datas = {
  username,
  gender: '男'
}

app.on('ready', _ => {
  const win = new BrowserWindow({
      width: 800,
      height: 600,
      title: 'Electron App',
      // resizable: false,
      // alwaysOnTop: true,
      // frame: false,
      // transparent: true
    }),
    menu = new Menu(),
    menuItem1 = new MenuItem({
      type: 'normal',
      label: '文件'
    }),
    menuItem2 = new MenuItem({
      type: 'submenu',
      label: '查看',
      submenu: [
        {
          type: 'normal',
          label: '文件'
        },
        {
          type: 'separator'
        },
        {
          type: 'normal',
          label: '文件夹'
        },
        {
          type: 'checkbox',
          label: '选项一',
          checked: true
        },
        {
          type: 'separator'
        },
        {
          type: 'radio',
          label: 'AAAA'
        },
        {
          type: 'radio',
          label:'BBBB'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit',
          label: '退出'
        },
        {
          type: 'normal',
          label: '退出',
          click() {
            app.quit()
          }
        }
      ]
    }),
    win2 = new BrowserWindow({
      width: 400,
      height: 300,
      // resizable: false,
      // alwaysOnTop: true,
      title: '妙味课堂2',
      parent: win,
      modal: false
    })

  menu.append(menuItem1)
  menu.append(menuItem2)
  /**
   * 菜单位置：
   *  1. 应用程序的顶层菜单
   *  2. 上下文菜单
   */
  // 把菜单添加到应用程序窗口最顶层
  Menu.setApplicationMenu(menu)

  // 开始调试控制台
  win.webContents.openDevTools()
  
  // 加载指定的页面到窗口中，支持绝对路径，但是推荐使用相对
  // 路径，而且路径在解析的时候会被处理，相对路径默认指向
  // 应用程序的根目录
  win.loadFile('./layout/index.html');

  // 支持加载远程文件，支持http协议，也支持file协议
  // win.loadURL('https://www.miaov.com');
  // 监听渲染进程 ipcRenderer 发送的消息
  ipcMain.on('getData', function(e, key) {
    // e.sender => 通过这个对象返回消息给渲染进程
    e.sender.send('sendData', datas[key])
  })

  // 主进程主动发送消息到渲染进程
  setTimeout(_ => {
    win.webContents.send('hello', 'hello .... ', 1, 2, 3)
  }, 2000)

  win2.webContents.openDevTools()
  win2.loadFile('./layout/child.html')
})