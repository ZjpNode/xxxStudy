function addMessage(from, text) {
  let li = document.createElement("li");
  li.className = "message";
  li.innerHTML = `<b>${from}</b>：${text}`;
  document.getElementById("messages").appendChild(li);
  return li;
}
window.onload = function() {
  let scoket = io.connect();
  scoket.on("connect", () => {
    let nickeName = prompt("what is you nickeName?");
    scoket.emit("join", nickeName);
    addMessage("系统", `欢迎${nickeName}进入聊天室`);
    scoket.on("announcement", msg => {
      addMessage("系统", msg);
    });
    scoket.on("text", (name, msg) => {
      addMessage(name, msg);
    });
    // =================================================
    document.getElementById("btn").onclick = () => {
      let input = document.getElementById("input");
      let clientDate = Date.now();
      let li = addMessage(`${nickeName}(me)`, input.value);
      scoket.emit("text", input.value, serverDate => {
        li.className = "confirmed-message";
        console.log(li, serverDate - clientDate);
      });
      input.value = "";
      input.focus();
      return false;
    };
  });
};
