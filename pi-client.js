const io = require('socket.io-client')
var socket = io('http://localhost:8080');
socket.on('time', function(timeString) {
  console.log(timeString);
});