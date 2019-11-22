#!/usr/bin/nodejs

'use strict';

// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 80;


app.use('/blockly', express.static('/app/thirdparty/blockly'));
app.use('/', express.static('/app/my_app/public'));


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 



// POST http://localhost:8080/api/users
// parameters sent with 
app.post('/api/python', function(req, res) {
    var source = req.body.source;

const fs = require('fs');
fs.writeFile("/workdir/zoef.py", source, function(err) {
    if(err) {
        return console.log(err);
        res.send("error");
    }

    res.send("received");
    console.log("The file was saved!");
});

    //res.send('done');
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);




