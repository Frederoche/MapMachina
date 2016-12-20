var express = require('express');
var app = express();

app.use(express.static('Client'));

app.use('*', function(req, res) {
    res.send('index.html')
});

app.listen(8000);
console.log("listen To port 8000");