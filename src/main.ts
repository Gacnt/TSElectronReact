import { app, BrowserWindow } from 'electron'

let window: Electron.BrowserWindow;

function createWindow(): void {
  window = new BrowserWindow({ height: 600, width: 600, show: false});
  window.on('closed', (): void => { window = null});
  window.loadURL(`${__dirname}/views/index.html`);
  window.on('ready-to-show', (): void => {
    window.show();
  });
}

app.on('ready', createWindow);
