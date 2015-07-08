var tessel = require('tessel');
var fs = require('fs');
var audio = require('audio-vs1053b').use(tessel.port['A']);

var fullData = [];

audio.on('ready', function () {

	audio.startRecording(function(err) {
		setTimeout(function () {
			audio.stopRecording(function () {
				var fullRecording = Buffer.concat(fullData);
				process.sendfile('test.ogg', fullRecording);
			});
		}, 3000);
	});

});

audio.on('data', function(data) {
	//console.log(data);
	fullData.push(data);
})

audio.on('startRecording', function(err) {
	//console.log('recording?');
})

audio.on('stopRecording', function(err) {
	//console.log('stopped');
	//console.log(fullData.length);
})


