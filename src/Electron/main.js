/*
ECMAScript modules (i.e. using import to load a module) are currently not directly supported in Electron.
You can find more information about the state of ESM in Electron in https://github.com/electron/electron/issues/21457
*/
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});
	ipcMain.handle("ping", () => "pong");
	win.loadFile("src/Web/index.html");
};

/*
You typically listen to Node.js events by using an emitter's .on function.
    + app.on('ready').then(() => {
    - app.whenReady().then(() => {
However, Electron exposes app.whenReady() as a helper specifically for the ready event to avoid subtle
pitfalls with directly listening to that event in particular. See https://github.com/electron/electron/pull/21972 for details.
*/
app.whenReady().then(() => {
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
