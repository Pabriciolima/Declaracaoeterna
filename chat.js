import { database, ref, push, onValue, serverTimestamp } from "./firebase.js";

const muralRef = ref(database, "muralRecados");

window.saveMessage = function () {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();

  if (!text) return;

  push(muralRef, {
    text,
    author: "Pabricio",
    date: new Date().toLocaleDateString("pt-BR"),
    time: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    }),
    createdAt: serverTimestamp()
  });

  input.value = "";
};

onValue(muralRef, (snapshot) => {
  const list = document.getElementById("messageList");
  list.innerHTML = "";

  const data = snapshot.val();
  if (!data) return;

  const messages = Object.values(data).reverse();

  messages.forEach((msg) => {
    const item = document.createElement("div");
    item.className = "message-item";

    item.innerHTML = `
      <strong>💖 ${msg.author || "Ivy"}</strong><br>
      <span>${msg.text}</span><br>
      <small>${msg.date || ""} às ${msg.time || ""}</small>
    `;

    list.appendChild(item);
  });
});