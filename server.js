'use strict';

console.log('server.js::3 :: ');

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 8080;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

var sockets = [];

io.on('connection', (socket) => {
  console.log('Client connected');
  sockets.push(socket);
  socket.on('toggleLED', function(){
      console.log('toggleLED')
      sockets.forEach(function(s) {
         s.emit('toggleLED');
      });
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);