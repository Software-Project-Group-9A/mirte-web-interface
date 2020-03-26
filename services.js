
var express = require("express");
var pty = require('node-pty');
var app = express();
var expressWs = require('express-ws')(app);
var cors = require('cors')
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

expressWs.app.ws('/command', (ws, req) => {
    // For all shell data send it to the websocket
    ws.on('data', (data) => {
        ws.send(data);
    });
    // For all websocket data send it to the shell
    ws.on('message', (msg) => {
	    console.log("message on socket: " + msg);
    });
});

// Instantiate shell and set up data handlers
expressWs.app.ws('/shell', (ws, req) => {
    // Spawn the shell
    var shell = pty.spawn('/bin/bash', [], {
        name: 'xterm-color',
        cwd: process.env.PWD,
        env: process.env
    });
    // For all shell data send it to the websocket
    shell.on('data', (data) => {
        ws.send(data);
    });
    // For all websocket data send it to the shell
    ws.on('message', (msg) => {
	    console.log("message on socket: " + msg);
        shell.write(msg);
    });
});

app.post('/api/python', (req, res) => {
    var source = req.body

    const fs = require('fs');
    fs.writeFile("python/zoef.py", source, (err) => {
        if(err) {
            console.log(err);
            res.end("something went wrong writing the file");
        }

        res.end("the file was saved");
    });

    res.end("something went wrong sending the file");
});


// Start the application
app.listen(3000 , () => console.log("services have started"));
