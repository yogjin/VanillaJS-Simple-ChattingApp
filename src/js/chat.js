"use strict";

const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

function sendMessage() {
  const data = {
    name: nickname.value,
    msg: chatInput.value,
  };
  socket.emit("chatting", data);
  chatInput.value = "";
}
sendButton.addEventListener("click", sendMessage);

chatInput.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    sendMessage();
  }
});

// chatting data를 받아서 처리
socket.on("chatting", (data) => {
  const { name, msg, time } = data;
  console.log(data);
  const li = makeChatLi(name, msg, time);
  chatList.appendChild(li);
  displayContainer.scrollTo(0, displayContainer.scrollHeight);
});

// 채팅 만들기
function makeChatLi(name, msg, time) {
  const li = document.createElement("li");
  // 받은 이름이 현재 내 이름과 같으면 sent로 설정해서 내가 보낸건 오른쪽에 위치하도록 하기
  li.classList.add(nickname.value === name ? "sent" : "received");
  li.innerHTML = `
            <span class="profile">
              <span class="user">${name}</span>
              <img src="https://placeimg.com/50/50/any" />
            </span>
            <span class="message">${msg}</span>
            <span class="time">${time}</span>`;
  return li;
}
