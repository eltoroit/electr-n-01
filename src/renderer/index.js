const information = document.getElementById("info");

let msg = ``;
msg += `This app is using: `;
msg += `Chrome (v${versions.chrome()}), `;
msg += `Node.js (v${versions.node()}) and `;
msg += `Electron (v${versions.electron})`;
information.innerText = msg;

const btnSet = document.getElementById("btnSet");
const titleInput = document.getElementById("title");
btnSet.addEventListener("click", () => {
	const title = titleInput.value;
	window.electronAPI.setTitle(title);
});

const btnOpenFile = document.getElementById("btnOpenFile");
const filePathElement = document.getElementById("filePath");
btnOpenFile.addEventListener("click", async () => {
	const filePath = await window.electronAPI.openFile();
	filePathElement.innerText = filePath;
});
