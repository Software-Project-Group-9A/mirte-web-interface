
var express = require("express");
var pty = require('node-pty');
var app = express();
var expressWs = require('express-ws')(app);  // TODO: decide on which websocket lib we use
var cors = require('cors')
const bodyParser = require('body-parser');
var bonjour = require('bonjour')();
const WebSocket = require('ws');  // TODO: decide on which websocket lib we use
const wss = new WebSocket.Server({port: 4567 });

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// handle commands and stepper
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
        console.log("shell stdout: " + data);
        ws.send(data);
    });

    // For all websocket data send it to the shell
    ws.on('message', (msg) => {
	    console.log("message on socket: " + msg);
        shell.write(msg);
    });
});

// catch python files from the web interface and save them
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
});


// Start the application
app.listen(3000 , () => console.log("services have started"));


// send new list of zoefs to websocket
function update(){
   console.log(browser.services);
   wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(browser.services));
      }
   });
}

// browse for all zoef services and update on up and down
browser = bonjour.find({ type: 'zoef' }, function (service) {
   update();
})
browser.on('down', update);

// send list of zoefs on new connection
wss.on('connection', function connection(ws) {
  ws.send(JSON.stringify(browser.services));
});





