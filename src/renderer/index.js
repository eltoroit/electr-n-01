const information = document.getElementById("info");

let msg = ``;
msg += `This app is using: `;
msg += `Chrome (v${versions.chrome()}), `;
msg += `Node.js (v${versions.node()}) and `;
msg += `Electron (v${versions.electron})`;
information.innerText = msg;
