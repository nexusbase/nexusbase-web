import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../../build/web/index.html')}`,
  )

  
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  
  if (isDev) {
    mainWindow.webContents.openDevTools();
    
    /*
    // Install React Dev Tools    
    installExtension(REACT_DEVELOPER_TOOLS)
    .then((name:string) => {
      console.log(`Added Extension:  ${name}`);
    })
    .catch((err:any) => {
      console.log('An error occurred: ', err);
    });
    */
  }
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
