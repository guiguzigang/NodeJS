const {app, BrowserWindow} = require('electron')

app.on('ready', _ => {
  const win = new BrowserWindow({
    width: 540,
    height: 720,
    frame: false, // 去掉边框
    resizable: false
  })
  // win.webContents.openDevTools()
  win.loadFile('./src/index.html')
})