const {
  app,
  BrowserWindow,
  dialog,
  ipcMain
} = require("electron");
const {
  autoUpdater
} = require("electron-updater");
const isDev = require("electron-is-dev");
const path = require('path')

require("electron-debug")();

module.exports = function (mainWindow) {
  var updateWindow;
  var updateWindowSender;
  // ! 업데이트시에 사용될 window

  function openupdateWindowdow() {
    updateWindow = new BrowserWindow({
      width: 500,
      height: 200,
      center: false,
      resizable: true,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        webviewTag: true,
        webSecurity: false,
        alwaysOnTop: true,
        preload: path.join(__dirname, "./preload.js")
      }
    })

    updateWindow.on('closed', () => {
      updateWindow = null
    })

    if (isDev) {
      console.log("Dev Mode")
      updateWindow.loadURL(`http://localhost:3000/#update`)
      // mainWindow.webContents.openDevTools();
    } else {
      console.log("Not Dev Mode")
      updateWindow.removeMenu();
      updateWindow.loadURL(`file://${path.join(__dirname,'..//build/index.html')}#update`)
      // mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
    }

  }

  ipcMain.on('register_updateWindow', function (event, data) {
    console.log("=== Register Update Window ===")
    updateWindowSender = event.sender;
  });


  if (process.env.NODE_ENV !== 'production') {
    //개발환경일경우 설정파일이 없어서 오류 index.js와 같은 폴더에 앱업데이트 설정을 넣어둬 해결
    autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml');
  }

  app.on('ready', function () {
    //운영환경일때만 업데이트 하도록 해도 무방
    //if (process.env.NODE_ENV !== 'production') 
    autoUpdater.checkForUpdates();
  });


  autoUpdater.on('checking-for-update', function () {
    console.log('Checking-for-update');
  });
  autoUpdater.on('error', function (error) {
    console.error('error', error);
  });
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';

    console.log(log_message)
    if (!(!updateWindowSender)) updateWindowSender.send("updateProgressPercentage", progressObj.percent);

    if ((progressObj.percent) >= 100) {
      console.log("Close...")
      if (!(!updateWindow)) updateWindow.close();
    }
  })
  //다운로드 완료되면 업데이트
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName) {
    if (!(!updateWindow)) updateWindow.close();
    console.log('update-downloaded');
    const dialogOpts = {
      type: "info",
      buttons: ["설치후 재시작", "프로그램 종료"],
      defaultId: 0,
      cancleId: 1,
      title: "크릴 업데이터",
      message: process.platform === "win32" ? releaseNotes : releaseName,
      detail: "새로운 버전이 다운로드 되었습니다. 재시작 버튼을 눌러 업데이트를 적용해주세요."
    };
    dialog.showMessageBox(dialogOpts)
      .then((result) => {
        if (result.response === 0) {
          autoUpdater.quitAndInstall();
        } else {
          app.quit();
          app.exit();
        }
      })
      .catch(err => {
        console.log(err)
      });
  });
  //신규 업로드가 있을경우 === 구버전
  autoUpdater.on('update-available', function (info) {
    console.log('A new update is available');
    openupdateWindowdow();

    // const dialogOpts = {
    //   type: "info",
    //   buttons: ["확인"],
    //   title: "크릴 업데이터",
    //   detail: "크릴 업데이트 버전이 나왔습니다. 다운로드를 시작합니다.\n다운로드가 완료될때까지 잠시만 기다려주세요.",
    // };
    // dialog.showMessageBox(dialogOpts).then((result) => {
    //   console.log ("업데이트 진행 확인")
    // });
  });

  //신규 업로드가 없을경우 === 최신버전
  autoUpdater.on('update-not-available', function () {
    console.log('update-not-available');
  });
}