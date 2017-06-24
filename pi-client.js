const io = require('socket.io-client')
var socket = io('https://quiet-reaches-27634.herokuapp.com/');
// var socket = io('http://localhost:8080');
socket.on('time', function(timeString) {
  console.log(timeString);
});