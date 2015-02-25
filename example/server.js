var browserify = require('browserify');
var express = require('express');
var fs = require('fs');
var app = express();

var src;

app.get('/', function (req, res) {
  res.send(fs.readFileSync('index.html', 'utf8'));
});
app.get('/baron.css', function (req, res) {
  res.send(fs.readFileSync('../baron.css', 'utf8'));
});


// DO NOT DO THIS IN PRODUCTION!!!
// Precompile your bundles instead.
app.get('/bundle.js', function (req, res) {
  if (src) return res.send(src);

  var b = browserify(['./app.js'])
  .bundle(function (err, s) {
    if (err) return res.status(500).end();
    res.send(src = s);
  });

});

app.listen(3333, 'localhost', function () {
  console.log('Server listening at http://%s:%s',
    this.address().address, this.address().port);
})
