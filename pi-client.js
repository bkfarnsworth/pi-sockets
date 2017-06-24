// after changing this file, use scp to copy to the pi:
//scp ~/life/Side-Projects/pi-sockets/pi-client.js pi@10.210.56.230:~/Projects/pi-sockets/script.js

const onoff = require('onoff');
const io = require('socket.io-client');

var Gpio = onoff.Gpio;
var led = new Gpio(4, 'out');
var socket = io('https://quiet-reaches-27634.herokuapp.com/');
var intervalHandler;

socket.on('turnRight', turnRight);
socket.on('turnLeft', turnLeft);
socket.on('stop', stop);

process.on('SIGINT', function() {
	led.writeSync(0);
	led.unexport();
	console.log('done')
	process.exit();
});

function turnRight() {
	console.log('turnRight');
	blinkLED(1000);
}

function turnLeft() {
	console.log('turnLeft');
	blinkLED(500);
}

function stop() {
	console.log('stop');
	clearInterval(intervalHandler);
}

blinkLED(intervalInMS=1000){
	//clear any existing intervals
	clearInterval(intervalHandler);

	//set up new interval
	intervalHandler = setInterval(function() {
		var value = (led.readSync() + 1) % 2;
		led.write(value);
	}, intervalInMS);
}
