const {
  app,
  BrowserWindow,
  dialog,
  ipcMain
} = require("electron");
const isDev = require("electron-is-dev");
const path = require('path')
const electronInstaller = require('electron-winstaller');

require("electron-debug")();

var mainWindow;


function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 900,
    center: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webviewTag: true,
      webSecurity: false,
      preload: path.join(__dirname, "preload.js")
    }
  });


  if (isDev) {
    console.log("Dev Mode")
    mainWindow.loadURL('http://localhost:3000');
    // mainWindow.webContents.openDevTools();
    mainWindow.webContents.openDevTools();
  } else {
    console.log("Not Dev Mode")
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
    mainWindow.removeMenu();
    // ! 개발모드가 아닐경우 메뉴를 지워버림
  }

  mainWindow.on('closed', () => {
    app.quit();
  });

}





app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.whenReady().then(createWindow)

console.log(`The temp path is: ${app.getAppPath("temp")}`)

/* Event handler for asynchronous incoming messages */
// require('./src/ipcmain')

console.log("Load ipcMain Done.");
// ipcMain 에 들어가는 소스들은 ./src/ipcmain.js 에 정의되어있음