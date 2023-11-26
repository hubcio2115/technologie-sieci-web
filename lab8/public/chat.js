const socket = io();

const $input = document.getElementById('input');
const $history = document.getElementById('history');

function onSubmit(e, userId) {
  e.preventDefault();

  if ($input.value) {
    socket.emit('chat message', { message: $input.value, userId });
    $input.value = '';
  }
}

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg.message;
  $history.appendChild(item);
});
