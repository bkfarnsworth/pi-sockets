'use strict';

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
	
	//add to list of sockets
	sockets.push(socket);
	
	//listen for socket events
	socket.on('turnRight', () => emitEventToAllSockets('turnRight'));
	socket.on('turnLeft',  () => emitEventToAllSockets('turnLeft'));
	socket.on('stop',      () => emitEventToAllSockets('stop'));

	socket.on('disconnect', () => {
		console.log('Client disconnected');

		//remove socket from list
		sockets = sockets.filter(s => s !== socket);
	});
});

function emitEventToAllSockets(event) {
	console.log(event);
	sockets.forEach(function(s) {
		s.emit(event);
	});
}