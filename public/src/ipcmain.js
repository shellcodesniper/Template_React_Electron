const {
  ipcMain
} = require('electron')


ipcMain.on('ipc_request_name', (event, data) => {
  event.sender.send('ipc_response_name', data);
});