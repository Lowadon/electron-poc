const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('node:path');
const { queryCarmodel, testDbInitialisation } = require('./static/scripts/database');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'static', 'scripts', 'preloadIndex.js'),
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteFeature: false
        }
    });
    win.webContents.openDevTools();
    win.loadFile("views/index.html");
    win.maximize();
};

ipcMain.handle('get-data', queryCarmodel);

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0)
        {
            createWindow();
        }
    })
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin')
    {
        app.quit();
    }
});
