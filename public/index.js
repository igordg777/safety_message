const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

const ws = new WebSocket('ws://localhost:3001');

function setStatus(value) {
    status.innerHTML = value;
}

// Для сохранения чата необходимо использовать базу данных, или хотя бы массив на сервере (актуально до перезагрузки сервера) или текстовый файл на сервере

function printMessage(value) {
    console.log(value)
    const li = document.createElement('li');

    li.innerHTML = value;
    messages.appendChild(li);
}

form.addEventListener('submit', event => {
    event.preventDefault();
    ws.send(input.value);
    input.value = '';
})

ws.onopen = () => setStatus('Соединение: онлайн');
ws.onclose = () => setStatus('Соединение: офлайн');
ws.onmessage = response => printMessage(response.data);