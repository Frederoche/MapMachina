var express = require('express');
var app = express();

app.use(express.static('Client'));

app.use('*', function(req, res) {
    res.send('index.html')
});


var port = process.env.PORT;
app.listen(port);
console.log("listen To port" + port);