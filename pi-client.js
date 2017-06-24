// after changing this file, use scp to copy to the pi:
//scp ~/life/Side-Projects/pi-sockets/pi-client.js pi@10.210.56.230:~/Projects/pi-sockets/script.js

const onoff = require('onoff');
const io = require('socket.io-client');

var Gpio = onoff.Gpio;
var led = new Gpio(4, 'out');
var socket = io('https://quiet-reaches-27634.herokuapp.com/')

socket.on('toggleLED', function(){
	console.log('button pressed!');
	var value = (led.readSync() + 1) % 2;
	led.write(value, function() {
		console.log(value);
	});
});

process.on('SIGINT', function() {
	clearInterval(interval);
	led.writeSync(0);
	led.unexport();
	console.log('done')
	process.exit();
})
