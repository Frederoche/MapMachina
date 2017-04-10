var express = require('express');
var app = express();

var router = express.Router();

app.use(express.static('Client'));

app.use('*', function(req, res) {
    res.send('index.html')
});


var port = process.env.PORT || 8000;
app.listen(port);
console.log("listen To port" + port);