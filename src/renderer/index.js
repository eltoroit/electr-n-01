const information = document.getElementById("info");

let msg = ``;
msg += `This app is using: `;
msg += `Chrome (v${versions.chrome()}), `;
msg += `Node.js (v${versions.node()}) and `;
msg += `Electron (v${versions.electron})`;
information.innerText = msg;

const setButton = document.getElementById("btn");
const titleInput = document.getElementById("title");
setButton.addEventListener("click", () => {
	const title = titleInput.value;
	window.electronAPI.setTitle(title);
});
