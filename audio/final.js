var fs = require('fs');
var ejs = require('ejs'); // loading EJS into our project


var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['B']);

var fs = require('fs');
var audio = require('audio-vs1053b').use(tessel.port['A']);

var fullData = [];



var notificationLED = tessel.led[3]; // Set up an LED to notify when we're taking a picture

// Wait for the camera module to say it's ready
camera.on('ready', function() {
  notificationLED.high();
  // Take the picture
  camera.takePicture(function(err, image) {
    if (err) {
      console.log('error taking image', err);
    } else {
      notificationLED.low();
      // Name the image
      var name = 'pic.jpg';//'picture-' + Math.floor(Date.now()*1000) + '.jpg';
      // Save the image
      console.log('Picture saving as', name, '...');
      process.sendfile(name, image);
      console.log('done.');
      // Turn the camera off to end the script
      camera.disable();


      audio.startRecording(function(err) {
    setTimeout(function () {
      audio.stopRecording(function () {
        var fullRecording = Buffer.concat(fullData);
        process.sendfile('test.ogg', fullRecording);
      });
    }, 3000);
  });

    }
  });
});

camera.on('error', function(err) {
  //console.error(err);
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
  console.log(fullData.length);
})