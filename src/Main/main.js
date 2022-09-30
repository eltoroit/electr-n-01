/*
ECMAScript modules (i.e. using import to load a module) are currently not directly supported in Electron.
You can find more information about the state of ESM in Electron in https://github.com/electron/electron/issues/21457
*/
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	win.loadFile("src/renderer/index.html");
	win.webContents.openDevTools();
};

/*
You typically listen to Node.js events by using an emitter's .on function.
    + app.on('ready').then(() => {
    - app.whenReady().then(() => {
However, Electron exposes app.whenReady() as a helper specifically for the ready event to avoid subtle
pitfalls with directly listening to that event in particular. See https://github.com/electron/electron/pull/21972 for details.
*/
app.whenReady().then(() => {
	/*
		ipcRenderer.send(channel, ...args) <=> ipcMain.on(channel, listener(event:IpcMainEvent , ...args:any[]))
			- Send an asynchronous message to the main process via channel, along with arguments.
		 ipcRenderer.invoke(channel, ...args) <=> ipcMain.handle(channel, listener(event:IpcMainInvokeEvent , ...args:any[]))
		 	- Send a message to the main process via channel AND expect a result asynchronously.
	*/
	ipcMain.on("set-title", (event, title) => {
		const webContents = event.sender;
		const win = BrowserWindow.fromWebContents(webContents);
		win.setTitle(title);
	});
	ipcMain.handle("dialog-open-file", async () => {
		const { canceled, filePaths } = await dialog.showOpenDialog();
		if (canceled) {
			return;
		} else {
			return filePaths[0];
		}
	});

	createWindow();
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	/*
    Checking against Node's *process.platform* variable can help you to run code conditionally on certain platforms.
    Note that there are only three possible platforms that Electron can run in:
    - win32 (Windows),
    - linux (Linux),
    - darwin (macOS).
    */
	if (process.platform !== "darwin") app.quit();
});

console.log(`Hello from Electron 👋`);
debugger;
