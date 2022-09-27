/*
ECMAScript modules (i.e. using import to load a module) are currently not directly supported in Electron.
You can find more information about the state of ESM in Electron in https://github.com/electron/electron/issues/21457
*/
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })
    
    win.loadFile('index.html')
}

/*
You typically listen to Node.js events by using an emitter's .on function.
    + app.on('ready').then(() => {
    - app.whenReady().then(() => {
However, Electron exposes app.whenReady() as a helper specifically for the ready event to avoid subtle
pitfalls with directly listening to that event in particular. See https://github.com/electron/electron/pull/21972 for details.
*/
app.whenReady().then(() => {
    createWindow()
})
console.log(`Hello from Electron 👋`);