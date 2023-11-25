const socket = io();

const $input = document.getElementById('input');
const $history = document.getElementById('history');

function onSubmit(e) {
  e.preventDefault();

  if ($input.value) {
    socket.emit('chat message', input.value);
    $input.value = '';
  }
}

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  $history.appendChild(item);
});
