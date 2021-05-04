const WebSocket = require('ws');
const express = require("express");
const app = express();
const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Подключаем статику
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем views(hbs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Отображаем главную страницу с использованием шаблона "index.hbs"
app.get('/', function (req, res) {
    res.render('index', req.query);
});

const server_it_sea = new WebSocket.Server({ port: 3001 });

server_it_sea.on('connection', ws => {
    ws.on('message', message => {
        server_it_sea.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        })

    })
    ws.send('Добро пожаловать в мир it.sea')
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on " + port));