/*
A preload script contains code that runs before your web page is loaded into the browser window.
It has access to both DOM APIs and Node.js environment, and is often used to expose privileged APIs to the renderer via the contextBridge API.
*/
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: process.versions.electron,
	// we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("electronAPI", {
	setTitle: (title) => ipcRenderer.send("set-title", title),
	openFile: () => ipcRenderer.invoke("dialog-open-file"),
});
