const express = require('express');
const app = express();
const router = express.Router();

//check authentification
const authCheck = require('./auth');

var fs = require('fs');
var youtubedl = require('youtube-dl');

router.get('/', function(req,res){
  res.send('hello');
})

router.get('/download/:id', function(req, res){
  var stream = downloadSource(req.params.id);
  stream.pipe(res);

})


var downloadSource = function(id) {
  var stream = youtubedl('https://www.youtube.com/watch?v=' + id,
    // Optional arguments passed to youtube-dl.
    ['--format=250'],
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname }
  );

  // Will be called when the download starts.
  stream.on('info', function(info) {
    console.log('Download started');
    console.log('filename: ' + info.filename);
    console.log('size: ' + info.size);
    // console.log(stream);
  });

  return stream;
  // video.pipe(fs.createWriteStream('adele.mp4'));
}


module.exports = router;
