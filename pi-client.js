// after changing this file, use scp to copy to the pi:
//scp ~/life/Side-Projects/pi-sockets/pi-client.js pi@10.210.56.230:~/Projects/pi-sockets/script.js

console.log('running pi-client');

const onoff = require('onoff');
const io = require('socket.io-client');

var Gpio = onoff.Gpio;
var enablePin = new Gpio(18, 'out');
var input1 = new Gpio(4, 'out');
var input2 = new Gpio(17, 'out');
var socket = io('https://quiet-reaches-27634.herokuapp.com/');

enablePin.write(1);
input1.write(0);
input2.write(0);

socket.on('turnRight', turnRight);
socket.on('turnLeft', turnLeft);
socket.on('stop', stop);

process.on('SIGINT', function() {
	input1.write(0);
	input2.write(0);
	enablePin.write(0);
	input1.unexport();
	input2.unexport();
	enablePin.unexport();
	console.log('done')
	process.exit();
});

function turnRight() {
	console.log('turnRight');
	input1.write(0);
	input2.write(1);
}

function turnLeft() {
	console.log('turnLeft');
	input1.write(1);
	input2.write(0);
}

function stop() {
	console.log('stop');
	input1.write(0);
	input2.write(0);
}
