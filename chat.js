import {
  database,
  ref,
  push,
  onValue,
  serverTimestamp,
  update,
  remove
} from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const muralRef = ref(database, "muralRecados");
  const input = document.getElementById("messageInput");
  const list = document.getElementById("messageList");

  if (!input || !list) {
    console.error("Mural não encontrado no HTML.");
    return;
  }

  window.saveMessage = async function () {
    const text = input.value.trim();
    if (!text) return;

    await push(muralRef, {
      text,
      author: "Pabricio",
      date: new Date().toLocaleDateString("pt-BR"),
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      }),
      edited: false,
      createdAt: serverTimestamp()
    });

    input.value = "";
  };

  window.editMessage = async function (id, oldText) {
    const newText = prompt("Editar recado:", oldText);

    if (!newText || !newText.trim()) return;

    await update(ref(database, `muralRecados/${id}`), {
      text: newText.trim(),
      edited: true
    });
  };

  window.deleteMessage = async function (id) {
    const ok = confirm("Deseja apagar esse recado?");
    if (!ok) return;

    await remove(ref(database, `muralRecados/${id}`));
  };

  onValue(muralRef, (snapshot) => {
    list.innerHTML = "";

    const data = snapshot.val();

    if (!data) {
      list.innerHTML = `<div class="message-item">💌 Nenhum recado ainda...</div>`;
      return;
    }

    const messages = Object.entries(data).reverse();

    messages.forEach(([id, msg]) => {
      const item = document.createElement("div");
      item.className = "message-item";

      const safeText = String(msg.text || "").replace(/"/g, "&quot;");

      item.innerHTML = `
        <div class="message-content">
          <strong>💖 ${msg.author || "Ivy"}</strong><br>
          <span>${msg.text || ""}</span>
          ${msg.edited ? `<small style="opacity:.6;"> · editado</small>` : ""}
          <br>
          <small>${msg.date || ""} ${msg.time ? "às " + msg.time : ""}</small>
        </div>

        <div class="message-actions">
          <button onclick="editMessage('${id}', '${safeText}')">✏️ Editar</button>
          <button onclick="deleteMessage('${id}')">🗑️ Apagar</button>
        </div>
      `;

      list.appendChild(item);
    });
  });
});