const {contextBridge, ipcRenderer} = require("electron/renderer");

contextBridge.exposeInMainWorld('electronAPI', {
    getData: () => ipcRenderer.invoke('get-data')
});