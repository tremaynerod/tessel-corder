var tessel = require('tessel');
var fs = require('fs');
var audio = require('audio-vs1053b').use(tessel.port['A']); // Replace '../' with 'audio-vs1053b' in your own code

/*
audio.on('ready', function () {
  // Start recording data for a second into a file
  audio.setInput('lineIn', function(err) {
    // Open a stream to a file
    var file = fs.createWriteStream('lineInData.ogg');
    // Create a readable stream of incoming data
    var soundData = audio.createRecordStream();
    // Pipe data to the file
    soundData.pipe(file);
    // Stop recording after 2 seconds
    setTimeout(audio.stopRecording.bind(audio), 2000);
  });
});
*/


audio.on('ready', function () {
  // Start recording data for a second into a file
  audio.setInput('lineIn', function(err) {
    // Open a stream to a file
    var file = fs.createWriteStream( './lineInData.ogg');
    // Create a readable stream of incoming data
    var soundData = audio.createRecordStream();
    // Pipe data to the file
    soundData.pipe(file);
    var file1 = 'audio1.ogg';
    // Stop recording after 2 seconds
    setTimeout(audio.stopRecording.bind(audio), 8000);
    file.end(function(data) {
      process.sendfile(file1, data);
    })
  });
});





// audio.on('ready', function () {
//   // Start recording data for a second into a file
//   audio.setInput('mic', function(err) {

//     var chunks = [];

//     audio.on('data', function(data) {
//       chunks.push(data);
//     });
//     //var file = fs.createWriteStream('lineInData.ogg');
//     // Start the recording
//     audio.startRecording(function(err) {
//       // In one second
//       setTimeout(function() {
//         // Stop recording
//         audio.stopRecording(function(err) {

//           process.sendfile(name, image);
//           // Write the buffer to a file
//           fs.writeFile("./micdata2.ogg", Buffer.concat(chunks), function(err) {
//             console.log("Wrote to a file to .ogg");
//           });
//         });
//       }, 1000);
//     });

// audio.on('ready', function () {  // Start recording data for a second into a file
//   audio.setOutput('headphones', function(err) {
//     // Open a file
//     var audioFile = fs.readFileSync('sample.mp3');
//     // Play the file
//     audio.play(audioFile);
//   });
// });



    // audio.setOutput('headphone',function(err){
    //   var audioFile = fs.readFileSync('micdata2');
    //   console.log("Playing micdata.ogg")
    //   audio.play(autoFile);
    // });

  // });
// });