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
	
	//listen for LED changes
	socket.on('toggleLED', function(){
		console.log('toggleLED')
		sockets.forEach(function(s) {
			s.emit('toggleLED');
		});
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected');

		//remove socket from list
		sockets = sockets.filter(s => s !== socket);
	});
});