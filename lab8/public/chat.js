let socket = io(`http://${location.host}/global`);

const $input = document.getElementById('input');
const $history = document.getElementById('history');
const $chatList = document.getElementById('chatList');

function onSubmit(e, userId) {
  e.preventDefault();

  if ($input.value) {
    socket.emit('message', { message: $input.value, userId });
    $input.value = '';
  }
}

function addChatMessage(data) {
  const item = document.createElement('li');
  item.textContent = data.message;

  $history.appendChild(item);
}

socket.on('message', (data) => {
  console.log(data);
  addChatMessage(data);
});

async function replaceHistory(room) {
  try {
    const res = await fetch(`http://${location.host}/chats/${room}`);

    if (res.ok) {
      const data = await res.json();

      const messages = [];
      for (const message of data) {
        const item = document.createElement('li');
        item.textContent = message.message;

        messages.push(item);
      }

      $history.replaceChildren(...messages);
    }
  } catch (e) {
    console.error(e);
  }
}

function changeRoom(room) {
  socket.close();

  socket = io(`http://${location.host}/${room}`);

  socket.on('message', (data) => {
    console.log(data);
    addChatMessage(data);
  });

  replaceHistory(room);
}
