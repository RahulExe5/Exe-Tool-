function checkBan() {
  const uid = document.getElementById("uidInput").value.trim();
  const result = document.getElementById("result");
  const loader = document.getElementById("loader");

  if (uid === "") {
    showResult("Please enter a UID.", "warn");
    return;
  }

  result.style.display = "none";
  loader.style.display = "block";

  const apiUrl = `https://teamxcutehack.serv00.net/ban_chk/api.php?check=checkbanned&key=chx&id=${uid}`;
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;

  fetch(proxyUrl)
    .then(res => {
      if (!res.ok) throw new Error("Invalid response");
      return res.json();
    })
    .then(data => {
      loader.style.display = "none";

      if (typeof data.is_banned === 'boolean') {
        const statusText = data.is_banned ? "BANNED" : "NOT BANNED";
        const resultClass = data.is_banned ? "error" : "success";
        showResult(`UID = ${uid}<br>Status = ${statusText}`, resultClass);
      } else {
        throw new Error("Invalid data");
      }
    })
    .catch(() => {
      loader.style.display = "none";
      showResult(`UID = ${uid}<br>Status = ERROR`, "warn");
    });
}

function showResult(message, type) {
  const result = document.getElementById("result");
  result.innerHTML = message;
  result.className = `result ${type}`;
  result.style.display = "block";
}