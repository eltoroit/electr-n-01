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
btnOpenFile.addEventListener("click", () => {
	window.electronAPI
		.openFile()
		.then((filePath) => {
			filePathElement.innerText = filePath;
		})
		.catch((err) => {
			alert("Error");
		});
});

window.electronAPI.registerUpdateCounter((event, value) => {
	const oldValue = Number(counter.innerText);
	const newValue = oldValue + value;
	counter.innerText = newValue;
	event.sender.send("show-counter", newValue);
});
